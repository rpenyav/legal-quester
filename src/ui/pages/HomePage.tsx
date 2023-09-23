import { useEffect } from "react";
import { useAuth } from "../../infrastructure";
import { ButtonGlobal, FormLogin, FormRegister } from "../components";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const { isAuthenticated } = useAuth();
  const navigation = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigation("/dashboard");
    }
  }, [isAuthenticated, navigation]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-2"></div>
        <div className="col-md-8">
          <div className="card p-4 mt-5 positioner">
            {isAuthenticated ? (
              <div className="row mb-4">
                <div className="col-md-12">
                  <ButtonGlobal>Entra a tu área personal</ButtonGlobal>
                </div>
              </div>
            ) : (
              <div className="row mb-4">
                <div className="col-md-6">
                  <FormRegister />
                </div>
                <div className="col-md-6">
                  <FormLogin />
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="col-md-2"></div>
      </div>
    </div>
  );
};
