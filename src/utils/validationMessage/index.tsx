const validationMessage = (errors: any[], successMessage: string): string | null => {
  if (!errors || errors.length === 0) {
    return successMessage;
  } else {
    return null;
  }
};

export default validationMessage;


  