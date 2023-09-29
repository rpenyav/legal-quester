import React, { useState } from "react";
import { ProgressBar } from "react-bootstrap";
import { ButtonGlobal } from "../ButtonGlobal";
import { FormCreateQuestionnaire } from "./FormCreateQuestionnaire";
import Swal from "sweetalert2";
import { FormCreateProject } from "./FormCreateProject";
export const WizardProject = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [hasQuestions, setHasQuestions] = useState(false);

  const NextButton = () => (
    <ButtonGlobal
      disabled={true}
      onClick={() => {
        // if (hasQuestions) {
        //   Swal.fire({
        //     title: "Confirmación",
        //     text: 'No ha finalizado la creación del cuestionario, desea cancelar y terminarlo? si pulsa a "Siguiente" sin guardar el cuestionario perderá los cambios, está seguro?',
        //     icon: "warning",
        //     showCancelButton: true,
        //     confirmButtonText: "Siguiente",
        //     cancelButtonText: "Cancelar",
        //   }).then((result) => {
        //     if (result.isConfirmed) {
        //       setCurrentStep(currentStep + 1);
        //     }
        //   });
        // } else {
        setCurrentStep(currentStep + 1);
        //}
      }}
    >
      Siguiente
    </ButtonGlobal>
  );

  const PreviousButton = () => (
    <ButtonGlobal onClick={() => setCurrentStep(currentStep - 1)}>
      Anterior
    </ButtonGlobal>
  );

  // Obtener el componente de Step actual a partir del array
  const Step = steps[currentStep];

  const progressValues = [
    { now: 33, className: "step-bar1" },
    { now: 33, className: "step-bar2" },
    { now: 34, className: "step-bar3" },
  ];

  return (
    <div className="wizard-container mt-5">
      <div className="step-labels">
        <span>Detalles del caso</span>
        <span>Cuestionario (opcional)</span>
        <span>Solicitar documentos</span>
      </div>
      <ProgressBar className="custom-progress-bar">
        {progressValues.map((value, index) => (
          <ProgressBar
            className={
              index === currentStep
                ? value.className
                : index < currentStep
                ? progressValues[index].className
                : "default-bar"
            }
            now={value.now}
            key={index}
          />
        ))}
      </ProgressBar>
      <Step />

      <div className="row mt-5">
        <div className="col-2"> {currentStep > 0 && <PreviousButton />}</div>
        <div className="col-8"></div>
        <div className="col-2">
          {currentStep < steps.length - 1 && <NextButton />}
        </div>
      </div>
    </div>
  );
};

// Definición de cada componente de Step al final del archivo
const Step1 = () => (
  <div className="mt-5 mb-5">
    <h1>Formulario de detalles del caso</h1>
    <p>
      A continuación puedes crear un caso añadiendo datos en los campos. Una vez
      creado el proyecto puedes continuar en "Siguiente".
    </p>
    <FormCreateProject />
  </div>
);
const Step2 = () => (
  <div className="mt-5  mb-5">
    <h1>Cuestionario</h1>
    <FormCreateQuestionnaire />
  </div>
);
const Step3 = () => (
  <div className="mt-5 mb-5">
    <h1>Solicitar documentos</h1>
  </div>
);

// Array que contiene los componentes de cada Step
const steps = [Step1, Step2, Step3];
