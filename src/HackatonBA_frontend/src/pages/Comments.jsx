import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { register } from 'declarations/register';

function Comments() {
  const [form, setForm] = useState({
    pregunta1: '1',
    pregunta2: '1',
    pregunta3: '1',
    pregunta4: '1',
    pregunta5: '1',
    pregunta6: '1',
    pregunta7: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};

    Object.keys(form).forEach((key) => {
      if (!form[key]) {
        newErrors[key] = 'Este campo es requerido';
      }
    });


    const pregunta7Regex = /^[a-zA-ZÀ-ÿ\u00f1\u00d1 0-9]{5,200}$/;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        await register.crearComentario(
          Number(form.pregunta1),
          Number(form.pregunta2),
          Number(form.pregunta3),
          Number(form.pregunta4),
          Number(form.pregunta5),
          Number(form.pregunta6),
          form.pregunta7
        );
        showSuccessAlert();
      } catch (error) {
        console.error('Error al registrar el comentario:', error);
        showErrorAlert('Error', 'Hubo un problema al registrar el comentario. Por favor, intenta nuevamente.');
      }
    }
  };

  const showSuccessAlert = () => {
    Swal.fire({
      icon: 'success',
      title: '¡Comentario registrado!',
      text: 'El comentario ha sido registrado correctamente.',
      confirmButtonText: 'OK',
    }).then(() => {
      navigate('/comments');
    });
  };

  const showErrorAlert = (title, text) => {
    Swal.fire({
      icon: 'error',
      title,
      text,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Permitanos conocer su opinión completando el siguiente formulario y así poder mejorar el servicio.</h1>

      <label htmlFor="pregunta1">1. Indique el nivel de satisfacción del servicio, considere 1 como insatisfecho y 5 como muy satisfecho.</label><br />
      <select id="pregunta1" name="pregunta1" value={form.pregunta1} onChange={handleChange} required>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      {errors.pregunta1 && <p style={{ color: 'red' }}>{errors.pregunta1}</p>}
      <br />

      <label htmlFor="pregunta2">2. Indique el nivel de satisfacción de la entrega, considere 1 como insatisfecho y 5 como muy satisfecho.</label><br />
      <select id="pregunta2" name="pregunta2" value={form.pregunta2} onChange={handleChange} required>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      {errors.pregunta2 && <p style={{ color: 'red' }}>{errors.pregunta2}</p>}
      <br />

      <label htmlFor="pregunta3">3. ¿Cómo considera el tiempo de la entrega?, considere 1 como insatisfecho y 5 como muy satisfecho.</label><br />
      <select id="pregunta3" name="pregunta3" value={form.pregunta3} onChange={handleChange} required>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      {errors.pregunta3 && <p style={{ color: 'red' }}>{errors.pregunta3}</p>}
      <br />

      <label htmlFor="pregunta4">4. ¿Cómo considera el costo del servicio?, considere 1 como elevado, 2 como regular y 3 como accesible.</label><br />
      <select id="pregunta4" name="pregunta4" value={form.pregunta4} onChange={handleChange} required>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>
      {errors.pregunta4 && <p style={{ color: 'red' }}>{errors.pregunta4}</p>}
      <br />

      <label htmlFor="pregunta5">5. ¿Cómo considera la calidad del agua?, considere 1 como insatisfecho y 5 como muy satisfecho.</label><br />
      <select id="pregunta5" name="pregunta5" value={form.pregunta5} onChange={handleChange} required>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      {errors.pregunta5 && <p style={{ color: 'red' }}>{errors.pregunta5}</p>}
      <br />

      <label htmlFor="pregunta6">6. De forma general, ¿Cómo evalua el servicio?, considere 1 como insatisfecho y 5 como muy satisfecho.</label><br />
      <select id="pregunta6" name="pregunta6" value={form.pregunta6} onChange={handleChange} required>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      {errors.pregunta6 && <p style={{ color: 'red' }}>{errors.pregunta6}</p>}
      <br />

      <label htmlFor="pregunta7">Comentarios adicionales.</label><br />
      <textarea id="pregunta7" name="pregunta7" value={form.pregunta7} onChange={handleChange} minLength="5" maxLength="50" required></textarea>
      {errors.pregunta7 && <p style={{ color: 'red' }}>{errors.pregunta7}</p>}
      <br />

      <button type="submit">Registrar Comentario</button>
    </form>
  );
}

export default Comments;
