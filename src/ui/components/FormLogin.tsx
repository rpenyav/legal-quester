import React from "react";
import { ButtonGlobal } from "./ButtonGlobal";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { Form as FormField } from "react-bootstrap";
import useLogin from "../../app/state/hooks/useLogin";
import { Usuario } from "../../types";

interface LoginComponentProps {
  onSuccess?: () => void;
}

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .min(6, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

export const FormLogin: React.FC<LoginComponentProps> = ({ onSuccess }) => {
  const { login, error } = useLogin();

  const handleSubmit = async (values: Usuario & { rememberme: boolean }) => {
    const success = await login(values, values.rememberme);

    if (success) {
      onSuccess?.();
      window.location.reload();
    } else {
      console.error("Login failed:", error);
    }
  };

  return (
    <div>
      <h3>Login</h3>
      <p>¿Ya tienes una cuenta?, accede</p>

      <Formik
        initialValues={{ email: "", password: "", rememberme: false }}
        validationSchema={LoginSchema}
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
                placeholder="Enter email"
              />
            </FormField.Group>

            <FormField.Group className="mb-3">
              <div className="flex-form-group">
                <div>
                  <FormField.Label>Password</FormField.Label>
                </div>
                <div className="form-errors">
                  <ErrorMessage name="password" />
                </div>
              </div>
              <Field
                name="password"
                type="password"
                as={FormField.Control}
                placeholder="Password"
              />
            </FormField.Group>

            <FormField.Group className="mb-3 d-flex justify-content-between align-items-bottom small sans-serif">
              <div>
                <Field
                  name="rememberme"
                  type="checkbox"
                  as={FormField.Check}
                  label="Recordarme"
                />
              </div>
              <div>
                <Link to="/forgot">¿Olvidaste tu contraseña?</Link>
              </div>
            </FormField.Group>
            <div className="form-dividor"></div>
            <div className="d-flex justify-content-center w-100  more-margin">
              <ButtonGlobal width="60%">Entrar a tu área</ButtonGlobal>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
