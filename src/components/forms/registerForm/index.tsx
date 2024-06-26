import React, { ChangeEvent, FormEvent, useState } from "react";
import { useAuth } from "../../../context/authContext";
import validateEmail from "../../../utils/validataEmail";
import ValidationError from "../../messages/validationError";
import ValidationSuccess from "../../messages/validationSuccess";

interface RegisterFormProps {
  onLoginClick: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onLoginClick }) => {
  const { register } = useAuth();
  const [errors, setErrors] = useState<{ [key: string]: string }>({
    name: "",
    email: "",
    password: "",
  });
  const [data, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    venueManager: false,
  });
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;
    if (type === "checkbox") {
      setFormData({ ...data, [name]: checked });
      console.log(checked);
    } else {
      setFormData({ ...data, [name]: value });
    }
    setErrors({ ...errors, [name]: "" });
  };

  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newErrors: { [key: string]: string } = {};

    if (name === "name" && value.length < 3) {
      newErrors.name = "Username must be at least 3 characters long";
    } else if (name === "email" && !validateEmail(value)) {
      newErrors.email = "Email must end with stud.noroff.no";
    } else if (name === "password" && value.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }

    setErrors({ ...errors, ...newErrors });
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!errors.name && !errors.email && !errors.password) {
      try {
        await register(data.name, data.email, data.password, data.venueManager);
        setSuccessMessage("Registration successful. You can now log in.");
      } catch (error) {
        console.error("Registration failed:", error);
      }
    }
  };
  return (
    <div className="container mx-auto my-7 min-h-screen flex flex-col mt-40 items-center">
      <h2 className="text-5xl font-light mb-10">Register</h2>
      <form
        className="mb-40 sm:w-96 md:w-96 lg:w-96"
        onSubmit={handleFormSubmit}
      >
        <div className="checkbox flex items-center my-7">
          <input
            type="checkbox"
            id="venueManager"
            name="venueManager"
            checked={data.venueManager}
            onChange={handleChange}
            className="w-5 h-5 rounded border border-gray-300 cursor-pointer focus:outline-none focus:border-skin-primary"
          />
          <label
            htmlFor="venueManager"
            className="ml-2 cursor-pointer select-none font-medium"
          >
            Venue manager access
          </label>
        </div>
        <div className="mb-6">
          <label htmlFor="name" className="block mb-2 font-medium">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={data.name}
            onChange={handleChange}
            onBlur={(e) => handleBlur(e)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-skin-InputBorder"
            required
          />
          {errors.name && <ValidationError errorMessage={errors.name} />}
        </div>
        <div className="mb-6">
          <label htmlFor="email" className="block mb-2 font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            onBlur={(e) => handleBlur(e)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-skin-InputBorder"
            required
          />
          {errors.email && <ValidationError errorMessage={errors.email} />}
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block mb-2 font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={data.password}
            onChange={handleChange}
            onBlur={(e) => handleBlur(e)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-skin-InputBorder"
            required
            autoComplete="current-password"
          />
          {errors.password && (
            <ValidationError errorMessage={errors.password} />
          )}
        </div>
        {successMessage && (
          <ValidationSuccess successMessage={successMessage} />
        )}
        <div></div>
        <button
          type="submit"
          className="w-full py-2 bg-skin-createBg text-skin-primary hover:text-white rounded-md hover:bg-skin-primary border-skin-primary"
        >
          Register
        </button>
        <button onClick={onLoginClick}>Have an account? Log in here</button>
      </form>
    </div>
  );
};

export default RegisterForm;
