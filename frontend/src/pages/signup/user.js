// pages/signup/user.js
import React, { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';

const UserSignupPage = () => {
  const [name, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  
  const handleSignup = async() => {
    try {
      const response = await axios.post('http://localhost:4000/user/register', {
        name,
        email,
        password,
      });

      console.log('User signed up:', response.data);
      router.push('/main/user');
    } catch (error) {
      console.error('Error during signup:', error.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4">Event Management System</h1>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-semibold text-gray-600">
            Username
          </label>
          <input
            type="text"
            id="name"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            value={name}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
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
          onClick={handleSignup}
        >
          Signup
        </button>
        <div className="text-gray-600 mt-4">
          Already have an account?{' '}
          <Link href="/login/user">
            <span className="text-blue-500 cursor-pointer">Login</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserSignupPage;
