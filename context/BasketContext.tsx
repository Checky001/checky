import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  ReactNode,
} from "react";
import type { Product } from "@/types";

export interface BasketItem {
  product_id: string;
  name: string;
  price: number;
  quantity: number;
}

interface BasketContextType {
  items: BasketItem[];
  total: number;
  itemCount: number;
  currentStoreId: string | null;
  initializeCart: (storeId: string) => void;
  addProduct: (product: Product) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeProduct: (productId: string) => void;
  clearCart: () => void;
}

const BasketContext = createContext<BasketContextType | undefined>(undefined);

export function BasketProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<BasketItem[]>([]);
  const [currentStoreId, setCurrentStoreId] = useState<string | null>(null);

  const initializeCart = (storeId: string) => {
    setCurrentStoreId(storeId);
    setItems([]);
  };

  const addProduct = (product: Product) => {
    // If the cart is tied to a different store, reset it for this demo app
    if (currentStoreId && currentStoreId !== product.store_id) {
      setItems([]);
      setCurrentStoreId(product.store_id);
    } else if (!currentStoreId) {
      setCurrentStoreId(product.store_id);
    }

    setItems((prev) => {
      const existing = prev.find((item) => item.product_id === product.product_id);
      if (existing) {
        return prev.map((item) =>
          item.product_id === product.product_id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...prev,
        {
          product_id: product.product_id,
          name: product.name,
          price: product.price,
          quantity: 1,
        },
      ];
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setItems((prev) => {
      if (quantity <= 0) {
        return prev.filter((item) => item.product_id !== productId);
      }

      return prev.map((item) =>
        item.product_id === productId ? { ...item, quantity } : item
      );
    });
  };

  const removeProduct = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.product_id !== productId));
  };

  const clearCart = () => {
    setItems([]);
    setCurrentStoreId(null);
  };

  const { total, itemCount } = useMemo(() => {
    const totals = items.reduce(
      (acc, item) => {
        acc.total += item.price * item.quantity;
        acc.itemCount += item.quantity;
        return acc;
      },
      { total: 0, itemCount: 0 }
    );
    return totals;
  }, [items]);

  return (
    <BasketContext.Provider
      value={{
        items,
        total,
        itemCount,
        currentStoreId,
        initializeCart,
        addProduct,
        updateQuantity,
        removeProduct,
        clearCart,
      }}
    >
      {children}
    </BasketContext.Provider>
  );
}

export function useBasket() {
  const context = useContext(BasketContext);
  if (context === undefined) {
    throw new Error("useBasket must be used within a BasketProvider");
  }
  return context;
}


