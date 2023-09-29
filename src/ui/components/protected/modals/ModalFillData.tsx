import React, { FC } from "react";
import Modal from "react-bootstrap/Modal";
import { Usuario } from "../../../../types";
import FormFillDataCompany from "../FormFillDataCompany";
import FormFillDataCandidate from "../FormFillDataCandidate";

interface PropsModalData {
  dataUser: Usuario;
  isCompany: boolean;
}

export const ModalFillData: FC<PropsModalData> = ({ dataUser, isCompany }) => {
  const [modalShow, setModalShow] = React.useState(true);

  return (
    <Modal
      show={modalShow}
      aria-labelledby="contained-modal-title-vcenter"
      className="profile"
      size="lg"
    >
      <Modal.Body>
        <div className="row p-4">
          <div className="col-12">
            <h4>
              {isCompany ? (
                <>Necesitamos el nombre de la empresa</>
              ) : (
                <>Nos gustaría saber tu nombre</>
              )}
            </h4>
            <div>
              {isCompany ? (
                <>
                  <p className="m-0 p-0">
                    Para ofrecer una mejor experiencia, nos gustaría que nos
                    facilitases el nombre de tu empresa para poder referirnos a
                    tu compañía.
                  </p>
                  <p className="m-0 p-0">
                    Si lo deseas, puedes rellenar solamente el campo obligatorio
                    y continuar más tarde desde tu área privada
                  </p>
                </>
              ) : (
                <>
                  Para ofrecerte una mejor experiencia, nos gustaría que saber
                  tu nombre poder referirnos a ti.
                </>
              )}
            </div>
            {isCompany ? (
              <>
                <FormFillDataCompany
                  idDataUser={dataUser._id!}
                  setModalShow={setModalShow}
                />
              </>
            ) : (
              <>
                <FormFillDataCandidate
                  idDataUser={dataUser._id!}
                  setModalShow={setModalShow}
                />
              </>
            )}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};
