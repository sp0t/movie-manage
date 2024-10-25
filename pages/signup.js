import { useState } from 'react';
import { useRouter } from 'next/router';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      alert("Please enter a valid email address");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (data.message === 'User registered successfully') {
      router.push('/login');
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-page-bg">
      <div className="p-8">
        <h2 className="text-6xl font-semibold mb-10 text-center text-white">Sign Up</h2>
        <form onSubmit={handleSignup}>
          <div className="mb-6">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-[300px] h-[45px] p-2 border rounded-md focus:ring focus:ring-indigo-300 text-white bg-input-bg text"
              required
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-[300px] h-[45px] p-2 border rounded-md focus:ring focus:ring-indigo-300 text-white bg-input-bg text"
              required
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="block w-[300px] h-[45px] p-2 border rounded-md focus:ring focus:ring-indigo-300 text-white bg-input-bg text"
              required
            />
          </div>
          <button
            type="submit"
            className="block w-[300px] h-[54px] bg-button-100 text-white p-2 rounded-md hover:bg-button-200 transition font-bold text-base"
          >
            Sign Up
          </button>
        </form>
      </div>
      <div className="fixed bottom-0 left-0 w-screen h-[120px] z-0 pointer-events-none">
        <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 1440 111" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path fillRule="evenodd" clipRule="evenodd" d="M0 0L60 4.2C120 8.3 240 16.7 360 30.8C480 45.2 600 65.8 720 70C840 74.1 960 61.6 1080 57.7C1200 53.6 1320 57.7 1380 60L1440 62V111H1380C1320 111 1200 111 1080 111C960 111 840 111 720 111C600 111 480 111 360 111C240 111 120 111 60 111H0V0Z" fill="#20DF7F" fillOpacity="0.09"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M0 44.4L48 53.3C96 62.2 192 79.9 288 75.5C384 71.0 480 44.4 576 26.6C672 8.9 768 0 864 0C960 0 1056 8.9 1152 24.4C1248 40.0 1344 62.2 1392 73.3L1440 84.4V111H1392C1344 111 1248 111 1152 111C1056 111 960 111 864 111C768 111 672 111 576 111C480 111 384 111 288 111C192 111 96 111 48 111H0V44.4Z" fill="#E5E5E5" fillOpacity="0.13"/>
        </svg>
      </div>
    </div>
  );
};

export default SignUp;
