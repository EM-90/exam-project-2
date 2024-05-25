import React, { useState } from 'react';
import { useAuth } from '../../../context/authContext';
import ValidationError from '../../messages/validationError';

interface LoginFormProps {
  onRegisterClick: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onRegisterClick }) => {
  const { login } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;
    const error = await login(email, password);
    if (error) {
      setErrorMessage(error);
    } else {
      setErrorMessage(null); 
    }
  };

  return (
    <div className='container  min-h-screen flex flex-col mt-40 items-center '>
      <h2 className="text-5xl font-light mb-10">Login</h2>
      {errorMessage && (
          <ValidationError errorMessage={errorMessage}/>
        )}
      <form className='mb-40 sm:w-96 md:w-96  lg:w-96' onSubmit={handleSubmit}>  
        <div className="mb-6">
          <label htmlFor="email" className="block mb-2 font-medium">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-skin-InputBorder"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block mb-2 font-medium">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-skin-InputBorder"
            required
            autoComplete="current-password"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-skin-createBg text-skin-primary hover:text-white rounded-md hover:bg-skin-primary border-skin-primary"
        >
          Login
        </button>
        <button className="my-4  text-center underline text-blue-900 font-medium" onClick={onRegisterClick}>Don't have an account? Register here</button>
      </form>
    </div>
  );
}

export default LoginForm;

//have to change the width of form 

