import { create } from 'zustand';

interface FavoriteItem {
  id: string;
  type: 'product' | 'service';
  name: string;
  image: string;
}

interface FavoriteStore {
  items: FavoriteItem[];
  addItem: (item: FavoriteItem) => void;
  removeItem: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

export const useFavoriteStore = create<FavoriteStore>((set, get) => ({
  items: [],
  addItem: (item) => {
    const items = get().items;
    if (!items.find((i) => i.id === item.id)) {
      set({ items: [...items, item] });
    }
  },
  removeItem: (id) => {
    set({ items: get().items.filter((item) => item.id !== id) });
  },
  isFavorite: (id) => {
    return get().items.some((item) => item.id === id);
  }
}));