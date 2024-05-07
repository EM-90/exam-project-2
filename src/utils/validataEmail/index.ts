
function validateEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@stud\.noroff\.no$/;
    return emailRegex.test(email);
  }
  

  export default validateEmail;