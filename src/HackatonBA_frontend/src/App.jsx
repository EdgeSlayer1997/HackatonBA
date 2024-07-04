import React, { useState } from 'react';
import { register } from '../../declarations/register';

function App() {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
    correo: '',
    direccion: '',
    usuario: '',
    contrasena: ''
  });

  const [message, setMessage] = useState('');

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const { nombre, apellido, telefono, correo, direccion, usuario, contrasena } = formData;
    try {
      await register.crearRegistro(nombre, apellido, BigInt(telefono), correo, direccion, usuario, contrasena);
      setMessage('¡Usuario registrado correctamente!');
    } catch (error) {
      setMessage(`Error al registrar el usuario: ${error.message}`);
      console.error('Error al registrar el usuario:', error);
    }
  }

  return (
    <main>
      <img src="/logo2.svg" alt="DFINITY logo" />
      <br />
      <br />
      <form onSubmit={handleSubmit}>
        <label htmlFor="nombre">Nombre:</label>
        <input id="nombre" name="nombre" type="text" value={formData.nombre} onChange={handleChange} required />
        <br />
        <label htmlFor="apellido">Apellido:</label>
        <input id="apellido" name="apellido" type="text" value={formData.apellido} onChange={handleChange} required />
        <br />
        <label htmlFor="telefono">Teléfono:</label>
        <input id="telefono" name="telefono" type="tel" value={formData.telefono} onChange={handleChange} required />
        <br />
        <label htmlFor="correo">Correo:</label>
        <input id="correo" name="correo" type="email" value={formData.correo} onChange={handleChange} required />
        <br />
        <label htmlFor="direccion">Dirección:</label>
        <input id="direccion" name="direccion" type="text" value={formData.direccion} onChange={handleChange} required />
        <br />
        <label htmlFor="usuario">Usuario:</label>
        <input id="usuario" name="usuario" type="text" value={formData.usuario} onChange={handleChange} required />
        <br />
        <label htmlFor="contrasena">Contraseña:</label>
        <input id="contrasena" name="contrasena" type="password" value={formData.contrasena} onChange={handleChange} required />
        <br />
        <button type="submit">Registrar</button>
      </form>
      <section id="message">{message}</section>
    </main>
  );
}

export default App;
