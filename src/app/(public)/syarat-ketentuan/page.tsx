import type { Metadata } from "next";
import Link from "next/link";
import { Scale, CheckCircle2, ChevronRight, FileText, AlertCircle, Phone, Mail, MapPin } from "lucide-react";
import { SITE_CONFIG } from "@/lib/siteConfig";
import { getCompanyIdentity } from "@/lib/settings";
import JsonLd from "@/components/seo/JsonLd";
import { generateBreadcrumbSchema } from "@/lib/seo/schemaGenerator";

export const revalidate = 86400;

export async function generateMetadata(): Promise<Metadata> {
  const company = await getCompanyIdentity();
  const companyName = company?.nama_perusahaan || SITE_CONFIG.name;
  const canonicalUrl = `${SITE_CONFIG.url}/syarat-ketentuan`;

  return {
    title: `Syarat dan Ketentuan | ${companyName}`,
    description: `Syarat dan Ketentuan Layanan Penyaluran Pekerja Rumah Tangga (PRT), Baby Sitter, dan Perawat Lansia di ${companyName}.`,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `Syarat dan Ketentuan | ${companyName}`,
      description: `Ketentuan resmi kontrak kerja, garansi penggantian, dan hak kewajiban majikan di ${companyName}.`,
      url: canonicalUrl,
      siteName: companyName,
      locale: "id_ID",
      type: "website",
      images: [{ url: SITE_CONFIG.logo, alt: `Syarat dan Ketentuan ${companyName}` }],
    },
  };
}

export default async function SyaratKetentuanPage() {
  const company = await getCompanyIdentity();
  const companyName = company?.nama_perusahaan || SITE_CONFIG.name;
  const email = company?.email || SITE_CONFIG.email;
  const phone = company?.nomor_telepon || SITE_CONFIG.telephone;
  const address = company?.alamat_lengkap || `${SITE_CONFIG.address.streetAddress}, ${SITE_CONFIG.address.addressLocality}, ${SITE_CONFIG.address.addressRegion}`;

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Beranda", url: "/" },
    { name: "Syarat dan Ketentuan", url: "/syarat-ketentuan" },
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
            <span className="text-[#82c467]">Syarat & Ketentuan</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#155100]/40 border border-[#3E7B28]/50 text-xs font-semibold text-[#82c467] mb-4">
            <Scale className="w-4 h-4" />
            <span>Perjanjian Penempatan Kerja Resmi</span>
          </div>

          <h1 className="font-serif text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Syarat dan Ketentuan
          </h1>
          <p className="text-white/80 text-sm md:text-base leading-relaxed max-w-2xl">
            Ketentuan resmi yang mengatur hak, kewajiban, tata cara pemesanan, serta jaminan garansi penempatan pekerja rumah tangga antara {companyName}, Pengguna Jasa (Majikan), dan Tenaga Kerja.
          </p>
          <p className="text-xs text-white/50 mt-4">
            Terakhir Diperbarui: 19 September 2026 • Berlaku Sah & Mengikat
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
              Definisi & Pihak Terkait
            </h2>
            <p>Dalam Syarat dan Ketentuan ini, istilah-istilah di bawah ini memiliki arti sebagai berikut:</p>
            <ul className="space-y-2 text-xs md:text-sm text-gray-700 list-disc list-inside">
              <li><strong>Lembaga Penyalur:</strong> Merujuk pada <strong>{companyName}</strong>, lembaga resmi penempatan pekerja rumah tangga dan LPK berizin Disnaker & Kemnaker RI.</li>
              <li><strong>Pengguna Jasa (Majikan):</strong> Perorangan atau keluarga yang menyewa jasa tenaga kerja melalui Lembaga Penyalur untuk ditempatkan pada tempat tinggal pribadi.</li>
              <li><strong>Pekerja Rumah Tangga (Pekerja):</strong> Tenaga kerja yang telah melalui seleksi, pelatihan, dan uji kesehatan (meliputi ART, Baby Sitter, atau Perawat Lansia) yang ditempatkan pada Pengguna Jasa.</li>
              <li><strong>Perjanjian Kerja Bersama (PKB):</strong> Kontrak kerja tertulis bermaterai yang ditandatangani oleh Pengguna Jasa dan Pekerja dengan difasilitasi oleh Lembaga Penyalur.</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="font-serif text-xl md:text-2xl font-bold text-[#0B4F42] flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-[#EBF4E7] text-[#0B4F42] flex items-center justify-center text-sm font-sans font-bold">2</span>
              Prosedur Pemesanan & Kontrak Kerja
            </h2>
            <p>Proses penempatan tenaga kerja dilakukan melalui tahapan resmi sebagai berikut:</p>
            <div className="space-y-2 text-xs md:text-sm text-gray-700">
              <div className="p-3.5 bg-[#FAF9F5] rounded-xl border border-[#D5E8D0] flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#3E7B28] shrink-0 mt-0.5" />
                <div>
                  <strong>Konsultasi & Seleksi Kandidat:</strong> Majikan memilih profil kandidat dari katalog kami dan dapat melakukan sesi wawancara via Video Call WhatsApp.
                </div>
              </div>
              <div className="p-3.5 bg-[#FAF9F5] rounded-xl border border-[#D5E8D0] flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#3E7B28] shrink-0 mt-0.5" />
                <div>
                  <strong>Penandatanganan Kontrak:</strong> Majikan dan Pekerja menandatangani Surat Perjanjian Kerja bermaterai yang mengatur rincian gaji, tugas, hari libur, dan periode garansi.
                </div>
              </div>
              <div className="p-3.5 bg-[#FAF9F5] rounded-xl border border-[#D5E8D0] flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#3E7B28] shrink-0 mt-0.5" />
                <div>
                  <strong>Pembayaran Administrasi Resmi:</strong> Pembayaran biaya administrasi hanya sah jika ditransfer ke rekening bank resmi atas nama perusahaan {companyName} atau dibayarkan langsung di kantor.
                </div>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="font-serif text-xl md:text-2xl font-bold text-[#0B4F42] flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-[#EBF4E7] text-[#0B4F42] flex items-center justify-center text-sm font-sans font-bold">3</span>
              Kewajiban Pengguna Jasa (Majikan)
            </h2>
            <p>Sebagai wujud penghormatan hak asasi manusia dan regulasi ketenagakerjaan, Majikan berkewajiban:</p>
            <ul className="space-y-1.5 list-disc list-inside text-gray-700 text-xs md:text-sm">
              <li>Membayarkan gaji bulanan Pekerja tepat waktu sesuai tanggal jatuh tempo yang disepakati tanpa potongan sepihak.</li>
              <li>Menyediakan makanan yang layak, higienis, serta tempat tidur yang aman dan manusiawi (untuk sistem tinggal dalam / live-in).</li>
              <li>Memberikan waktu istirahat yang cukup setiap harinya dan hak libur mingguan atau uang pengganti libur (inval).</li>
              <li>Menjamin keselamatan fisik dan psikis Pekerja selama menjalankan tugas dalam lingkungan rumah tinggal.</li>
              <li>Tidak memindahtangankan Pekerja ke pihak ketiga tanpa persetujuan tertulis dari Lembaga Penyalur.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="font-serif text-xl md:text-2xl font-bold text-[#0B4F42] flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-[#EBF4E7] text-[#0B4F42] flex items-center justify-center text-sm font-sans font-bold">4</span>
              Jaminan Garansi Penggantian Pekerja (Replacement Warranty)
            </h2>
            <p>
              Kami memberikan perlindungan jaminan penggantian tenaga kerja demi kenyamanan rumah tangga Anda:
            </p>
            <div className="bg-[#EBF4E7]/60 p-4 rounded-xl border border-[#3E7B28]/30 space-y-2 text-xs md:text-sm text-gray-800">
              <p>
                <strong>Ketentuan Garansi:</strong> Setiap paket penempatan disertai periode garansi (mulai dari 3 bulan hingga 1 tahun tergantung paket yang diambil). Selama periode garansi, Majikan berhak mengajukan penggantian pekerja apabila:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Pekerja mengundurkan diri karena alasan pribadi yang sah.</li>
                <li>Pekerja tidak mampu menjalankan tugas sesuai standar keterampilan yang telah diuji.</li>
                <li>Terjadi ketidakcocokan komunikasi atau etika kerja yang tidak dapat dimediasi.</li>
              </ul>
              <p className="text-xs text-gray-600 italic">
                *Proses penggantian kandidat baru diproses dalam kurun waktu 3 hingga 7 hari kerja tanpa biaya administrasi tambahan selama jatah penggantian paket masih berlaku.
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="font-serif text-xl md:text-2xl font-bold text-[#0B4F42] flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-[#EBF4E7] text-[#0B4F42] flex items-center justify-center text-sm font-sans font-bold">5</span>
              Larangan & Batasan Tanggung Jawab
            </h2>
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs md:text-sm text-amber-900 space-y-2">
              <div className="flex items-center gap-2 font-bold text-amber-800">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                Penting untuk Diperhatikan
              </div>
              <ul className="list-disc list-inside space-y-1 text-amber-800">
                <li>Majikan dilarang menahan identitas asli pekerja (KTP/Ijazah) secara melawan hukum. Dokumen asli pekerja diarsipkan oleh Lembaga Penyalur.</li>
                <li>Lembaga Penyalur tidak bertanggung jawab atas transaksi keuangan tidak resmi antara Majikan dan Pekerja (seperti pemberian hutang/kasbon pribadi tanpa pemberitahuan ke agensi).</li>
                <li>Tindak pidana atau perbuatan melawan hukum yang dilakukan oleh Pekerja atau Majikan akan diproses melalui jalur hukum kepolisian Republik Indonesia.</li>
              </ul>
            </div>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="font-serif text-xl md:text-2xl font-bold text-[#0B4F42] flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-[#EBF4E7] text-[#0B4F42] flex items-center justify-center text-sm font-sans font-bold">6</span>
              Hukum yang Berlaku & Penyelesaian Sengketa
            </h2>
            <p>
              Syarat dan Ketentuan ini diatur dan ditafsirkan sesuai dengan hukum Republik Indonesia. Apabila timbul perselisihan dalam pelaksanaan kontrak kerja, para pihak sepakat untuk mengutamakan musyawarah untuk mufakat dengan mediasi Lembaga Penyalur sebelum menempuh jalur hukum resmi.
            </p>
          </section>

          {/* Section 7 */}
          <section className="space-y-4 pt-4 border-t border-gray-100">
            <h2 className="font-serif text-xl md:text-2xl font-bold text-[#0B4F42] flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-[#EBF4E7] text-[#0B4F42] flex items-center justify-center text-sm font-sans font-bold">7</span>
              Pusat Layanan Konsumen & Kontak Agensi
            </h2>
            <div className="bg-[#FAF9F5] p-5 rounded-xl border border-[#D5E8D0] space-y-2.5 text-xs text-gray-700">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#0B4F42]" />
                <span className="font-semibold text-gray-900">{companyName} — Layanan Pelanggan & Kemitraan</span>
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
