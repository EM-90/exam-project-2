import React, { ChangeEvent, FormEvent, useState } from 'react';
import create from '../../../api/crud/create';
import validationMessage from '../../../utils/formUtils';

function validateEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@stud\.noroff\.no$/;
  return emailRegex.test(email);
}

function RegisterForm() {
  const [errors, setErrors] = useState<{ [key: string]: string }>({
    name: '',
    email: '',
    password: ''
  });
  const [data, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...data, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleBlur = (e: ChangeEvent<HTMLInputElement>, message: string) => {
    const { name, value } = e.target;
    let newErrors: { [key: string]: string } = {};

    switch (name) {
      case 'name':
        newErrors.name = value.length < 3 ? message : '';
        break;
      case 'email':
        newErrors.email = !validateEmail(value) ? message : '';
        break;
      case 'password':
        newErrors.password = value.length < 8 ? message : '';
        break;
      default:
        break;
    }

    setErrors({ ...errors, ...newErrors });
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let newErrors: { [key: string]: string } = {};

    if (data.name.length < 3) {
      newErrors.name = '';
    }

    if (!validateEmail(data.email)) {
      newErrors.email = '';
    }

    if (data.password.length < 8) {
      newErrors.password = '';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await create("/auth/register", data);
      setSuccessMessage(validationMessage(response.errors, "Registration successful"));
      return response;
    } catch (error) {
      console.log('Registration failed', error);
    }
  };

  return (
    <div className='container mx-auto my-7 px-7 min-h-screen flex flex-col justify-center items-center '>
      <h2 className="text-5xl font-light mb-10">Register</h2>
      <form className='mb-40 w-1/2' onSubmit={handleFormSubmit}>
        <div className='checkbox flex item-center my-7'>
          <input
            type='checkbox'
            id="checkbox"
            className="w-5 h-5 rounded border border-gray-300 cursor-pointer focus:outline-none focus:border-skin-primary"
          />
          <label htmlFor="exampleCheckbox" className="ml-2 cursor-pointer select-none font-medium">
            Venue manager access
          </label>
        </div>
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={data.name}
            onChange={handleChange}
            onBlur={(e) => handleBlur(e, 'Username must be at least 3 characters long')}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-skin-InputBorder"
            required
          />
          {errors.name && <div style={{ color: 'red' }}>{errors.name}</div>}
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            onBlur={(e) => handleBlur(e, 'e-mail must end with stud.noroff.no')}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-skin-InputBorder"
            required
          />
          {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={data.password}
            onChange={handleChange}
            onBlur={(e) => handleBlur(e, 'Username must be at least 3 characters long')}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-skin-InputBorder"
            required
            autoComplete="current-password"
          />
          {errors.password && <div style={{ color: 'red' }}>{errors.password}</div>}
        </div>
        {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
        <div>
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-skin-createBg text-skin-primary hover:text-white rounded-md hover:bg-skin-primary border-skin-primary"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;

