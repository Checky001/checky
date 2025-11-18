import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";
import type { BasketItem } from "./BasketContext";

export interface Receipt {
  id: string;
  storeId?: string | null;
  storeName?: string | null;
  total: number;
  items: BasketItem[];
  exitQr: string;
  createdAt: string; // ISO string
}

interface ReceiptContextType {
  receipts: Receipt[];
  createReceipt: (payload: {
    storeId?: string | null;
    storeName?: string | null;
    total: number;
    items: BasketItem[];
    exitQr: string;
  }) => Receipt;
  getReceiptById: (id: string) => Receipt | undefined;
}

const ReceiptContext = createContext<ReceiptContextType | undefined>(
  undefined
);

export function ReceiptProvider({ children }: { children: ReactNode }) {
  const [receipts, setReceipts] = useState<Receipt[]>([]);

  const createReceipt: ReceiptContextType["createReceipt"] = (payload) => {
    const id = `RCPT_${Date.now().toString(36).toUpperCase()}`;
    const createdAt = new Date().toISOString();

    const receipt: Receipt = {
      id,
      createdAt,
      ...payload,
    };

    setReceipts((prev) => [receipt, ...prev]);
    return receipt;
  };

  const getReceiptById: ReceiptContextType["getReceiptById"] = (id) =>
    receipts.find((r) => r.id === id);

  return (
    <ReceiptContext.Provider
      value={{
        receipts,
        createReceipt,
        getReceiptById,
      }}
    >
      {children}
    </ReceiptContext.Provider>
  );
}

export function useReceipts() {
  const ctx = useContext(ReceiptContext);
  if (!ctx) {
    throw new Error("useReceipts must be used within a ReceiptProvider");
  }
  return ctx;
}


