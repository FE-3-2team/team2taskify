import { useState } from "react";

const useColumnForm = () => {
  const [newColumnTitle, setNewColumnTitle] = useState("");

  const resetNewColumnForm = () => {
    setNewColumnTitle("");
  };

  return {
    newColumnTitle,
    setNewColumnTitle,
    resetNewColumnForm,
  };
};

export default useColumnForm;
