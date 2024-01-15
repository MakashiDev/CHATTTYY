// src/components/Navbar.js
import React from "react";


const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold text-white">
            <button>
            CHATTTYY
            </button>
            </div>
          <div className="flex items-center space-x-4">
            <a href="#" className="text-white hover:text-gray-400 px-2">
              Home
            </a>
            <a href="#" className="text-white hover:text-gray-400 px-2">
              Messages
            </a>
            <a href="#" className="text-white hover:text-gray-400 px-2">
              Settings
            </a>
            <a href="#" className="text-white hover:text-gray-400 px-2">
              Contact
            </a>
            <a href="#" className="text-white hover:text-gray-400 px-2">
              Login
            </a>
            <button className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 px-2">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
