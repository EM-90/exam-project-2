import React from "react";

interface ValidationSuccessProps {
  successMessage: string;
}

function ValidationSuccess({ successMessage }: ValidationSuccessProps) {
  return (
    <article className="w-96 mb-4 p-2 font-medium text-green-600">
      {successMessage}
    </article>
  );
}

export default ValidationSuccess;
