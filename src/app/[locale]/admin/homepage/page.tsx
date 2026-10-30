'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import {
  Eye,
  EyeOff,
  GripVertical,
  Save,
  Check,
  Loader2,
  Image as ImageIcon,
  LayoutTemplate,
} from 'lucide-react';

interface SectionConfig {
  id: string;
  label: string;
  visible: boolean;
  order: number;
  config: Record<string, unknown>;
}

interface HomepageData {
  sections: SectionConfig[];
}

const sectionIcons: Record<string, string> = {
  hero: '🖼️',
  'latest-collection': '✨',
  'featured-products': '⭐',
  manifesto: '📜',
  editorial: '📰',
  lookbook: '📸',
  'cross-sell': '🛍️',
  'styling-guide': '👗',
  'ai-studio': '🤖',
  'worn-by-you': '👤',
  instagram: '📱',
  journal: '📖',
  newsletter: '✉️',
};

export default function HomepageAdminPage() {
  const [sections, setSections] = useState<SectionConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [heroImage, setHeroImage] = useState('');
  const [collectionImage, setCollectionImage] = useState('');

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/homepage');
      if (res.ok) {
        const data: HomepageData = await res.json();
        setSections(data.sections.sort((a, b) => a.order - b.order));
        const hero = data.sections.find((s) => s.id === 'hero');
        if (hero?.config?.image) setHeroImage(hero.config.image as string);
        const col = data.sections.find((s) => s.id === 'latest-collection');
        if (col?.config?.image) setCollectionImage(col.config.image as string);
      }
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const toggleVisibility = (id: string) => {
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, visible: !s.visible } : s)),
    );
  };

  const handleReorder = (reordered: SectionConfig[]) => {
    setSections(reordered.map((s, i) => ({ ...s, order: i + 1 })));
  };

  const handleImageUpload = async (
    sectionId: string,
    file: File,
  ) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', sectionId === 'hero' ? 'hero' : 'editorial');

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });
      if (res.ok) {
        const { url } = await res.json();
        setSections((prev) =>
          prev.map((s) =>
            s.id === sectionId
              ? { ...s, config: { ...s.config, image: url } }
              : s,
          ),
        );
        if (sectionId === 'hero') setHeroImage(url);
        if (sectionId === 'latest-collection') setCollectionImage(url);
      }
    } catch {
      // silently fail
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/homepage', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sections }),
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

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <LayoutTemplate className="w-7 h-7 text-emerald-400" />
            Anasayfa Yönetimi
          </h1>
          <p className="text-gray-400 mt-1">
            Bölümleri sıralayın, görünürlüğünü ayarlayın ve görsellerini değiştirin
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSave}
          disabled={saving}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
            saved
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              : 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:shadow-lg hover:shadow-emerald-500/20'
          } disabled:opacity-50`}
        >
          {saving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : saved ? (
            <Check className="w-4 h-4" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          {saving ? 'Kaydediliyor...' : saved ? 'Kaydedildi!' : 'Değişiklikleri Kaydet'}
        </motion.button>
      </div>

      {/* Image Editors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#1a1a2e]/60 backdrop-blur border border-white/5 rounded-xl p-6"
        >
          <h3 className="text-white font-medium mb-4 flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-emerald-400" />
            Hero Görseli
          </h3>
          <div className="aspect-video bg-black/30 rounded-lg overflow-hidden mb-4 relative">
            {heroImage && (
              <img
                src={heroImage}
                alt="Hero"
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-black/20" />
          </div>
          <label className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300 hover:bg-white/10 transition-colors cursor-pointer">
            <ImageIcon className="w-4 h-4" />
            Görseli Değiştir
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleImageUpload('hero', file);
              }}
            />
          </label>
        </motion.div>

        {/* Collection Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#1a1a2e]/60 backdrop-blur border border-white/5 rounded-xl p-6"
        >
          <h3 className="text-white font-medium mb-4 flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-emerald-400" />
            Koleksiyon Görseli
          </h3>
          <div className="aspect-video bg-black/30 rounded-lg overflow-hidden mb-4 relative">
            {collectionImage && (
              <img
                src={collectionImage}
                alt="Collection"
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <label className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300 hover:bg-white/10 transition-colors cursor-pointer">
            <ImageIcon className="w-4 h-4" />
            Görseli Değiştir
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleImageUpload('latest-collection', file);
              }}
            />
          </label>
        </motion.div>
      </div>

      {/* Section Reorder */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-[#1a1a2e]/60 backdrop-blur border border-white/5 rounded-xl p-6"
      >
        <h3 className="text-white font-medium mb-6">
          Bölüm Sıralaması ve Görünürlük
        </h3>
        <p className="text-gray-500 text-sm mb-6">
          Bölümleri sürükleyerek sıralayın. Göz ikonuna tıklayarak görünürlüğünü değiştirin.
        </p>

        <Reorder.Group
          axis="y"
          values={sections}
          onReorder={handleReorder}
          className="space-y-2"
        >
          <AnimatePresence>
            {sections.map((section) => (
              <Reorder.Item
                key={section.id}
                value={section}
                className={`flex items-center gap-4 px-4 py-4 rounded-lg border transition-all cursor-grab active:cursor-grabbing ${
                  section.visible
                    ? 'bg-white/5 border-white/10 hover:border-white/20'
                    : 'bg-white/[0.02] border-white/5 opacity-50'
                }`}
              >
                <GripVertical className="w-5 h-5 text-gray-600 shrink-0" />

                <span className="text-xl shrink-0">
                  {sectionIcons[section.id] ?? '📄'}
                </span>

                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium truncate">
                    {section.label}
                  </p>
                  <p className="text-gray-500 text-xs">
                    Sıra: {section.order}
                  </p>
                </div>

                <button
                  onClick={() => toggleVisibility(section.id)}
                  className={`p-2 rounded-lg transition-colors ${
                    section.visible
                      ? 'text-emerald-400 hover:bg-emerald-500/10'
                      : 'text-gray-600 hover:bg-white/5'
                  }`}
                  title={section.visible ? 'Gizle' : 'Göster'}
                >
                  {section.visible ? (
                    <Eye className="w-5 h-5" />
                  ) : (
                    <EyeOff className="w-5 h-5" />
                  )}
                </button>
              </Reorder.Item>
            ))}
          </AnimatePresence>
        </Reorder.Group>
      </motion.div>
    </div>
  );
}
