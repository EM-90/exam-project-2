

const registerUser = async (formData: any) => {
  try {
    const response = await fetch("https://v2.api.noroff.dev/auth/register", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.log('Registration failed:', error);
  }
};

export default registerUser;
