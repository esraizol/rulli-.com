'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { Search, Package, Pencil } from 'lucide-react';

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

const categories = [
  { key: 'all', label: 'Tümü' },
  { key: 'scarves', label: 'Eşarplar' },
  { key: 'belts', label: 'Kemerler' },
  { key: 'brooches', label: 'Broşlar' },
  { key: 'accessories', label: 'Aksesuarlar' },
];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

  useEffect(() => {
    fetch('/api/admin/products')
      .then((r) => r.json())
      .then((d) => setProducts(d.products ?? []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchesCat = category === 'all' || p.category === category;
      return matchesSearch && matchesCat;
    });
  }, [products, search, category]);

  const toggleFeatured = async (product: Product) => {
    const newVal = !product.isFeatured;
    setProducts((prev) => prev.map((p) => (p.id === product.id ? { ...p, isFeatured: newVal } : p)));
    await fetch('/api/admin/products', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: product.id, isFeatured: newVal }),
    });
  };

  const fmt = (price: number, currency: string) =>
    new Intl.NumberFormat('tr-TR', { style: 'currency', currency, minimumFractionDigits: 0 }).format(price);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
          <Package className="w-7 h-7 text-emerald-400" />
          Ürün Yönetimi
        </h1>
        <p className="text-gray-400 mt-1">{products.length} ürün</p>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Ürün ara..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder:text-gray-500 focus:border-emerald-400/50 focus:outline-none transition-colors"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {categories.map((c) => (
            <button
              key={c.key}
              onClick={() => setCategory(c.key)}
              className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-all ${
                category === c.key
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#1a1a2e]/60 backdrop-blur border border-white/5 rounded-xl overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-gray-500 text-xs uppercase tracking-wider border-b border-white/5">
                <th className="text-left px-6 py-4">Görsel</th>
                <th className="text-left px-6 py-4">Ürün Adı</th>
                <th className="text-left px-6 py-4">Kategori</th>
                <th className="text-left px-6 py-4">Fiyat</th>
                <th className="text-left px-6 py-4">Stok</th>
                <th className="text-center px-6 py-4">Öne Çıkan</th>
                <th className="text-center px-6 py-4">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <tr key={i} className="border-t border-white/5">
                    <td className="px-6 py-4"><div className="w-12 h-12 bg-white/5 rounded-lg animate-pulse" /></td>
                    <td className="px-6 py-4"><div className="w-32 h-4 bg-white/5 rounded animate-pulse" /></td>
                    <td className="px-6 py-4"><div className="w-20 h-4 bg-white/5 rounded animate-pulse" /></td>
                    <td className="px-6 py-4"><div className="w-16 h-4 bg-white/5 rounded animate-pulse" /></td>
                    <td className="px-6 py-4"><div className="w-16 h-4 bg-white/5 rounded animate-pulse" /></td>
                    <td className="px-6 py-4"><div className="w-10 h-5 bg-white/5 rounded-full animate-pulse mx-auto" /></td>
                    <td className="px-6 py-4"><div className="w-8 h-8 bg-white/5 rounded animate-pulse mx-auto" /></td>
                  </tr>
                ))
              ) : (
                <AnimatePresence>
                  {filtered.map((p) => (
                    <motion.tr
                      key={p.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="border-t border-white/5 hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="w-12 h-12 rounded-lg bg-white/5 overflow-hidden">
                          {p.gallery[0]?.src && (
                            <img src={p.gallery[0].src} alt={p.name} className="w-full h-full object-cover" />
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-white text-sm font-medium">{p.name}</td>
                      <td className="px-6 py-4 text-gray-400 text-sm">{categoryMap[p.category] ?? p.category}</td>
                      <td className="px-6 py-4 text-white text-sm">{fmt(p.price, p.currency)}</td>
                      <td className="px-6 py-4">
                        <span className={`text-xs px-2.5 py-1 rounded-full ${stockBadge[p.stockStatus]?.cls ?? ''}`}>
                          {stockBadge[p.stockStatus]?.label ?? p.stockStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => toggleFeatured(p)}
                          className={`relative w-10 h-5 rounded-full transition-colors ${
                            p.isFeatured ? 'bg-emerald-500' : 'bg-white/10'
                          }`}
                        >
                          <span
                            className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                              p.isFeatured ? 'left-[22px]' : 'left-0.5'
                            }`}
                          />
                        </button>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <Link
                          href={`/admin/products/${p.id}`}
                          className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white transition-colors"
                        >
                          <Pencil className="w-4 h-4" />
                        </Link>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              )}
            </tbody>
          </table>
        </div>

        {!loading && filtered.length === 0 && (
          <div className="text-center py-16 text-gray-500">
            <Package className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>Ürün bulunamadı</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
