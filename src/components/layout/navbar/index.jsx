import React, { useState } from 'react';
import { HiOutlineUserCircle } from "react-icons/hi";
import { Link } from 'react-router-dom';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  }

  return (
    <div className="shadow-md bg-white">
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
                <Link to="/" onClick={closeMenu} className="text-white hover:font-bold">Home</Link>
              </li>
              <li>
                <Link to="/about" onClick={closeMenu} className="text-white hover:font-bold">About</Link>
              </li>
              <li>
                <Link to="/contact" onClick={closeMenu}  className="text-white hover:font-bold">Contact</Link>
              </li>
              <Link to="/profile">
                <HiOutlineUserCircle className="h-8 w-8 text-white hover:font-bold" />
              </Link>
            </ul>
          </div>

          {/* Your desktop menu */}
          <ul className="hidden md:flex space-x-4">
            <li>
              <Link to="/" className="text-gray-700 font-medium hover:text-skin-primary ps-5">Home</Link>
            </li>
            <li>
              <Link  to="/about" className="text-gray-700 font-medium hover:text-skin-primary ps-5">About</Link> 
            </li>
            <li>
              <Link to="/contact" className="text-gray-700 font-medium hover:text-skin-primary ps-5">Contact</Link>
            </li>
            <Link to="/profile">
              <HiOutlineUserCircle className="h-8 w-8 text-gray-700 hover:text-skin-primary" />
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;



