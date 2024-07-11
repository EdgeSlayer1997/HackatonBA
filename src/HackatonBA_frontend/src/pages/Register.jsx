import React, { useState } from 'react';
import Swal from 'sweetalert2';
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
    if (validateForm() && validateNotEmpty()) {
      try {
        const id = await register.crearRegistro(
          form.nombre,
          form.apellido,
          BigInt(form.telefono),
          form.correo,
          form.direccion,
          form.usuario,
          form.contrasena
        );
        showSuccessAlert(id);
      } catch (error) {
        setError('Error al registrar el usuario');
      }
    }
  };

  const validateForm = () => {
    // Validaciones individuales
    if (!validateNombre(form.nombre)) return false;
    if (!validateApellido(form.apellido)) return false;
    if (!validateTelefono(form.telefono)) return false;
    if (!validateCorreo(form.correo)) return false;
    if (!validateDireccion(form.direccion)) return false;
    if (!validateUsuario(form.usuario)) return false;
    if (!validateContrasena(form.contrasena)) return false;
    return true;
  };

  const validateNotEmpty = () => {
    for (const key in form) {
      if (!form[key]) {
        showErrorAlert('Campo vacío', `El campo ${key} no puede estar vacío.`);
        return false;
      }
    }
    return true;
  };

  const validateNombre = (nombre) => {
    const regex = /^[A-Za-záéíóúñÁÉÍÓÚÑ\s]{3,30}$/;
    if (!regex.test(nombre)) {
      showErrorAlert('Nombre incorrecto', 'El nombre debe contener solo letras, espacios y tener entre 3 y 30 caracteres.');
      return false;
    }
    return true;
  };

  const validateApellido = (apellido) => {
    const regex = /^[A-Za-záéíóúñÁÉÍÓÚÑ\s]{3,30}$/;
    if (!regex.test(apellido)) {
      showErrorAlert('Apellido incorrecto', 'El apellido debe contener solo letras, espacios y tener entre 3 y 30 caracteres.');
      return false;
    }
    return true;
  };

  const validateTelefono = (telefono) => {
    const regex = /^\d{10}$/;
    if (!regex.test(telefono)) {
      showErrorAlert('Teléfono incorrecto', 'El teléfono debe contener exactamente 10 dígitos numéricos.');
      return false;
    }
    return true;
  };

  const validateCorreo = (correo) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!regex.test(correo)) {
      showErrorAlert('Correo incorrecto', 'Ingrese un correo válido con el formato correcto.');
      return false;
    }
    return true;
  };

  const validateDireccion = (direccion) => {
    const regex = /^[A-Za-záéíóúñÁÉÍÓÚÑ0-9\s]{3,30}$/;
    if (!regex.test(direccion)) {
      showErrorAlert('Dirección incorrecta', 'La dirección debe contener letras, números, espacios y tener entre 3 y 30 caracteres.');
      return false;
    }
    return true;
  };

  const validateUsuario = (usuario) => {
    const regex = /^[a-zA-Z0-9]{5,15}$/;
    if (!regex.test(usuario)) {
      showErrorAlert('Usuario incorrecto', 'El usuario debe contener solo letras y números, y tener entre 5 y 15 caracteres.');
      return false;
    }
    return true;
  };

  const validateContrasena = (contrasena) => {
    if (contrasena.length < 8 || contrasena.length > 20) {
      showErrorAlert('Contraseña incorrecta', 'La contraseña debe tener entre 8 y 20 caracteres.');
      return false;
    }
    return true;
  };

  const showErrorAlert = (title, text) => {
    Swal.fire({
      icon: 'error',
      title,
      text,
    });
  };

  const showSuccessAlert = (id) => {
    Swal.fire({
      icon: 'success',
      title: '¡Registro exitoso!',
      text: `El usuario ha sido registrado correctamente`,
      confirmButtonText: 'OK',
    }).then(() => {
      navigate('/login');
    });
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
