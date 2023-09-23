import { createContext } from "react";
import { Usuario } from "../../types";

interface AuthContextProps {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  isLoading: boolean;
  userData: Usuario | null;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);
