import React, { useState, useEffect } from 'react';
import { services } from 'declarations/services';

function History() {
  const [servicesList, setServicesList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const fetchedServices = await services.getServices();
        console.log('Fetched services:', fetchedServices); // Agrega este log
        setServicesList(fetchedServices);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <div>
      <h1>Historial de Servicios</h1>
      {loading ? (
        <p>Cargando servicios...</p>
      ) : (
        <ul>
          {servicesList.map((service, index) => (
            <li key={index}>
              <p>Nombre del Receptor: {service[1].nombreReceptor}</p>
              <p>Dirección: {service[1].calle} {service[1].numero}</p>
              <p>Colonia: {service[1].colonia}</p>
              <p>Código postal: {service[1].codigoPostal}</p>
              <p>Municipio: {service[1].municipio}</p>
              <p>Capacidad de la pipa: {service[1].capacidadPipa}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default History;
