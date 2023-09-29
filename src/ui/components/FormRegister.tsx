import React, { useState } from "react";
import { ButtonGlobal } from "./ButtonGlobal";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Form as FormField } from "react-bootstrap";

import { ModalPolicys } from "./ModalPolicys";
import { useRegister } from "../../app/state/hooks/useRegister";
import { Usuario } from "../../types";

interface RegisterComponentProps {
  onSuccess?: () => void;
}

const RegisterSchema = Yup.object().shape({
  email: Yup.string().email("email no válido").required("Requerido"),
  password: Yup.string()
    .min(6, "¡Muy corto!")
    .max(50, "¡Muy largo!")
    .required("Requerido"),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref("password"), ""], "no coinciden")
    .required("Requerido"),
  privacyPolicy: Yup.boolean()
    .required("Debes estar de acuerdo antes de enviar.")
    .oneOf([true], "Debes estar de acuerdo antes de enviar."),
});

export const FormRegister: React.FC<RegisterComponentProps> = ({
  onSuccess,
}) => {
  const { register, error } = useRegister();
  const [showModalPolicys, setShowModalPolicys] = useState(false);

  const handlePolicysClick = () => {
    setShowModalPolicys(true);
  };

  const handlePolicysClose = () => {
    setShowModalPolicys(false);
  };

  const handleSubmit = async (values: Usuario) => {
    const success = await register(values);

    if (success) {
      onSuccess?.();
      window.location.reload();
    } else {
      console.error("Error en el registro:", error);
    }
  };

  return (
    <div>
      <h3>Crea tu cuenta</h3>
      <p>Únete a la comunidad legal!</p>

      <Formik
        initialValues={{
          email: "",
          password: "",
          repeatPassword: "",
          privacyPolicy: false,
          isCompany: false,
        }}
        validationSchema={RegisterSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <FormField.Group className="mb-3">
              <div className="flex-form-group">
                <div>
                  <FormField.Label>Email address</FormField.Label>
                </div>
                <div className="form-errors">
                  <ErrorMessage name="email" />
                </div>
              </div>
              <Field
                name="email"
                type="email"
                as={FormField.Control}
                placeholder="Introduce tu email"
              />
            </FormField.Group>

            <FormField.Group className="mb-3">
              <div className="flex-form-group">
                <div>
                  <FormField.Label>Contraseña</FormField.Label>
                </div>
                <div className="form-errors">
                  <ErrorMessage name="password" />
                </div>
              </div>
              <Field
                name="password"
                type="password"
                as={FormField.Control}
                placeholder="Introduce tu contraseña"
              />
            </FormField.Group>

            <FormField.Group className="mb-3">
              <div className="flex-form-group">
                <div>
                  <FormField.Label>Repite contraseña</FormField.Label>
                </div>
                <div className="form-errors">
                  <ErrorMessage name="repeatPassword" />
                </div>
              </div>
              <Field
                name="repeatPassword"
                type="password"
                as={FormField.Control}
                placeholder="Repite contraseña"
              />
            </FormField.Group>

            <FormField.Group className="mb-3 small sans-serif">
              <div className="d-flex align-items-left ">
                <Field
                  className="me-1"
                  name="privacyPolicy"
                  type="checkbox"
                  as={FormField.Check}
                  label="Acepto las"
                />
                <a
                  onClick={handlePolicysClick}
                  className="ml-3 link-no-a"
                  style={{ cursor: "pointer" }}
                >
                  políticas de privacidad
                </a>
              </div>
              <div className="form-errors">
                <ErrorMessage name="privacyPolicy" />
              </div>
            </FormField.Group>

            <div className="d-flex justify-content-center w-100 mt-5">
              <ButtonGlobal disabled={isSubmitting} type="submit" width="60%">
                Crear cuenta
              </ButtonGlobal>
            </div>
          </Form>
        )}
      </Formik>
      <ModalPolicys show={showModalPolicys} onHide={handlePolicysClose} />
    </div>
  );
};
