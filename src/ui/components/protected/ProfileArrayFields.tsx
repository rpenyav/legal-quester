import React, { useState } from "react";
import { FormikProps, FieldArray, Field } from "formik";
import { Button, Form as BootstrapForm } from "react-bootstrap";
import BadgeCustom from "../BadgeCustom";
import { anyadirIcon, eliminarIcon } from "../../../assets";
import cities from "../../../infrastructure/cities";
import { caseTypes, legalAreas } from "../../../infrastructure/legalConstants";
import { useUserData } from "../../../app/state/hooks/useUserData";

const getNestedFieldValue = (obj: any, path: string) => {
  return path
    .split(".")
    .reduce(
      (acc: { [x: string]: any }, part: string | number) => acc && acc[part],
      obj
    );
};

interface DynamicArrayProps {
  formikProps: FormikProps<any>;
  fieldName: string;
  label: string;
  placeholder: string;
  customRender?: (index: number, arrayHelpers: any) => JSX.Element;
  user: string;
}

export const ProfileArrayFields: React.FC<DynamicArrayProps> = ({
  formikProps,
  fieldName,
  label,
  placeholder,
  customRender,
  user,
}) => {
  const [inputValue, setInputValue] = useState("");
  const isPreferenceField = fieldName.startsWith("preferences.");
  const isCities = fieldName.startsWith("preferences.cityOfProjects");
  const isTypes = fieldName.startsWith("preferences.typeOfProjects");

  return (
    <FieldArray name={fieldName}>
      {(arrayHelpers) => (
        <div>
          <h5 className="mb-4">{label}</h5>
          <div className="d-flex justify-content-between mb-4">
            <div className=" w-100">
              {isPreferenceField ? (
                <select
                  className="form-control-global w-100"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                >
                  <option value="" label="Seleccione una opción" />

                  {isCities
                    ? cities.map((citi, index) => (
                        <option key={index} value={citi.value}>
                          {citi.label}
                        </option>
                      ))
                    : isTypes
                    ? caseTypes.map((typ, index) => (
                        <option key={index} value={typ.value}>
                          {typ.label}
                        </option>
                      ))
                    : legalAreas.map((leg, index) => (
                        <option key={index} value={leg.value}>
                          {leg.label}
                        </option>
                      ))}
                </select>
              ) : (
                <input
                  className="form-control"
                  type="text"
                  placeholder={placeholder}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
              )}
            </div>

            <Button
              className={
                inputValue
                  ? "button-plus ms-2"
                  : "ms-2 button-plus button-plus-disabled"
              }
              onClick={async () => {
                if (inputValue !== "") {
                  arrayHelpers.push(inputValue);

                  setInputValue("");
                }
              }}
              disabled={inputValue === ""}
            >
              <img src={anyadirIcon} alt="añadir" className="icono-anyadir" />
            </Button>
          </div>
          <div className="d-flex justify-content-start mb-5">
            {getNestedFieldValue(formikProps.values, fieldName) &&
              getNestedFieldValue(formikProps.values, fieldName).map(
                (item: any, index: number) => (
                  <BadgeCustom padding="2px 15px 4px 15px" key={index}>
                    <div>
                      <span>{item}</span>
                      <input
                        type="hidden"
                        name={`${fieldName}.${index}`}
                        value={item}
                      />
                      <Button
                        className="ms-3 button-plus"
                        type="button"
                        onClick={() => arrayHelpers.remove(index)}
                      >
                        <img
                          src={eliminarIcon}
                          alt="eliminar"
                          className="icono-eliminar"
                        />
                      </Button>
                    </div>
                  </BadgeCustom>
                )
              )}
          </div>
          <hr />
        </div>
      )}
    </FieldArray>
  );
};
