import React, { ChangeEvent, FormEvent, useState } from 'react';
import registerUser from '../../../api/registerUser';

interface Avatar {
    url: string;
    alt: string;
  }

interface FormData {
    name: string;
    email: string;
    password: string;
    avatar: Avatar;
    
  }

function RegisterForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    avatar: { url: '', alt: '' },
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'avatar') {
        setFormData({ ...formData, avatar: { ...formData.avatar, url: value } }); 
    } else {
        setFormData({ ...formData, [name]: value });
    }
};


  const handleFormSubmit =  async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try{
        const response = await registerUser(formData);
        console.log('Registration success', response);
    }catch(error) {
        console.log('Registration failed',)
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
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-skin-InputBorder"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-skin-InputBorder"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-skin-InputBorder"
            required
            autoComplete="current-password"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="avatar" className="block mb-2">Avatar</label>
          <input
            type="text"
            id="avatar"
            name="avatar"
            value={formData.avatar.url}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-skin-InputBorder"
          />
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

