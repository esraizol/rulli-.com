'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Eye, EyeOff, Loader2, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { Link } from '@/i18n/routing';

interface AdminLoginPageProps {
  onSuccess?: () => void;
}

export function AdminLoginPage({ onSuccess }: AdminLoginPageProps) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim() || loading) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || 'Geçersiz şifre. Lütfen tekrar deneyin.');
        setLoading(false);
        return;
      }

      if (onSuccess) {
        onSuccess();
      }
    } catch {
      setError('Bağlantı hatası oluştu. Lütfen tekrar deneyin.');
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#0a0a0f] flex items-center justify-center p-4 overflow-hidden select-none">
      {/* Background ambient glow effects */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[140px] opacity-70" />
      <div className="pointer-events-none absolute -bottom-40 left-1/3 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[140px] opacity-50" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-md z-10"
      >
        {/* Glassmorphism Card */}
        <div className="relative rounded-2xl bg-white/[0.04] backdrop-blur-2xl border border-white/10 p-8 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden">
          {/* Subtle top edge highlight */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />

          {/* Header & Brand */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-4 shadow-[0_0_24px_rgba(16,185,129,0.2)]">
              <ShieldCheck className="w-6 h-6" />
            </div>

            <div className="flex items-center justify-center gap-2 mb-2">
              <h1 className="font-heading text-2xl font-bold tracking-[0.25em] text-white">
                RULLIÉ
              </h1>
              <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-md">
                Admin
              </span>
            </div>

            <p className="text-gray-400 text-sm">
              Devam etmek için yönetici şifrenizi girin
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="admin-password"
                className="block text-xs font-medium uppercase tracking-wider text-gray-400 mb-2"
              >
                Yönetici Şifresi
              </label>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                  <Lock className="w-4 h-4" />
                </div>

                <input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  autoFocus
                  required
                  disabled={loading}
                  className="w-full pl-10 pr-11 py-3 text-sm text-white placeholder-gray-600 bg-white/[0.03] border border-white/10 rounded-xl focus:border-emerald-500/60 focus:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-500 hover:text-gray-300 transition-colors cursor-pointer"
                  aria-label={showPassword ? 'Şifreyi gizle' : 'Şifreyi göster'}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -8 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                    <span>{error}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !password.trim()}
              className="w-full relative group overflow-hidden rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 p-[1px] font-medium text-white shadow-[0_10px_30px_rgba(16,185,129,0.25)] hover:shadow-[0_12px_36px_rgba(16,185,129,0.35)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 cursor-pointer"
            >
              <div className="relative flex items-center justify-center gap-2 py-3 px-4 rounded-[11px] bg-emerald-600/90 group-hover:bg-emerald-500/90 transition-colors duration-200">
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm font-medium">Doğrulanıyor...</span>
                  </>
                ) : (
                  <>
                    <span className="text-sm font-medium tracking-wide">Giriş Yap</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </>
                )}
              </div>
            </button>
          </form>

          {/* Footer Back to site link */}
          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-300 transition-colors"
            >
              <span>←</span>
              <span>Siteyi Görüntüle</span>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default AdminLoginPage;
