import React, { useEffect, useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { useAuth } from "../../../infrastructure";
import { useUserData } from "../../../app/state/hooks/useUserData";
import { ModalFillData } from "./modals/ModalFillData";

export const ProfileHeaderMenu = () => {
  const { isAuthenticated, userData } = useAuth();
  const { dataUser } = useUserData(userData?._id);
  const [isCompany, setIsCompany] = useState<boolean | null>(null);
  const [showWindow, setShowWindow] = useState(false);

  useEffect(() => {
    if (dataUser) {
      setIsCompany(dataUser.isCompany!);
      if (dataUser.isCompany) {
        setShowWindow(!dataUser.companyName);
      } else {
        setShowWindow(!dataUser.nameCompanyRep);
      }
    }
  }, [dataUser]);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center profile">
        {isAuthenticated && dataUser ? (
          <>
            <DropdownButton
              className="button-profile-menu"
              id="dropdown-basic-button"
              title={
                <>
                  {isCompany ? (
                    dataUser.companyName
                  ) : (
                    <>
                      {dataUser.nameCompanyRep} {dataUser.surnameCompanyRep}
                    </>
                  )}
                  {showWindow && (
                    <>
                      <ModalFillData
                        isCompany={isCompany!}
                        dataUser={dataUser}
                      />
                    </>
                  )}
                </>
              }
            >
              <Dropdown.Item href="#/action-1">Perfil</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Configuración</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Cerrar sesión</Dropdown.Item>
            </DropdownButton>

            <div className="ms-3">
              {dataUser.profileImage != "" ? (
                <div
                  className="avatar"
                  style={{
                    backgroundImage: `url(${dataUser.profileImage})`,
                  }}
                ></div>
              ) : (
                <></>
              )}
            </div>
          </>
        ) : null}
      </div>
    </>
  );
};
