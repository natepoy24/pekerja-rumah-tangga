"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ArrowLeft, KeyRound, Mail, User, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("employer"); // employer or agency

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Mendaftar dengan email: ${email}, role: ${role}`);
  };

  return (
    <div className="min-h-screen bg-brand-offwhite flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-brand-sage-tint/40 blur-3xl pointer-events-none -z-10" />
      <div className="absolute -bottom-45 -left-45 w-[450px] h-[450px] rounded-full bg-brand-ruby/5 blur-3xl pointer-events-none -z-10" />

      <div className="w-full max-w-[460px] flex flex-col gap-6">
        {/* Back Link */}
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-charcoal/60 hover:text-brand-pine transition-colors self-start">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Beranda</span>
        </Link>

        {/* Card Container */}
        <div className="glass-surface p-8 md:p-10 rounded-2xl border border-outline-subtle/40 shadow-ambient">
          <div className="text-center flex flex-col items-center gap-2 mb-8">
            <Image
              src="/logo.png"
              alt="Logo PT Jasa Mandiri"
              width={64}
              height={64}
              className="w-16 h-16 object-contain mb-1"
            />
            <span className="font-serif text-3xl font-bold tracking-tight text-brand-charcoal">
              PT Jasa Mandiri
            </span>
            <p className="font-sans text-xs text-on-surface-variant uppercase tracking-widest font-semibold">
              Pendaftaran Akun Baru
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left font-sans">
            {/* Name Field */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                Nama Lengkap
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-on-surface-variant/40">
                  <User className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-outline-variant bg-transparent text-sm text-brand-charcoal placeholder-on-surface-variant/45 focus:outline-none focus:border-brand-sage focus:ring-1 focus:ring-brand-sage/50 transition-all bg-white/20"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                Alamat Email
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-on-surface-variant/40">
                  <Mail className="w-4 h-4" />
                </span>
                <input
                  type="email"
                  required
                  placeholder="name@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-outline-variant bg-transparent text-sm text-brand-charcoal placeholder-on-surface-variant/45 focus:outline-none focus:border-brand-sage focus:ring-1 focus:ring-brand-sage/50 transition-all bg-white/20"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                Kata Sandi
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-on-surface-variant/40">
                  <KeyRound className="w-4 h-4" />
                </span>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-outline-variant bg-transparent text-sm text-brand-charcoal placeholder-on-surface-variant/45 focus:outline-none focus:border-brand-sage focus:ring-1 focus:ring-brand-sage/50 transition-all bg-white/20"
                />
              </div>
            </div>

            {/* Role Select Field */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                Tipe Pengguna
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-outline-variant bg-transparent text-sm text-brand-charcoal focus:outline-none focus:border-brand-sage focus:ring-1 focus:ring-brand-sage/50 transition-all bg-white/20"
              >
                <option value="employer">Pencari Tenaga Kerja (Majikan)</option>
                <option value="agency">Tenaga Kerja / Pekerja</option>
              </select>
            </div>

            {/* Submit */}
            <Button variant="primary" type="submit" className="w-full gap-2 mt-4 py-3 justify-center">
              <UserCheck className="w-4 h-4" />
              <span>Daftar Akun Baru</span>
            </Button>
          </form>

          {/* Login Link */}
          <div className="text-center text-sm text-on-surface-variant mt-8 pt-6 border-t border-outline-variant/30">
            <span>Sudah memiliki akun? </span>
            <Link href="/login" className="font-semibold text-brand-pine hover:text-brand-sage transition-colors">
              Masuk di sini
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
