import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from 'declarations/register';

function Login() {
  const [form, setForm] = useState({
    identifier: '',
    contrasena: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const success = await register.loginUser(form.identifier, form.contrasena);
      if (success) {
        navigate('/');
      } else {
        setError('Inicio de sesión fallido');
      }
    } catch (error) {
      setError('Error al iniciar sesión');
    }
  };

  return (
    <div>
      <h1>Inicio de Sesión</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input name="identifier" placeholder="Usuario o Correo" onChange={handleChange} required />
        <input name="contrasena" type="password" placeholder="Contraseña" onChange={handleChange} required />
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
}

export default Login;
