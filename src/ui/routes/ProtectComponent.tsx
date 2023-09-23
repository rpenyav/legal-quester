import { useAuth } from "../../infrastructure";
import { HomePage } from "../pages";

/**
 * Props para el componente ProtectComponent.
 */
interface ProtectComponentProps {
  /**
   * Componentes hijos que serán renderizados si la autenticación es válida.
   */
  children: React.ReactNode;
}

/**
 * Un componente que protege y decide si renderiza sus componentes hijos
 * basado en si el usuario está autenticado o no. Si el usuario no está
 * autenticado, se muestra la página NotFoundPage.
 *
 * @param children - Los componentes hijos que se renderizarán si el usuario está autenticado.
 * @returns Los componentes hijos si el usuario está autenticado, o NotFoundPage si no lo está.
 */
const ProtectComponent: React.FC<ProtectComponentProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <>{children}</> : <HomePage />;
};

export default ProtectComponent;
