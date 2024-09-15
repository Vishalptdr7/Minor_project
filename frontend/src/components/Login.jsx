import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom'; 
import logo from '../assets/logo.avif';
import loginPhoto from '../assets/loginphoto4.jpg'
import { useDispatch } from 'react-redux';
import { toggleLoginPage } from '../utils/slices/appSlice';


const Login = () => {
  const dispatch = useDispatch();
 

 
  useEffect(() => {
    dispatch(toggleLoginPage());
    
    return () => {
      dispatch(toggleLoginPage()); 
    };
  }, [dispatch]);
  
  
  return (
    <div className='flex p-4'>
      <div className='w-2/4'>
        <img src={loginPhoto} className='w-full' alt="" />
      </div>
      <div className='w-full'>

      <div className="flex flex-col justify-center items-center bg-gradient-to-r from-blue-700 to-gray-900 p-2">
     <div className='flex'>
     <img src={logo} alt="Study With Me Logo" className="w-40 mb-2 " />
      <Link to='/'>
      <button className=" text-black text-xl rounded-full p-1 relative left-64 cursor-pointer">
            ❌
          </button>
      </Link>
     </div>
      <div className="bg-white shadow-2xl rounded-lg p-4 max-w-md w-full flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-semibold text-center text-gray-800 mb-2">Log In to <span className='font-bold text-2xl'>Study With Me</span></h2>

          <div className="mb-2">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your Email"
            />
          </div>

          <div className="mb-2">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>
          <div className="text-right mb-2">
            <Link to="/forgot-password" className="text-sm text-blue-500 hover:underline">Forgot Password?</Link>
          </div>
        </div>

        <button className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700">
          Log In
        </button>

        <div className="flex items-center justify-between my-1">
          <hr className="w-full border-gray-300" />
          <span className="px-2 text-gray-500">OR</span>
          <hr className="w-full border-gray-300" />
        </div>

        <div className="space-y-3 mb-2">
          <button className="flex items-center justify-center w-full py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700">
            <FontAwesomeIcon icon={faGoogle} className="mr-2" /> Log In With Google
          </button>
        </div>
        <div className="text-center text-gray-600 text-xs">
              &copy; {new Date().getFullYear()} Study With Me. All rights reserved.
            </div>

      </div>
    </div>
      </div>
    </div>
  )
}

export default Login
