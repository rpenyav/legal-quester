import React, { FC, useState } from "react";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import { Button, Form as BootstrapForm } from "react-bootstrap";
import UploadImage from "./UploadImage";
import { ButtonGlobal } from "../ButtonGlobal";

import { useUserData } from "../../../app/state/hooks/useUserData";

interface FormFillDataCompanyProps {
  setModalShow: React.Dispatch<React.SetStateAction<boolean>>;
  idDataUser: string;
}

interface FormValues {
  companyName: string;
  phone: string;
  nameCompanyRep: string;
  surnameCompanyRep: string;
  industryType: string;
  companySize: string;
  website: string;
  socialNetworks: string[];
  headquarters: string;
  description: string;
  profileImage: string;
}

const FormFillDataCompany: FC<FormFillDataCompanyProps> = ({
  setModalShow,
  idDataUser,
}) => {
  const initialValues: FormValues = {
    companyName: "",
    phone: "",
    nameCompanyRep: "",
    surnameCompanyRep: "",
    industryType: "",
    companySize: "",
    website: "",
    socialNetworks: [],
    headquarters: "",
    description: "",
    profileImage: "",
  };

  const {
    isLoading: isUpdating,
    error: updateError,
    uploadAndUpdate,
    uploadToCloudinary,
  } = useUserData(idDataUser);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const handleFilesChanged = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setSelectedFile(acceptedFiles[0]);
    }
  };

  return (
    <div className="profile pt-4">
      <div className="row">
        <div className="col-md-4">
          <UploadImage onFilesChanged={handleFilesChanged} />
        </div>
        <div className="col-md-8">
          <Formik
            initialValues={initialValues}
            onSubmit={async (values, actions) => {
              if (selectedFile) {
                try {
                  const imageUrl = await uploadToCloudinary(
                    idDataUser,
                    selectedFile
                  );
                  values.profileImage = imageUrl;

                  uploadAndUpdate.mutate(
                    {
                      dataToUpdate: values,
                      file: selectedFile,
                    },
                    {
                      onSuccess: (data) => {
                        console.log("Datos actualizados: ", data);
                        actions.setSubmitting(false);
                        setModalShow(false);
                      },
                      onError: (error) => {
                        console.log("Error al actualizar los datos: ", error);
                        actions.setSubmitting(false);
                      },
                    }
                  );
                } catch (error) {
                  console.log("Error al subir imagen a Cloudinary:", error);
                  actions.setSubmitting(false);
                }
              } else {
                console.log("No hay archivo para subir");
                actions.setSubmitting(false);
              }
            }}
            validate={(values) => {
              const errors: Partial<FormValues> = {};
              if (!values.companyName) {
                errors.companyName = "Obligatorio";
              }
              return errors;
            }}
          >
            {({
              values,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              setFieldValue,
            }) => (
              <Form onSubmit={handleSubmit}>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <BootstrapForm.Group controlId="companyName">
                      <BootstrapForm.Label>
                        Nombre de la compañía
                      </BootstrapForm.Label>
                      <Field
                        name="companyName"
                        type="text"
                        as={BootstrapForm.Control}
                      />
                      <ErrorMessage name="companyName" component="div" />
                    </BootstrapForm.Group>
                  </div>
                  <div className="col-md-6">
                    <BootstrapForm.Group controlId="phone">
                      <BootstrapForm.Label>Teléfono</BootstrapForm.Label>
                      <Field
                        name="phone"
                        type="text"
                        as={BootstrapForm.Control}
                      />
                    </BootstrapForm.Group>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <BootstrapForm.Group controlId="nameCompanyRep">
                      <BootstrapForm.Label>
                        Nombre del Representante
                      </BootstrapForm.Label>
                      <Field
                        name="nameCompanyRep"
                        type="text"
                        as={BootstrapForm.Control}
                      />
                    </BootstrapForm.Group>
                  </div>
                  <div className="col-md-6">
                    <BootstrapForm.Group controlId="surnameCompanyRep">
                      <BootstrapForm.Label>
                        Apellido del Representante
                      </BootstrapForm.Label>
                      <Field
                        name="surnameCompanyRep"
                        type="text"
                        as={BootstrapForm.Control}
                      />
                    </BootstrapForm.Group>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <BootstrapForm.Group controlId="industryType">
                      <BootstrapForm.Label>
                        Tipo de Industria
                      </BootstrapForm.Label>
                      <Field
                        name="industryType"
                        type="text"
                        as={BootstrapForm.Control}
                      />
                    </BootstrapForm.Group>
                  </div>
                  <div className="col-md-6">
                    <BootstrapForm.Group controlId="companySize">
                      <BootstrapForm.Label>
                        Tamaño de la Compañía
                      </BootstrapForm.Label>
                      <Field
                        as="select"
                        name="companySize"
                        className="form-control"
                      >
                        <option value="" label="Selecciona tamaño" />
                        <option value="1-10" label="1-10" />
                        <option value="11-50" label="11-50" />
                        <option value="51-200" label="51-200" />
                        <option value="201-1000" label="201-1000" />
                        <option value="1001-5000" label="1001-5000" />
                        <option value="5001-10000" label="5001-10000" />
                        <option value="10001+" label="10001+" />
                      </Field>
                    </BootstrapForm.Group>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <BootstrapForm.Group controlId="website">
                      <BootstrapForm.Label>Sitio Web</BootstrapForm.Label>
                      <Field
                        name="website"
                        type="text"
                        as={BootstrapForm.Control}
                      />
                    </BootstrapForm.Group>
                  </div>
                  <div className="col-md-6">
                    <BootstrapForm.Group controlId="headquarters">
                      <BootstrapForm.Label>Sede</BootstrapForm.Label>
                      <Field
                        name="headquarters"
                        type="text"
                        as={BootstrapForm.Control}
                      />
                    </BootstrapForm.Group>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-12">
                    <BootstrapForm.Group controlId="description">
                      <BootstrapForm.Label>
                        Breve Descripción
                      </BootstrapForm.Label>
                      <Field
                        name="description"
                        as="textarea"
                        rows={3}
                        className="form-control"
                      />
                    </BootstrapForm.Group>
                  </div>
                </div>

                <div className="row  mb-3">
                  <div className="col-md-6"></div>
                  <div className="col-md-6">
                    <FieldArray name="socialNetworks">
                      {({ insert, remove, push }) => (
                        <div>
                          {values.socialNetworks.length > 0 &&
                            values.socialNetworks.map((network, index) => (
                              <div className="row" key={index}>
                                <div className="col">
                                  <Field
                                    name={`socialNetworks.${index}`}
                                    placeholder="Red Social"
                                    type="text"
                                  />
                                </div>
                                <div className="col-auto">
                                  <Button
                                    type="button"
                                    variant="danger"
                                    onClick={() => remove(index)}
                                  >
                                    -
                                  </Button>
                                </div>
                              </div>
                            ))}
                          <Button
                            type="button"
                            variant="success"
                            onClick={() => push("")}
                          >
                            Añadir Red Social
                          </Button>
                        </div>
                      )}
                    </FieldArray>
                  </div>
                </div>

                <div className="row mt-5 mb-3">
                  <div className="col-12 text-center">
                    <ButtonGlobal
                      width="40%"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Enviar
                    </ButtonGlobal>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default FormFillDataCompany;
