import React from "react";

interface ValidationErrorProps {
  errorMessage: string;
}

const ValidationError: React.FC<ValidationErrorProps> = ({ errorMessage }) => {
  return (
    <article className="mb-4 p-2 font-medium text-red-600">
      {errorMessage}
    </article>
  );
};

export default ValidationError;
