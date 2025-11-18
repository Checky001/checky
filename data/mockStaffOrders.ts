export type MockOrderStatus = "paid_not_exited" | "unpaid" | "exited";

export interface MockOrderItem {
  id: string;
  name: string;
  qty: number;
  price: number;
}

export interface MockOrder {
  id: string; // orderId encoded in QR
  customerName: string;
  total: number;
  status: MockOrderStatus;
  createdAt: string;
  exitedAt?: string;
  items: MockOrderItem[];
}

export const mockStaffOrders: MockOrder[] = [
  {
    id: "ORDER_VALID_001",
    customerName: "Demo User",
    total: 6250,
    status: "paid_not_exited",
    createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    items: [
      { id: "itm_1", name: "Fresh Tomatoes (Basket)", qty: 1, price: 2500 },
      { id: "itm_2", name: "Pringles Original", qty: 2, price: 1200 },
      { id: "itm_3", name: "Coca-Cola 1.5L", qty: 1, price: 350 },
    ],
  },
  {
    id: "ORDER_ALREADY_EXITED_001",
    customerName: "Return Customer",
    total: 3200,
    status: "exited",
    createdAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    exitedAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    items: [
      { id: "itm_4", name: "Laundry Detergent (2kg)", qty: 1, price: 3200 },
    ],
  },
  {
    id: "ORDER_UNPAID_001",
    customerName: "Test User",
    total: 1500,
    status: "unpaid",
    createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    items: [
      { id: "itm_5", name: "Energy Drink (Can)", qty: 2, price: 700 },
      { id: "itm_6", name: "Soft Drink Can (Assorted)", qty: 1, price: 500 },
    ],
  },
];


