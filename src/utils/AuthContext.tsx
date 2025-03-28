import { createContext, ReactNode, useContext, useState } from "react";

interface AuthContextType {
  authError: boolean;
  setAuthError: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface Props {
  children: ReactNode;
}
export function AuthProvider({ children }: Props) {
  const [authError, setAuthError] = useState(false);

  return (
    <AuthContext.Provider value={{ authError, setAuthError }}>
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("provider 안에서 사용하세요!");
  }
  return context;
};
