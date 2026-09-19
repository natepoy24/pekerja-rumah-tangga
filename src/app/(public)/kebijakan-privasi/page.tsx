import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Lock, FileText, CheckCircle2, ChevronRight, Mail, Phone, MapPin } from "lucide-react";
import { SITE_CONFIG } from "@/lib/siteConfig";
import { getCompanyIdentity } from "@/lib/settings";
import JsonLd from "@/components/seo/JsonLd";
import { generateBreadcrumbSchema } from "@/lib/seo/schemaGenerator";

export const revalidate = 86400;

export async function generateMetadata(): Promise<Metadata> {
  const company = await getCompanyIdentity();
  const companyName = company?.nama_perusahaan || SITE_CONFIG.name;
  const canonicalUrl = `${SITE_CONFIG.url}/kebijakan-privasi`;

  return {
    title: `Kebijakan Privasi | ${companyName}`,
    description: `Kebijakan Privasi ${companyName}. Pelajari bagaimana kami melindungi data pribadi majikan dan pekerja sesuai UU No. 27 Tahun 2022 (UU PDP).`,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `Kebijakan Privasi | ${companyName}`,
      description: `Komitmen perlindungan data dan privasi majikan serta tenaga kerja rumah tangga di ${companyName}.`,
      url: canonicalUrl,
      siteName: companyName,
      locale: "id_ID",
      type: "website",
      images: [{ url: SITE_CONFIG.logo, alt: `Kebijakan Privasi ${companyName}` }],
    },
  };
}

export default async function KebijakanPrivasiPage() {
  const company = await getCompanyIdentity();
  const companyName = company?.nama_perusahaan || SITE_CONFIG.name;
  const email = company?.email || SITE_CONFIG.email;
  const phone = company?.nomor_telepon || SITE_CONFIG.telephone;
  const address = company?.alamat_lengkap || `${SITE_CONFIG.address.streetAddress}, ${SITE_CONFIG.address.addressLocality}, ${SITE_CONFIG.address.addressRegion}`;

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Beranda", url: "/" },
    { name: "Kebijakan Privasi", url: "/kebijakan-privasi" },
  ]);

  return (
    <div className="bg-[#FAF9F5] min-h-screen">
      <JsonLd data={breadcrumbSchema} />

      {/* Header / Hero Section */}
      <section className="bg-[#14201D] text-white pt-12 pb-16 px-6 md:px-8 border-b border-[#0B4F42]/30">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-white/60 mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              Beranda
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#82c467]">Kebijakan Privasi</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#155100]/40 border border-[#3E7B28]/50 text-xs font-semibold text-[#82c467] mb-4">
            <ShieldCheck className="w-4 h-4" />
            <span>Kepatuhan UU No. 27/2022 (UU PDP)</span>
          </div>

          <h1 className="font-serif text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Kebijakan Privasi
          </h1>
          <p className="text-white/80 text-sm md:text-base leading-relaxed max-w-2xl">
            {companyName} berkomitmen penuh untuk melindungi privasi, kerahasiaan, dan keamanan data pribadi majikan serta seluruh calon pekerja rumah tangga yang kami salurkan.
          </p>
          <p className="text-xs text-white/50 mt-4">
            Terakhir Diperbarui: 19 September 2026 • Berlaku Efektif
          </p>
        </div>
      </section>

      {/* Content Section */}
      <main className="max-w-4xl mx-auto px-6 md:px-8 py-12 md:py-16">
        <div className="bg-white rounded-2xl p-8 md:p-12 border border-[#D5E8D0] shadow-sm space-y-10 text-[#2D3748] text-sm md:text-base leading-relaxed font-sans">

          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="font-serif text-xl md:text-2xl font-bold text-[#0B4F42] flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-[#EBF4E7] text-[#0B4F42] flex items-center justify-center text-sm font-sans font-bold">1</span>
              Pendahuluan & Ruang Lingkup
            </h2>
            <p>
              Kebijakan Privasi ini menjelaskan bagaimana <strong>{companyName}</strong> (selanjutnya disebut &quot;Kami&quot;) mengumpulkan, mengelola, menyimpan, dan melindungi Data Pribadi pengguna situs web kami di <Link href="/" className="text-[#0B4F42] underline font-semibold">{SITE_CONFIG.url}</Link>, calon majikan yang mengajukan kebutuhan pekerja rumah tangga, maupun tenaga kerja (ART, Baby Sitter, dan Perawat Lansia) yang mendaftar pada lembaga kami.
            </p>
            <p>
              Dengan mengakses situs web kami, menghubungi kami melalui WhatsApp resmi, atau menandatangani perjanjian penempatan pekerja, Anda menyatakan telah membaca, memahami, dan menyetujui seluruh ketentuan dalam Kebijakan Privasi ini.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="font-serif text-xl md:text-2xl font-bold text-[#0B4F42] flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-[#EBF4E7] text-[#0B4F42] flex items-center justify-center text-sm font-sans font-bold">2</span>
              Data Pribadi yang Kami Kumpulkan
            </h2>
            <p>Untuk menyelenggarakan layanan penyaluran tenaga kerja yang aman dan legal, kami mengumpulkan data berikut:</p>
            <div className="grid md:grid-cols-2 gap-4 pt-2">
              <div className="bg-[#FAF9F5] p-4 rounded-xl border border-[#D5E8D0]">
                <h3 className="font-bold text-[#0B4F42] mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#3E7B28]" />
                  Data Calon Majikan
                </h3>
                <ul className="text-xs space-y-1.5 text-gray-700 list-disc list-inside">
                  <li>Nama lengkap & nomor identitas (KTP)</li>
                  <li>Nomor telepon & WhatsApp aktif</li>
                  <li>Alamat penempatan kerja domisili</li>
                  <li>Kriteria spesifik kebutuhan rumah tangga</li>
                </ul>
              </div>
              <div className="bg-[#FAF9F5] p-4 rounded-xl border border-[#D5E8D0]">
                <h3 className="font-bold text-[#0B4F42] mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#3E7B28]" />
                  Data Tenaga Kerja
                </h3>
                <ul className="text-xs space-y-1.5 text-gray-700 list-disc list-inside">
                  <li>Identitas resmi (KTP, Kartu Keluarga, SKCK)</li>
                  <li>Riwayat pengalaman kerja & keahlian khusus</li>
                  <li>Catatan pemeriksaan kesehatan & rekam medis</li>
                  <li>Kontak keluarga penjamin yang dapat dihubungi</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="font-serif text-xl md:text-2xl font-bold text-[#0B4F42] flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-[#EBF4E7] text-[#0B4F42] flex items-center justify-center text-sm font-sans font-bold">3</span>
              Tujuan Pemrosesan Data Pribadi
            </h2>
            <p>Data pribadi yang kami terima hanya diproses untuk tujuan-tujuan yang sah, antara lain:</p>
            <ul className="space-y-2 list-disc list-inside text-gray-700">
              <li>Memverifikasi keaslian identitas calon pekerja demi keselamatan keluarga pengguna jasa.</li>
              <li>Mencocokkan profil pekerja (ART/Baby Sitter/Perawat) dengan kebutuhan rumah tangga majikan.</li>
              <li>Penyusunan Perjanjian Kerja Bersama (PKB) resmi bermaterai yang mengikat hak dan kewajiban kedua belah pihak.</li>
              <li>Pelaksanaan kewajiban hukum pelaporan ketenagakerjaan kepada DISNAKER dan instansi terkait.</li>
              <li>Layanan purna jual (*aftercare*), pemantauan masa garansi kerja, dan fasilitas mediasi bila diperlukan.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="font-serif text-xl md:text-2xl font-bold text-[#0B4F42] flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-[#EBF4E7] text-[#0B4F42] flex items-center justify-center text-sm font-sans font-bold">4</span>
              Keamanan & Penyimpanan Data
            </h2>
            <p>
              Kami menerapkan standar teknis dan manajerial yang ketat guna melindungi data Anda dari akses tanpa izin, manipulasi, kehilangan, atau pengungkapan ilegal:
            </p>
            <div className="bg-[#EBF4E7]/60 p-4 rounded-xl border border-[#3E7B28]/30 space-y-2">
              <div className="flex items-center gap-2 font-semibold text-[#0B4F42]">
                <Lock className="w-4 h-4 text-[#3E7B28]" />
                Enkripsi & Pembatasan Akses
              </div>
              <p className="text-xs text-gray-700">
                Data digital disimpan di infrastruktur terenkripsi dengan proteksi SSL/TLS HTTPS dan akses berbasis peran (*Role-Based Access Control*). Dokumen fisik identitas disimpan dalam arsip berkeamanan tinggi dan hanya dapat diakses oleh staf kepatuhan yang berwenang.
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="font-serif text-xl md:text-2xl font-bold text-[#0B4F42] flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-[#EBF4E7] text-[#0B4F42] flex items-center justify-center text-sm font-sans font-bold">5</span>
              Pengungkapan kepada Pihak Ketiga
            </h2>
            <p>
              Kami <strong>tidak pernah menjual, menyewakan, atau memperdagangkan</strong> data pribadi Anda kepada pihak mana pun untuk keperluan periklanan pihak ketiga. Data hanya dapat diungkapkan kepada:
            </p>
            <ul className="space-y-2 list-disc list-inside text-gray-700">
              <li>Pihak majikan atau tenaga kerja yang bersangkutan dalam rangka verifikasi penempatan kerja resmi.</li>
              <li>Aparat penegak hukum atau instansi pemerintah bila diwajibkan berdasarkan perintah perundang-undangan Republik Indonesia.</li>
              <li>Klinik laboratorium atau dokter mitra yang melakukan uji kesehatan berkala pekerja.</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="font-serif text-xl md:text-2xl font-bold text-[#0B4F42] flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-[#EBF4E7] text-[#0B4F42] flex items-center justify-center text-sm font-sans font-bold">6</span>
              Hak Subjek Data Anda
            </h2>
            <p>Sesuai UU Perlindungan Data Pribadi No. 27 Tahun 2022, Anda memiliki hak-hak berikut:</p>
            <ul className="space-y-1.5 list-disc list-inside text-gray-700">
              <li>Hak memperoleh akses dan salinan data pribadi yang kami miliki.</li>
              <li>Hak melengkapi atau memperbarui ketidakakuratan data Anda.</li>
              <li>Hak meminta penghapusan atau pemusnahan data pribadi Anda apabila masa kontrak kerja telah selesai dan tidak ada kewajiban hukum yang mengikat.</li>
              <li>Hak menarik kembali persetujuan pemrosesan data pribadi.</li>
            </ul>
          </section>

          {/* Section 7 */}
          <section className="space-y-4 pt-4 border-t border-gray-100">
            <h2 className="font-serif text-xl md:text-2xl font-bold text-[#0B4F42] flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-[#EBF4E7] text-[#0B4F42] flex items-center justify-center text-sm font-sans font-bold">7</span>
              Hubungi Kami & Petugas Kepatuhan
            </h2>
            <p>
              Apabila Anda memiliki pertanyaan, keberatan, atau ingin mengajukan permohonan hak subjek data terkait Kebijakan Privasi ini, silakan hubungi tim kepatuhan kami melalui:
            </p>
            <div className="bg-[#FAF9F5] p-5 rounded-xl border border-[#D5E8D0] space-y-2.5 text-xs text-gray-700">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#0B4F42]" />
                <span className="font-semibold text-gray-900">{companyName} — Divisi Kepatuhan & Legal</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#0B4F42]" />
                <span>{address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#0B4F42]" />
                <span>{phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#0B4F42]" />
                <a href={`mailto:${email}`} className="text-[#0B4F42] underline">{email}</a>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
