import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Store } from '@/types';

interface StoreContextType {
  currentStore: Store | null;
  enterStore: (store: Store) => void;
  leaveStore: () => void;
  isInStore: boolean;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [currentStore, setCurrentStore] = useState<Store | null>(null);

  const enterStore = (store: Store) => {
    if (store.status !== 'approved') {
      throw new Error('Cannot enter a store that is not approved');
    }
    setCurrentStore(store);
  };

  const leaveStore = () => {
    setCurrentStore(null);
  };

  return (
    <StoreContext.Provider
      value={{
        currentStore,
        enterStore,
        leaveStore,
        isInStore: !!currentStore,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}

