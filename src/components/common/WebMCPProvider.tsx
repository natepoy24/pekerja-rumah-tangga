"use client";

import { useEffect } from "react";
import { SITE_CONFIG } from "@/lib/siteConfig";

// Type definition following Chrome WebMCP specification
// https://developer.chrome.com/docs/ai/webmcp
export interface WebMCPTool {
  name: string;
  description: string;
  inputSchema: {
    type: "object";
    properties: Record<string, any>;
    required?: string[];
  };
  annotations?: {
    readOnlyHint?: boolean;
    consequentialHint?: boolean;
    untrustedContentHint?: boolean;
  };
  execute: (args: Record<string, any>, context?: { signal?: AbortSignal }) => Promise<any>;
}

declare global {
  interface Document {
    modelContext?: {
      registerTool: (tool: WebMCPTool, options?: { signal?: AbortSignal; exposedTo?: string[] }) => Promise<void>;
      getTools: (options?: { fromOrigins?: string[] }) => Promise<WebMCPTool[]>;
      executeTool: (tool: WebMCPTool | string, args?: Record<string, any>, options?: { signal?: AbortSignal }) => Promise<any>;
      addEventListener: (event: string, callback: (...args: any[]) => void) => void;
      removeEventListener: (event: string, callback: (...args: any[]) => void) => void;
    };
  }
}

export default function WebMCPProvider() {
  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") return;

    // Polyfill / initialize document.modelContext if not natively present yet
    // to support DevTools, Lighthouse, and Model Context Tool Inspector Extension
    const registeredTools = new Map<string, WebMCPTool>();
    const eventListeners: Record<string, Array<(...args: any[]) => void>> = {};

    if (!document.modelContext) {
      document.modelContext = {
        registerTool: async (tool: WebMCPTool, options?: { signal?: AbortSignal }) => {
          registeredTools.set(tool.name, tool);
          if (options?.signal) {
            options.signal.addEventListener("abort", () => {
              registeredTools.delete(tool.name);
              (document.modelContext as any)?._emit("toolchange");
            });
          }
          (document.modelContext as any)?._emit("toolchange");
        },
        getTools: async () => {
          return Array.from(registeredTools.values());
        },
        executeTool: async (toolOrName: WebMCPTool | string, args: Record<string, any> = {}, context?: { signal?: AbortSignal }) => {
          const tool = typeof toolOrName === "string" ? registeredTools.get(toolOrName) : toolOrName;
          if (!tool || typeof tool.execute !== "function") {
            throw new Error(`WebMCP tool not found: ${toolOrName}`);
          }
          return await tool.execute(args, context);
        },
        addEventListener: (event: string, callback: (...args: any[]) => void) => {
          if (!eventListeners[event]) eventListeners[event] = [];
          eventListeners[event].push(callback);
        },
        removeEventListener: (event: string, callback: (...args: any[]) => void) => {
          if (eventListeners[event]) {
            eventListeners[event] = eventListeners[event].filter((cb) => cb !== callback);
          }
        },
      };

      (document.modelContext as any)._emit = (event: string, data?: any) => {
        if (eventListeners[event]) {
          eventListeners[event].forEach((cb) => {
            try {
              cb(data);
            } catch (err) {
              console.error(`Error in WebMCP event listener for ${event}:`, err);
            }
          });
        }
      };
    }

    // Define WebMCP tools according to PT Jasa Mandiri domain
    const tools: WebMCPTool[] = [
      {
        name: "cari_tenaga_kerja",
        description: "Cari katalog tenaga kerja rumah tangga (ART, Baby Sitter, Perawat Lansia) yang terverifikasi dan siap kerja di PT Jasa Mandiri.",
        inputSchema: {
          type: "object",
          properties: {
            kategori: {
              type: "string",
              description: "Kategori profesi yang diinginkan",
              enum: ["Semua", "Asisten Rumah Tangga", "Baby Sitter", "Perawat Lansia", "Supir", "Tukang Kebun"],
            },
            keahlian: {
              type: "string",
              description: "Kata kunci keahlian atau kriteria khusus (misal: newborn, masak masakan rumahan, merawat stroke)",
            },
            status: {
              type: "string",
              description: "Status ketersediaan kandidat",
              enum: ["Semua", "Tersedia", "Dipesan"],
            },
          },
        },
        annotations: {
          readOnlyHint: true,
          consequentialHint: false,
          untrustedContentHint: false,
        },
        execute: async ({ kategori, keahlian, status }) => {
          let url = "/pekerja";
          const params = new URLSearchParams();
          if (kategori && kategori !== "Semua") params.set("kategori", kategori);
          if (keahlian) params.set("q", keahlian);
          if (status && status !== "Semua") params.set("status", status);

          const queryString = params.toString();
          if (queryString) url += `?${queryString}`;

          return {
            status: "success",
            message: `Pencarian pekerja dialihkan ke: ${url}`,
            targetUrl: url,
            kategoriDipilih: kategori || "Semua",
            keahlianDicari: keahlian || "Semua",
          };
        },
      },
      {
        name: "dapatkan_informasi_layanan",
        description: "Dapatkan informasi resmi mengenai layanan PRT, Baby Sitter, Perawat Lansia, garansi penggantian 3x, dan legalitas izin Disnaker PT Jasa Mandiri.",
        inputSchema: {
          type: "object",
          properties: {
            topik: {
              type: "string",
              description: "Topik atau jenis layanan yang ingin diketahui",
              enum: [
                "asisten_rumah_tangga",
                "baby_sitter",
                "perawat_lansia",
                "garansi_pergantian",
                "biaya_dan_gaji",
                "legalitas_resmi",
              ],
            },
          },
          required: ["topik"],
        },
        annotations: {
          readOnlyHint: true,
          consequentialHint: false,
          untrustedContentHint: false,
        },
        execute: async ({ topik }) => {
          const infoMap: Record<string, any> = {
            asisten_rumah_tangga: {
              layanan: "Asisten Rumah Tangga (ART)",
              tugas: "Membersihkan hunian, mencuci, menyetrika, memasak hidangan keluarga, dan belanja kebutuhan harian.",
              tipe: "Menginap (Live-in) atau Pulang-Pergi (Live-out)",
              kisaranGaji: "Rp 2.200.000 - Rp 3.200.000 / bulan",
              url: "https://pekerjarumahtangga.com/layanan/art",
            },
            baby_sitter: {
              layanan: "Baby Sitter & Nanny (Pengasuh Anak)",
              tugas: "Perawatan bayi newborn hingga balita, sterilisasi alat makan, penyusunan MPASI sehat, stimulasi tumbuh kembang, dan P3K.",
              kisaranGaji: "Rp 2.800.000 - Rp 4.500.000 / bulan",
              url: "https://pekerjarumahtangga.com/layanan/baby-sitter",
            },
            perawat_lansia: {
              layanan: "Perawat Lansia (Caregiver)",
              tugas: "Pendampingan mobilitas, pemberian obat teratur, pengukuran tanda vital rutin, perawatan pasien mandiri hingga tirah baring (bedridden).",
              kisaranGaji: "Rp 3.200.000 - Rp 5.500.000 / bulan",
              url: "https://pekerjarumahtangga.com/layanan/perawat-lansia",
            },
            garansi_pergantian: {
              kebijakan: "Garansi Pergantian Tenaga Kerja",
              detail: "Jaminan penggantian pekerja hingga 3 kali selama masa garansi kontrak resmi tanpa tambahan biaya administrasi penempatan apabila tidak cocok.",
              kontrak: "Disertai perjanjian tertulis bermaterai resmi demi keamanan majikan dan pekerja.",
            },
            biaya_dan_gaji: {
              kebijakan: "Standar Biaya Administrasi & Gaji",
              detail: "Biaya administrasi dibayarkan satu kali saat penempatan resmi. Gaji bulanan dibayarkan langsung kepada pekerja sesuai nominal yang disepakati dalam kontrak.",
            },
            legalitas_resmi: {
              perusahaan: SITE_CONFIG.name,
              status: SITE_CONFIG.legalStatus,
              alamat: `${SITE_CONFIG.address.streetAddress}, ${SITE_CONFIG.address.addressLocality}, ${SITE_CONFIG.address.postalCode}`,
              izin: "Terdaftar resmi di Disnaker dan Kemnaker RI dengan akreditasi Lembaga Pelatihan Kerja (LPK).",
            },
          };

          return infoMap[topik] || { message: "Informasi topik tidak ditemukan", pilihan: Object.keys(infoMap) };
        },
      },
      {
        name: "hubungi_konsultan_whatsapp",
        description: "Hubungi konsultan penempatan PT Jasa Mandiri via WhatsApp untuk konsultasi cepat, penentuan kriteria, atau pemesanan pekerja.",
        inputSchema: {
          type: "object",
          properties: {
            layanan: {
              type: "string",
              description: "Layanan yang dibutuhkan (ART, Baby Sitter, atau Perawat Lansia)",
              enum: ["Asisten Rumah Tangga", "Baby Sitter", "Perawat Lansia"],
            },
            catatan: {
              type: "string",
              description: "Kebutuhan spesifik atau pertanyaan untuk konsultan",
            },
          },
          required: ["layanan"],
        },
        annotations: {
          readOnlyHint: false,
          consequentialHint: false,
          untrustedContentHint: false,
        },
        execute: async ({ layanan, catatan }) => {
          const waNumber = SITE_CONFIG.whatsappPrimary.replace(/\D/g, "");
          const text = encodeURIComponent(
            `Halo PT Jasa Mandiri, saya ingin berkonsultasi mengenai penempatan ${layanan}.\nCatatan kebutuhan: ${catatan || "-"}\nMohon informasi profil kandidat yang siap kerja. Terima kasih!`
          );
          const waUrl = `https://wa.me/62${waNumber.startsWith("0") ? waNumber.slice(1) : waNumber}?text=${text}`;

          if (typeof window !== "undefined") {
            window.open(waUrl, "_blank", "noopener,noreferrer");
          }

          return {
            status: "success",
            message: "Membuka WhatsApp konsultan PT Jasa Mandiri.",
            whatsappUrl: waUrl,
          };
        },
      },
      {
        name: "info_legalitas_kantor",
        description: "Dapatkan identitas legal, alamat fisik kantor resmi, nomor telepon tetap, dan jam operasional PT Jasa Mandiri.",
        inputSchema: {
          type: "object",
          properties: {},
        },
        annotations: {
          readOnlyHint: true,
          consequentialHint: false,
          untrustedContentHint: false,
        },
        execute: async () => {
          return {
            namaPerusahaan: SITE_CONFIG.name,
            legalitas: SITE_CONFIG.legalStatus,
            alamatLengkap: `${SITE_CONFIG.address.streetAddress}, ${SITE_CONFIG.address.addressLocality}, ${SITE_CONFIG.address.postalCode}`,
            koordinat: SITE_CONFIG.geo,
            hotlineTelepon: SITE_CONFIG.telephone,
            whatsappKonsultasi: [SITE_CONFIG.whatsappPrimary, SITE_CONFIG.whatsappSecondary],
            email: SITE_CONFIG.email,
            jamOperasional: SITE_CONFIG.openingHoursFormatted,
            website: SITE_CONFIG.url,
          };
        },
      },
    ];

    // Register all tools to document.modelContext
    tools.forEach((tool) => {
      document.modelContext?.registerTool(tool).catch((err) => {
        console.warn(`[WebMCP] Failed to register tool ${tool.name}:`, err);
      });
    });

    // Dynamically inject Chrome WebMCP declarative pseudo-class styles
    const styleId = "webmcp-tool-styles";
    if (!document.getElementById(styleId)) {
      const styleEl = document.createElement("style");
      styleEl.id = styleId;
      styleEl.textContent = `
        form:tool-form-active {
          outline: 2px dashed #0B4F42 !important;
          outline-offset: 4px !important;
          border-radius: 1rem !important;
        }
        button:tool-submit-active,
        input:tool-submit-active {
          outline: 2px dashed #9E232A !important;
          outline-offset: 2px !important;
        }
      `;
      document.head.appendChild(styleEl);
    }
  }, []);

  const webmcpJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebAPI",
    "name": "PT Jasa Mandiri WebMCP Agent Tools",
    "description": "Chrome WebMCP AI Agent tools for searching workers, accessing service info, contacting official consultants, and retrieving verifiable company accreditation.",
    "documentation": "https://developer.chrome.com/docs/ai/webmcp",
    "provider": {
      "@type": "LocalBusiness",
      "name": SITE_CONFIG.name,
      "url": SITE_CONFIG.url,
    },
    "potentialAction": [
      {
        "@type": "SearchAction",
        "target": `${SITE_CONFIG.url}/pekerja?kategori={kategori}&q={keahlian}`,
        "query-input": "required name=keahlian",
        "name": "cari_tenaga_kerja",
      },
      {
        "@type": "CommunicateAction",
        "target": `https://wa.me/62${SITE_CONFIG.whatsappPrimary.replace(/\D/g, "")}`,
        "name": "hubungi_konsultan_whatsapp",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(webmcpJsonLd) }}
    />
  );
}
