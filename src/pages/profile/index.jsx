import RegisterForm from "../../components/forms/registerForm";
import LoginForm from "../../components/forms/loginForm";
import { useState } from "react";


function Profile() {

  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const toggleForm = () => setShowRegisterForm(prev => !prev)


  return (
    <main>
      {showRegisterForm ? (
        <RegisterForm onLoginClick={toggleForm} />
      ) : (
        <LoginForm onRegisterClick={toggleForm} />
      )}
    </main>
  )
}

export default Profile
