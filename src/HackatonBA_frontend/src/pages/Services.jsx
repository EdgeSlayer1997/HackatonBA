import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { services } from 'declarations/services';

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
  const [errors, setErrors] = useState({});  // Definimos el estado de errores
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};

    if (!/^[a-zA-ZÀ-ÿ\u00f1\u00d1 ]{3,50}$/.test(form.nombreReceptor)) {
      newErrors.nombreReceptor = 'Debe contener entre 3 y 50 caracteres, solo letras y espacios';
    }

    if (!/^[a-zA-ZÀ-ÿ\u00f1\u00d1 ]{3,50}$/.test(form.calle)) {
      newErrors.calle = 'Debe contener entre 3 y 50 caracteres, solo letras y espacios';
    }

    if (!/^\d{1,4}$/.test(form.numero)) {
      newErrors.numero = 'Debe contener entre 1 y 4 números';
    }

    if (!/^[a-zA-ZÀ-ÿ\u00f1\u00d1 ]{3,50}$/.test(form.colonia)) {
      newErrors.colonia = 'Debe contener entre 3 y 50 caracteres, solo letras y espacios';
    }

    if (!/^\d{4,5}$/.test(form.codigoPostal)) {
      newErrors.codigoPostal = 'Debe contener entre 4 y 5 números';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;  // Retornamos true solo si no hay errores
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        await services.crearRegistro(
          form.nombreReceptor,
          form.calle,
          BigInt(form.numero),
          form.colonia,
          BigInt(form.codigoPostal),
          form.municipio,
          BigInt(form.capacidadPipa)
        );
        alert('¡Servicio registrado correctamente!');
        navigate('/services');
      } catch (error) {
        setError('Error al registrar el servicio');
        console.log(error);
      }
    }
  };

  return (
    <div>
      <h1>Registro de Servicios</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="nombreReceptor">Nombre del Receptor:</label><br />
        <input type="text" id="nombreReceptor" name="nombreReceptor" value={form.nombreReceptor} onChange={handleChange} />
        {errors.nombreReceptor && <p>{errors.nombreReceptor}</p>}
        <br />

        <label htmlFor="calle">Calle:</label><br />
        <input type="text" id="calle" name="calle" value={form.calle} onChange={handleChange} />
        {errors.calle && <p>{errors.calle}</p>}
        <br />

        <label htmlFor="numero">Número:</label><br />
        <input type="number" id="numero" name="numero" value={form.numero} onChange={handleChange} />
        {errors.numero && <p>{errors.numero}</p>}
        <br />

        <label htmlFor="colonia">Colonia:</label><br />
        <input type="text" id="colonia" name="colonia" value={form.colonia} onChange={handleChange} />
        {errors.colonia && <p>{errors.colonia}</p>}
        <br />

        <label htmlFor="codigoPostal">Código Postal:</label><br />
        <input type="number" id="codigoPostal" name="codigoPostal" value={form.codigoPostal} onChange={handleChange} />
        {errors.codigoPostal && <p>{errors.codigoPostal}</p>}
        <br />

        <label htmlFor="municipio">Municipio:</label><br />
        <select name="municipio" id="municipio" value={form.municipio} onChange={handleChange}>
          <option value="Aguascalientes">Aguascalientes</option>
          <option value="Asientos">Asientos</option>
          <option value="Calvillo">Calvillo</option>
          <option value="Cosio">Cosío</option>
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
  );
}

export default Services;
