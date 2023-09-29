import React, { useEffect, useRef, useState } from "react";
import { Nav, Collapse } from "react-bootstrap";
import { useAuth } from "../../../infrastructure";
import { useUserData } from "../../../app/state/hooks/useUserData";
import { useDashboardData } from "../../../app/state/hooks/useDashboardData";
import { menuCaret } from "../../../assets";

export const Drawermenu = () => {
  const { isAuthenticated, userData } = useAuth();
  const { dataUser } = useUserData(userData?._id);
  const [isCompany, setIsCompany] = useState(false);
  const { isCompanyMenu, isNotCompanyMenu } = useDashboardData(dataUser!);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    setIsCompany(dataUser?.isCompany!);
  }, [dataUser]);

  const toggleCollapse = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  //Drawer
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: { target: any }) {
      if (drawerRef.current && !drawerRef.current.contains(event.target)) {
        setDrawerOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [drawerRef]);

  const menuToDisplay = isCompany ? isCompanyMenu : isNotCompanyMenu;

  return (
    isAuthenticated && (
      <>
        <div className={`drawer ${drawerOpen ? "open" : ""}`} ref={drawerRef}>
          <h4>{isCompany ? <>Menú empresas</> : <>Menú Candidato</>}</h4>
          <Nav defaultActiveKey="/home" className="flex-column">
            {menuToDisplay.map((menuItem, index) => (
              <div key={index}>
                <Nav.Link
                  onClick={() => toggleCollapse(index)}
                  aria-controls={`collapse-${index}`}
                  aria-expanded={openIndex === index}
                >
                  <div className="menu-item-container">
                    <span>{menuItem.title}</span>

                    {menuItem.subMenu && (
                      <span
                        className={`caret-icon ${
                          openIndex === index ? "open" : ""
                        }`}
                      >
                        {openIndex === index ? (
                          <img className="menucaretwhite" src={menuCaret} />
                        ) : (
                          <img className="menucaretwhite" src={menuCaret} />
                        )}
                      </span>
                    )}
                  </div>
                </Nav.Link>
                <Collapse in={openIndex === index}>
                  <div id={`collapse-${index}`} style={{ marginLeft: "20px" }}>
                    {menuItem.subMenu
                      ? menuItem.subMenu.map(
                          (subItem: any, subIndex: number) => (
                            <Nav.Link key={subIndex} href={subItem.link}>
                              {subItem.title}
                            </Nav.Link>
                          )
                        )
                      : null}
                  </div>
                </Collapse>
              </div>
            ))}
          </Nav>
        </div>
        <div className="drawer-tab" onClick={() => setDrawerOpen(!drawerOpen)}>
          ≡<span className="menu-text-tab">menú</span>
        </div>
      </>
    )
  );
};
