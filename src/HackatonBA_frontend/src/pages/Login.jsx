import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { register } from 'declarations/register';

const MySwal = withReactContent(Swal);

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

    // Validaciones
    if (!form.identifier || !form.contrasena) {
      MySwal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Todos los campos son obligatorios',
      });
      return;
    }

    if (!/^[a-zA-Z0-9]{5,15}$/.test(form.identifier)) {
      MySwal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El usuario debe contener letras mayúsculas, minúsculas y números, y tener entre 5 y 15 caracteres',
      });
      return;
    }

    if (!/^[a-zA-Z0-9]{8,20}$/.test(form.contrasena)) {
      MySwal.fire({
        icon: 'error',
        title: 'Error',
        text: 'La contraseña debe contener letras mayúsculas, minúsculas y números, y tener entre 8 y 20 caracteres',
      });
      return;
    }

    try {
      const success = await register.loginUser(form.identifier, form.contrasena);
      if (success) {
        MySwal.fire({
          icon: 'success',
          title: 'Inicio de sesión exitoso',
          text: '¡Bienvenido!',
        }).then(() => {
          navigate('/');
        });
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
