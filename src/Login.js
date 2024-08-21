import { Link } from 'react-router-dom';
import React from 'react';

function Login() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-200" style={{ fontFamily: 'Outfit, sans-serif' }}>
      <div className="bg-black p-8 h-[480px] w-[400px] rounded-lg text-center text-white">
        <h1 className="text-white mb-4">WELCOME BACK!</h1>
        <div className="flex flex-col items-center mb-4">
          <img src="/images/BIT_logo.jpg" alt="Bannari Amman Institute of Technology" className="mb-4" style={{ width: '6.5rem' }} />
        </div>
        <h1 className="text-lg font-bold">BANNARI AMMAN</h1>
        <h1 className="text-lg ">INSTITUTE OF TECHNOLOGY</h1>
        <p className="italic mb-4">Stay Ahead</p>
        <div className="underline mb-6">
          <h1 className="text-lg">BIT MAPS</h1>
        </div>
        <Link to="/LandingPage">
          <button className="bg-teal-400 border-none text-white px-12 py-3 text-lg rounded-md cursor-pointer mt-8">
            Google Sign In
          </button>
        </Link>
        <p className="mt-4">Sign in with your BIT Account</p>
      </div>
    </div>
  );
}

export default Login;
