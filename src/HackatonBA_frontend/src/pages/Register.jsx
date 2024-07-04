import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from 'declarations/register';

function Register() {
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
    correo: '',
    direccion: '',
    usuario: '',
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
      await register.crearRegistro(
        form.nombre,
        form.apellido,
        BigInt(form.telefono),
        form.correo,
        form.direccion,
        form.usuario,
        form.contrasena
      );
      navigate('/login');
    } catch (error) {
      setError('Error al registrar el usuario');
    }
  };

  return (
    <div>
      <h1>Registro de Usuarios</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input name="nombre" placeholder="Nombre" onChange={handleChange} required />
        <input name="apellido" placeholder="Apellido" onChange={handleChange} required />
        <input name="telefono" placeholder="Telefono" onChange={handleChange} required />
        <input name="correo" type="email" placeholder="Correo" onChange={handleChange} required />
        <input name="direccion" placeholder="Dirección" onChange={handleChange} required />
        <input name="usuario" placeholder="Usuario" onChange={handleChange} required />
        <input name="contrasena" type="password" placeholder="Contraseña" onChange={handleChange} required />
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}

export default Register;
