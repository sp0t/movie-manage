import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (data.message === 'User logged in successfully') {
      localStorage.setItem('token', data.token);
      router.push('/'); 
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-page-bg">
        <div className="p-8">
            <h2 className="text-6xl font-semibold mb-10 text-center text-white">Sign In</h2>
            <form onSubmit={handleLogin}>
              <div className="mb-6">
                  <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-[300px] h-[45px] p-2 border rounded-md focus:ring focus:ring-indigo-300 text-white bg-input-bg text"
                  placeholder="Email"
                  required
                  />
              </div>
              <div className="mb-6">
                  <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-[300px] h-[45px] p-2 border rounded-md focus:ring focus:ring-indigo-300 text-white bg-input-bg text"
                  placeholder="Password"
                  required
                  />
              </div>
              <div className="flex items-center justify-center mb-6">
                <label className="flex items-center text-white text-sm">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="hidden"
                  />
                  <span className="w-4 h-4 bg-input-bg border rounded mr-2 flex items-center justify-center cursor-pointer">
                    {rememberMe && <span className="w-3 h-3 bg-white rounded"></span>}
                  </span>
                  Remember Me
                </label>
              </div>
              <button
                  type="submit"
                  className="block w-[300px] h-[54px] bg-button-100 text-white p-2 rounded-md hover:bg-button-200 transition font-bold text-base"
              >
                  Log In
              </button>
            </form>

            <p className="text-center mt-6 text-white text-sm">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-sm text-red-500 hover:underline">
                Sign Up
            </Link>
            </p>
        </div>
    </div>
  );
}

export default LogIn;
