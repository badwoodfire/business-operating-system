/**
 * DEMO DATA - every product below is made up. Nothing is saved anywhere.
 */
import type { Product } from '../types';

export const DEMO_PRODUCTS: Product[] = [
  { id: 'p1', name: 'Cotton Kurta - Navy', sku: 'KRT-NV-M', category: 'Clothing', price: 2499, stock: 42, reorderLevel: 10 },
  { id: 'p2', name: 'Lawn Dupatta - Floral', sku: 'DUP-FL-01', category: 'Clothing', price: 1350, stock: 8, reorderLevel: 15 },
  { id: 'p3', name: 'Leather Wallet - Brown', sku: 'WLT-BR-02', category: 'Accessories', price: 1850, stock: 64, reorderLevel: 20 },
  { id: 'p4', name: 'Wireless Earbuds', sku: 'EAR-WL-10', category: 'Electronics', price: 4999, stock: 0, reorderLevel: 10 },
  { id: 'p5', name: 'Steel Water Bottle 750 ml', sku: 'BTL-ST-75', category: 'Home', price: 1250, stock: 120, reorderLevel: 30 },
  { id: 'p6', name: 'Handmade Soy Candle', sku: 'CND-SY-03', category: 'Home', price: 950, stock: 14, reorderLevel: 15 },
  { id: 'p7', name: 'Phone Case - Clear', sku: 'CAS-CL-14', category: 'Electronics', price: 799, stock: 210, reorderLevel: 50 },
  { id: 'p8', name: 'Canvas Tote Bag', sku: 'BAG-CV-05', category: 'Accessories', price: 1150, stock: 37, reorderLevel: 12 },
  { id: 'p9', name: 'Herbal Hair Oil 200 ml', sku: 'OIL-HB-20', category: 'Beauty', price: 690, stock: 5, reorderLevel: 20 },
  { id: 'p10', name: 'Running Shoes - Grey', sku: 'SHO-GR-42', category: 'Footwear', price: 8900, stock: 23, reorderLevel: 8 },
];
