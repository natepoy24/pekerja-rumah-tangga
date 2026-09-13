import { createClient } from "@/lib/supabase/server";

export interface Job {
  id?: string;
  title: string;
  slug: string;
  category: "art" | "baby-sitter" | "lansia";
  system: string;
  salary_min: number;
  salary_max: number;
  salary_display: string;
  badge?: string;
  description: string;
  duties: string[];
  requirements: string[];
  facilities: string[];
  meta_title?: string;
  meta_description?: string;
  is_active?: boolean;
  created_at?: string;
}

export const DEFAULT_JOBS: Job[] = [
  {
    id: "default-1",
    title: "Asisten Rumah Tangga (ART) Menginap & Pulang-Pergi",
    slug: "asisten-rumah-tangga",
    category: "art",
    system: "Menginap (Live-in) / Pulang-Pergi",
    salary_min: 2000000,
    salary_max: 4000000,
    salary_display: "Rp2.000.000 – Rp4.000.000 / bln",
    badge: "Paling Banyak Dibutuhkan",
    description:
      "Lowongan Asisten Rumah Tangga resmi penempatan Jabodetabek. Tugas meliputi menjaga kebersihan rumah, menyapu, mengepel, mencuci, menyetrika, serta menyajikan masakan harian keluarga. Disediakan kamar menginap pribadi, makan 3x sehari gratis, serta perlindungan kontrak kerja berpayung hukum Kemnaker.",
    duties: [
      "Menyapu, mengepel, dan merapikan seluruh area ruangan rumah",
      "Mencuci pakaian harian, menyetrika rapi, dan menata di lemari",
      "Memasak hidangan harian keluarga yang bersih dan higienis",
      "Menjaga kerapian peralatan dapur dan kebersihan area makan",
    ],
    requirements: [
      "Wanita usia 18 - 45 tahun",
      "e-KTP Asli & Fotokopi Kartu Keluarga (KK) yang masih berlaku",
      "Surat izin dari suami / orang tua / keluarga",
      "Sehat jasmani dan rohani (bebas penyakit menular)",
      "Niat bekerja sungguh-sungguh, jujur, dan sopan",
    ],
    facilities: [
      "Gaji utuh tanpa potongan biaya agen tersembunyi",
      "Fasilitas asrama menginap layak & makan 3x sehari gratis",
      "Pemeriksaan kesehatan medis (MCU) disediakan gratis",
      "Kontrak kerja resmi berpayung hukum Kemenaker & Disnaker",
      "Pendampingan mediasi dan perlindungan keselamatan kerja",
    ],
    meta_title: "Lowongan Kerja Asisten Rumah Tangga (ART) Resmi Gaji Utuh | PT Jasa Mandiri",
    meta_description:
      "Lowongan kerja ART resmi penempatan Jabodetabek. Gaji utuh Rp2-4 juta/bulan, kamar pribadi, makan gratis 3x, tanpa potongan calo. Berizin Kemnaker.",
    is_active: true,
  },
  {
    id: "default-2",
    title: "Baby Sitter & Pengasuh Balita",
    slug: "baby-sitter",
    category: "baby-sitter",
    system: "Menginap (Live-in) di Rumah Majikan",
    salary_min: 3000000,
    salary_max: 5500000,
    salary_display: "Rp3.000.000 – Rp5.500.000 / bln",
    badge: "Tersedia Pelatihan Singkat",
    description:
      "Lowongan kerja Baby Sitter dan Suster Pengasuh Anak resmi. Bertugas merawat bayi baru lahir (newborn) hingga anak balita, menyiapkan botol susu/MPASI, mendampingi belajar dan bermain, serta memantau keselamatan anak. Mendapatkan gaji utuh, THR resmi, dan jaminan tempat tinggal di rumah majikan.",
    duties: [
      "Memandikan bayi/anak, mengganti popok, dan menjaga kebersihan anak",
      "Menyiapkan botol susu steril dan makanan pendamping ASI (MPASI)",
      "Mendampingi aktivitas bermain edukatif dan stimulasi motorik anak",
      "Mencuci pakaian bayi dan merapikan mainan serta kamar anak",
    ],
    requirements: [
      "Wanita usia 19 - 40 tahun",
      "e-KTP Asli, KK, dan Surat Izin Keluarga resmi",
      "Menyukai anak-anak, sabar, teliti, dan penuh kasih sayang",
      "Pengalaman baby sitter atau bersedia mengikuti pembekalan",
      "Kondisi fisik sehat dan terbebas dari infeksi medis",
    ],
    facilities: [
      "Gaji bersih diterima penuh setiap bulan tepat waktu",
      "Tunjangan Hari Raya (THR) & jatah libur berkala",
      "Pelatihan gratis penanganan bayi newborn & P3K anak",
      "Asrama transit nyaman selama proses interview majikan",
      "Jaminan perlindungan hukum dan jembatan komunikasi tim mediasi",
    ],
    meta_title: "Lowongan Kerja Baby Sitter & Pengasuh Anak Resmi | PT Jasa Mandiri",
    meta_description:
      "Lowongan kerja suster baby sitter dan nanny resmi. Gaji Rp3-5,5 juta/bulan, fasilitas menginap, bonus & THR, berizin Disnaker & Kemnaker.",
    is_active: true,
  },
  {
    id: "default-3",
    title: "Perawat Lansia & Caregiver Orang Tua",
    slug: "perawat-lansia",
    category: "lansia",
    system: "Menginap (Kamar Pribadi / Satu Ruangan)",
    salary_min: 3000000,
    salary_max: 6500000,
    salary_display: "Rp3.000.000 – Rp6.500.000 / bln",
    badge: "Gaji Menyesuaikan Kondisi Pasien",
    description:
      "Lowongan kerja Perawat Lansia & Caregiver medis/non-medis. Bertugas mendampingi lansia dalam aktivitas harian (mandi, makan, minum obat teratur), memantau kondisi fisik/vital sign, serta hadir sebagai teman bicara yang memberikan ketenangan emosional bagi orang tua.",
    duties: [
      "Mendampingi lansia mandi, berpakaian, dan berpindah (mobilitas)",
      "Menyiapkan makanan sehat khusus lansia dan menyuapi dengan sabar",
      "Mengingatkan & memberikan obat tepat waktu sesuai resep dokter",
      "Mencatat jurnal harian kesehatan (tensi, suhu, gula darah, obat)",
    ],
    requirements: [
      "Wanita / Pria usia 20 - 45 tahun",
      "e-KTP Asli, KK, dan Surat Keterangan Sehat dari Faskes",
      "Sabar, berempati tinggi, telaten, dan tidak mudah emosi",
      "Lulusan keperawatan/kebidanan atau pengalaman perawat lansia",
      "Siap menginap di rumah majikan Jabodetabek",
    ],
    facilities: [
      "Gaji tinggi menyesuaikan tingkat perawatan pasien (Rp3M - Rp6,5M)",
      "Makan 3x sehari gratis & kamar pribadi menginap",
      "Insentif lembur libur (uang infal) jika tidak mengambil libur",
      "Pembekalan fisioterapi ringan dan penanganan medis dasar",
      "Mediasi penuh dari lembaga resmi PT Jasa Mandiri",
    ],
    meta_title: "Lowongan Kerja Perawat Lansia & Caregiver Resmi | PT Jasa Mandiri",
    meta_description:
      "Lowongan perawat lansia dan suster jompo resmi. Gaji Rp3-6,5 juta/bulan, kamar pribadi, perlindungan hukum Kemnaker.",
    is_active: true,
  },
];

export async function getJobs(): Promise<Job[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: true });

    if (error || !data || data.length === 0) {
      return DEFAULT_JOBS;
    }

    return data as Job[];
  } catch (err) {
    console.error("Error fetching jobs from Supabase:", err);
    return DEFAULT_JOBS;
  }
}

export async function getJobBySlug(slug: string): Promise<Job | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .eq("slug", slug)
      .eq("is_active", true)
      .single();

    if (error || !data) {
      const fallback = DEFAULT_JOBS.find((j) => j.slug === slug);
      return fallback || null;
    }

    return data as Job;
  } catch (err) {
    console.error(`Error fetching job by slug ${slug}:`, err);
    const fallback = DEFAULT_JOBS.find((j) => j.slug === slug);
    return fallback || null;
  }
}
