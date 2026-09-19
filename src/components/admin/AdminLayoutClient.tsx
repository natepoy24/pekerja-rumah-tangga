"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  UserPlus,
  FileText,
  FilePlus,
  Settings,
  Globe,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  ArrowLeft,
  ShieldCheck,
  ExternalLink,
  LogOut,
  Briefcase,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { SITE_CONFIG } from "@/lib/siteConfig";

interface AdminLayoutClientProps {
  children: React.ReactNode;
}

export default function AdminLayoutClient({ children }: AdminLayoutClientProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    async function loadUser() {
      const supabase = createClient();
      const { data } = await supabase.auth.getUser();
      if (data.user?.email) {
        setUserEmail(data.user.email);
      }
    }
    loadUser();
  }, []);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      router.push("/login");
      router.refresh();
    } catch (err) {
      console.error("Gagal logout:", err);
      setIsLoggingOut(false);
    }
  };

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const navGroups = [
    {
      group: "Utama",
      items: [
        {
          href: "/admin/dashboard",
          label: "Dashboard Ringkasan",
          icon: LayoutDashboard,
          exact: true,
        },
      ],
    },
    {
      group: "Manajemen Pekerja",
      items: [
        {
          href: "/admin/dashboard/pekerja",
          label: "Daftar Pekerja",
          icon: Users,
          exact: true,
        },
        {
          href: "/admin/dashboard/pekerja/tambah",
          label: "Tambah Pekerja",
          icon: UserPlus,
        },
      ],
    },
    {
      group: "Manajemen Artikel",
      items: [
        {
          href: "/admin/dashboard/artikel",
          label: "Kelola Artikel",
          icon: FileText,
          exact: true,
        },
        {
          href: "/admin/dashboard/artikel/tambah",
          label: "Tulis Artikel Baru",
          icon: FilePlus,
        },
      ],
    },
    {
      group: "Manajemen Lowongan",
      items: [
        {
          href: "/admin/dashboard/lowongan",
          label: "Kelola Lowongan",
          icon: Briefcase,
          exact: true,
        },
        {
          href: "/admin/dashboard/lowongan/tambah",
          label: "Tambah Lowongan",
          icon: FilePlus,
        },
      ],
    },
    {
      group: "Konfigurasi Situs",
      items: [
        {
          href: "/admin/dashboard/pengaturan",
          label: "Pengaturan Web & SEO",
          icon: Settings,
        },
      ],
    },
  ];

  const isCurrentActive = (itemHref: string, exact?: boolean) => {
    if (exact) return pathname === itemHref;
    return pathname?.startsWith(itemHref);
  };

  const isDashboardRoot = pathname === "/admin/dashboard";

  return (
    <div className="min-h-screen bg-[#FAFAF7] font-sans flex text-[#14201D]">
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 bg-white border-r border-[#D5E8D0] flex flex-col justify-between transition-all duration-300 shadow-sm
          ${isCollapsed ? "lg:w-20" : "lg:w-64"}
          ${mobileOpen ? "translate-x-0 w-72" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Sidebar Header / Brand */}
        <div>
          <div className="h-20 flex items-center justify-between px-4 border-b border-[#D5E8D0]">
            <Link
              href="/admin/dashboard"
              className={`flex items-center gap-3 overflow-hidden ${isCollapsed ? "justify-center w-full" : ""}`}
            >
              <div className="w-10 h-10 rounded-xl bg-[#EBF4E7] p-1 flex items-center justify-center shrink-0 border border-[#D5E8D0]">
                <Image
                  src="/logo-jm.webp"
                  alt={`Logo ${SITE_CONFIG.name}`}
                  width={36}
                  height={36}
                  className="w-8 h-8 object-contain"
                />
              </div>
              {!isCollapsed && (
                <div className="flex flex-col min-w-0">
                  <span className="font-serif font-bold text-base text-[#0B4F42] leading-tight truncate">
                    {SITE_CONFIG.shortName || SITE_CONFIG.name}
                  </span>
                  <span className="text-[10px] tracking-widest uppercase font-semibold text-on-surface-variant/70">
                    CMS Management
                  </span>
                </div>
              )}
            </Link>

            {/* Mobile Close Button */}
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="p-2 rounded-xl text-on-surface-variant hover:bg-[#EBF4E7] lg:hidden"
              aria-label="Tutup menu sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Items */}
          <div className="p-3 space-y-6 overflow-y-auto max-h-[calc(100vh-160px)]">
            {navGroups.map((group, gIdx) => (
              <div key={gIdx} className="space-y-1">
                {!isCollapsed && (
                  <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-on-surface-variant/60 mb-2">
                    {group.group}
                  </p>
                )}
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const active = isCurrentActive(item.href, item.exact);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      title={isCollapsed ? item.label : undefined}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${active
                        ? "bg-[#0B4F42] text-white shadow-sm shadow-[#0B4F42]/15"
                        : "text-[#14201D]/80 hover:bg-[#EBF4E7] hover:text-[#0B4F42]"
                        } ${isCollapsed ? "justify-center" : ""}`}
                    >
                      <Icon className={`w-4 h-4 shrink-0 ${active ? "text-emerald-300" : "text-[#0B4F42]"}`} />
                      {!isCollapsed && <span className="truncate">{item.label}</span>}
                    </Link>
                  );
                })}
              </div>
            ))}

            {/* Quick External Link */}
            <div className="pt-2 border-t border-[#D5E8D0]">
              <Link
                href="/"
                target="_blank"
                title={isCollapsed ? "Lihat Website Publik" : undefined}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-emerald-800 hover:bg-emerald-50 transition-colors ${isCollapsed ? "justify-center" : ""
                  }`}
              >
                <Globe className="w-4 h-4 text-[#3E7B28] shrink-0" />
                {!isCollapsed && (
                  <span className="flex items-center gap-1.5 truncate">
                    <span>Lihat Website</span>
                    <ExternalLink className="w-3 h-3 text-emerald-600" />
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>

        {/* Sidebar Footer: Logout & Minimize Button */}
        <div className="p-3 border-t border-[#D5E8D0] space-y-1">
          <button
            type="button"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className={`w-full flex items-center gap-2.5 p-2.5 rounded-xl text-xs font-semibold text-red-700 hover:bg-red-50 transition-colors ${isCollapsed ? "justify-center" : ""
              }`}
            title={isCollapsed ? "Keluar Akun" : undefined}
          >
            <LogOut className="w-4 h-4 text-red-600 shrink-0" />
            {!isCollapsed && <span className="truncate">{isLoggingOut ? "Keluar..." : "Keluar Akun"}</span>}
          </button>

          <button
            type="button"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex w-full items-center justify-center gap-2 p-2.5 rounded-xl text-xs font-semibold text-on-surface-variant hover:bg-[#EBF4E7] hover:text-[#0B4F42] transition-colors"
            aria-label={isCollapsed ? "Perluas Sidebar" : "Ciutkan Sidebar"}
            title={isCollapsed ? "Perluas Sidebar" : "Ciutkan Sidebar"}
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4 text-[#0B4F42]" />
            ) : (
              <>
                <ChevronLeft className="w-4 h-4 text-[#0B4F42]" />
                <span className="text-[11px]">Ciutkan Sidebar</span>
              </>
            )}
          </button>
        </div>
      </aside>

      {/* Main Layout Area */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${isCollapsed ? "lg:pl-20" : "lg:pl-64"
          }`}
      >
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-[#D5E8D0] h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            {/* Mobile Hamburger */}
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 rounded-xl text-[#14201D] hover:bg-[#EBF4E7] transition-colors"
              aria-label="Buka menu navigasi"
            >
              <Menu className="w-5 h-5 text-[#0B4F42]" />
            </button>

            {/* Back Button (Arrow Backward) - always present & visible on all pages, including mobile */}
            <button
              type="button"
              onClick={() => {
                if (isDashboardRoot) {
                  router.push("/");
                } else {
                  router.back();
                }
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#EBF4E7] hover:bg-[#D5E8D0] text-[#0B4F42] text-xs font-bold transition-all active:scale-95 shadow-xs border border-[#D5E8D0]"
              title={isDashboardRoot ? "Kembali ke Website Publik" : "Kembali ke halaman sebelumnya"}
              aria-label="Kembali"
            >
              <ArrowLeft className="w-4 h-4 shrink-0" />
              <span className="font-bold">Kembali</span>
            </button>

            {/* Breadcrumb Indicator */}
            <div className="flex items-center gap-1 text-xs text-on-surface-variant font-medium">
              <span className="text-[#0B4F42] font-semibold">Admin</span>
              <span>/</span>
              <span className="truncate max-w-[160px] sm:max-w-xs font-bold text-[#14201D]">
                {pathname === "/admin/dashboard"
                  ? "Dashboard"
                  : pathname?.replace("/admin/dashboard/", "").replace(/\//g, " / ").toUpperCase()}
              </span>
            </div>
          </div>

          {/* Right Header Status & Action */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="truncate max-w-[180px]">{userEmail ? userEmail : "Terhubung"}</span>
            </div>

            <Link
              href="/"
              target="_blank"
              className="px-3.5 py-1.5 rounded-xl border border-[#0B4F42] text-[#0B4F42] hover:bg-[#EBF4E7] text-xs font-semibold transition-colors flex items-center gap-1.5"
            >
              <span>Situs Publik</span>
              <ExternalLink className="w-3 h-3" />
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="px-3.5 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-semibold transition-colors flex items-center gap-1.5 disabled:opacity-50"
              title="Keluar dari Akun Admin"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isLoggingOut ? "Keluar..." : "Keluar"}</span>
            </button>
          </div>
        </header>

        {/* Children Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
