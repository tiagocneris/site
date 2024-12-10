import { create } from 'zustand';
import { format, subDays, isWithinInterval, startOfYear } from 'date-fns';
import { sortOrders } from '../utils/orderUtils';

interface OrderItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

interface Seller {
  id: string;
  name: string;
}

export interface Order {
  id: string;
  date: Date;
  status: string;
  total: number;
  items: OrderItem[];
  seller: Seller;
}

interface OrderHistoryState {
  orders: Order[];
  filteredOrders: Order[];
  sortBy: string;
  filterOrders: (searchTerm: string, status: string, dateRange: string) => void;
  setSortBy: (sortBy: string) => void;
  getOrderStats: () => {
    total: number;
    processing: number;
    inTransit: number;
    delivered: number;
  };
}

export const useOrderHistoryStore = create<OrderHistoryState>((set, get) => ({
  orders: [
    {
      id: 'PED123456',
      date: new Date('2024-03-15'),
      status: 'delivered',
      total: 189.90,
      items: [
        {
          id: 1,
          name: 'Ração Premium Adulto',
          quantity: 2,
          price: 89.95,
          image: 'https://images.unsplash.com/photo-1585499193151-0f50d54c4e54?auto=format&fit=crop&q=80'
        }
      ],
      seller: {
        name: 'Pet Shop Feliz',
        id: 'SELLER123'
      }
    },
    {
      id: 'PED123457',
      date: new Date('2024-03-14'),
      status: 'processing',
      total: 79.90,
      items: [
        {
          id: 2,
          name: 'Kit Brinquedos',
          quantity: 1,
          price: 79.90,
          image: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&q=80'
        }
      ],
      seller: {
        name: 'Pet Toys Store',
        id: 'SELLER124'
      }
    }
  ],
  filteredOrders: [],
  sortBy: 'date-desc',
  filterOrders: (searchTerm, status, dateRange) => {
    const orders = get().orders;
    let filtered = [...orders];

    // Search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(order => 
        order.items.some(item => item.name.toLowerCase().includes(searchLower)) ||
        order.seller.name.toLowerCase().includes(searchLower)
      );
    }

    // Status filter
    if (status !== 'all') {
      filtered = filtered.filter(order => order.status === status);
    }

    // Date range filter
    if (dateRange !== 'all') {
      const today = new Date();
      const ranges = {
        last7: subDays(today, 7),
        last30: subDays(today, 30),
        last90: subDays(today, 90),
        thisYear: startOfYear(today)
      };

      if (dateRange in ranges) {
        filtered = filtered.filter(order =>
          isWithinInterval(order.date, {
            start: ranges[dateRange as keyof typeof ranges],
            end: today
          })
        );
      }
    }

    // Sort filtered orders
    filtered = sortOrders(filtered, get().sortBy);

    set({ filteredOrders: filtered });
  },
  setSortBy: (sortBy) => {
    set({ sortBy });
    const { searchTerm, status, dateRange } = get();
    get().filterOrders(searchTerm || '', status || 'all', dateRange || 'all');
  },
  getOrderStats: () => {
    const orders = get().orders;
    return {
      total: orders.length,
      processing: orders.filter(order => order.status === 'processing').length,
      inTransit: orders.filter(order => order.status === 'shipped').length,
      delivered: orders.filter(order => order.status === 'delivered').length
    };
  }
}));