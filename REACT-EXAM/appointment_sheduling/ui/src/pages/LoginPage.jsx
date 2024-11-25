import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'

const LoginPage = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate();

    const loginSubmit = async (e) => {
        e.preventDefault();
        const loginDetails = {
            email,
            password,
        };
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginDetails),
            credentials: 'include',
        });
        console.log("login response:",res.status);
        
        if(res.ok){
            const data = await res.json();           
            toast.success(`Logged in as: ${data.userType}`);
            // console.log("Navigating to home...");
            navigate('/home');
        } else{
            toast.error('Please check your credentials.');
        }
    }

  return (
    <div className="bg-blue-100 flex items-center justify-center min-h-screen">
    <div className="bg-white p-10 rounded-lg shadow-lg max-w-sm w-full">
      <h2 className="text-3xl font-bold text-blue-700 mb-4 text-center">Login</h2>
      <form onSubmit={loginSubmit}>
        
        <div className="mb-4">
          <label for="email" className="block text-gray-700 font-bold mb-2">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="mb-6">
          <label for="password" className="block text-gray-700 font-bold mb-2">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="flex items-center justify-between mb-6">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
          <Link to="#" className="text-blue-700 hover:underline">Forgot Password?</Link>
        </div>
        
        <p className="text-center">
          Don't have an account? {' '}
          <Link to="/signup" className="text-blue-700 hover:underline">Sign Up</Link>
        </p>
      </form>
    </div>
  </div>
  )
}

export default LoginPage