import React from 'react';

interface ValidationErrorProps {
  errorMessage: string;
}

const ValidationError: React.FC<ValidationErrorProps> = ({ errorMessage }) => {
  return (
    <div className="w-96 mb-4 p-2 font-medium text-red-600">
      {errorMessage}
    </div>
  );
};

export default ValidationError;

