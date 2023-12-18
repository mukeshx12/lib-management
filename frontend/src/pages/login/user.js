// pages/login/user.js
import React, { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';

const UserLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:4000/user/login', {
        email,
        password,
      });

      console.log('User logged in:', response.data);
      router.push('/main/user');
    } catch (error) {
      console.error('Error during login:', error.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4">Event Management System </h1>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-semibold text-gray-600">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-semibold text-gray-600">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
          onClick={handleLogin}
        >
          Login
        </button>
        <div className="text-gray-600 mt-4">
          Don't have an account?{' '}
          <Link href="/signup/user">
            <span className="text-blue-500 cursor-pointer">Sign up</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserLoginPage;
