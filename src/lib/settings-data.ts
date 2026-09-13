export interface CompanyIdentity {
  nama_perusahaan: string;
  tagline: string;
  subtagline?: string;
  logo_url: string;
  favicon_url: string;
  nomor_whatsapp: string;
  nomor_telepon: string;
  email: string;
  alamat_lengkap: string;
  google_maps_url: string;
  jam_operasional: string;
  izin_kemnaker: string;
  izin_disnaker: string;
  deskripsi: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface PageSetting {
  meta_title: string;
  meta_description: string;
  keywords: string;
  og_image?: string;
  hero_title?: string;
  hero_subtitle?: string;
  hero_image?: string;
  hero_image_alt?: string;
  service_art_image?: string;
  service_babysitter_image?: string;
  service_perawat_image?: string;
  faqs?: FaqItem[];
}

export const DEFAULT_COMPANY_IDENTITY: CompanyIdentity = {
  nama_perusahaan: "PT Jasa Mandiri",
  tagline: "Penyalur Resmi Berizin Kemnaker & Disnaker sejak 2010",
  subtagline: "Premium Domestic Care",
  logo_url: "/logo.png",
  favicon_url: "/logo.png",
  nomor_whatsapp: "6285111399962",
  nomor_telepon: "+62 851-1139-9962",
  email: "info@pekerjarumahtangga.com",
  alamat_lengkap:
    "Jl. Gunung Balong III No.78, RT.11/RW.4, Lb. Bulus, Kec. Cilandak, Kota Jakarta Selatan, DKI Jakarta 12440",
  google_maps_url: "https://maps.app.goo.gl/z5f5F93TwLPZJA7n7",
  jam_operasional: "Senin - Minggu: 08:00 - 21:00 WIB",
  izin_kemnaker: "LPK No. 410/2010",
  izin_disnaker: "Terdaftar DISNAKER & PJTKI",
  deskripsi:
    "Penyalur resmi Asisten Rumah Tangga, Baby Sitter, dan Perawat Lansia berizin resmi Disnaker & Kemnaker sejak 2010. Mengutamakan kebersihan, etika, dan keamanan keluarga Anda.",
};

export const DEFAULT_PAGE_SETTINGS: Record<string, PageSetting> = {
  page_home: {
    meta_title: "PT Jasa Mandiri — Penempatan Pekerja Rumah Tangga Resmi & Terpercaya",
    meta_description:
      "Penyalur resmi Asisten Rumah Tangga, Baby Sitter, dan Perawat Lansia berizin Disnaker & Kemnaker sejak 2010. Garansi penempatan resmi, rekam medis bersih, dan bebas biaya penukaran.",
    keywords:
      "penyalur art jakarta, yayasan baby sitter terpercaya, perawat lansia jabodetabek, pembantu rumah tangga bergaransi",
    og_image: "/asisten rumah tangga.jpeg",
    hero_title: "Kenyamanan & Ketenangan Rumah Dimulai dari Tangan yang Tepat.",
    hero_subtitle:
      "PT Jasa Mandiri menyalurkan Asisten Rumah Tangga, Baby Sitter, dan Perawat Lansia terpercaya yang telah melewati verifikasi identitas ketat, pemeriksaan kesehatan medis, serta pelatihan etika kerja profesional.",
    hero_image: "/asisten rumah tangga.jpeg",
    hero_image_alt: "Penyalur Asisten Rumah Tangga Resmi PT Jasa Mandiri",
    service_art_image: "/asisten rumah tangga.jpeg",
    service_babysitter_image: "/baby sitter.jpeg",
    service_perawat_image: "/perawat lansia.jpeg",
    faqs: [
      {
        question: "Bagaimana prosedur penyaluran pekerja rumah tangga di PT Jasa Mandiri?",
        answer:
          "Prosedur diawali dengan konsultasi kebutuhan keluarga Anda via WhatsApp/Telepon. Tim kami akan mencocokkan profil pekerja terbaik dari katalog terverifikasi, dilanjutkan wawancara (online/offline), penandatanganan perjanjian garansi kerja resmi, dan pengantaran pekerja ke rumah Anda.",
      },
      {
        question: "Apakah ada garansi penukaran jika pekerja tidak cocok?",
        answer:
          "Ya, PT Jasa Mandiri menyediakan garansi kontrak resmi berupa penukaran/penggantian kandidat pekerja tanpa biaya administrasi tambahan selama masa garansi berlaku.",
      },
      {
        question: "Bagaimana standar pemeriksaan kesehatan (MCU) kandidat pekerja?",
        answer:
          "Setiap pekerja wajib melalui uji laboratorium medis menyeluruh mencakup pemeriksaan Hepatitis B/C, TBC/Thorax, HIV, penyakit menular lainnya, serta uji bebas narkoba sebelum disalurkan.",
      },
      {
        question: "Apakah pekerja telah memiliki dokumen identitas dan latar belakang yang jelas?",
        answer:
          "Semua calon pekerja terverifikasi KTP asli, KK, Surat Keterangan Catatan Kepolisian (SKCK) aktif, serta konfirmasi latar belakang keluarga dari desa asal.",
      },
    ],
  },
  page_layanan: {
    meta_title: "Layanan Penempatan PRT, Baby Sitter & Perawat Lansia Resmi | PT Jasa Mandiri",
    meta_description:
      "Katalog resmi layanan PT Jasa Mandiri: penyalur PRT, Baby Sitter terdidik, dan Perawat Lansia profesional. Berizin resmi Disnaker, rekam medis bersih, dan garansi kontrak.",
    keywords:
      "layanan penyalur tenaga kerja rumah tangga, yayasan prt baby sitter lansia resmi, jasa penyalur art pengasuh perawat jakarta",
    og_image: "/asisten rumah tangga.jpeg",
    hero_title: "Solusi Tenaga Kerja Rumah Tangga Terpercaya & Profesional",
    hero_subtitle:
      "Temukan tenaga kerja terlatih dan terverifikasi untuk mendukung kebersihan, kehangatan keluarga, dan kesehatan orang tercinta di rumah Anda.",
    faqs: [
      {
        question: "Apa saja kategori layanan utama di PT Jasa Mandiri?",
        answer:
          "Kami menyediakan 3 bidang spesialisasi: 1) Asisten Rumah Tangga (ART), 2) Baby Sitter & Nanny Pengasuh Bayi/Anak, serta 3) Perawat Lansia & Caregiver Medis/Non-medis.",
      },
      {
        question: "Berapa lama estimasi penempatan pekerja hingga tiba di rumah?",
        answer:
          "Kandidat siap kerja (ready stock) dapat diproses dan tiba di lokasi dalam 1-2 hari kerja setelah penandatanganan kontrak dan verifikasi administrasi.",
      },
      {
        question: "Apakah PT Jasa Mandiri melayani penempatan luar Jabodetabek?",
        answer:
          "Ya, selain area Jabodetabek, kami juga melayani penempatan pekerja ke seluruh wilayah Indonesia (Bandung, Surabaya, Medan, Bali, dll) dengan biaya akomodasi yang disesuaikan.",
      },
    ],
  },
  page_art: {
    meta_title: "Layanan Asisten Rumah Tangga (ART) Terlatih & Bergaransi | PT Jasa Mandiri",
    meta_description:
      "Dapatkan tenaga ART terverifikasi dengan latar belakang bersih, uji kesehatan lengkap, serta etika kerja profesional untuk mendukung kelancaran aktivitas harian keluarga Anda.",
    keywords:
      "jasa asisten rumah tangga, yayasan art jakarta, pembantu rumah tangga menginap, art pulang pergi",
    og_image: "/asisten rumah tangga.jpeg",
    hero_title: "Asisten Rumah Tangga Terlatih untuk Rumah yang Rapi, Bersih, dan Terawat.",
    hero_subtitle:
      "Dapatkan tenaga ART terverifikasi dengan latar belakang bersih, uji kesehatan lengkap, serta etika kerja profesional untuk mendukung kelancaran aktivitas harian keluarga Anda.",
    hero_image: "/asisten rumah tangga.jpeg",
    hero_image_alt: "Layanan Asisten Rumah Tangga PT Jasa Mandiri",
    faqs: [
      {
        question: "Apa saja tugas umum yang dilakukan oleh Asisten Rumah Tangga (ART)?",
        answer:
          "Tugas mencakup kebersihan seluruh area rumah (sweeping, mopping, dusting), mencuci & menyetrika pakaian rapi, menyiapkan hidangan masakan harian keluarga, serta pengelolaan kebutuhan dapur dasar.",
      },
      {
        question: "Apakah ART menginap atau bisa sistem Pulang-Pergi (PP)?",
        answer:
          "Mayoritas kandidat ART kami adalah sistem menginap (live-in). Namun, kami juga menyediakan kandidat ART pulang-pergi untuk area Jabodetabek tertentu sesuai kesepakatan.",
      },
      {
        question: "Bagaimana jika ART memiliki permintaan penyesuaian libur kerja?",
        answer:
          "Standar libur ART adalah 2 atau 4 hari dalam sebulan, atau dapat diganti dengan uang infal (uang lembur libur) apabila ART setuju tidak mengambil jatah liburnya.",
      },
    ],
  },
  page_baby_sitter: {
    meta_title: "Layanan Baby Sitter & Nanny Profesional Terpercaya | PT Jasa Mandiri",
    meta_description:
      "Layanan baby sitter premium dengan standar operasional ketat, skrining berlapis, dan dedikasi penuh untuk menghadirkan ketenangan pikiran bagi orang tua di rumah.",
    keywords:
      "baby sitter jakarta, pengasuh bayi newborn, yayasan suster anak resmi, nanny terdidik jabodetabek",
    og_image: "/baby sitter.jpeg",
    hero_title: "Pengasuhan Penuh Kasih & Rasa Aman untuk Tumbuh Kembang Buah Hati Anda.",
    hero_subtitle:
      "Layanan baby sitter premium dengan standar operasional ketat, skrining berlapis, dan dedikasi penuh untuk menghadirkan ketenangan pikiran bagi orang tua di rumah.",
    hero_image: "/baby sitter.jpeg",
    hero_image_alt: "Layanan Baby Sitter Premium PT Jasa Mandiri",
    faqs: [
      {
        question: "Apa kualifikasi khusus dari Baby Sitter di PT Jasa Mandiri?",
        answer:
          "Suster pengasuh kami telah dibekali pelatihan memandikan bayi baru lahir (newborn), pembuatan & sterilisasi botol susu, penyiapan MPASI bergizi, stimulasi tumbuh kembang anak, serta pelatihan kesabaran & pertolongan pertama.",
      },
      {
        question: "Apakah Baby Sitter bisa fokus khusus mengurus anak tanpa tugas rumah lain?",
        answer:
          "Ya, fokus utama Baby Sitter adalah 100% pada keselamatan, higienitas, dan pendampingan anak. Tugas terkait perlengkapan anak (mencuci baju bayi, merapikan kamar anak, menyuci botol) termasuk dalam tanggung jawabnya.",
      },
      {
        question: "Bagaimana cara memastikan kecocokan Baby Sitter sebelum penempatan?",
        answer:
          "Anda dapat melakukan sesi wawancara mendalam via Video Call atau bertatap muka langsung untuk menanyakan pengalaman pengasuhan dan pembawaan kandidat suster.",
      },
    ],
  },
  page_perawat_lansia: {
    meta_title: "Layanan Perawat Lansia & Caregiver Berpengalaman | PT Jasa Mandiri",
    meta_description:
      "Dapatkan caregiver dan perawat lansia terseleksi yang sabar, teliti mengawal kebutuhan medis harian, serta hadir sebagai teman bicara yang memberikan kenyamanan emosional di rumah.",
    keywords:
      "perawat lansia jakarta, caregiver orang tua, suster lansia bedridden, perawat lansia terpercaya",
    og_image: "/perawat lansia.jpeg",
    hero_title: "Pendampingan Penuh Empati, Martabat, & Perhatian Tulus untuk Orang Tua Tercinta.",
    hero_subtitle:
      "Dapatkan caregiver dan perawat lansia terseleksi yang sabar, teliti mengawal kebutuhan medis harian, serta hadir sebagai teman bicara yang memberikan kenyamanan emosional di rumah.",
    hero_image: "/perawat lansia.jpeg",
    hero_image_alt: "Layanan Perawat Lansia PT Jasa Mandiri",
    faqs: [
      {
        question: "Apa perbedaan Caregiver Lansia non-medis dan Perawat Medis?",
        answer:
          "Caregiver non-medis berfokus pada pendampingan aktivitas harian lansia (memandikan, menyuapi, meminumkan obat rutin, teman bicara). Perawat lansia berpengalaman medis memiliki kemampuan khusus menangani pasien bedridden, alat bantu NGT/kateter, serta pengukuran vital sign secara berkala.",
      },
      {
        question: "Apakah perawat lansia dilatih menangani penderita Alzheimer atau Demensia?",
        answer:
          "Ya, kandidat perawat lansia kami diberi pembekalan ekstra mengenai psikologi lansia, kesabaran dalam menghadapi emosi atau kepikunan (demensia), serta teknik fisioterapi ringan.",
      },
      {
        question: "Bagaimana pemantauan jadwal obat lansia di rumah?",
        answer:
          "Perawat lansia wajib mencatat jurnal harian mencakup jam minum obat, tekanan darah, suhu tubuh, intake makanan, dan perubahan kondisi fisik lansia untuk dilaporkan kepada keluarga.",
      },
    ],
  },
  page_tentang_kami: {
    meta_title: "Tentang PT Jasa Mandiri | Penyalur Tenaga Kerja Rumah Tangga Resmi Sejak 2010",
    meta_description:
      "Pelajari legalitas resmi, standar pelatihan, dan komitmen PT Jasa Mandiri dalam menyalurkan pekerja rumah tangga berkualitas tinggi di bawah payung hukum Kemnaker RI.",
    keywords:
      "legalitas pt jasa mandiri, izin kemnaker p3rt, sejarah pt jasa mandiri, yayasan prt terdaftar",
    og_image: "/asisten rumah tangga.jpeg",
    hero_title: "Integritas, Legalitas, & Ketenangan Pikiran untuk Setiap Keluarga.",
    hero_subtitle:
      "Sejak 2010, PT Jasa Mandiri berdedikasi menjembatani keluarga dengan pekerja domestik beretika, terlatih, dan berpayung hukum jelas.",
    faqs: [
      {
        question: "Apa saja sertifikasi dan izin resmi yang dimiliki PT Jasa Mandiri?",
        answer:
          "PT Jasa Mandiri mengantongi Izin LPK Kementerian Ketenagakerjaan RI (Kemnaker) No. 410/2010, terdaftar resmi di Dinas Tenaga Kerja (Disnaker), serta memiliki kantor operasional fisik berstatus hukum PT.",
      },
      {
        question: "Di mana alamat kantor operasional resmi PT Jasa Mandiri?",
        answer:
          "Kantor operasional kami berlokasi di Jl. Gunung Balong III No.78, RT.11/RW.4, Lebak Bulus, Cilandak, Jakarta Selatan, DKI Jakarta 12440.",
      },
      {
        question: "Mengapa memilih PT Jasa Mandiri dibanding penyalur perorangan/tidak resmi?",
        answer:
          "Kami memberikan kepastian hukum melalui perjanjian garansi resmi, jaminan pemeriksaan kesehatan medis (MCU) laboratorium, dokumen identitas terverifikasi kepolisian, serta layanan customer care responsif.",
      },
    ],
  },
  page_kontak: {
    meta_title: "Hubungi PT Jasa Mandiri | Kantor Penyalur PRT, Baby Sitter & Perawat Lansia",
    meta_description:
      "Konsultasikan kebutuhan PRT, baby sitter, dan perawat lansia bersama PT Jasa Mandiri. Layanan cepat via WhatsApp atau kunjungi kantor operasional resmi kami.",
    keywords:
      "kantor penyalur pembantu Jakarta, alamat yayasan babysitter resmi, kontak penyalur PRT terpercaya",
    og_image: "/asisten rumah tangga.jpeg",
    faqs: [
      {
        question: "Berapa jam operasional layanan konsultasi PT Jasa Mandiri?",
        answer:
          "Tim customer service WhatsApp kami siap melayani Anda setiap hari (Senin - Minggu) pukul 08:00 hingga 21:00 WIB.",
      },
      {
        question: "Apakah saya bisa datang langsung ke kantor tanpa buat janji?",
        answer:
          "Anda diperbolehkan berkunjung langsung pada jam kerja. Namun, membuat janji temu via WhatsApp terlebih dahulu sangat disarankan agar tim kami dapat mengkonfirmasi ketersediaan kandidat pekerja saat kedatangan Anda.",
      },
      {
        question: "Berapa nomor kontak resmi WhatsApp customer service PT Jasa Mandiri?",
        answer:
          "Nomor kontak WhatsApp resmi kami adalah +62 851-1139-9962 (6285111399962).",
      },
    ],
  },
  page_pekerja: {
    meta_title: "Katalog Pekerja Terverifikasi | ART, Baby Sitter & Perawat Lansia | PT Jasa Mandiri",
    meta_description:
      "Penyalur resmi berizin Disnaker. Seluruh kandidat telah terverifikasi KTP, latar belakang, serta cek kesehatan berkala.",
    keywords:
      "daftar pembantu siap kerja, cari baby sitter jakarta, lowongan suster lansia",
    og_image: "/asisten rumah tangga.jpeg",
    faqs: [
      {
        question: "Apakah foto dan biodata pekerja di katalog selalu diperbarui (real-time)?",
        answer:
          "Ya, seluruh profil pekerja yang tercantum dalam katalog kami dipastikan aktif dan memiliki status yang diperbarui secara berkala (Siap Kerja / Terpesona).",
      },
      {
        question: "Bagaimana cara memesan kandidat pekerja yang saya pilih di katalog?",
        answer:
          "Klik tombol 'Pesan Kandidat Ini' pada profil pekerja yang Anda inginkan. Sistem akan secara otomatis mengarahkan Anda ke WhatsApp Customer Service kami beserta data lengkap kandidat pilihan Anda.",
      },
      {
        question: "Apakah saya dapat melakukan interview Video Call sebelum mengambil keputusan?",
        answer:
          "Sangat bisa. Kami memfasilitasi wawancara online via Video Call WhatsApp agar Anda dapat mengenal karakter dan komunikasi calon pekerja sebelum proses penandatanganan penempatan.",
      },
    ],
  },
  page_artikel: {
    meta_title: "Artikel & Edukasi Rumah Tangga | PT Jasa Mandiri",
    meta_description:
      "Kumpulan tips, panduan hukum ketenagakerjaan rumah tangga, standar gaji PRT, dan panduan pengasuhan anak terpercaya dari tim ahli PT Jasa Mandiri.",
    keywords:
      "tips memilih pembantu, standar gaji art 2026, panduan merawat lansia, artikel baby sitter",
    og_image: "/asisten rumah tangga.jpeg",
    faqs: [
      {
        question: "Apakah artikel edukasi di situs PT Jasa Mandiri boleh dikutip?",
        answer:
          "Boleh, dengan syarat mencantumkan sumber dan tautan (link) aktif yang mengarah ke artikel asli di website PT Jasa Mandiri.",
      },
      {
        question: "Topik apa saja yang dibahas dalam rubrik artikel ini?",
        answer:
          "Kami memberikan panduan seputar etika manajemen rumah tangga, aturan standar gaji & THR PRT, tips merawat anak & bayi, sertifikasi perawat lansia, dan regulasi ketenagakerjaan terkini.",
      },
    ],
  },
  page_lowongan_kerja: {
    meta_title: "Lowongan Kerja PRT, Baby Sitter & Perawat Lansia Resmi | PT Jasa Mandiri",
    meta_description:
      "Lowongan kerja resmi penempatan dalam negeri: ART, Baby Sitter, dan Perawat Lansia. Gaji utuh tepat waktu, asrama & makan gratis, tanpa potongan liar. Berizin Kemnaker.",
    keywords:
      "lowongan kerja art, lowongan baby sitter jakarta, lowongan perawat lansia, kerja pembantu rumah tangga resmi disnaker",
    og_image: "/asisten rumah tangga.jpeg",
    hero_title: "Bekerja Nyaman, Gaji Utuh, dan Dilindungi Lembaga Resmi Berizin.",
    hero_subtitle:
      "Bergabunglah bersama PT Jasa Mandiri (beroperasi resmi sejak 2010). Kami membuka lowongan penempatan kerja untuk posisi Asisten Rumah Tangga, Baby Sitter, dan Perawat Lansia dengan majikan terverifikasi di wilayah Jabodetabek dan sekitarnya.",
    faqs: [
      {
        question: "Apakah ada pungutan biaya pendaftaran?",
        answer:
          "Tidak ada. Pendaftaran, asrama menginap, serta fasilitas makan harian selama menunggu kerja tidak dipungut biaya pendaftaran di awal.",
      },
      {
        question: "Apakah menerima pekerja dari luar pulau Jawa?",
        answer:
          "Ya, kami menerima calon tenaga kerja dari seluruh Indonesia selama memiliki dokumen identitas asli yang sah dan izin dari keluarga.",
      },
      {
        question: "Kapan gaji bulanan mulai dibayarkan?",
        answer:
          "Gaji dibayarkan langsung setiap bulan sesuai tanggal penempatan yang tercantum pada surat kontrak perjanjian resmi dengan majikan.",
      },
      {
        question: "Bagaimana jika tidak cocok dengan majikan?",
        answer:
          "Pekerja berhak menghubungi tim mediasi PT Jasa Mandiri. Kami akan memfasilitasi komunikasi yang baik atau mencarikan majikan pengganti sesuai prosedur.",
      },
    ],
  },
};
