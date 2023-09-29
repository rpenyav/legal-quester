import React, { FC, useState } from "react";
import { useFormik } from "formik";
import { anyadirIcon, checkedIcon } from "../../../assets";
import { useAuth } from "../../../infrastructure";
import { useSaveQuestionnaire } from "../../../app/state/hooks/useSaveQuestionnaire";
import { Question } from "../../../types";

interface Questionnaire {
  projectId: string;
  userId: string;
  questions: Question[];
  title: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const FormCreateQuestionnaire = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [multipleOptions, setMultipleOptions] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const { userData } = useAuth();
  const { saveQuestionnaire } = useSaveQuestionnaire();

  const addQuestion = () => {
    const values = formik.values;
    let formattedQuestion: Question | null = null;

    if (values.type === "a") {
      formattedQuestion = {
        question: values.question,
        type: "multipleChoice",
        options: multipleOptions,
      };
    } else if (values.type === "b") {
      formattedQuestion = {
        question: values.question,
        type: "text",
      };
    }

    if (formattedQuestion) {
      setQuestions([...questions, formattedQuestion]);
      setMultipleOptions([]);
      formik.resetForm();
    }
  };

  const handleSubmit = () => {
    if (questions.length === 0 || title.trim() === "") {
      if (questions.length === 0) {
        console.error("Debe agregar al menos una pregunta antes de enviar.");
      }
      if (title.trim() === "") {
        console.error("El título es obligatorio antes de enviar.");
      }
      return;
    }

    if (userData && userData._id) {
      const questionnaireData: Questionnaire = {
        projectId: "tu_project_id_aqui", //TODO define tu project id
        title: title,
        userId: userData._id,
        questions,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      saveQuestionnaire(questionnaireData);
    } else {
      console.error("El usuario no tiene un ID válido.");
    }
  };

  const formik = useFormik({
    initialValues: {
      question: "",
      type: "",
    },
    onSubmit: addQuestion,
  });

  formik.handleSubmit = (e: any) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <div className="mt-5">
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-5">
          <p>
            <label htmlFor="title">Nombre del Cuestionario</label>
          </p>
          <input
            id="title"
            name="title"
            className="form-control"
            placeholder="Escriba el nombre del cuestionario"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>

        <div>
          <p>
            Escriba aquí la definición de la pregunta y seleccione el tipo de
            respuesta. Si las respuestas son múltiples y tipo test, pulse en
            "Añadir respuesta" para añadir las posibles respuestas
            seleccionables para el usuario.
          </p>
        </div>
        <div className="d-flex justify-content-start">
          <div className="w-100 me-3">
            <input
              id="question"
              name="question"
              className="form-control "
              type="text"
              onChange={formik.handleChange}
              value={formik.values.question}
            />
          </div>
          <div>
            <select
              className="form-control-global"
              name="type"
              onChange={formik.handleChange}
              value={formik.values.type}
            >
              <option value="" label="Seleccione el tipo de respuesta" />
              <option value="a" label="Multiple answers" />
              <option value="b" label="Single answer" />
            </select>
          </div>

          {formik.values.type === "b" && (
            <button
              type="button"
              onClick={() => {
                const values = formik.values;
                if (values.type === "b") {
                  const formattedQuestion: Question = {
                    // Explicitamente definiendo el tipo aquí como Question
                    question: values.question,
                    type: "text",
                  };
                  setQuestions([...questions, formattedQuestion]);
                  formik.resetForm();
                }
              }}
            >
              Añadir Pregunta de Respuesta Única
            </button>
          )}
        </div>

        {formik.values.type === "a" && (
          <div className="mt-4">
            <div className="d-flex justify-content-between">
              <div>
                <div className="d-flex justify-content-start">
                  <button
                    className="btn-icon"
                    type="button"
                    onClick={() => setMultipleOptions([...multipleOptions, ""])}
                  >
                    <img
                      src={anyadirIcon}
                      alt="añadir respuesta"
                      className="icon-btn"
                    />
                  </button>
                  <p className="ms-2">
                    Pulse para añadir respuestas a la pregunta
                  </p>
                </div>
              </div>

              <div>
                <div className="d-flex justify-content-start">
                  <button
                    type="button"
                    onClick={addQuestion}
                    className="btn-icon"
                  >
                    <img src={checkedIcon} alt="Done" className="icon-btn" />
                  </button>
                  <p className="ms-2">Pulse para finalizar esta pregunta</p>{" "}
                </div>
              </div>
            </div>
            {multipleOptions.map((option, index) => (
              <input
                className="form-control mb-2"
                key={index}
                type="text"
                placeholder={`Opción ${index + 1}`}
                value={option}
                onChange={(e) => {
                  const newOptions = [...multipleOptions];
                  newOptions[index] = e.target.value;
                  setMultipleOptions(newOptions);
                }}
              />
            ))}
          </div>
        )}

        <div className="mt-5">
          {questions.length > 0 && (
            <>
              <h4>Preguntas creadas</h4>
              <p>Aquí puede ver las preguntas y respuestas creadas</p>
            </>
          )}

          {questions.map((q, index) => (
            <div key={index}>
              <div className="d-flex">
                <span className="me-2">{`Pregunta ${index + 1}:`}</span>
                <input
                  className="form-control"
                  value={q.question}
                  onChange={(e) => {
                    const newQuestions = [...questions];
                    newQuestions[index].question = e.target.value;
                    setQuestions(newQuestions);
                  }}
                />
              </div>
              <div className="d-flex mt-2">
                <span className="me-2">Tipo:</span>
                <span>{q.type}</span>
              </div>
              {q.options && (
                <div className="mt-2">
                  <span className="me-2">Opciones:</span>
                  {q.options.map((option, optIndex) => (
                    <div className="d-flex mt-2" key={optIndex}>
                      <input
                        className="form-control"
                        value={option}
                        onChange={(e) => {
                          const newQuestions = [...questions];
                          newQuestions[index].options![optIndex] =
                            e.target.value;
                          setQuestions(newQuestions);
                        }}
                      />
                      <button
                        className="btn btn-danger ms-2"
                        onClick={() => {
                          const newQuestions = [...questions];
                          newQuestions[index].options!.splice(optIndex, 1);
                          setQuestions(newQuestions);
                        }}
                      >
                        Eliminar
                      </button>
                    </div>
                  ))}
                  <button
                    className="btn btn-primary mt-2"
                    onClick={() => {
                      const newQuestions = [...questions];
                      newQuestions[index].options!.push("");
                      setQuestions(newQuestions);
                    }}
                  >
                    Añadir respuesta
                  </button>
                </div>
              )}

              <button
                className="btn btn-danger mt-2"
                onClick={() => {
                  const newQuestions = [...questions];
                  newQuestions.splice(index, 1); // Elimina la pregunta en el índice dado
                  setQuestions(newQuestions);
                }}
              >
                Eliminar pregunta
              </button>
            </div>
          ))}
        </div>

        {questions.length > 0 && (
          <div className="mt-5 d-flex justify-content-end text-right">
            <div>
              <p>
                Pulse para terminar el cuestionario y almacenar las preguntas
              </p>
              <button type="submit">Enviar pregunta al servidor</button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};
