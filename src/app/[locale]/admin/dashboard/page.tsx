'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { Package, Star, AlertTriangle, ArrowRight, TrendingUp } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  currency: string;
  gallery: { src: string; alt: string }[];
  stockStatus: string;
  isFeatured: boolean;
}

const categoryMap: Record<string, string> = {
  scarves: 'Eşarplar',
  belts: 'Kemerler',
  brooches: 'Broşlar',
  accessories: 'Aksesuarlar',
};

const stockBadge: Record<string, { label: string; cls: string }> = {
  in_stock: { label: 'Stokta', cls: 'bg-emerald-500/20 text-emerald-400' },
  low_stock: { label: 'Az Stok', cls: 'bg-amber-500/20 text-amber-400' },
  out_of_stock: { label: 'Tükendi', cls: 'bg-red-500/20 text-red-400' },
  pre_order: { label: 'Ön Sipariş', cls: 'bg-blue-500/20 text-blue-400' },
};

export default function DashboardPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/products')
      .then((r) => r.json())
      .then((d) => setProducts(d.products ?? []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const total = products.length;
  const featured = products.filter((p) => p.isFeatured).length;
  const outOfStock = products.filter((p) => p.stockStatus === 'out_of_stock').length;

  const fmt = (price: number, currency: string) =>
    new Intl.NumberFormat('tr-TR', { style: 'currency', currency, minimumFractionDigits: 0 }).format(price);

  const stats = [
    { icon: Package, label: 'Toplam Ürün', value: total, gradient: 'from-emerald-500/20 to-emerald-500/5', iconColor: 'text-emerald-400' },
    { icon: Star, label: 'Öne Çıkan', value: featured, gradient: 'from-blue-500/20 to-blue-500/5', iconColor: 'text-blue-400' },
    { icon: AlertTriangle, label: 'Stokta Yok', value: outOfStock, gradient: 'from-red-500/20 to-red-500/5', iconColor: 'text-red-400' },
  ];

  const today = new Date().toLocaleDateString('tr-TR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
          <TrendingUp className="w-7 h-7 text-emerald-400" />
          Hoş Geldiniz
        </h1>
        <p className="text-gray-400 mt-1">{today}</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`bg-gradient-to-br ${s.gradient} backdrop-blur border border-white/5 rounded-xl p-6`}
          >
            <s.icon className={`w-8 h-8 ${s.iconColor} mb-3`} />
            <p className="text-gray-400 text-sm">{s.label}</p>
            <p className="text-3xl font-bold text-white mt-1">
              {loading ? '—' : s.value}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="flex gap-4">
        <Link
          href="/admin/products"
          className="flex items-center gap-2 px-5 py-3 bg-white/5 border border-white/10 rounded-lg text-sm text-white hover:bg-white/10 transition-colors"
        >
          <Package className="w-4 h-4" /> Ürünleri Yönet <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          href="/admin/homepage"
          className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg text-sm text-white font-medium hover:shadow-lg hover:shadow-emerald-500/20 transition-all"
        >
          Anasayfayı Düzenle <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Recent Products */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-[#1a1a2e]/60 backdrop-blur border border-white/5 rounded-xl overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-white/5">
          <h2 className="text-white font-medium">Son Ürünler</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-gray-500 text-xs uppercase tracking-wider">
                <th className="text-left px-6 py-3">Görsel</th>
                <th className="text-left px-6 py-3">Ürün</th>
                <th className="text-left px-6 py-3">Kategori</th>
                <th className="text-left px-6 py-3">Fiyat</th>
                <th className="text-left px-6 py-3">Stok</th>
              </tr>
            </thead>
            <tbody>
              {!loading &&
                products.slice(0, 5).map((p) => (
                  <tr key={p.id} className="border-t border-white/5 hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-3">
                      <div className="w-10 h-10 rounded-lg bg-white/5 overflow-hidden">
                        {p.gallery[0]?.src && (
                          <img src={p.gallery[0].src} alt={p.name} className="w-full h-full object-cover" />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-3 text-white text-sm">{p.name}</td>
                    <td className="px-6 py-3 text-gray-400 text-sm">{categoryMap[p.category] ?? p.category}</td>
                    <td className="px-6 py-3 text-white text-sm">{fmt(p.price, p.currency)}</td>
                    <td className="px-6 py-3">
                      <span className={`text-xs px-2 py-1 rounded-full ${stockBadge[p.stockStatus]?.cls ?? ''}`}>
                        {stockBadge[p.stockStatus]?.label ?? p.stockStatus}
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
