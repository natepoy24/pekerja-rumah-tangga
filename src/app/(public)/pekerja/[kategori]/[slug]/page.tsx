import type { Metadata } from "next";
import { createPublicClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  MapPin,
  Phone,
  CheckCircle2,
  ArrowLeft,
  Languages,
  Utensils,
  Check,
  Bike,
  Dog,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import JsonLd from "@/components/seo/JsonLd";
import { generateProfileSchema, generateBreadcrumbSchema } from "@/lib/seo/schemaGenerator";
import { SITE_CONFIG } from "@/lib/siteConfig";

import PekerjaProfilePhoto from "@/components/PekerjaApp/PekerjaProfilePhoto";

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ kategori: string; slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { kategori, slug } = await params;
  const supabase = createPublicClient();
  const { data: pekerja } = await supabase.from("pekerja").select("*").eq("slug", slug).single();

  if (!pekerja) {
    return {
      title: `Profil Pekerja Tidak Ditemukan | ${SITE_CONFIG.name}`,
    };
  }

  const title = `Profil ${pekerja.nama} - ${pekerja.kategori} Berpengalaman ${pekerja.pengalaman || 0} Tahun | ${SITE_CONFIG.name}`;
  const description = pekerja.deskripsi || `Sewa kandidat ${pekerja.nama}, ${pekerja.kategori} terverifikasi resmi Disnaker asal ${pekerja.lokasi || "Jawa"}. Hasil cek medis & latar belakang aman.`;
  const ogImage = pekerja.fotoUrl || pekerja.foto_url || SITE_CONFIG.logo;
  const canonicalUrl = `${SITE_CONFIG.url}/pekerja/${kategori}/${pekerja.slug}`;

  return {
    title,
    description,
    keywords: [
      pekerja.nama,
      pekerja.kategori,
      `jasa ${pekerja.kategori}`,
      `penyalur ${pekerja.kategori} resmi`,
      pekerja.lokasi ? `pekerja asal ${pekerja.lokasi}` : "pekerja terverifikasi",
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: SITE_CONFIG.name,
      locale: "id_ID",
      type: "profile",
      images: [{ url: ogImage, alt: title }],
    },
  };
}

export default async function PekerjaDetailPage(props: PageProps) {
  const { kategori, slug } = await props.params;
  const supabase = createPublicClient();

  const { data: pekerja, error } = await supabase
    .from("pekerja")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !pekerja) {
    notFound();
  }

  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || SITE_CONFIG.whatsappPrimary;
  const displayFoto = pekerja.fotoUrl || pekerja.foto_url || "/Image/placeholder.png";

  const profileSchema = generateProfileSchema({
    nama: pekerja.nama,
    kategori: pekerja.kategori,
    slug: pekerja.slug,
    pengalaman: pekerja.pengalaman,
    lokasi: pekerja.lokasi,
    fotoUrl: displayFoto,
    gaji: pekerja.gaji,
    deskripsi: pekerja.deskripsi,
    status: pekerja.status,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Beranda", url: "/" },
    { name: "Pekerja", url: "/pekerja" },
    { name: pekerja.kategori, url: `/pekerja?kategori=${encodeURIComponent(pekerja.kategori)}` },
    { name: pekerja.nama, url: `/pekerja/${kategori}/${pekerja.slug}` },
  ]);

  const waMessage = encodeURIComponent(
    `Halo Admin ${SITE_CONFIG.name}, saya berminat untuk konsultasi / wawancara kandidat:\n\n` +
      `- Nama: ${pekerja.nama}\n` +
      `- Kategori: ${pekerja.kategori}\n` +
      `- ID Pekerja: #${pekerja.id}\n\n` +
      `Mohon info ketersediaan dan proses selanjutnya.`
  );

  const skillsList = pekerja.keahlian_khusus
    ? pekerja.keahlian_khusus.split(",").map((s: string) => s.trim()).filter(Boolean)
    : [];

  const bahasaList = Array.isArray(pekerja.bahasa_asing)
    ? pekerja.bahasa_asing.filter(Boolean)
    : typeof pekerja.bahasa_asing === "string"
    ? (pekerja.bahasa_asing as string).split(",").map((b) => b.trim()).filter(Boolean)
    : [];

  return (
    <main className="min-h-screen bg-[#FAFAF7] font-sans pb-20 pt-28">
      <JsonLd schema={[profileSchema, breadcrumbSchema]} />

      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb Back */}
        <Link
          href="/pekerja"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#0B4F42] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Katalog Pekerja</span>
        </Link>

        {/* Profile Card Main */}
        <div className="bg-white rounded-3xl border border-[#D5E8D0] shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 md:p-10">
          {/* Left Column: Foto & Status */}
          <div className="lg:col-span-5 flex flex-col items-center space-y-6">
            <PekerjaProfilePhoto
              src={displayFoto}
              nama={pekerja.nama}
              kategori={pekerja.kategori}
            />

            {/* Quick Verification Chips */}
            <div className="w-full bg-[#EBF4E7] p-4 rounded-2xl border border-[#D5E8D0] space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#3E7B28] block mb-1">
                Status Verifikasi Legalitas
              </span>
              <div className="flex flex-wrap gap-2 text-xs text-[#3E7B28] font-medium">
                <span className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-lg border border-[#D5E8D0]">
                  <CheckCircle2 className="w-4 h-4 text-[#3E7B28]" />
                  KTP & Identitas Valid
                </span>
                <span className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-lg border border-[#D5E8D0]">
                  <CheckCircle2 className="w-4 h-4 text-[#3E7B28]" />
                  Cek Bebas Catatan Kriminal
                </span>
                <span className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-lg border border-[#D5E8D0]">
                  <CheckCircle2 className="w-4 h-4 text-[#3E7B28]" />
                  Hasil Tes Kesehatan Bebas Penyakit
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Information */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <div className="border-b border-outline-variant/20 pb-6">
                <div className="flex items-center justify-between gap-4 mb-2">
                  <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#14201D]">
                    {pekerja.nama}
                  </h1>
                  <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-[#EBF4E7] text-[#3E7B28] border border-[#D5E8D0]">
                    {pekerja.status}
                  </span>
                </div>

                <p className="text-sm font-semibold text-[#0B4F42] flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#0B4F42]" />
                  <span>Domisili Pekerja (Kota Asal): {pekerja.lokasi || "-"}</span>
                </p>
              </div>

              {/* Grid Specifications */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="bg-surface-container-low p-3.5 rounded-xl border border-outline-variant/30">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant/70 block">
                    Pengalaman
                  </span>
                  <span className="font-serif text-lg font-bold text-[#14201D]">
                    {pekerja.pengalaman} Tahun
                  </span>
                </div>

                <div className="bg-surface-container-low p-3.5 rounded-xl border border-outline-variant/30">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant/70 block">
                    Usia
                  </span>
                  <span className="font-serif text-lg font-bold text-[#14201D]">
                    {pekerja.umur || "-"} Tahun
                  </span>
                </div>

                <div className="bg-surface-container-low p-3.5 rounded-xl border border-outline-variant/30">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant/70 block">
                    Agama
                  </span>
                  <span className="font-serif text-lg font-bold text-[#14201D]">
                    {pekerja.agama || "Islam"}
                  </span>
                </div>

                <div className="bg-surface-container-low p-3.5 rounded-xl border border-outline-variant/30">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant/70 block">
                    Suku
                  </span>
                  <span className="font-serif text-lg font-bold text-[#14201D]">
                    {pekerja.suku || "-"}
                  </span>
                </div>

                <div className="bg-surface-container-low p-3.5 rounded-xl border border-outline-variant/30">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant/70 block">
                    Status Nikah
                  </span>
                  <span className="font-serif text-lg font-bold text-[#14201D]">
                    {pekerja.status_perkawinan || "Lajang"}
                  </span>
                </div>

                <div className="bg-surface-container-low p-3.5 rounded-xl border border-outline-variant/30">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant/70 block">
                    Pendidikan
                  </span>
                  <span className="font-serif text-lg font-bold text-[#14201D]">
                    {pekerja.pendidikan_terakhir || "SMP"}
                  </span>
                </div>
              </div>

              {/* All Keahlian & Spesialisasi */}
              {skillsList.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-serif text-lg font-bold text-[#14201D] flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#0B4F42]" />
                    <span>Daftar Keahlian & Spesialisasi Pekerja</span>
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skillsList.map((skill: string) => (
                      <span
                        key={skill}
                        className="px-3.5 py-1.5 bg-[#EBF4E7] text-[#3E7B28] text-xs font-semibold rounded-lg border border-[#D5E8D0] flex items-center gap-1.5"
                      >
                        <Check className="w-3.5 h-3.5 text-[#3E7B28]" />
                        <span>{skill}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Specific Qualification Checkboxes Status */}
              <div className="space-y-2 pt-2">
                <h3 className="font-serif text-base font-bold text-[#14201D]">
                  Kualifikasi Tambahan:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  {/* Motor */}
                  <div className={`p-3 rounded-xl border flex items-center gap-2 font-semibold ${
                    pekerja.bisa_bawa_motor
                      ? "bg-[#EBF4E7] border-[#D5E8D0] text-[#3E7B28]"
                      : "bg-slate-50 border-slate-200 text-slate-600"
                  }`}>
                    <Bike className="w-4 h-4 shrink-0" />
                    <span>{pekerja.bisa_bawa_motor ? "Bisa mengendarai motor" : "Tidak bisa mengendarai motor"}</span>
                  </div>

                  {/* Takut Anjing */}
                  <div className={`p-3 rounded-xl border flex items-center gap-2 font-semibold ${
                    pekerja.takut_anjing
                      ? "bg-amber-50 border-amber-200 text-amber-900"
                      : "bg-[#EBF4E7] border-[#D5E8D0] text-[#3E7B28]"
                  }`}>
                    <Dog className="w-4 h-4 shrink-0" />
                    <span>{pekerja.takut_anjing ? "Takut anjing" : "Tidak takut anjing"}</span>
                  </div>

                  {/* Masak Babi */}
                  <div className={`p-3 rounded-xl border flex items-center gap-2 font-semibold ${
                    pekerja.bisa_masak_babi
                      ? "bg-[#EBF4E7] border-[#D5E8D0] text-[#3E7B28]"
                      : "bg-slate-50 border-slate-200 text-slate-600"
                  }`}>
                    <Utensils className="w-4 h-4 shrink-0" />
                    <span>{pekerja.bisa_masak_babi ? "Bisa memasak babi" : "Tidak bisa memasak babi"}</span>
                  </div>
                </div>
              </div>

              {/* Kemampuan Bahasa Asing (Conditional) */}
              {bahasaList.length > 0 && (
                <div className="space-y-2 pt-2">
                  <h3 className="font-serif text-base font-bold text-[#14201D] flex items-center gap-2">
                    <Languages className="w-4 h-4 text-[#0B4F42]" />
                    <span>Kemampuan Bahasa Asing</span>
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {bahasaList.map((lang: string) => (
                      <span
                        key={lang}
                        className="px-3 py-1 bg-white text-[#0B4F42] text-xs font-semibold rounded-lg border border-[#D5E8D0]"
                      >
                        🗣️ {lang}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Masakan Khusus (Conditional) */}
              {pekerja.masakan_khusus && (
                <div className="space-y-2 pt-2">
                  <h3 className="font-serif text-base font-bold text-[#14201D] flex items-center gap-2">
                    <Utensils className="w-4 h-4 text-[#0B4F42]" />
                    <span>Spesialisasi Masakan Khusus</span>
                  </h3>
                  <div className="bg-[#EBF4E7] p-3.5 rounded-xl border border-[#D5E8D0] text-xs font-semibold text-[#0B4F42]">
                    🍳 {pekerja.masakan_khusus}
                  </div>
                </div>
              )}

              {/* Description */}
              {pekerja.deskripsi && (
                <div className="space-y-2 pt-2">
                  <h3 className="font-serif text-lg font-bold text-[#14201D]">
                    Catatan Deskripsi Profil
                  </h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed bg-surface-container-low p-4 rounded-xl border border-outline-variant/20">
                    {pekerja.deskripsi}
                  </p>
                </div>
              )}
            </div>

            {/* Action CTA */}
            <div className="pt-6 border-t border-outline-variant/20 flex flex-col sm:flex-row items-center justify-between gap-4 bg-surface-container-low/50 p-6 rounded-2xl border border-outline-variant/20">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant/70 block">
                  Ekspektasi Gaji Bulanan
                </span>
                <span className="font-sans text-2xl font-bold text-[#0B4F42]">
                  {pekerja.gaji ? `Rp ${Number(pekerja.gaji).toLocaleString("id-ID")}` : "Sesuai Kesepakatan"}
                </span>
              </div>

              <Button
                href={`https://wa.me/${waNumber}?text=${waMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                variant="compassionate"
                size="lg"
                className="w-full sm:w-auto gap-2 text-base px-8 py-3.5 shadow-md"
              >
                <Phone className="w-5 h-5" />
                <span>Sewa / Wawancara Kandidat via WA</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
