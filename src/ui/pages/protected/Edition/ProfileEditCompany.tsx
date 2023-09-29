import { useEffect, useState } from "react";
import { desenmascarar } from "../../../../helpers/maskFunctions";
import { useNavigate, useParams } from "react-router-dom";
import { useUserData } from "../../../../app/state/hooks/useUserData";
import { useAuth } from "../../../../infrastructure";
import ProfileEditCandidateForm from "../../../components/protected/ProfileEditCandidateForm";
import ProfileEditCompanyForm from "../../../components/protected/ProfileEditCompanyForm";

export const ProfileEditCompany = () => {
  const navigate = useNavigate();
  const { isAuthenticated, userData } = useAuth();
  const { dataUser } = useUserData(userData?._id);
  const { encryptedId } = useParams();
  const [allow, setAllow] = useState(false);
  const [initialCheckDone, setInitialCheckDone] = useState(false);
  const [isCompany, setIsCompany] = useState<boolean>(true);
  const cleanID = desenmascarar(encryptedId!);

  useEffect(() => {
    if (dataUser) {
      setInitialCheckDone(true);
      if (cleanID && cleanID === dataUser._id) {
        setAllow(true);
      }
      setIsCompany(dataUser.isCompany!);
    }
  }, [cleanID, dataUser]);

  useEffect(() => {
    if (initialCheckDone && !allow) {
      navigate("/not-found", { replace: true });
    }
  }, [allow, initialCheckDone]);

  if (!isAuthenticated || !isAuthenticated) {
    return null;
  }

  return (
    isAuthenticated &&
    allow &&
    isCompany && (
      <>
        <ProfileEditCompanyForm dataUser={dataUser} />
      </>
    )
  );
};
