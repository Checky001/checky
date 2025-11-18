/**
 * TypeScript Interfaces for Checky
 */

// ===== USER & AUTH =====

export type UserRole = 'customer' | 'store_admin' | 'super_admin';

export interface User {
  id: string;
  role: UserRole;
  email?: string;
  name?: string;
}

// ===== STORE =====

export type StoreStatus = 'pending' | 'approved' | 'suspended';

export interface Store {
  store_id: string;
  name: string;
  address: string;
  logo?: string;
  admin_email: string;
  admin_phone?: string;
  category?: string;
  entrance_qr: string;
  status: StoreStatus;
  created_at: string;
  approved_at?: string;
}

// ===== PRODUCT =====

export interface Product {
  product_id: string;
  store_id: string;
  name: string;
  price: number;
  barcode?: string;
  product_number: string;  // 4-6 digit code
  category?: string;
  stock?: number;
  image?: string;
  description?: string;
  created_at: string;
}

// ===== CART & BASKET =====

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  store_id: string;
  items: CartItem[];
  total: number;
}

// ===== TRANSACTION =====

export type TransactionStatus = 'pending' | 'completed' | 'verified' | 'failed';
export type PaymentMethod = 'card' | 'mobile_money' | 'cash';

export interface Transaction {
  transaction_id: string;
  store_id: string;
  customer_id?: string;
  items: CartItem[];
  total: number;
  payment_method: PaymentMethod;
  exit_qr: string;
  status: TransactionStatus;
  verified_at?: string;
  created_at: string;
}

// ===== NAVIGATION =====

export type RootStackParamList = {
  Splash: undefined;
  RoleSelection: undefined;
  
  // Customer
  StoreEntry: undefined;
  ProductScan: { store: Store };
  Basket: { store: Store };
  Checkout: { store: Store };
  ExitQR: { transaction: Transaction };
  StaffVerify: undefined;
  
  // Store Admin
  StoreRegistration: undefined;
  StoreLogin: undefined;
  StoreDashboard: { store: Store };
  InventoryList: { store: Store };
  AddProduct: { store: Store };
  EditProduct: { store: Store; product: Product };
  TransactionHistory: { store: Store };
  
  // Super Admin
  SuperAdminLogin: undefined;
  PendingStores: undefined;
  AllStores: undefined;
};

// ===== ANALYTICS (Mocked) =====

export interface StoreStats {
  total_products: number;
  scans_today: number;
  revenue_this_week: number;
  top_products: Array<{
    product: Product;
    scan_count: number;
  }>;
}

