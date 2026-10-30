'use client';

import { useState, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Package,
  Home,
  ExternalLink,
  LogOut,
  Menu,
  X,
  Loader2,
} from 'lucide-react';
import { Link, usePathname } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { AdminLoginPage } from './login-content';

interface AdminLayoutProps {
  children: ReactNode;
}

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  {
    label: 'Dashboard',
    href: '/admin/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'Ürünler',
    href: '/admin/products',
    icon: Package,
  },
  {
    label: 'Anasayfa',
    href: '/admin/homepage',
    icon: Home,
  },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [loggingOut, setLoggingOut] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Check auth on mount
  useEffect(() => {
    let isMounted = true;

    async function checkAuth() {
      try {
        const res = await fetch('/api/admin/auth', { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          if (isMounted) {
            setIsAuthenticated(!!data.authenticated);
          }
        } else {
          if (isMounted) setIsAuthenticated(false);
        }
      } catch {
        if (isMounted) setIsAuthenticated(false);
      }
    }

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  // Close mobile sidebar on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    if (loggingOut) return;
    setLoggingOut(true);

    try {
      await fetch('/api/admin/auth', {
        method: 'DELETE',
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsAuthenticated(false);
      setLoggingOut(false);
    }
  };

  // Initial authentication loading state
  if (isAuthenticated === null) {
    return (
      <div className="fixed inset-0 z-[10000] bg-[#0a0a0f] flex flex-col items-center justify-center text-white select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="flex items-center gap-2.5">
            <span className="font-heading text-xl font-bold tracking-[0.25em] text-white">
              RULLIÉ
            </span>
            <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-md">
              Admin
            </span>
          </div>
          <Loader2 className="w-5 h-5 text-emerald-400 animate-spin" />
        </motion.div>
      </div>
    );
  }

  // Not authenticated: Render login content
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-[10000] bg-[#0a0a0f] overflow-y-auto">
        <AdminLoginPage onSuccess={() => setIsAuthenticated(true)} />
      </div>
    );
  }

  // Determine current section title for header breadcrumb
  const currentNavItem = navItems.find(
    (item) =>
      pathname === item.href ||
      (item.href === '/admin/dashboard' && pathname === '/admin') ||
      (item.href !== '/admin/dashboard' && pathname.startsWith(item.href))
  );
  const pageTitle = currentNavItem ? currentNavItem.label : 'Yönetim Paneli';

  return (
    <div className="fixed inset-0 z-[10000] bg-[#0a0a0f] text-gray-200 flex overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar (260px wide) */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-[260px] bg-[#12121a]/80 backdrop-blur-xl border-r border-white/5 flex flex-col justify-between transition-transform duration-300 md:static md:translate-x-0',
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex flex-col flex-1 min-h-0">
          {/* Logo / Brand Header */}
          <div className="h-16 px-6 border-b border-white/5 flex items-center justify-between shrink-0">
            <Link
              href="/admin/dashboard"
              className="flex items-center gap-2.5 group"
            >
              <span className="font-heading text-lg font-bold tracking-[0.2em] text-white group-hover:text-emerald-400 transition-colors">
                RULLIÉ
              </span>
              <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-md">
                Admin
              </span>
            </Link>

            {/* Mobile close button */}
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="md:hidden p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
              aria-label="Menüyü kapat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Section */}
          <div className="px-4 py-6 flex-1 overflow-y-auto">
            <div className="mb-6">
              <p className="px-3 mb-2.5 text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                Yönetim
              </p>

              <nav className="space-y-1">
                {navItems.map((item) => {
                  const isActive =
                    pathname === item.href ||
                    (item.href === '/admin/dashboard' && pathname === '/admin') ||
                    (item.href !== '/admin/dashboard' && pathname.startsWith(item.href));
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        'relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group',
                        isActive
                          ? 'text-white bg-gradient-to-r from-emerald-500/20 via-emerald-500/10 to-transparent border border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.12)]'
                          : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
                      )}
                    >
                      <Icon
                        className={cn(
                          'w-4 h-4 shrink-0 transition-colors',
                          isActive
                            ? 'text-emerald-400'
                            : 'text-gray-400 group-hover:text-white'
                        )}
                      />
                      <span className="truncate">{item.label}</span>

                      {isActive && (
                        <motion.div
                          layoutId="activeNavPill"
                          className="absolute left-0 top-2 bottom-2 w-1 bg-gradient-to-b from-emerald-400 to-teal-500 rounded-r-full"
                          transition={{
                            type: 'spring',
                            stiffness: 350,
                            damping: 30,
                          }}
                        />
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>

        {/* Sidebar Footer Link */}
        <div className="p-4 border-t border-white/5 shrink-0">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium text-gray-400 hover:text-white hover:bg-white/[0.05] transition-all group"
          >
            <span className="flex items-center gap-2.5">
              <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-emerald-400 transition-colors" />
              <span>Siteyi Görüntüle</span>
            </span>
            <span className="text-[11px] text-gray-600 group-hover:text-emerald-400 transition-colors">
              ↗
            </span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Header Bar */}
        <header className="h-16 px-4 md:px-8 border-b border-white/5 bg-[#12121a]/50 backdrop-blur-md flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
              aria-label="Menüyü aç"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Breadcrumb / Page Title */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-gray-500">Yönetim</span>
              <span className="text-gray-700">/</span>
              <span className="text-white font-medium">{pageTitle}</span>
            </div>
          </div>

          {/* Top Right Logout Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium text-gray-400 hover:text-rose-300 hover:bg-rose-500/10 border border-white/5 hover:border-rose-500/20 transition-all duration-200 disabled:opacity-50 cursor-pointer"
              title="Yönetim panelinden çıkış yap"
            >
              {loggingOut ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <LogOut className="w-3.5 h-3.5" />
              )}
              <span>Çıkış Yap</span>
            </button>
          </div>
        </header>

        {/* Content Body with smooth page transitions */}
        <main className="flex-1 overflow-y-auto bg-[#0a0a0f] p-4 md:p-8">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="w-full h-full"
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
