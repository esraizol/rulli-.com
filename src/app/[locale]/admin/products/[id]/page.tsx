'use client';

import { use, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { ArrowLeft, Save, Loader2, Check, Upload, Image as ImageIcon } from 'lucide-react';

interface ProductImage {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  currency: string;
  description: string;
  story: string;
  material: string;
  gallery: ProductImage[];
  stockStatus: string;
  isFeatured: boolean;
  isNew: boolean;
  shopierUrl: string;
}

const stockOptions = [
  { value: 'in_stock', label: 'Stokta' },
  { value: 'low_stock', label: 'Az Stok' },
  { value: 'out_of_stock', label: 'Tükendi' },
  { value: 'pre_order', label: 'Ön Sipariş' },
];

const currencyOptions = ['USD', 'EUR', 'TRY'];

export default function ProductEditPage(props: { params: Promise<{ id: string; locale: string }> }) {
  const { id } = use(props.params);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetch('/api/admin/products')
      .then((r) => r.json())
      .then((d) => {
        const found = (d.products ?? []).find((p: Product) => p.id === id);
        if (found) setProduct(found);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  const updateField = <K extends keyof Product>(field: K, value: Product[K]) => {
    setProduct((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const handleImageUpload = async (file: File) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', 'products');
      const res = await fetch('/api/admin/upload', { method: 'POST', body: formData });
      if (res.ok) {
        const { url } = await res.json();
        setProduct((prev) => {
          if (!prev) return prev;
          const newGallery = [{ id: `${prev.id}-1`, src: url, alt: prev.name, width: 1200, height: 1600 }];
          return { ...prev, gallery: newGallery };
        });
      }
    } catch {
      // silently fail
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!product) return;
    setSaving(true);
    try {
      const res = await fetch('/api/admin/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch {
      // silently fail
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-20 text-gray-500">
        <p className="text-lg mb-4">Ürün bulunamadı</p>
        <Link href="/admin/products" className="text-emerald-400 hover:underline">
          ← Ürünlere Dön
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Success Notification */}
      <AnimatePresence>
        {saved && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 right-4 z-50 flex items-center gap-2 px-5 py-3 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded-lg backdrop-blur"
          >
            <Check className="w-4 h-4" /> Değişiklikler kaydedildi!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/products"
            className="p-2 rounded-lg bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-white">{product.name}</h1>
            <p className="text-gray-500 text-sm">ID: {product.id}</p>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-emerald-500/20 transition-all disabled:opacity-50"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {saving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
        </motion.button>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#1a1a2e]/60 backdrop-blur border border-white/5 rounded-xl p-6"
        >
          <h3 className="text-white font-medium mb-4 flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-emerald-400" /> Ürün Görseli
          </h3>
          <div className="aspect-[3/4] bg-black/30 rounded-lg overflow-hidden mb-4">
            {product.gallery[0]?.src && (
              <img src={product.gallery[0].src} alt={product.name} className="w-full h-full object-cover" />
            )}
          </div>
          <label className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300 hover:bg-white/10 transition-colors cursor-pointer">
            {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
            {uploading ? 'Yükleniyor...' : 'Görseli Değiştir'}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleImageUpload(file);
              }}
            />
          </label>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 bg-[#1a1a2e]/60 backdrop-blur border border-white/5 rounded-xl p-6 space-y-5"
        >
          {/* Name */}
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Ürün Adı</label>
            <input
              type="text"
              value={product.name}
              onChange={(e) => updateField('name', e.target.value)}
              className="w-full bg-white/5 border border-white/10 text-white rounded-lg px-4 py-3 focus:border-emerald-400/50 focus:outline-none transition-colors"
            />
          </div>

          {/* Price & Currency */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Fiyat</label>
              <input
                type="number"
                value={product.price}
                onChange={(e) => updateField('price', Number(e.target.value))}
                className="w-full bg-white/5 border border-white/10 text-white rounded-lg px-4 py-3 focus:border-emerald-400/50 focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Para Birimi</label>
              <select
                value={product.currency}
                onChange={(e) => updateField('currency', e.target.value)}
                className="w-full bg-white/5 border border-white/10 text-white rounded-lg px-4 py-3 focus:border-emerald-400/50 focus:outline-none transition-colors"
              >
                {currencyOptions.map((c) => (
                  <option key={c} value={c} className="bg-[#1a1a2e] text-white">{c}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Açıklama</label>
            <textarea
              rows={3}
              value={product.description}
              onChange={(e) => updateField('description', e.target.value)}
              className="w-full bg-white/5 border border-white/10 text-white rounded-lg px-4 py-3 focus:border-emerald-400/50 focus:outline-none transition-colors resize-none"
            />
          </div>

          {/* Story */}
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Hikaye</label>
            <textarea
              rows={4}
              value={product.story}
              onChange={(e) => updateField('story', e.target.value)}
              className="w-full bg-white/5 border border-white/10 text-white rounded-lg px-4 py-3 focus:border-emerald-400/50 focus:outline-none transition-colors resize-none"
            />
          </div>

          {/* Material */}
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Malzeme</label>
            <input
              type="text"
              value={product.material}
              onChange={(e) => updateField('material', e.target.value)}
              className="w-full bg-white/5 border border-white/10 text-white rounded-lg px-4 py-3 focus:border-emerald-400/50 focus:outline-none transition-colors"
            />
          </div>

          {/* Stock Status */}
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Stok Durumu</label>
            <select
              value={product.stockStatus}
              onChange={(e) => updateField('stockStatus', e.target.value)}
              className="w-full bg-white/5 border border-white/10 text-white rounded-lg px-4 py-3 focus:border-emerald-400/50 focus:outline-none transition-colors"
            >
              {stockOptions.map((o) => (
                <option key={o.value} value={o.value} className="bg-[#1a1a2e] text-white">{o.label}</option>
              ))}
            </select>
          </div>

          {/* Toggles */}
          <div className="flex gap-8">
            <label className="flex items-center gap-3 cursor-pointer">
              <button
                type="button"
                onClick={() => updateField('isFeatured', !product.isFeatured)}
                className={`relative w-11 h-6 rounded-full transition-colors ${product.isFeatured ? 'bg-emerald-500' : 'bg-white/10'}`}
              >
                <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${product.isFeatured ? 'left-[22px]' : 'left-1'}`} />
              </button>
              <span className="text-sm text-gray-300">Öne Çıkan</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <button
                type="button"
                onClick={() => updateField('isNew', !product.isNew)}
                className={`relative w-11 h-6 rounded-full transition-colors ${product.isNew ? 'bg-emerald-500' : 'bg-white/10'}`}
              >
                <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${product.isNew ? 'left-[22px]' : 'left-1'}`} />
              </button>
              <span className="text-sm text-gray-300">Yeni Ürün</span>
            </label>
          </div>

          {/* Shopier URL */}
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Shopier URL</label>
            <input
              type="url"
              value={product.shopierUrl}
              onChange={(e) => updateField('shopierUrl', e.target.value)}
              className="w-full bg-white/5 border border-white/10 text-white rounded-lg px-4 py-3 focus:border-emerald-400/50 focus:outline-none transition-colors"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
