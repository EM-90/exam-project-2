import React, { useState } from 'react';
import { HiOutlineUserCircle } from "react-icons/hi";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="shadow-md">
      <div className="container mx-auto py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-skin-primary text-2xl font-bold">Holidaze</h1>

          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="px-4 text-skin-primary hover:text-blue-400 focus:outline-none"
            >
              {/* Your menu icon */}
              {/* You can replace this with your custom menu icon */}
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Your mobile menu */}
          <div className={`md:hidden fixed inset-0 bg-skin-primary z-50 overflow-hidden transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <button
              onClick={toggleMenu}
              type="button"
              className="absolute top-0 right-0 mt-4 mr-4 text-white hover:text-gray-200 focus:outline-none"
            >
              {/* Close icon */}
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <ul className="flex flex-col items-center space-y-4 pt-8 pr-4">
              <li>
                <a href="#" className="text-white hover:font-bold">Home</a>
              </li>
              <li>
                <a href="#" className="text-white hover:font-bold">About</a>
              </li>
              <li>
                <a href="#" className="text-white hover:font-bold">Contact</a>
              </li>
                <HiOutlineUserCircle className="h-8 w-8 text-white hover:font-bold" />
            </ul>
          </div>

          {/* Your desktop menu */}
          <ul className="hidden md:flex space-x-4">
            <li>
              <a href="#" className="text-gray-700 font-medium hover:text-skin-primary ps-5">Home</a>
            </li>
            <li>
              <a href="#" className="text-gray-700 font-medium hover:text-skin-primary ps-5">About</a>
            </li>
            <li>
              <a href="#" className="text-gray-700 font-medium hover:text-skin-primary ps-5">Contact</a>
            </li>
              <HiOutlineUserCircle className="h-8 w-8 text-gray-700 hover:text-skin-primary" />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;



