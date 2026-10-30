import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem } from '@/types/order';

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (productId: string, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  itemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      addItem: (productId, quantity = 1) => set((state) => {
        const existing = state.items.find((item) => item.productId === productId);
        if (existing) {
          return { items: state.items.map((item) => item.productId === productId ? { ...item, quantity: item.quantity + quantity } : item) };
        }
        return { items: [...state.items, { productId, quantity, addedAt: new Date().toISOString() }] };
      }),
      removeItem: (productId) => set((state) => ({ items: state.items.filter((item) => item.productId !== productId) })),
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) { get().removeItem(productId); return; }
        set((state) => ({ items: state.items.map((item) => item.productId === productId ? { ...item, quantity } : item) }));
      },
      clearCart: () => set({ items: [] }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      itemCount: () => get().items.reduce((total, item) => total + item.quantity, 0),
    }),
    { name: 'rullie-cart' }
  )
);
