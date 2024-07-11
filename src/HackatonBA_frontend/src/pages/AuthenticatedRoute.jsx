import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthClient } from '@dfinity/auth-client';

const AuthenticatedRoute = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const authClient = await AuthClient.create();
      if (await authClient.isAuthenticated()) {
        setIsAuthenticated(true);
      } else {
        navigate('/login');
      }
    };

    checkAuth();
  }, [navigate]);

  return isAuthenticated ? <>{children}</> : null;
};

export default AuthenticatedRoute;
