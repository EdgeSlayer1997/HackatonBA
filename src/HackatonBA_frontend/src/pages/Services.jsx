import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { register } from 'declarations/register';
import AuthenticatedRoute from './AuthenticatedRoute';

function Services() {
  const [form, setForm] = useState({
    nombreReceptor: '',
    calle: '',
    numero: '',
    colonia: '',
    codigoPostal: '',
    municipio: 'Aguascalientes',
    capacidadPipa: '5000',
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
        await register.crearServicio(
          form.nombreReceptor,
          form.calle,
          BigInt(form.numero),
          form.colonia,
          BigInt(form.codigoPostal),
          form.municipio,
          BigInt(form.capacidadPipa)
        );
        showSuccessAlert();
      } catch (error) {
        setError('Error al registrar el servicio');
      }
    }
  };

  const validateForm = () => {
    // Validaciones individuales
    if (!validateNombreReceptor(form.nombreReceptor)) return false;
    if (!validateCalle(form.calle)) return false;
    if (!validateNumero(form.numero)) return false;
    if (!validateColonia(form.colonia)) return false;
    if (!validateCodigoPostal(form.codigoPostal)) return false;
    return true;
  };

  const validateNotEmpty = () => {
    // Validación de campos no vacíos
    for (const key in form) {
      if (!form[key]) {
        showErrorAlert('Campo vacío', `El campo ${key} no puede estar vacío.`);
        return false;
      }
    }
    return true;
  };

  const validateNombreReceptor = (nombreReceptor) => {
    const regex = /^[a-zA-ZÀ-ÿ\u00f1\u00d1 ]{3,50}$/;
    if (!regex.test(nombreReceptor)) {
      showErrorAlert('Nombre del receptor incorrecto', 'Debe contener entre 3 y 50 caracteres, solo letras y espacios.');
      return false;
    }
    return true;
  };

  const validateCalle = (calle) => {
    const regex = /^[a-zA-ZÀ-ÿ\u00f1\u00d1 ]{3,50}$/;
    if (!regex.test(calle)) {
      showErrorAlert('Calle incorrecta', 'Debe contener entre 3 y 50 caracteres, solo letras y espacios.');
      return false;
    }
    return true;
  };

  const validateNumero = (numero) => {
    const regex = /^\d{2,4}$/;
    if (!regex.test(numero)) {
      showErrorAlert('Número incorrecto', 'Debe contener entre 2 y 4 números.');
      return false;
    }
    return true;
  };

  const validateColonia = (colonia) => {
    const regex = /^[a-zA-ZÀ-ÿ\u00f1\u00d1 ]{3,30}$/;
    if (!regex.test(colonia)) {
      showErrorAlert('Colonia incorrecta', 'Debe contener entre 3 y 30 caracteres, solo letras y espacios.');
      return false;
    }
    return true;
  };

  const validateCodigoPostal = (codigoPostal) => {
    const regex = /^\d{4,6}$/;
    if (!regex.test(codigoPostal)) {
      showErrorAlert('Código postal incorrecto', 'Debe contener entre 4 y 6 números.');
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

  const showSuccessAlert = () => {
    Swal.fire({
      icon: 'success',
      title: '¡Servicio registrado!',
      text: 'El servicio ha sido registrado correctamente.',
      confirmButtonText: 'OK',
    }).then(() => {
      navigate('/history');
    });
  };

  return (

    <AuthenticatedRoute>

    <div>
      <h1>Registro de Servicios</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="nombreReceptor">Nombre del Receptor:</label><br />
        <input type="text" id="nombreReceptor" name="nombreReceptor" value={form.nombreReceptor} onChange={handleChange} required />
        <br />
        <label htmlFor="calle">Calle:</label><br />
        <input type="text" id="calle" name="calle" value={form.calle} onChange={handleChange} required />
        <br />
        <label htmlFor="numero">Número:</label><br />
        <input type="number" id="numero" name="numero" value={form.numero} onChange={handleChange} required />
        <br />
        <label htmlFor="colonia">Colonia:</label><br />
        <input type="text" id="colonia" name="colonia" value={form.colonia} onChange={handleChange} required />
        <br />
        <label htmlFor="codigoPostal">Código Postal:</label><br />
        <input type="number" id="codigoPostal" name="codigoPostal" value={form.codigoPostal} onChange={handleChange} required />
        <br />
        <label htmlFor="municipio">Municipio:</label><br />
        <select name="municipio" id="municipio" value={form.municipio} onChange={handleChange}>
          <option value="Aguascalientes">Aguascalientes</option>
          <option value="Asientos">Asientos</option>
          <option value="Calvillo">Calvillo</option>
          <option value="Cosío">Cosío</option>
          <option value="Jesús María">Jesús María</option>
          <option value="Pabellón de Arteaga">Pabellón de Arteaga</option>
          <option value="Rincón de Romos">Rincón de Romos</option>
          <option value="San José de Gracia">San José de Gracia</option>
          <option value="Tepezalá">Tepezalá</option>
          <option value="San Francisco de los Romo">San Francisco de los Romo</option>
          <option value="El Llano">El Llano</option>
        </select>
        <br />
        <label htmlFor="capacidadPipa">Capacidad de la Pipa:</label><br />
        <select name="capacidadPipa" id="capacidadPipa" value={form.capacidadPipa} onChange={handleChange}>
          <option value="5000">5000 litros</option>
          <option value="10000">10,000 litros</option>
          <option value="20000">20,000 litros</option>
        </select>
        <br />
        <button type="submit">Registrar Servicio</button>
      </form>
    </div>

    </AuthenticatedRoute>

  );
}

export default Services;
