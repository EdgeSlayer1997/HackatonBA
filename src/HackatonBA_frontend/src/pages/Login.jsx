import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { AuthClient } from '@dfinity/auth-client';
import { HttpAgent, Actor } from '@dfinity/agent';
import { idlFactory as registerIdlFactory } from 'declarations/register';

const MySwal = withReactContent(Swal);

function Login() {
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [actor, setActor] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const initAuth = async () => {
      const authClient = await AuthClient.create();
      if (await authClient.isAuthenticated()) {
        handleAuthenticated(authClient);
      } else {
        await authClient.login({
          identityProvider: 'https://identity.ic0.app/#authorize',
          onSuccess: () => {
            handleAuthenticated(authClient);
          },
        });
      }
    };

    initAuth();
  }, []);

  const handleAuthenticated = async (authClient) => {
    const identity = await authClient.getIdentity();
    const agent = new HttpAgent({ identity });
    const actor = Actor.createActor(registerIdlFactory, {
      agent,
      canisterId: process.env.CANISTER_ID_REGISTER,
    });
    setActor(actor);
    setIsAuthenticated(true);
  };

  const handleLogout = async () => {
    const authClient = await AuthClient.create();
    await authClient.logout();
    setIsAuthenticated(false);
    navigate('/'); // Redireccionar a la página principal después del logout
  };

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Inicio de Sesión</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleLogout}>Cerrar Sesión</button>
    </div>
  );
}

export default Login;
