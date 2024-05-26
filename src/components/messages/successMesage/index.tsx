import React from "react";

interface SuccessMessageProps {
  successMessage: string;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ successMessage }) => {
  return (
    <article className="w-44 h-10 p-2 font-medium rounded-t-md bg-green-200 text-green-600 absolute animate-pulseBackground">
      {successMessage}
    </article>
  );
};

export default SuccessMessage;
