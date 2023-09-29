import React from "react";
import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import CalendarIconComponent from "../CalendarIconComponent";

registerLocale("es", es);
interface Option {
  value: string;
  label: string;
}

interface SearchFieldProps {
  label?: string;
  value?: any;
  onChange?: (newValue: any) => void;
  type?: "text" | "date" | "textarea" | "select"; // Admite "textarea" como tipo
  rows?: number;
  options?: Option[];
  readonly?: boolean;
}

export const SearchField: React.FC<SearchFieldProps> = ({
  label,
  value,
  onChange,
  type = "text",
  rows = 3,
  options = [],
  readonly = false,
}) => {
  const userLocale = "es";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      // Verifica si onChange está definido
      onChange(e.target.value);
    }
  };
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      // Verifica si onChange está definido
      onChange(e.target.value);
    }
  };

  const handleDateChange = (date: Date | null) => {
    if (onChange) {
      // Verifica si onChange está definido
      onChange(date);
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <>
      <div className="form-control-search-container">
        <label htmlFor={label}>{label}</label>
        {type === "date" ? (
          <DatePicker
            className="form-control-search-date"
            selected={value}
            onChange={handleDateChange}
            locale={userLocale}
            shouldCloseOnSelect={false}
          />
        ) : type === "textarea" ? ( // Verifica si es un textarea
          <textarea
            id={label}
            name={label}
            value={value}
            onChange={handleTextareaChange}
            rows={rows}
            className="form-control-search"
          />
        ) : type === "select" ? (
          <select
            id={label}
            name={label}
            value={value}
            onChange={handleSelectChange}
            className="form-control-search"
          >
            {options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            type="search"
            className="form-control-search"
            id={label}
            name={label}
            value={value}
            readOnly={readonly}
            onChange={handleInputChange}
          />
        )}
      </div>
    </>
  );
};
