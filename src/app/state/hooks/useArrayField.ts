import { useState } from "react";

export const useArrayField = (initialValue: string[] = []) => {
  const [fieldArray, setFieldArray] = useState(initialValue);
  const [currentItem, setCurrentItem] = useState("");

  const handleAddItem = () => {
    if (currentItem) {
      setFieldArray([...fieldArray, currentItem]);
      setCurrentItem("");
    }
  };

  const handleRemoveItem = (index: number) => {
    setFieldArray(fieldArray.filter((_, i) => i !== index));
  };

  return {
    fieldArray,
    currentItem,
    setCurrentItem,
    handleAddItem,
    handleRemoveItem,
  };
};
