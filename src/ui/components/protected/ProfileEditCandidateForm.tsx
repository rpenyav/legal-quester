import { FC, useEffect, useState } from "react";
import { Usuario } from "../../../types";
import { Formik, Field, Form, FormikHelpers } from "formik";
import { Form as BootstrapForm } from "react-bootstrap";
import UploadImage from "./UploadImage";
import { ButtonGlobal, FloatingButtonGlobal } from "../ButtonGlobal";
import { useUserData } from "../../../app/state/hooks/useUserData";
import { ProfileArrayFields } from "./ProfileArrayFields";
import { saveIcon } from "../../../assets";
import { useUpdateIsActive } from "../../../app/state/hooks/useUpdateIsActive";

interface PropsEdition {
  dataUser: Usuario | undefined;
}

const ProfileEditCandidateForm: FC<PropsEdition> = ({ dataUser }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const initialValues: Usuario = {
    ...dataUser,
    preferences: dataUser?.preferences || {
      typeOfProjects: [],
      cityOfProjects: [],
      areaLegalProjects: [],
    },
  };

  const {
    isLoading: isUpdating,
    error: updateError,
    uploadAndUpdate,
    uploadToCloudinary,
  } = useUserData(dataUser?._id);

  const handleFilesChanged = (acceptedFiles: File[], previewUrl?: string) => {
    if (acceptedFiles.length > 0) {
      setSelectedFile(acceptedFiles[0]);
      if (previewUrl) {
        setPreviewUrl(previewUrl);
      }
    }
  };

  const handleSubmitData = async (values: Usuario) => {
    uploadAndUpdate.mutate(
      {
        dataToUpdate: values,
      },
      {
        onSuccess: (data) => {
          console.log("Datos actualizados: ", data);
        },
        onError: (error) => {
          console.log("Error al actualizar los datos: ", error);
        },
      }
    );
  };

  const handleUploadImage = async () => {
    if (selectedFile) {
      try {
        const imageUrl = await uploadToCloudinary(dataUser?._id!, selectedFile);
        handleSubmitData({ ...initialValues, profileImage: imageUrl });
      } catch (error) {
        console.log("Error al subir imagen a Cloudinary:", error);
      }
    }
  };

  const { updateIsActive } = useUpdateIsActive(dataUser?._id!);

  const handleIsActiveChange = (e: { target: { checked: any } }) => {
    const newIsActive = e.target.checked;
    updateIsActive(newIsActive);
  };

  return (
    <div className="profile pt-4">
      <div className="row">
        <div className="col-md-4">
          <UploadImage onFilesChanged={handleFilesChanged} />
          {!previewUrl ? (
            <img
              src={dataUser?.profileImage}
              alt={dataUser?.companyWebsite}
              className="foto-perfil mb-5"
            />
          ) : (
            <></>
          )}{" "}
          <ButtonGlobal width="100%" type="button" onClick={handleUploadImage}>
            Actualizar Imagen
          </ButtonGlobal>
        </div>
        <div className="col-md-8">
          <Formik
            initialValues={initialValues}
            onSubmit={async (
              values: Usuario,
              { setSubmitting }: FormikHelpers<Usuario>
            ) => {
              await handleSubmitData(values);

              // Subir imagen si está seleccionada
              if (selectedFile) {
                await handleUploadImage();
              }

              setSubmitting(false);
            }}
            validate={(values) => {
              const errors: Partial<Usuario> = {};
              if (!values.nameCompanyRep) {
                errors.nameCompanyRep = "Obligatorio";
              }
              return errors;
            }}
          >
            {(formikProps) => {
              // useEffect(() => {
              //   console.log("Valores del formulario:", formikProps.values);
              // }, [formikProps.values]);

              return (
                <Form onSubmit={formikProps.handleSubmit}>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <BootstrapForm.Group controlId="nameCompanyRep">
                        <BootstrapForm.Label>Nombre*</BootstrapForm.Label>
                        <Field
                          name="nameCompanyRep"
                          type="text"
                          as={BootstrapForm.Control}
                          onBlur={(e: { target: { value: any } }) => {
                            formikProps.setFieldValue(
                              "nameCompanyRep",
                              e.target.value
                            );
                          }}
                        />
                      </BootstrapForm.Group>
                    </div>
                    <div className="col-md-6">
                      <BootstrapForm.Group controlId="surnameCompanyRep">
                        <BootstrapForm.Label>Apellidos</BootstrapForm.Label>
                        <Field
                          name="surnameCompanyRep"
                          type="text"
                          as={BootstrapForm.Control}
                          onBlur={(e: { target: { value: any } }) => {
                            formikProps.setFieldValue(
                              "surnameCompanyRep",
                              e.target.value
                            );
                          }}
                        />
                      </BootstrapForm.Group>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-6">
                      <BootstrapForm.Group controlId="telephone">
                        <BootstrapForm.Label>telephone</BootstrapForm.Label>
                        <Field
                          name="telephone"
                          type="text"
                          as={BootstrapForm.Control}
                          onBlur={(e: { target: { value: any } }) => {
                            formikProps.setFieldValue(
                              "telephone",
                              e.target.value
                            );
                          }}
                        />
                      </BootstrapForm.Group>
                    </div>
                    <div className="col-md-6">
                      <BootstrapForm.Group controlId="location">
                        <BootstrapForm.Label>location</BootstrapForm.Label>
                        <Field
                          name="location"
                          type="text"
                          as={BootstrapForm.Control}
                          onBlur={(e: { target: { value: any } }) => {
                            formikProps.setFieldValue(
                              "location",
                              e.target.value
                            );
                          }}
                        />
                      </BootstrapForm.Group>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <BootstrapForm.Group controlId="numColegiado">
                        <BootstrapForm.Label>Num Colegiado</BootstrapForm.Label>
                        <Field
                          name="numColegiado"
                          type="text"
                          as={BootstrapForm.Control}
                          onBlur={(e: { target: { value: any } }) => {
                            formikProps.setFieldValue(
                              "numColegiado",
                              e.target.value
                            );
                          }}
                        />
                      </BootstrapForm.Group>
                    </div>
                    <div className="col-md-6">
                      <BootstrapForm.Group controlId="jobTitle">
                        <BootstrapForm.Label>Job Title</BootstrapForm.Label>
                        <Field
                          name="jobTitle"
                          type="text"
                          as={BootstrapForm.Control}
                          onBlur={(e: { target: { value: any } }) => {
                            formikProps.setFieldValue(
                              "jobTitle",
                              e.target.value
                            );
                          }}
                        />
                      </BootstrapForm.Group>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-12">
                      <BootstrapForm.Group controlId="companyDescription">
                        <BootstrapForm.Label>
                          Breve Descripción
                        </BootstrapForm.Label>
                        <Field
                          name="companyDescription"
                          as="textarea"
                          rows={3}
                          className="form-control"
                          onBlur={(e: { target: { value: any } }) => {
                            formikProps.setFieldValue(
                              "companyDescription",
                              e.target.value
                            );
                          }}
                        />
                      </BootstrapForm.Group>
                    </div>
                  </div>

                  {/* certifications */}
                  <div className="row mt-5 mb-3">
                    <div className="col-md-12">
                      <ProfileArrayFields
                        formikProps={formikProps}
                        fieldName="certifications"
                        label="Certificaciones"
                        placeholder="Escriba aquí sus certificaciones"
                        user={dataUser?._id!}
                      />
                    </div>
                  </div>
                  {/* curriculum */}
                  <div className="row  mb-3">
                    <div className="col-md-12">
                      <ProfileArrayFields
                        formikProps={formikProps}
                        fieldName="curriculum"
                        label="Currículum"
                        placeholder="Escriba aquí su experiencia"
                        user={dataUser?._id!}
                      />
                    </div>
                  </div>
                  {/* skills */}
                  <div className="row  mb-3">
                    <div className="col-md-12">
                      <ProfileArrayFields
                        formikProps={formikProps}
                        fieldName="skills"
                        label="Cualidades"
                        placeholder="Escriba aquí sus cualidades especiales"
                        user={dataUser?._id!}
                      />
                    </div>
                  </div>

                  {/* languages */}
                  <div className="row  mb-3">
                    <div className="col-md-12">
                      <ProfileArrayFields
                        formikProps={formikProps}
                        fieldName="languages"
                        label="Idiomas"
                        placeholder="Escriba aquí los idiomas"
                        user={dataUser?._id!}
                      />
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="row  mb-3">
                    <div className="col-md-12">
                      <ProfileArrayFields
                        formikProps={formikProps}
                        fieldName="socialLinks"
                        label="Redes Sociales"
                        placeholder="Escriba aquí sus redes sociales"
                        user={dataUser?._id!}
                      />
                    </div>
                  </div>

                  {/* preferences */}
                  <div className="row  mb-3">
                    <div className="col-md-12">
                      <h4>Preferencias para los proyectos</h4>
                      <p className="mb-5">
                        Estos serán los temas de los proyectos que verá en su
                        timeline
                      </p>
                      <ProfileArrayFields
                        formikProps={formikProps}
                        fieldName="preferences.typeOfProjects"
                        label="Tipo de Proyectos"
                        placeholder="Ingrese el tipo de proyecto"
                        user={dataUser?._id!}
                      />
                      <ProfileArrayFields
                        formikProps={formikProps}
                        fieldName="preferences.cityOfProjects"
                        label="Ciudad de Proyectos"
                        placeholder="Ingrese la ciudad del proyecto"
                        user={dataUser?._id!}
                      />
                      <ProfileArrayFields
                        formikProps={formikProps}
                        fieldName="preferences.areaLegalProjects"
                        label="Área de Proyectos Legales"
                        placeholder="Ingrese el área de proyecto legal"
                        user={dataUser?._id!}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-12">
                      <hr />
                      <p>
                        <strong>
                          Si necesitas mantenerte un tiempo inactivo, puedes
                          desactivar la cuenta. Cuando vuelvas a activarla, todo
                          estará como antes.
                        </strong>
                      </p>
                      <Field
                        type="checkbox"
                        name="isActive"
                        onChange={(e: any) => {
                          formikProps.handleChange(e);
                          handleIsActiveChange(e);
                        }}
                      />
                      <label className="ms-2" htmlFor="isActive">
                        {formikProps.values.isActive
                          ? " Desactivar"
                          : " Activar"}{" "}
                        cuenta
                      </label>
                      {/* Etiqueta condicional */}
                      {formikProps.values.isActive ? (
                        <span className="active-label ms-2">
                          (La cuenta está activa)
                        </span>
                      ) : (
                        <span className="inactive-label ms-2">
                          (La cuenta está inactiva)
                        </span>
                      )}
                      <hr />
                    </div>
                  </div>
                  <div className="row mt-5 mb-3">
                    <div className="col-12 text-center">
                      <FloatingButtonGlobal
                        type="submit"
                        disabled={formikProps.isSubmitting}
                        width="40%"
                      >
                        <img
                          src={saveIcon}
                          alt="Guardar"
                          className="icon-save"
                        />
                      </FloatingButtonGlobal>
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditCandidateForm;
