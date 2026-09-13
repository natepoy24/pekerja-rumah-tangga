-- Migration: Create 'jobs' table with RLS Policies & Seed Data for Lowongan Kerja
-- Execute this script in the Supabase SQL Editor

CREATE TABLE IF NOT EXISTS public.jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('art', 'baby-sitter', 'lansia')),
    system TEXT NOT NULL,
    salary_min BIGINT NOT NULL DEFAULT 2000000,
    salary_max BIGINT NOT NULL DEFAULT 4000000,
    salary_display TEXT NOT NULL,
    badge TEXT,
    description TEXT NOT NULL,
    duties TEXT[] DEFAULT '{}',
    requirements TEXT[] DEFAULT '{}',
    facilities TEXT[] DEFAULT '{}',
    meta_title TEXT,
    meta_description TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_jobs_slug ON public.jobs (slug);
CREATE INDEX IF NOT EXISTS idx_jobs_category ON public.jobs (category);
CREATE INDEX IF NOT EXISTS idx_jobs_is_active ON public.jobs (is_active);

-- Enable Row Level Security
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Allow public read active jobs" ON public.jobs;
DROP POLICY IF EXISTS "Allow authenticated full access to jobs" ON public.jobs;

-- Public Policy: Read active jobs only
CREATE POLICY "Allow public read active jobs"
    ON public.jobs
    FOR SELECT
    USING (is_active = true);

-- Authenticated Policy: Full access for logged-in admin users
CREATE POLICY "Allow authenticated full access to jobs"
    ON public.jobs
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Seed Starter Data (3 Positions)
INSERT INTO public.jobs (
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
    is_active
) VALUES 
(
    'Asisten Rumah Tangga (ART) Menginap & Pulang-Pergi',
    'asisten-rumah-tangga',
    'art',
    'Menginap (Live-in) / Pulang-Pergi',
    2000000,
    4000000,
    'Rp2.000.000 – Rp4.000.000 / bln',
    'Paling Banyak Dibutuhkan',
    'Lowongan Asisten Rumah Tangga resmi penempatan Jabodetabek. Tugas meliputi menjaga kebersihan rumah, menyapu, mengepel, mencuci, menyetrika, serta menyajikan masakan harian keluarga. Disediakan kamar menginap pribadi, makan 3x sehari gratis, serta perlindungan kontrak kerja berpayung hukum Kemnaker.',
    ARRAY[
        'Menyapu, mengepel, dan merapikan seluruh area ruangan rumah',
        'Mencuci pakaian harian, menyetrika rapi, dan menata di lemari',
        'Memasak hidangan harian keluarga yang bersih dan higienis',
        'Menjaga kerapian peralatan dapur dan kebersihan area makan'
    ],
    ARRAY[
        'Wanita usia 18 - 45 tahun',
        'e-KTP Asli & Fotokopi Kartu Keluarga (KK) yang masih berlaku',
        'Surat izin dari suami / orang tua / keluarga',
        'Sehat jasmani dan rohani (bebas penyakit menular)',
        'Niat bekerja sungguh-sungguh, jujur, dan sopan'
    ],
    ARRAY[
        'Gaji utuh tanpa potongan biaya agen tersembunyi',
        'Fasilitas asrama menginap layak & makan 3x sehari gratis',
        'Pemeriksaan kesehatan medis (MCU) disediakan gratis',
        'Kontrak kerja resmi berpayung hukum Kemenaker & Disnaker',
        'Pendampingan mediasi dan perlindungan keselamatan kerja'
    ],
    'Lowongan Kerja Asisten Rumah Tangga (ART) Resmi Gaji Utuh | PT Jasa Mandiri',
    'Lowongan kerja ART resmi penempatan Jabodetabek. Gaji utuh Rp2-4 juta/bulan, kamar pribadi, makan gratis 3x, tanpa potongan calo. Berizin Kemnaker.',
    true
),
(
    'Baby Sitter & Pengasuh Balita',
    'baby-sitter',
    'baby-sitter',
    'Menginap (Live-in) di Rumah Majikan',
    3000000,
    5500000,
    'Rp3.000.000 – Rp5.500.000 / bln',
    'Tersedia Pelatihan Singkat',
    'Lowongan kerja Baby Sitter dan Suster Pengasuh Anak resmi. Bertugas merawat bayi baru lahir (newborn) hingga anak balita, menyiapkan botol susu/MPASI, mendampingi belajar dan bermain, serta memantau keselamatan anak. Mendapatkan gaji utuh, THR resmi, dan jaminan tempat tinggal di rumah majikan.',
    ARRAY[
        'Memandikan bayi/anak, mengganti popok, dan menjaga kebersihan anak',
        'Menyiapkan botol susu steril dan makanan pendamping ASI (MPASI)',
        'Mendampingi aktivitas bermain edukatif dan stimulasi motorik anak',
        'Mencuci pakaian bayi dan merapikan mainan serta kamar anak'
    ],
    ARRAY[
        'Wanita usia 19 - 40 tahun',
        'e-KTP Asli, KK, dan Surat Izin Keluarga resmi',
        'Menyukai anak-anak, sabar, teliti, dan penuh kasih sayang',
        'Pengalaman baby sitter atau bersedia mengikuti pembekalan',
        'Kondisi fisik sehat dan terbebas dari infeksi medis'
    ],
    ARRAY[
        'Gaji bersih diterima penuh setiap bulan tepat waktu',
        'Tunjangan Hari Raya (THR) & jatah libur berkala',
        'Pelatihan gratis penanganan bayi newborn & P3K anak',
        'Asrama transit nyaman selama proses interview majikan',
        'Jaminan perlindungan hukum dan jembatan komunikasi tim mediasi'
    ],
    'Lowongan Kerja Baby Sitter & Pengasuh Anak Resmi | PT Jasa Mandiri',
    'Lowongan kerja suster baby sitter dan nanny resmi. Gaji Rp3-5,5 juta/bulan, fasilitas menginap, bonus & THR, berizin Disnaker & Kemnaker.',
    true
),
(
    'Perawat Lansia & Caregiver Orang Tua',
    'perawat-lansia',
    'lansia',
    'Menginap (Kamar Pribadi / Satu Ruangan)',
    3000000,
    6500000,
    'Rp3.000.000 – Rp6.500.000 / bln',
    'Gaji Menyesuaikan Kondisi Pasien',
    'Lowongan kerja Perawat Lansia & Caregiver medis/non-medis. Bertugas mendampingi lansia dalam aktivitas harian (mandi, makan, minum obat teratur), memantau kondisi fisik/vital sign, serta hadir sebagai teman bicara yang memberikan ketenangan emosional bagi orang tua.',
    ARRAY[
        'Mendampingi lansia mandi, berpakaian, dan berpindah (mobilitas)',
        'Menyiapkan makanan sehat khusus lansia dan menyuapi dengan sabar',
        'Mengingatkan & memberikan obat tepat waktu sesuai resep dokter',
        'Mencatat jurnal harian kesehatan (tensi, suhu, gula darah, obat)'
    ],
    ARRAY[
        'Wanita / Pria usia 20 - 45 tahun',
        'e-KTP Asli, KK, dan Surat Keterangan Sehat dari Faskes',
        'Sabar, berempati tinggi, telaten, dan tidak mudah emosi',
        'Lulusan keperawatan/kebidanan atau pengalaman perawat lansia',
        'Siap menginap di rumah majikan Jabodetabek'
    ],
    ARRAY[
        'Gaji tinggi menyesuaikan tingkat perawatan pasien (Rp3M - Rp6,5M)',
        'Makan 3x sehari gratis & kamar pribadi menginap',
        'Insentif lembur libur (uang infal) jika tidak mengambil libur',
        'Pembekalan fisioterapi ringan dan penanganan medis dasar',
        'Mediasi penuh dari lembaga resmi PT Jasa Mandiri'
    ],
    'Lowongan Kerja Perawat Lansia & Caregiver Resmi | PT Jasa Mandiri',
    'Lowongan perawat lansia dan suster jompo resmi. Gaji Rp3-6,5 juta/bulan, kamar pribadi, perlindungan hukum Kemnaker.',
    true
)
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    category = EXCLUDED.category,
    system = EXCLUDED.system,
    salary_min = EXCLUDED.salary_min,
    salary_max = EXCLUDED.salary_max,
    salary_display = EXCLUDED.salary_display,
    badge = EXCLUDED.badge,
    description = EXCLUDED.description,
    duties = EXCLUDED.duties,
    requirements = EXCLUDED.requirements,
    facilities = EXCLUDED.facilities,
    meta_title = EXCLUDED.meta_title,
    meta_description = EXCLUDED.meta_description,
    is_active = EXCLUDED.is_active;
