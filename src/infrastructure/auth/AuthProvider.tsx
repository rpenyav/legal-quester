import Cookies from "js-cookie";
import { ReactNode, useState, useEffect } from "react";
import Swal from "sweetalert2";
import { isExpired } from "react-jwt";
import { AuthContext } from "./authContext";
import { base64UrlDecoded } from "../../helpers";
import { Usuario } from "../../types";
import { Toast } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useUserData } from "../../app/state/hooks/useUserData";

interface AuthProviderProps {
  children: ReactNode;
}

const useTokenHandler = () => {
  const token = Cookies.get("access_token");
  const isMyTokenExpired = token ? isExpired(token) : true;

  const payload = token
    ? JSON.parse(base64UrlDecoded(token.split(".")[1]))
    : null;

  return { isMyTokenExpired, payload };
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { isMyTokenExpired, payload } = useTokenHandler();
  const { dataUser } = useUserData(payload?._id);

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !isMyTokenExpired
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState<Usuario | null>(payload);
  const [showA, setShowA] = useState(false); // Cambiado a false
  const [wasAuthenticated, setWasAuthenticated] = useState<boolean>(
    !isMyTokenExpired
  );
  const navigation = useNavigate();

  const showToast = () => {
    setShowA(true);
  };

  const toggleShowA = () => setShowA(!showA);

  useEffect(() => {
    if (isMyTokenExpired) {
      if (wasAuthenticated) {
        showToast();
      }
      logout();
    } else {
      setIsAuthenticated(true);
    }

    setWasAuthenticated(!isMyTokenExpired);
    setIsLoading(false);

    //cotejamos que el id y el email del token sean los del user
    if (dataUser && payload) {
      if (dataUser.email !== payload.email || dataUser._id !== payload._id) {
        showToast();
        logout();
      }
    }
  }, [isMyTokenExpired, dataUser, payload]);

  const logout = (showAlert = false) => {
    Cookies.remove("access_token");
    setIsAuthenticated(false);

    navigation("/");
  };

  const login = () => setIsAuthenticated(true);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, isLoading, userData }}
    >
      {children}
      <div className="toast-container">
        <Toast show={showA} onClose={toggleShowA}>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Bootstrap</strong>
            <small>11 mins ago</small>
          </Toast.Header>
          <Toast.Body>
            Tu sesión ha expirado, por favor inicia sesión nuevamente.
          </Toast.Body>
        </Toast>
      </div>
    </AuthContext.Provider>
  );
};
