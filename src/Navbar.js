import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  // State to control the visibility of the dropdown menu
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  // useNavigate hook to programmatically navigate to different routes
  const navigate = useNavigate();

  // Toggles the dropdown menu's visibility
  const toggleDropdown = useCallback(() => {
    setDropdownOpen(prevState => !prevState);
  }, []);

  // Handles the logout functionality by clearing the token and redirecting to the home page
  const handleLogout = useCallback(() => {
    localStorage.removeItem('token');  // Remove the token from localStorage
    navigate('/');  // Redirect to the home page
  }, [navigate]);

  return (
    <header className="bg-black shadow">  {/* Navbar container with black background and shadow */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">  {/* Wrapper for navbar content with responsive padding */}
        <div className="flex justify-between items-center h-16">  {/* Flexbox container to align items horizontally */}
          
          {/* Brand/logo section */}
          <div className="flex items-center flex-grow">  
            <h1
              className="flex-shrink-0 text-2xl font-bold text-teal-400"
              style={{ fontFamily: 'Outfit, sans-serif' }}  // Styling for the "BIT MAPS" text
            >
              BIT MAPS
            </h1>
          </div>
          
          {/* Search bar container */}
          <div className="relative flex-grow mx-4">
            <input
              type="search"
              name="search"
              placeholder="Press / to search"
              className="bg-gray-800 text-gray-200 h-10 px-5 pr-12 rounded-full text-sm w-full focus:outline-none"
            />
            {/* Search icon inside the search bar */}
            <svg
              className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M23.707 22.293l-5.388-5.388a9.5 9.5 0 1 0-1.414 1.414l5.388 5.388a1 1 0 0 0 1.414-1.414zM11 17.5a6.5 6.5 0 1 1 0-13 6.5 6.5 0 0 1 0 13z" />
            </svg>
          </div>
          
          {/* Notification and profile dropdown */}
          <div className="flex items-center space-x-4">
            {/* Notification button */}
            {/* <button className="bg-gray-900 text-white rounded-full p-2 hover:bg-gray-700 transition duration-150 ease-in-out">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM5.293 16.707A1 1 0 006 18h8a1 1 0 00.707-1.707L14.414 16H5.586l-.293.707z" />
              </svg>
            </button> */}
            
            {/* Profile dropdown button */}
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="bg-gray-900 text-white rounded-full p-2 flex items-center focus:outline-none hover:bg-gray-700 transition duration-150 ease-in-out"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a5 5 0 100 10 5 5 0 000-10zM2 18a8 8 0 1116 0H2z" />
                </svg>
                {/* Dropdown arrow icon */}
                <svg className="h-4 w-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              
              {/* Dropdown menu */}
              {isDropdownOpen ? (
                <div className="absolute right-0 mt-2 w-24 bg-gray-900 border border-gray-700 rounded-md shadow-lg py-1 z-10">
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 text-sm text-white hover:bg-gray-700 w-full text-left"
                  >
                    Logout
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
