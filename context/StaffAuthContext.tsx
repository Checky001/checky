import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

type StaffRole = "security" | "stock_clerk" | "manager";

export interface StaffUser {
  id: string;
  email: string;
  name: string;
  role: StaffRole;
  branchId: string;
  branchName: string;
}

interface StaffAuthContextType {
  user: StaffUser | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const StaffAuthContext = createContext<StaffAuthContextType | undefined>(
  undefined
);

const MOCK_STAFF: StaffUser[] = [
  {
    id: "STAFF_SEC_001",
    email: "security@checky.app",
    name: "Gate Security",
    role: "security",
    branchId: "STORE_001",
    branchName: "MegaMart Lekki",
  },
  {
    id: "STAFF_STOCK_001",
    email: "stock@checky.app",
    name: "Stock Clerk",
    role: "stock_clerk",
    branchId: "STORE_001",
    branchName: "MegaMart Lekki",
  },
  {
    id: "STAFF_MGR_001",
    email: "manager@checky.app",
    name: "Store Manager",
    role: "manager",
    branchId: "STORE_001",
    branchName: "MegaMart Lekki",
  },
];

export function StaffAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<StaffUser | null>(null);

  const login = async (email: string, _password: string): Promise<boolean> => {
    const found = MOCK_STAFF.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );

    if (found) {
      setUser(found);
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <StaffAuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </StaffAuthContext.Provider>
  );
}

export function useStaffAuth() {
  const ctx = useContext(StaffAuthContext);
  if (!ctx) {
    throw new Error("useStaffAuth must be used within a StaffAuthProvider");
  }
  return ctx;
}


