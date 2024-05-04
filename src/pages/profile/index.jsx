import React, { useState } from "react";
import LoginForm from "../../components/forms/loginForm";
import RegisterForm from "../../components/forms/registerForm";
import { useAuth } from '../../context/authContext';
import UserInfo from "../../components/profileContent/userInfo";


function Profile() {
  const { user } = useAuth();
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const toggleForm = () => setShowRegisterForm(prev => !prev);

  if (user) {
    return (
      <main>
        <UserInfo/>
      </main>
    );
  } else {
    return (
      <main>
        {showRegisterForm ? (
          <RegisterForm onLoginClick={toggleForm} />
        ) : (
          <LoginForm onRegisterClick={toggleForm} />
        )}
      </main>
    );
  }
}

export default Profile;

