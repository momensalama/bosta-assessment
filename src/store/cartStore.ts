import { create } from "zustand";
import type { CartItem, Product } from "../types";

interface CartState {
  items: CartItem[];
  cartCount: number;
  total: number;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQty: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

function computeCartTotals(items: CartItem[]) {
  return {
    cartCount: items.reduce((sum, i) => sum + i.quantity, 0),
    total: items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
  };
}

export const useCartStore = create<CartState>()((set) => ({
  items: [],
  cartCount: 0,
  total: 0,

  addToCart: (product) =>
    set((state) => {
      const existing = state.items.find((i) => i.product.id === product.id);
      const items = existing
        ? state.items.map((i) =>
            i.product.id === product.id
              ? { ...i, quantity: i.quantity + 1 }
              : i,
          )
        : [...state.items, { product, quantity: 1 }];
      return { items, ...computeCartTotals(items) };
    }),

  removeFromCart: (productId) =>
    set((state) => {
      const items = state.items.filter((i) => i.product.id !== productId);
      return { items, ...computeCartTotals(items) };
    }),

  updateQty: (productId, quantity) =>
    set((state) => {
      const items =
        quantity <= 0
          ? state.items.filter((i) => i.product.id !== productId)
          : state.items.map((i) =>
              i.product.id === productId ? { ...i, quantity } : i,
            );
      return { items, ...computeCartTotals(items) };
    }),

  clearCart: () => {
    const items: CartItem[] = [];
    return set({ items, ...computeCartTotals(items) });
  },
}));
