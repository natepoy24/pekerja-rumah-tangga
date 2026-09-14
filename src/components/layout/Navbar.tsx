"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { Menu, X, Phone, ChevronDown, HeartHandshake, Baby, HeartPulse, LayoutDashboard, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { CompanyIdentity } from "@/lib/settings";

interface NavbarProps {
  company?: CompanyIdentity;
}

export function Navbar({ company }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const waNumber = company?.nomor_whatsapp || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "6285111399962";
  const companyName = company?.nama_perusahaan || "PT Jasa Mandiri";
  const subtagline = company?.subtagline || "Premium Domestic Care";
  const logoUrl = company?.logo_url || "/logo-jm.webp";

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const serviceItems = [
    {
      href: "/layanan/art",
      label: "Asisten Rumah Tangga (ART)",
      desc: "Pembersihan rumah, memasak, dan kebersihan harian.",
      icon: HeartHandshake,
    },
    {
      href: "/layanan/baby-sitter",
      label: "Baby Sitter & Nanny",
      desc: "Pengasuhan bayi & anak dengan kasih sayang terampil.",
      icon: Baby,
    },
    {
      href: "/layanan/perawat-lansia",
      label: "Perawat Lansia (Elder Care)",
      desc: "Pendampingan medis & aktivitas lansia penuh kesabaran.",
      icon: HeartPulse,
    },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#D5E8D0] shadow-sm transition-all duration-300 font-sans">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src={logoUrl}
              alt={`Logo ${companyName}`}
              width={48}
              height={48}
              className="w-11 h-11 object-contain group-hover:scale-105 transition-transform rounded-md"
            />
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#0B4F42] leading-tight">
                {companyName}
              </span>
              <span className="font-sans text-[10px] tracking-[0.18em] uppercase text-on-surface-variant font-medium">
                {subtagline}
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-7">
            <Link
              href="/"
              className={`font-sans text-sm font-medium transition-colors relative py-1 ${pathname === "/" ? "text-[#0B4F42] font-semibold" : "text-[#14201D]/80 hover:text-[#0B4F42]"
                }`}
            >
              Beranda
            </Link>

            {/* Dropdown Menu Layanan */}
            <div
              className="relative flex items-center"
              ref={dropdownRef}
              onMouseEnter={() => setDropdownOpen(true)}
            >
              <Link
                href="/layanan"
                className={`font-sans text-sm font-medium transition-colors py-1 ${pathname?.startsWith("/layanan")
                  ? "text-[#0B4F42] font-semibold"
                  : "text-[#14201D]/80 hover:text-[#0B4F42]"
                  }`}
              >
                Layanan Kami
              </Link>
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="p-1 ml-0.5 text-[#14201D]/70 hover:text-[#0B4F42] transition-colors"
                aria-label="Buka menu layanan"
              >
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${dropdownOpen ? "rotate-180 text-[#0B4F42]" : ""
                    }`}
                />
              </button>

              {dropdownOpen && (
                <div
                  onMouseLeave={() => setDropdownOpen(false)}
                  className="absolute top-full left-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-[#D5E8D0] p-2 space-y-1 animate-in fade-in slide-in-from-top-2 duration-150 z-50"
                >
                  <Link
                    href="/layanan"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center justify-between px-3 py-2 text-xs font-bold text-[#0B4F42] bg-[#EBF4E7]/70 hover:bg-[#EBF4E7] rounded-xl transition-colors mb-1"
                  >
                    <span>Semua Layanan & Paket</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  {serviceItems.map((item) => {
                    const ItemIcon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-start gap-3 p-3 rounded-xl hover:bg-[#EBF4E7] transition-colors group/item"
                      >
                        <div className="w-9 h-9 rounded-lg bg-[#EBF4E7] text-[#0B4F42] group-hover/item:bg-[#0B4F42] group-hover/item:text-white flex items-center justify-center shrink-0 transition-colors">
                          <ItemIcon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-[#14201D] group-hover/item:text-[#0B4F42]">
                            {item.label}
                          </p>
                          <p className="text-xs text-on-surface-variant/80 mt-0.5 leading-snug">
                            {item.desc}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            <Link
              href="/pekerja"
              className={`font-sans text-sm font-medium transition-colors relative py-1 ${pathname === "/pekerja" ? "text-[#0B4F42] font-semibold" : "text-[#14201D]/80 hover:text-[#0B4F42]"
                }`}
            >
              List Pekerja
            </Link>

            <Link
              href="/artikel"
              className={`font-sans text-sm font-medium transition-colors relative py-1 ${pathname?.startsWith("/artikel") ? "text-[#0B4F42] font-semibold" : "text-[#14201D]/80 hover:text-[#0B4F42]"
                }`}
            >
              Artikel
            </Link>

            <Link
              href="/tentang-kami"
              className={`font-sans text-sm font-medium transition-colors relative py-1 ${pathname === "/tentang-kami" ? "text-[#0B4F42] font-semibold" : "text-[#14201D]/80 hover:text-[#0B4F42]"
                }`}
            >
              Tentang Kami
            </Link>

            <Link
              href="/kontak"
              className={`font-sans text-sm font-medium transition-colors relative py-1 ${pathname === "/kontak" ? "text-[#0B4F42] font-semibold" : "text-[#14201D]/80 hover:text-[#0B4F42]"
                }`}
            >
              Kontak Kami
            </Link>
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Button href="/admin/dashboard" variant="ghost" size="sm" className="gap-1.5 text-xs text-[#0B4F42] hover:bg-[#EBF4E7]">
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu Navigation"
            className="lg:hidden p-2 min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-lg text-[#14201D] hover:text-[#0B4F42] hover:bg-surface-container-low transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-md border-t border-[#D5E8D0] px-6 py-6 absolute left-0 right-0 top-20 shadow-xl flex flex-col gap-3 animate-in slide-in-from-top duration-200">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="font-sans text-base py-2.5 px-3 min-h-[44px] inline-flex items-center rounded-lg text-[#14201D] hover:bg-[#EBF4E7]"
          >
            Beranda
          </Link>

          <div className="space-y-1 pl-3 border-l-2 border-[#D5E8D0]">
            <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant/70 block px-3 py-1">
              Layanan Utama
            </span>
            <Link
              href="/layanan"
              onClick={() => setIsOpen(false)}
              className="block text-sm font-bold text-[#0B4F42] py-2 px-3 min-h-[44px] inline-flex items-center rounded-md hover:bg-[#EBF4E7]"
            >
              ✦ Lihat Semua Layanan
            </Link>
            {serviceItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block text-sm font-medium text-[#14201D] hover:text-[#0B4F42] py-2 px-3 min-h-[44px] inline-flex items-center rounded-md hover:bg-[#EBF4E7]"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <Link
            href="/pekerja"
            onClick={() => setIsOpen(false)}
            className="font-sans text-base py-2.5 px-3 min-h-[44px] inline-flex items-center rounded-lg text-[#14201D] hover:bg-[#EBF4E7]"
          >
            Katalog Pekerja
          </Link>

          <Link
            href="/lowongan-kerja"
            onClick={() => setIsOpen(false)}
            className="font-sans text-base py-2.5 px-3 min-h-[44px] inline-flex items-center rounded-lg text-[#14201D] hover:bg-[#EBF4E7]"
          >
            Lowongan Kerja
          </Link>

          <Link
            href="/artikel"
            onClick={() => setIsOpen(false)}
            className="font-sans text-base py-2.5 px-3 min-h-[44px] inline-flex items-center rounded-lg text-[#14201D] hover:bg-[#EBF4E7]"
          >
            Artikel
          </Link>

          <Link
            href="/tentang-kami"
            onClick={() => setIsOpen(false)}
            className="font-sans text-base py-2.5 px-3 min-h-[44px] inline-flex items-center rounded-lg text-[#14201D] hover:bg-[#EBF4E7]"
          >
            Tentang Kami
          </Link>

          <Link
            href="/kontak"
            onClick={() => setIsOpen(false)}
            className="font-sans text-base py-2.5 px-3 min-h-[44px] inline-flex items-center rounded-lg text-[#14201D] hover:bg-[#EBF4E7]"
          >
            Kontak Kami
          </Link>

          <div className="flex flex-col gap-2.5 pt-2">
            <Button href="/admin/dashboard" onClick={() => setIsOpen(false)} variant="ghost" className="w-full justify-center gap-2">
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard Admin</span>
            </Button>
            <Button
              href={`https://wa.me/${waNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              variant="compassionate"
              className="w-full justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>Konsultasi WA Sekarang</span>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
