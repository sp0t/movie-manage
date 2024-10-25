import { useEffect } from 'react';
import { useRouter } from 'next/router';
import '../app/globals.css';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token && router.pathname !== '/login' && router.pathname !== '/signup') {
      router.push('/login');
    }
  }, [router.pathname]);

  return <Component {...pageProps} />;
}

export default MyApp;
