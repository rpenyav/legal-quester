import React, { useEffect, useState } from "react";
import { DashboardCompany } from "./DashboardCompany";
import { DashboardCandidate } from "./DashboardCandidate";
import { useAuth } from "../../../infrastructure";
import { useNavigate } from "react-router-dom";
import { useUserData } from "../../../app/state/hooks/useUserData";
import { useDashboardData } from "../../../app/state/hooks/useDashboardData";

export const Dashboard = () => {
  const { isAuthenticated, userData } = useAuth();
  const { dataUser } = useUserData(userData?._id);
  const [isCompany] = useState(userData?.isCompany);
  const { companyData, candidateData } = useDashboardData(dataUser!);
  const navigation = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      console.log("NOT");
      navigation("/");
    }
  }, [isAuthenticated, navigation]);

  return (
    <div>
      {isCompany ? (
        <DashboardCompany userData={companyData} />
      ) : (
        <DashboardCandidate userData={candidateData} />
      )}
    </div>
  );
};
