import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage, NotFoundPage } from "../pages";
import { Layout, LayoutDashboard } from "../layouts";
import ProtectComponent from "./ProtectComponent";
import { Dashboard } from "../pages/protected";
import { AuthProvider } from "../../infrastructure";
import { ProjectDetail } from "../pages/protected/ProjectDetail";
import { ProfileEditCandidate } from "../pages/protected/Edition/ProfileEditCandidate";
import { ProfileEditCompany } from "../pages/protected/Edition/ProfileEditCompany";
import { PublicarCaso } from "../pages/protected/PublicarCaso";

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

        <Route
          path="/:id/:typeOfCase/:nombre"
          element={
            <AuthProvider>
              <ProtectComponent>
                <LayoutDashboard>
                  <ProjectDetail />
                </LayoutDashboard>
              </ProtectComponent>
            </AuthProvider>
          }
        />

        <Route
          path="/profile/candidate/edit/:encryptedId"
          element={
            <AuthProvider>
              <ProtectComponent>
                <LayoutDashboard>
                  <ProfileEditCandidate />
                </LayoutDashboard>
              </ProtectComponent>
            </AuthProvider>
          }
        />

        <Route
          path="/profile/company/edit/:encryptedId"
          element={
            <AuthProvider>
              <ProtectComponent>
                <LayoutDashboard>
                  <ProfileEditCompany />
                </LayoutDashboard>
              </ProtectComponent>
            </AuthProvider>
          }
        />

        <Route
          path="/publicar/company/"
          element={
            <AuthProvider>
              <ProtectComponent>
                <LayoutDashboard>
                  <PublicarCaso />
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
