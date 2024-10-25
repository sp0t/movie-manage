import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('/api/auth/verifyToken', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();

        if (response.ok && data.valid) {
          setIsAuthenticated(true);
          if (router.pathname === '/login') {
            router.push('/');
          }
        } else {
          localStorage.removeItem('token');
          sessionStorage.removeItem('token');
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Token verification error:', error);
      } finally {
        setLoading(false);
      }
    };

    checkToken();
  }, [router.pathname]);

  return { isAuthenticated, loading };
};
