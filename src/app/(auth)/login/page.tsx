"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, KeyRound, Mail, LogIn, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/client";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/admin/dashboard";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        let msg = error.message;
        if (msg.includes("Invalid login credentials")) {
          msg = "Email atau kata sandi yang Anda masukkan salah.";
        }
        setErrorMessage(msg);
        setLoading(false);
        return;
      }

      if (data.session) {
        router.push(redirectTo);
        router.refresh();
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Terjadi kesalahan saat mencoba masuk.");
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[440px] flex flex-col gap-6">
      {/* Back Link */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-charcoal/60 hover:text-brand-pine transition-colors self-start"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Kembali ke Beranda</span>
      </Link>

      {/* Card Container */}
      <div className="glass-surface p-8 md:p-10 rounded-2xl border border-outline-subtle/40 shadow-ambient bg-white/80 backdrop-blur-md">
        <div className="text-center flex flex-col items-center gap-2 mb-8">
          <Image
            src="/logo-jm.webp"
            alt="Logo PT Jasa Mandiri"
            width={64}
            height={64}
            className="w-16 h-16 object-contain mb-1"
          />
          <span className="font-serif text-3xl font-bold tracking-tight text-brand-charcoal">
            PT Jasa Mandiri
          </span>
          <p className="font-sans text-xs text-on-surface-variant uppercase tracking-widest font-semibold">
            Portal Akun Admin & Pengguna
          </p>
        </div>

        {errorMessage && (
          <div className="mb-6 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-left font-sans">
          {/* Email Field */}
          <div className="flex flex-col gap-2">
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
                disabled={loading}
                placeholder="admin@pekerjarumahtangga.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-outline-variant bg-white/50 text-sm text-brand-charcoal placeholder-on-surface-variant/45 focus:outline-none focus:border-brand-sage focus:ring-1 focus:ring-brand-sage/50 transition-all disabled:opacity-50"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-2">
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
                disabled={loading}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-outline-variant bg-white/50 text-sm text-brand-charcoal placeholder-on-surface-variant/45 focus:outline-none focus:border-brand-sage focus:ring-1 focus:ring-brand-sage/50 transition-all disabled:opacity-50"
              />
            </div>
          </div>

          {/* Submit */}
          <Button
            variant="primary"
            type="submit"
            disabled={loading}
            className="w-full gap-2 mt-2 py-3 justify-center text-sm font-semibold"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Memproses...</span>
              </>
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                <span>Masuk Sekarang</span>
              </>
            )}
          </Button>
        </form>

        {/* Register Link */}
        <div className="text-center text-sm text-on-surface-variant mt-8 pt-6 border-t border-outline-variant/30">
          <span>Belum memiliki akun admin? </span>
          <Link
            href="/register"
            className="font-semibold text-brand-pine hover:text-brand-sage transition-colors"
          >
            Daftar di sini
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-brand-offwhite flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-brand-sage-tint/40 blur-3xl pointer-events-none -z-10" />
      <div className="absolute -bottom-45 -left-45 w-[450px] h-[450px] rounded-full bg-brand-ruby/5 blur-3xl pointer-events-none -z-10" />

      <Suspense
        fallback={
          <div className="flex items-center gap-2 text-brand-pine font-medium text-sm">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Memuat halaman login...</span>
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </div>
  );
}
