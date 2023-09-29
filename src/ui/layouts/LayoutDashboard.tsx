import React, { ReactNode, useEffect, useRef, useState } from "react";
import { logoTipo } from "../../assets";
import { FooterComponent } from "../components";
import { Drawermenu } from "../components/protected/Drawermenu";
import { ProfileHeaderMenu } from "../components/protected/ProfileHeaderMenu";
import { Link } from "react-router-dom";

type LayoutDashboardProps = {
  children: ReactNode;
};

const LayoutDashboard: React.FC<LayoutDashboardProps> = ({ children }) => {
  const [lastScrollY, setLastScrollY] = useState(0);
  const [shrinkHeader, setShrinkHeader] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 100) setShrinkHeader(true);
      else setShrinkHeader(false);
      setLastScrollY(currentScrollY);
    };

    document.addEventListener("scroll", handleScroll, { passive: true });
    return () => document.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div className="container-fluid dashboard">
      <Drawermenu />
      <header className={`header ${shrinkHeader ? "shrink" : ""}`}>
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <img src={logoTipo} alt="Legal Quester" className="logotipo" />
            </div>
            <div className="d-flex justify-content-end align-items-center">
              <div>
                <Link to="/dashboard">Dashboard</Link>
              </div>
              <div className="ms-3 me-3">|</div>
              <div>
                <ProfileHeaderMenu />
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className="container dashboard">
        <div className="content-topper">{children}</div>
      </main>
      <footer className="footer">
        <FooterComponent />
      </footer>
    </div>
  );
};

export default LayoutDashboard;
