import React, { createContext, useContext, useState, ReactNode } from "react";

export interface WalletTransaction {
  id: string;
  type: "credit" | "debit";
  amount: number;
  description: string;
  timestamp: Date;
  status: "completed" | "pending" | "failed";
  reference?: string;
}

interface WalletContextType {
  balance: number;
  transactions: WalletTransaction[];
  addFunds: (amount: number) => Promise<void>;
  deductFunds: (amount: number, description: string) => Promise<boolean>;
  getTransactionHistory: () => WalletTransaction[];
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [balance, setBalance] = useState(50000); // Initial balance: ₦50,000
  const [transactions, setTransactions] = useState<WalletTransaction[]>([
    {
      id: "TXN_INIT_001",
      type: "credit",
      amount: 50000,
      description: "Welcome bonus",
      timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      status: "completed",
      reference: "INIT_BONUS",
    },
    {
      id: "TXN_SHOP_001",
      type: "debit",
      amount: 12750,
      description: "MegaMart Lekki - Shopping",
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      status: "completed",
      reference: "EXIT_TXN_001",
    },
    {
      id: "TXN_SHOP_002",
      type: "debit",
      amount: 5480,
      description: "FreshGrocer Victoria - Shopping",
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      status: "completed",
      reference: "EXIT_TXN_002",
    },
  ]);

  const addFunds = async (amount: number): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newTransaction: WalletTransaction = {
          id: `TXN_CREDIT_${Date.now()}`,
          type: "credit",
          amount,
          description: "Wallet top-up",
          timestamp: new Date(),
          status: "completed",
          reference: `TOP_UP_${Date.now()}`,
        };

        setBalance((prev) => prev + amount);
        setTransactions((prev) => [newTransaction, ...prev]);
        resolve();
      }, 1500); // Simulate API call
    });
  };

  const deductFunds = async (
    amount: number,
    description: string
  ): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (balance >= amount) {
          const newTransaction: WalletTransaction = {
            id: `TXN_DEBIT_${Date.now()}`,
            type: "debit",
            amount,
            description,
            timestamp: new Date(),
            status: "completed",
            reference: `PAYMENT_${Date.now()}`,
          };

          setBalance((prev) => prev - amount);
          setTransactions((prev) => [newTransaction, ...prev]);
          resolve(true);
        } else {
          const failedTransaction: WalletTransaction = {
            id: `TXN_FAILED_${Date.now()}`,
            type: "debit",
            amount,
            description: `${description} (Insufficient funds)`,
            timestamp: new Date(),
            status: "failed",
          };

          setTransactions((prev) => [failedTransaction, ...prev]);
          resolve(false);
        }
      }, 1500); // Simulate API call
    });
  };

  const getTransactionHistory = () => {
    return transactions;
  };

  return (
    <WalletContext.Provider
      value={{
        balance,
        transactions,
        addFunds,
        deductFunds,
        getTransactionHistory,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
}

