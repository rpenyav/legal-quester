import React, { ReactNode } from "react";
import { CarruselComponent, FooterComponent } from "../components";
import { logoBlanco } from "../../assets";
// import NavbarComponent from "../components/NavbarComponent";
// import { FooterComponent } from "../components/FooterComponent";
// import { LoadingComponent } from "../components/LoadingComponent";

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="container-fluid home">
      {/* <LoadingComponent /> */}
      <header className="header">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <img
                src={logoBlanco}
                alt="Legal Quester"
                className="logoblanco"
              />
            </div>
            <div className="d-flex justify-content-end align-items-center">
              <div>Empresas</div>
              <div className="ms-3 me-3">|</div>
              <div>¿Cómo funciona?</div>
              <div className="ms-3 me-3">|</div>
              <div>FAQs</div>
            </div>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="row">
          <div className="col-12  m-0 p-0">
            <CarruselComponent />
          </div>
        </div>
        {children}
      </main>

      <footer className="footer">
        <FooterComponent />
      </footer>
    </div>
  );
};

export default Layout;
