import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { DEMO_CUSTOMERS } from '../data/demoCustomers';
import { DEMO_EXPENSES } from '../data/demoExpenses';
import { DEMO_PRODUCTS } from '../data/demoInventory';
import { DEMO_ORDERS } from '../data/demoOrders';
import { DEMO_PAYMENTS } from '../data/demoPayments';
import type { Customer, Expense, Order, PaymentRecord, Product } from '../types';

const STORAGE_KEY = 'business-os-workspace-v1';
export interface BusinessData { customers: Customer[]; expenses: Expense[]; products: Product[]; orders: Order[]; payments: PaymentRecord[]; }
interface BusinessStore extends BusinessData {
  updateCustomers: (items: Customer[]) => void; updateExpenses: (items: Expense[]) => void;
  updateProducts: (items: Product[]) => void; updateOrders: (items: Order[]) => void;
  updatePayments: (items: PaymentRecord[]) => void; replaceAll: (data: BusinessData) => void;
  resetWorkspace: () => void; clearWorkspace: () => void; exportWorkspace: () => string;
  importWorkspace: (json: string) => void;
}
const seed: BusinessData = { customers: DEMO_CUSTOMERS, expenses: DEMO_EXPENSES, products: DEMO_PRODUCTS, orders: DEMO_ORDERS, payments: DEMO_PAYMENTS };
const empty: BusinessData = { customers: [], expenses: [], products: [], orders: [], payments: [] };

function loadWorkspace(): BusinessData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return seed;
    const parsed = JSON.parse(raw) as Partial<BusinessData>;
    if (!Array.isArray(parsed.customers) || !Array.isArray(parsed.expenses) || !Array.isArray(parsed.products) || !Array.isArray(parsed.orders) || !Array.isArray(parsed.payments)) return seed;
    return parsed as BusinessData;
  } catch { return seed; }
}

const StoreContext = createContext<BusinessStore | null>(null);
export function BusinessStoreProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<BusinessData>(loadWorkspace);
  useEffect(() => { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch { /* Browser storage may be unavailable. */ } }, [data]);
  const value = useMemo<BusinessStore>(() => ({
    ...data,
    updateCustomers: (items) => setData((current) => ({ ...current, customers: items })),
    updateExpenses: (items) => setData((current) => ({ ...current, expenses: items })),
    updateProducts: (items) => setData((current) => ({ ...current, products: items })),
    updateOrders: (items) => setData((current) => ({ ...current, orders: items })),
    updatePayments: (items) => setData((current) => ({ ...current, payments: items })),
    replaceAll: (next) => setData(next),
    resetWorkspace: () => setData(seed),
    clearWorkspace: () => setData(empty),
    exportWorkspace: () => JSON.stringify(data, null, 2),
    importWorkspace: (json) => {
      const parsed = JSON.parse(json) as BusinessData;
      if (!parsed || !Array.isArray(parsed.customers) || !Array.isArray(parsed.expenses) || !Array.isArray(parsed.products) || !Array.isArray(parsed.orders) || !Array.isArray(parsed.payments)) throw new Error('This file is not a valid Business OS backup.');
      setData(parsed);
    },
  }), [data]);
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}
export function useBusinessStore(): BusinessStore {
  const store = useContext(StoreContext);
  if (!store) throw new Error('useBusinessStore must be used inside BusinessStoreProvider.');
  return store;
}
export function makeId(prefix: string): string { return `${prefix}-${Date.now().toString(36).toUpperCase()}`; }
