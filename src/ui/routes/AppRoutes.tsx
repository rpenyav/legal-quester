import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage, NotFoundPage } from "../pages";
import { Layout, LayoutDashboard } from "../layouts";
import ProtectComponent from "./ProtectComponent";
import { Dashboard } from "../pages/protected";
import { AuthProvider } from "../../infrastructure";

const AppRoutes = () => {
  const isProduction = process.env.NODE_ENV === "production";
  const BASENAME = isProduction ? "/telocambio" : "/";

  return (
    <BrowserRouter basename={BASENAME}>
      <Routes>
        <Route
          path="/"
          element={
            <AuthProvider>
              <Layout>
                <HomePage />
              </Layout>
            </AuthProvider>
          }
        />

        <Route
          path="/dashboard"
          element={
            <AuthProvider>
              <ProtectComponent>
                <LayoutDashboard>
                  <Dashboard />
                </LayoutDashboard>
              </ProtectComponent>
            </AuthProvider>
          }
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
