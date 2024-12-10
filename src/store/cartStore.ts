import { create } from 'zustand';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  variant?: {
    id: number;
    size: string;
    price: number;
  };
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  total: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  addItem: (item) => {
    const items = get().items;
    const existingItem = items.find((i) => 
      i.id === item.id && i.variant?.id === item.variant?.id
    );

    if (existingItem) {
      set({
        items: items.map((i) =>
          i.id === item.id && i.variant?.id === item.variant?.id
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        ),
      });
    } else {
      set({ items: [...items, item] });
    }
  },
  removeItem: (id) => {
    set({ items: get().items.filter((item) => item.id !== id) });
  },
  updateQuantity: (id, quantity) => {
    set({
      items: get().items.map((item) =>
        item.id === id ? { ...item, quantity } : item
      ),
    });
  },
  clearCart: () => set({ items: [] }),
  total: () => {
    return get().items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  },
}));