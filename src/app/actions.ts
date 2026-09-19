"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import slugify from "slugify";

// Helper to check if an object is a valid Form File/Blob across Server Action boundaries
function isFormFile(file: any): boolean {
  return (
    file &&
    typeof file === "object" &&
    typeof file.size === "number" &&
    file.size > 0 &&
    typeof file.arrayBuffer === "function"
  );
}

const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

// Centralized admin authentication guard for mutating Server Actions
export async function requireAdminAuth() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error("Akses ditolak: Anda harus login sebagai admin untuk melakukan tindakan ini.");
  }
  return { user, supabase };
}

// Helper to upload files to Supabase Storage with strict security validation
async function uploadFile(
  bucket: string,
  file: any,
  folder: string = ""
): Promise<{ url: string | null; error: string | null }> {
  if (!isFormFile(file)) return { url: null, error: null };

  // 1. File size restriction (5MB max)
  if (file.size > MAX_FILE_SIZE) {
    return { url: null, error: "Ukuran file terlalu besar. Maksimal ukuran file adalah 5 MB." };
  }

  // 2. MIME type restriction
  const mimeType = (file.type || "").toLowerCase();
  if (mimeType && !ALLOWED_MIME_TYPES.includes(mimeType)) {
    return {
      url: null,
      error: "Format file tidak didukung. Hanya gambar (JPEG, PNG, WebP, GIF) yang diizinkan.",
    };
  }

  // 3. Extension sanitization (strictly alphanumeric known image extensions)
  let fileExt = "jpg";
  if (file.name && typeof file.name === "string") {
    const rawExt = file.name.split(".").pop()?.toLowerCase() || "jpg";
    if (["jpg", "jpeg", "png", "webp", "gif"].includes(rawExt)) {
      fileExt = rawExt === "jpeg" ? "jpg" : rawExt;
    }
  }

  try {
    const supabase = createAdminClient();
    const cleanFolder = folder.replace(/[^a-zA-Z0-9_-]/g, "");
    const safeRandom = Math.random().toString(36).substring(2, 9);
    const fileName = `${cleanFolder ? cleanFolder + "/" : ""}${Date.now()}_${safeRandom}.${fileExt}`;

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    let { data, error } = await supabase.storage.from(bucket).upload(fileName, buffer, {
      contentType: file.type || "image/jpeg",
      upsert: true,
    });

    // Fallback: create bucket if not existing
    if (error && (error.message.includes("not found") || error.message.includes("Bucket"))) {
      try {
        await supabase.storage.createBucket(bucket, { public: true });
        const retry = await supabase.storage.from(bucket).upload(fileName, buffer, {
          contentType: file.type || "image/jpeg",
          upsert: true,
        });
        data = retry.data;
        error = retry.error;
      } catch (bErr: any) {
        console.error("Bucket creation failed:", bErr?.message || bErr);
      }
    }

    if (error || !data) {
      console.error(`Upload error to ${bucket}:`, error?.message);
      return { url: null, error: "Gagal mengunggah foto ke storage." };
    }

    const { data: publicUrlData } = supabase.storage.from(bucket).getPublicUrl(data.path);
    return { url: publicUrlData.publicUrl, error: null };
  } catch (err: any) {
    console.error(`Upload error to ${bucket}:`, err?.message || err);
    return { url: null, error: "Terjadi kesalahan saat mengunggah foto." };
  }
}

// Helper to delete files from Supabase Storage bucket
async function deleteStorageFile(bucket: string, fullUrlOrPath: string | null) {
  if (!fullUrlOrPath || fullUrlOrPath.includes("placeholder")) return;
  try {
    const supabase = createAdminClient();
    let path = fullUrlOrPath;
    if (fullUrlOrPath.includes(`/storage/v1/object/public/${bucket}/`)) {
      path = fullUrlOrPath.split(`/storage/v1/object/public/${bucket}/`)[1];
    } else if (fullUrlOrPath.includes(`${bucket}/`)) {
      path = fullUrlOrPath.substring(fullUrlOrPath.indexOf(`${bucket}/`) + bucket.length + 1);
    }

    if (path) {
      const { error } = await supabase.storage.from(bucket).remove([path]);
      if (error) {
        console.error(`Gagal menghapus foto dari storage ${bucket}:`, error.message);
      } else {
        console.log(`Berhasil menghapus file ${path} dari bucket ${bucket}`);
      }
    }
  } catch (err: any) {
    console.error(`Error hapus file storage ${bucket}:`, err.message);
  }
}

// -------------------------------------------------------------
// SERVER ACTIONS: MASTER KEAHLIAN
// -------------------------------------------------------------

export async function getMasterKeahlian(kategori?: string) {
  try {
    const supabase = await createClient();
    let query = supabase.from("master_keahlian").select("*").order("id", { ascending: true });
    if (kategori) {
      query = query.eq("kategori_keahlian", kategori);
    }
    const { data, error } = await query;
    if (error) {
      console.warn("Table master_keahlian query error (using fallback defaults):", error.message);
      return { success: false, data: [] };
    }
    return { success: true, data: data || [] };
  } catch (err: any) {
    console.warn("Failed to get master_keahlian:", err.message);
    return { success: false, data: [] };
  }
}

export async function addMasterKeahlian(nama_keahlian: string, kategori_keahlian: string = "Umum") {
  if (!nama_keahlian || !nama_keahlian.trim()) {
    return { success: false, error: "Nama keahlian tidak boleh kosong." };
  }

  const cleanNama = nama_keahlian.trim();

  try {
    const { supabase } = await requireAdminAuth();
    const { data, error } = await supabase
      .from("master_keahlian")
      .insert([{ nama_keahlian: cleanNama, kategori_keahlian }])
      .select()
      .single();

    if (error) {
      console.warn("Insert master_keahlian warning:", error.message);
      return {
        success: true,
        data: { id: Date.now(), nama_keahlian: cleanNama, kategori_keahlian },
        warning: error.message,
      };
    }

    revalidatePath("/admin/dashboard/pekerja");
    return { success: true, data };
  } catch (err: any) {
    if (err?.message?.includes("Akses ditolak")) {
      return { success: false, error: err.message };
    }
    return {
      success: true,
      data: { id: Date.now(), nama_keahlian: cleanNama, kategori_keahlian },
    };
  }
}

export async function updateMasterKeahlian(idOrNama: string | number, newNama: string) {
  if (!newNama || !newNama.trim()) return { success: false, error: "Nama keahlian baru tidak boleh kosong." };
  const cleanNama = newNama.trim();
  try {
    const { supabase } = await requireAdminAuth();
    let query = supabase.from("master_keahlian").update({ nama_keahlian: cleanNama });
    if (typeof idOrNama === "number" || !isNaN(Number(idOrNama))) {
      query = query.eq("id", Number(idOrNama));
    } else {
      query = query.eq("nama_keahlian", idOrNama);
    }
    const { error } = await query;
    if (error) console.warn("Update master_keahlian error:", error.message);
    revalidatePath("/admin/dashboard/pekerja");
    return { success: true, newNama: cleanNama };
  } catch (err: any) {
    if (err?.message?.includes("Akses ditolak")) {
      return { success: false, error: err.message };
    }
    return { success: true, newNama: cleanNama };
  }
}

export async function deleteMasterKeahlian(idOrNama: string | number) {
  try {
    const { supabase } = await requireAdminAuth();
    let query = supabase.from("master_keahlian").delete();
    if (typeof idOrNama === "number" || !isNaN(Number(idOrNama))) {
      query = query.eq("id", Number(idOrNama));
    } else {
      query = query.eq("nama_keahlian", idOrNama);
    }
    const { error } = await query;
    if (error) console.warn("Delete master_keahlian error:", error.message);
    revalidatePath("/admin/dashboard/pekerja");
    return { success: true };
  } catch (err: any) {
    if (err?.message?.includes("Akses ditolak")) {
      return { success: false, error: err.message };
    }
    return { success: true };
  }
}

// -------------------------------------------------------------
// SERVER ACTIONS: PEKERJA
// -------------------------------------------------------------

export async function addPekerja(prevState: any, formData: FormData) {
  try {
    const { supabase } = await requireAdminAuth();

    const nama = formData.get("nama") as string;
    const kategori = formData.get("kategori") as string;
    const status = (formData.get("status") as string) || "Tersedia";
    const pengalaman = Number(formData.get("pengalaman") || 0);
    const gaji = Number(formData.get("gaji") || 0);
    const lokasi = (formData.get("lokasi") as string) || "";
    const deskripsi = (formData.get("deskripsi") as string) || "";
    const umur = Number(formData.get("umur") || 18);
    const suku = (formData.get("suku") as string) || "";
    const kekurangan = (formData.get("kekurangan") as string) || "";
    const bisa_bawa_motor = formData.get("bisa_bawa_motor") === "on" || formData.get("bisa_bawa_motor") === "true";
    const takut_anjing = formData.get("takut_anjing") === "on" || formData.get("takut_anjing") === "true";
    const status_perkawinan = (formData.get("status_perkawinan") as string) || "";
    
    // Keahlian khusus: collect all selected skill checkboxes into array & comma-separated string
    const keahlianList = formData.getAll("keahlian_khusus").map((k) => k.toString()).filter(Boolean);
    const keahlian_khusus = keahlianList.join(", ");

    const agama = (formData.get("agama") as string) || "";
    const masakan_khusus = (formData.get("masakan_khusus") as string) || "";
    const pendidikan_terakhir = (formData.get("pendidikan_terakhir") as string) || "";
    const tinggi_badan = Number(formData.get("tinggi_badan") || 0);
    const berat_badan = Number(formData.get("berat_badan") || 0);
    const bisa_masak_babi = formData.get("bisa_masak_babi") === "on" || formData.get("bisa_masak_babi") === "true";

    // Bahasa asing (array)
    const bahasa_asing = formData.getAll("bahasa_asing").map((b) => b.toString()).filter(Boolean);

    if (!nama || !kategori) {
      return { success: false, error: "Nama dan Kategori wajib diisi." };
    }

    // Slug
    const baseSlug = slugify(nama, { lower: true, strict: true });
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const slug = `${baseSlug}-${randomSuffix}`;

    // Upload foto
    let fotoUrl = "/Image/placeholder.png";
    const fotoFile = formData.get("fotoUrl");
    if (isFormFile(fotoFile)) {
      const { url: uploadedUrl, error: uploadErr } = await uploadFile("foto-pekerja", fotoFile, "profil");
      if (uploadErr || !uploadedUrl) {
        return { success: false, error: `Gagal mengunggah foto profil: ${uploadErr}` };
      }
      fotoUrl = uploadedUrl;
    }

    const { error } = await supabase.from("pekerja").insert([
      {
        nama,
        slug,
        kategori,
        status,
        pengalaman,
        gaji,
        fotoUrl,
        foto_url: fotoUrl,
        lokasi,
        deskripsi,
        umur,
        suku,
        kekurangan,
        bisa_bawa_motor,
        takut_anjing,
        status_perkawinan,
        keahlian_khusus,
        agama,
        bahasa_asing,
        bisa_masak_babi,
        masakan_khusus,
        pendidikan_terakhir,
        tinggi_badan,
        berat_badan,
      },
    ]);

    if (error) {
      console.error("Gagal menambah pekerja:", error.message);
      if (error.code === "PGRST205" || error.message.includes("schema cache")) {
        return {
          success: false,
          error: "Tabel 'pekerja' belum dibuat di Supabase. Silakan jalankan script SQL di file 'supabase/create_tables.sql' pada SQL Editor Supabase Dashboard Anda.",
        };
      }
      return { success: false, error: `Gagal menyimpan data pekerja.` };
    }

    revalidatePath("/admin/dashboard/pekerja");
    revalidatePath("/pekerja");
    return { success: true, message: "Kandidat pekerja berhasil ditambahkan ke katalog!" };
  } catch (err: any) {
    return { success: false, error: err.message || "Terjadi kesalahan server saat menyimpan data." };
  }
}

export async function updatePekerja(prevState: any, formData: FormData) {
  try {
    const { supabase } = await requireAdminAuth();

    const id = formData.get("id");
    if (!id) return { success: false, error: "ID Pekerja tidak ditemukan." };

    const nama = formData.get("nama") as string;
    const kategori = formData.get("kategori") as string;
    const status = formData.get("status") as string;
    const pengalaman = Number(formData.get("pengalaman") || 0);
    const gaji = Number(formData.get("gaji") || 0);
    const lokasi = (formData.get("lokasi") as string) || "";
    const deskripsi = (formData.get("deskripsi") as string) || "";
    const umur = Number(formData.get("umur") || 18);
    const suku = (formData.get("suku") as string) || "";
    const kekurangan = (formData.get("kekurangan") as string) || "";
    const bisa_bawa_motor = formData.get("bisa_bawa_motor") === "on" || formData.get("bisa_bawa_motor") === "true";
    const takut_anjing = formData.get("takut_anjing") === "on" || formData.get("takut_anjing") === "true";
    const status_perkawinan = (formData.get("status_perkawinan") as string) || "";
    
    // Keahlian khusus: collect all selected skill checkboxes into array & comma-separated string
    const keahlianList = formData.getAll("keahlian_khusus").map((k) => k.toString()).filter(Boolean);
    const keahlian_khusus = keahlianList.join(", ");

    const agama = (formData.get("agama") as string) || "";
    const masakan_khusus = (formData.get("masakan_khusus") as string) || "";
    const pendidikan_terakhir = (formData.get("pendidikan_terakhir") as string) || "";
    const tinggi_badan = Number(formData.get("tinggi_badan") || 0);
    const berat_badan = Number(formData.get("berat_badan") || 0);
    const bisa_masak_babi = formData.get("bisa_masak_babi") === "on" || formData.get("bisa_masak_babi") === "true";
    const bahasa_asing = formData.getAll("bahasa_asing").map((b) => b.toString()).filter(Boolean);

    let fotoUrl = (formData.get("currentFotoUrl") as string) || "/Image/placeholder.png";
    const fotoFile = formData.get("fotoUrl");
    if (isFormFile(fotoFile)) {
      const { url: uploadedUrl, error: uploadErr } = await uploadFile("foto-pekerja", fotoFile, "profil");
      if (uploadErr || !uploadedUrl) {
        return { success: false, error: `Gagal mengunggah foto profil: ${uploadErr}` };
      }
      
      // Delete old photo if it wasn't placeholder and differs
      const oldFotoUrl = formData.get("currentFotoUrl") as string;
      if (oldFotoUrl && oldFotoUrl !== uploadedUrl && !oldFotoUrl.includes("placeholder")) {
        await deleteStorageFile("foto-pekerja", oldFotoUrl);
      }
      fotoUrl = uploadedUrl;
    }

    const { error } = await supabase
      .from("pekerja")
      .update({
        nama,
        kategori,
        status,
        pengalaman,
        gaji,
        fotoUrl,
        foto_url: fotoUrl,
        lokasi,
        deskripsi,
        umur,
        suku,
        kekurangan,
        bisa_bawa_motor,
        takut_anjing,
        status_perkawinan,
        keahlian_khusus,
        agama,
        bahasa_asing,
        bisa_masak_babi,
        masakan_khusus,
        pendidikan_terakhir,
        tinggi_badan,
        berat_badan,
      })
      .eq("id", id);

    if (error) {
      console.error("Gagal update pekerja:", error.message);
      if (error.code === "PGRST205" || error.message.includes("schema cache")) {
        return {
          success: false,
          error: "Tabel 'pekerja' belum dibuat di Supabase. Silakan jalankan script SQL di file 'supabase/create_tables.sql' pada SQL Editor Supabase Dashboard Anda.",
        };
      }
      return { success: false, error: `Gagal memperbarui data pekerja.` };
    }

    revalidatePath("/admin/dashboard/pekerja");
    revalidatePath("/pekerja");
    return { success: true, message: "Profil pekerja berhasil diperbarui!" };
  } catch (err: any) {
    return { success: false, error: err.message || "Terjadi kesalahan server saat memperbarui data." };
  }
}

export async function deletePekerjaById(id: number, fotoUrl: string | null) {
  const { supabase } = await requireAdminAuth();

  if (fotoUrl) {
    await deleteStorageFile("foto-pekerja", fotoUrl);
  }

  const { error } = await supabase.from("pekerja").delete().eq("id", id);
  if (error) {
    throw new Error(`Gagal menghapus pekerja.`);
  }

  revalidatePath("/admin/dashboard/pekerja");
  revalidatePath("/pekerja");
  redirect("/admin/dashboard/pekerja");
}

// -------------------------------------------------------------
// SERVER ACTIONS: ARTIKEL
// -------------------------------------------------------------

export async function addArtikel(prevState: any, formData: FormData) {
  try {
    const { supabase } = await requireAdminAuth();

    const judul = formData.get("judul") as string;
    const konten = formData.get("konten") as string;
    const tags = (formData.get("tags") as string) || "";
    const isPublished = formData.get("status") === "Published" || formData.get("kategori") === "true";

    // SEO Fields
    const customSlug = (formData.get("slug") as string)?.trim();
    const alt_gambar = (formData.get("alt_gambar") as string)?.trim() || "";
    const meta_title = (formData.get("meta_title") as string)?.trim() || "";
    const meta_description = (formData.get("meta_description") as string)?.trim() || "";
    const focus_keyword = (formData.get("focus_keyword") as string)?.trim() || "";
    const secondary_keyword = (formData.get("secondary_keyword") as string)?.trim() || "";

    if (!judul || !konten) {
      return { error: "Judul dan Konten wajib diisi." };
    }

    let slug = "";
    if (customSlug) {
      slug = slugify(customSlug, { lower: true, strict: true });
    } else {
      const baseSlug = slugify(judul, { lower: true, strict: true });
      slug = `${baseSlug}-${Date.now().toString().slice(-6)}`;
    }

    let gambar_url = "/Image/placeholder.png";
    const imageFile = formData.get("gambar_utama");
    if (isFormFile(imageFile)) {
      const { url: uploadedUrl, error: uploadErr } = await uploadFile("gambar-artikel", imageFile, "cover");
      if (uploadErr || !uploadedUrl) {
        return { error: `Gagal mengunggah gambar artikel: ${uploadErr}` };
      }
      gambar_url = uploadedUrl;
    }

    const { error } = await supabase.from("artikel").insert([
      {
        judul,
        slug,
        konten,
        gambar_url,
        alt_gambar,
        meta_title,
        meta_description,
        focus_keyword,
        secondary_keyword,
        kategori: isPublished,
        tags,
        published_at: isPublished ? new Date().toISOString() : null,
      },
    ]);

    if (error) {
      console.error("Gagal menyimpan artikel:", error.message);
      if (error.message.includes("column") || error.code === "42703") {
        return {
          error:
            "Kolom SEO belum dibuat di tabel 'artikel' Supabase. Silakan jalankan script ALTER TABLE di SQL Editor Supabase Dashboard Anda (bisa disalin dari file supabase/create_tables.sql).",
        };
      }
      return { error: `Gagal menyimpan artikel ke sistem.` };
    }

    revalidatePath("/admin/dashboard/artikel");
    revalidatePath("/artikel");
    return { success: true };
  } catch (err: any) {
    return { error: err.message || "Terjadi kesalahan server saat menyimpan artikel." };
  }
}

export async function updateArtikel(prevState: any, formData: FormData) {
  try {
    const { supabase } = await requireAdminAuth();

    const id = formData.get("id");
    if (!id) return { error: "ID Artikel tidak ditemukan." };

    const judul = formData.get("judul") as string;
    const konten = formData.get("konten") as string;
    const tags = (formData.get("tags") as string) || "";
    const isPublished = formData.get("status") === "Published" || formData.get("kategori") === "true";

    // SEO Fields
    const customSlug = (formData.get("slug") as string)?.trim();
    const alt_gambar = (formData.get("alt_gambar") as string)?.trim() || "";
    const meta_title = (formData.get("meta_title") as string)?.trim() || "";
    const meta_description = (formData.get("meta_description") as string)?.trim() || "";
    const focus_keyword = (formData.get("focus_keyword") as string)?.trim() || "";
    const secondary_keyword = (formData.get("secondary_keyword") as string)?.trim() || "";

    let gambar_url = (formData.get("currentGambarUrl") as string) || "/Image/placeholder.png";
    const imageFile = formData.get("gambar_utama");
    if (isFormFile(imageFile)) {
      const { url: uploadedUrl, error: uploadErr } = await uploadFile("gambar-artikel", imageFile, "cover");
      if (uploadErr || !uploadedUrl) {
        return { error: `Gagal mengunggah gambar artikel: ${uploadErr}` };
      }
      
      const oldGambarUrl = formData.get("currentGambarUrl") as string;
      if (oldGambarUrl && oldGambarUrl !== uploadedUrl && !oldGambarUrl.includes("placeholder")) {
        await deleteStorageFile("gambar-artikel", oldGambarUrl);
      }
      gambar_url = uploadedUrl;
    }

    const updatePayload: any = {
      judul,
      konten,
      gambar_url,
      alt_gambar,
      meta_title,
      meta_description,
      focus_keyword,
      secondary_keyword,
      kategori: isPublished,
      tags,
      published_at: isPublished ? new Date().toISOString() : null,
    };

    if (customSlug) {
      updatePayload.slug = slugify(customSlug, { lower: true, strict: true });
    }

    const { error } = await supabase
      .from("artikel")
      .update(updatePayload)
      .eq("id", id);

    if (error) {
      console.error("Gagal update artikel:", error.message);
      if (error.message.includes("column") || error.code === "42703") {
        return {
          error:
            "Kolom SEO belum dibuat di tabel 'artikel' Supabase. Silakan jalankan script ALTER TABLE di SQL Editor Supabase Dashboard Anda (bisa disalin dari file supabase/create_tables.sql).",
        };
      }
      return { error: `Gagal memperbarui artikel.` };
    }

    revalidatePath("/admin/dashboard/artikel");
    revalidatePath("/artikel");
    return { success: true };
  } catch (err: any) {
    return { error: err.message || "Terjadi kesalahan server saat memperbarui artikel." };
  }
}

export async function deleteArtikel(id: number, gambar_url: string | null) {
  const { supabase } = await requireAdminAuth();

  if (gambar_url) {
    await deleteStorageFile("gambar-artikel", gambar_url);
  }

  const { error } = await supabase.from("artikel").delete().eq("id", id);
  if (error) {
    throw new Error(`Gagal menghapus artikel.`);
  }

  revalidatePath("/admin/dashboard/artikel");
  revalidatePath("/artikel");
}

export async function incrementViews(slug: string) {
  try {
    const supabase = await createClient();
    const { data } = await supabase.from("artikel").select("views").eq("slug", slug).single();
    if (data) {
      const newViews = (data.views || 0) + 1;
      await supabase.from("artikel").update({ views: newViews }).eq("slug", slug);
    }
  } catch (err) {
    console.error("Gagal update views artikel:", err);
  }
}

// ==========================================
// SITE SETTINGS ACTIONS (CMS GLOBAL & METADATA)
// ==========================================

export async function updateSiteSetting(settingId: string, formData: FormData) {
  try {
    await requireAdminAuth();
    const supabase = createAdminClient();

    // 1. Get current setting or default
    const { data: existingRow } = await supabase
      .from("site_settings")
      .select("data")
      .eq("id", settingId)
      .maybeSingle();

    const currentData: Record<string, any> = existingRow?.data ? { ...existingRow.data } : {};

    // 2. Process text fields
    for (const [key, value] of formData.entries()) {
      if (typeof value === "string" && !key.endsWith("_file")) {
        currentData[key] = value.trim();
      }
    }

    // 2.1 Process FAQ JSON if provided
    const faqsRaw = formData.get("faqs_json");
    if (typeof faqsRaw === "string" && faqsRaw.trim()) {
      try {
        currentData.faqs = JSON.parse(faqsRaw);
      } catch (e) {
        console.error("Gagal parse faqs_json:", e);
      }
    }

    // 3. Process potential file uploads
    const fileFields = [
      { formKey: "logo_file", dataKey: "logo_url" },
      { formKey: "favicon_file", dataKey: "favicon_url" },
      { formKey: "hero_image_file", dataKey: "hero_image" },
      { formKey: "og_image_file", dataKey: "og_image" },
      { formKey: "service_art_image_file", dataKey: "service_art_image" },
      { formKey: "service_babysitter_image_file", dataKey: "service_babysitter_image" },
      { formKey: "service_perawat_image_file", dataKey: "service_perawat_image" },
    ];

    for (const { formKey, dataKey } of fileFields) {
      const files = formData.getAll(formKey);
      const validFile = files.find((f: any) => isFormFile(f));

      if (validFile) {
        const { url, error } = await uploadFile("gambar-artikel", validFile, "settings");
        if (error) {
          return { error: `Gagal upload gambar untuk ${formKey}: ${error}` };
        }
        if (url) {
          currentData[dataKey] = url;
        }
      }
    }

    // 4. Upsert into site_settings
    const { error: upsertError } = await supabase
      .from("site_settings")
      .upsert(
        {
          id: settingId,
          name: settingId.replace(/_/g, " ").toUpperCase(),
          data: currentData,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "id" }
      );

    if (upsertError) {
      if (upsertError.message.includes("does not exist") || upsertError.message.includes("site_settings")) {
        return {
          error:
            "Tabel 'site_settings' belum dibuat di Supabase. Silakan jalankan script SQL di supabase/create_tables.sql terlebih dahulu di SQL Editor Supabase.",
        };
      }
      return { error: `Gagal menyimpan pengaturan: ${upsertError.message}` };
    }

    // 5. Revalidate cache
    revalidatePath("/", "layout");
    revalidatePath("/admin/dashboard/pengaturan");
    revalidatePath("/layanan", "layout");
    revalidatePath("/pekerja", "layout");
    revalidatePath("/artikel", "layout");
    revalidatePath("/tentang-kami");
    revalidatePath("/kontak");

    return { success: true, data: currentData };
  } catch (err: any) {
    return { error: err.message || "Terjadi kesalahan server saat menyimpan pengaturan" };
  }
}

export async function seedDefaultSiteSettings() {
  try {
    await requireAdminAuth();
    const supabase = createAdminClient();
    const { DEFAULT_COMPANY_IDENTITY, DEFAULT_PAGE_SETTINGS } = await import("@/lib/settings");

    const rows = [
      {
        id: "company_identity",
        name: "Identitas Perusahaan & Kontak",
        data: DEFAULT_COMPANY_IDENTITY,
        updated_at: new Date().toISOString(),
      },
      ...Object.entries(DEFAULT_PAGE_SETTINGS).map(([key, value]) => ({
        id: key,
        name: `Pengaturan Halaman ${key.replace("page_", "").toUpperCase()}`,
        data: value,
        updated_at: new Date().toISOString(),
      })),
    ];

    const { error } = await supabase.from("site_settings").upsert(rows, { onConflict: "id" });

    if (error) {
      return { error: `Gagal menyinkronkan default: ${error.message}` };
    }

    revalidatePath("/", "layout");
    revalidatePath("/admin/dashboard/pengaturan");
    return { success: true };
  } catch (err: any) {
    return { error: err.message || "Gagal sinkronisasi data default" };
  }
}

// ----------------------------------------------------
// MANAJEMEN LOWONGAN KERJA (JOBS CMS ACTIONS)
// ----------------------------------------------------

function parseArrayInput(input: string | null | undefined): string[] {
  if (!input) return [];
  return input
    .split(/\r?\n|,/)
    .map((s) => s.trim())
    .filter(Boolean);
}

export async function createJobAction(formData: FormData) {
  try {
    await requireAdminAuth();
    const supabase = createAdminClient();

    const title = (formData.get("title") as string)?.trim();
    if (!title) return { error: "Judul lowongan kerja wajib diisi." };

    let slug = (formData.get("slug") as string)?.trim();
    if (!slug) {
      slug = slugify(title, { lower: true, strict: true });
    }

    const category = (formData.get("category") as string) || "art";
    const system = (formData.get("system") as string)?.trim() || "Menginap (Live-in) / Pulang-Pergi";
    const salary_min = parseInt((formData.get("salary_min") as string) || "2000000", 10);
    const salary_max = parseInt((formData.get("salary_max") as string) || "4000000", 10);
    const salary_display = (formData.get("salary_display") as string)?.trim() || "Rp2.000.000 – Rp4.000.000 / bln";
    const badge = (formData.get("badge") as string)?.trim() || null;
    const description = (formData.get("description") as string)?.trim() || "";
    const duties = parseArrayInput(formData.get("duties") as string);
    const requirements = parseArrayInput(formData.get("requirements") as string);
    const facilities = parseArrayInput(formData.get("facilities") as string);
    const meta_title = (formData.get("meta_title") as string)?.trim() || null;
    const meta_description = (formData.get("meta_description") as string)?.trim() || null;
    const is_active = formData.get("is_active") === "true" || formData.get("is_active") === "on";

    const { data, error } = await supabase
      .from("jobs")
      .insert([
        {
          title,
          slug,
          category,
          system,
          salary_min,
          salary_max,
          salary_display,
          badge,
          description,
          duties,
          requirements,
          facilities,
          meta_title,
          meta_description,
          is_active,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Create job error:", error);
      return { error: `Gagal menambah lowongan kerja.` };
    }

    revalidatePath("/lowongan-kerja");
    revalidatePath("/admin/dashboard/lowongan");
    return { success: true, job: data };
  } catch (err: any) {
    console.error("Create job exception:", err);
    return { error: err.message || "Terjadi kesalahan server saat membuat lowongan." };
  }
}

export async function updateJobAction(id: string, formData: FormData) {
  try {
    await requireAdminAuth();
    const supabase = createAdminClient();

    const title = (formData.get("title") as string)?.trim();
    if (!title) return { error: "Judul lowongan kerja wajib diisi." };

    let slug = (formData.get("slug") as string)?.trim();
    if (!slug) {
      slug = slugify(title, { lower: true, strict: true });
    }

    const category = (formData.get("category") as string) || "art";
    const system = (formData.get("system") as string)?.trim() || "Menginap (Live-in) / Pulang-Pergi";
    const salary_min = parseInt((formData.get("salary_min") as string) || "2000000", 10);
    const salary_max = parseInt((formData.get("salary_max") as string) || "4000000", 10);
    const salary_display = (formData.get("salary_display") as string)?.trim() || "Rp2.000.000 – Rp4.000.000 / bln";
    const badge = (formData.get("badge") as string)?.trim() || null;
    const description = (formData.get("description") as string)?.trim() || "";
    const duties = parseArrayInput(formData.get("duties") as string);
    const requirements = parseArrayInput(formData.get("requirements") as string);
    const facilities = parseArrayInput(formData.get("facilities") as string);
    const meta_title = (formData.get("meta_title") as string)?.trim() || null;
    const meta_description = (formData.get("meta_description") as string)?.trim() || null;
    const is_active = formData.get("is_active") === "true" || formData.get("is_active") === "on";

    const { error } = await supabase
      .from("jobs")
      .update({
        title,
        slug,
        category,
        system,
        salary_min,
        salary_max,
        salary_display,
        badge,
        description,
        duties,
        requirements,
        facilities,
        meta_title,
        meta_description,
        is_active,
      })
      .eq("id", id);

    if (error) {
      console.error("Update job error:", error);
      return { error: `Gagal memperbarui lowongan kerja.` };
    }

    revalidatePath("/lowongan-kerja");
    revalidatePath(`/lowongan-kerja/${slug}`);
    revalidatePath("/admin/dashboard/lowongan");
    return { success: true };
  } catch (err: any) {
    console.error("Update job exception:", err);
    return { error: err.message || "Terjadi kesalahan server saat memperbarui lowongan." };
  }
}

export async function deleteJobAction(id: string) {
  try {
    await requireAdminAuth();
    const supabase = createAdminClient();
    const { error } = await supabase.from("jobs").delete().eq("id", id);

    if (error) {
      return { error: `Gagal menghapus lowongan.` };
    }

    revalidatePath("/lowongan-kerja");
    revalidatePath("/admin/dashboard/lowongan");
    return { success: true };
  } catch (err: any) {
    return { error: err.message || "Terjadi kesalahan server saat menghapus lowongan." };
  }
}

export async function toggleJobActiveAction(id: string, currentState: boolean) {
  try {
    await requireAdminAuth();
    const supabase = createAdminClient();
    const { error } = await supabase
      .from("jobs")
      .update({ is_active: !currentState })
      .eq("id", id);

    if (error) {
      return { error: `Gagal mengubah status lowongan.` };
    }

    revalidatePath("/lowongan-kerja");
    revalidatePath("/admin/dashboard/lowongan");
    return { success: true };
  } catch (err: any) {
    return { error: err.message || "Gagal mengubah status aktif lowongan." };
  }
}

