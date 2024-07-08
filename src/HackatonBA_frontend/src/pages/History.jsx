import React, { useState, useEffect } from 'react';
import { services } from 'declarations/services';

function History() {
  const [servicesList, setServicesList] = useState([]);
  const [loading, setLoading] = useState(true);

  const calculateDeliveryTime = (fechaSolicitud, municipio) => {
    const hoursToAdd = {
      "Aguascalientes": 1,
      "Jesús María": 2,
      "El Llano": 2,
      "Calvillo": 3,
      "San Francisco de los Romo": 3,
      "Asientos": 4,
      "Pabellón de Arteaga": 4,
      "San José de Gracia": 5,
      "Rincón de Romos": 5,
      "Tepezalá": 5,
      "Cosío": 5
    }[municipio] || 0;
    console.log(`Calculating cost: capacidadPipa=${fechaSolicitud}, municipio=${municipio}, baseCost=${hoursToAdd}`);
    console.log(new Date(fechaSolicitud + hoursToAdd * 60 * 60 * 1000))
    return new Date(fechaSolicitud + hoursToAdd * 60 * 60 * 1000);
  };

  const calculateCost = (capacidadPipa, municipio) => {
    const baseCost = {
      5000: 500,
      10000: 800,
      20000: 1000
    }[capacidadPipa] || 0;

    const deliveryCost = {
      "Aguascalientes": 100,
      "Jesús María": 150,
      "El Llano": 150,
      "Calvillo": 200,
      "San Francisco de los Romo": 200,
      "Asientos": 250,
      "Pabellón de Arteaga": 250,
      "San José de Gracia": 300,
      "Rincón de Romos": 300,
      "Tepezalá": 300,
      "Cosío": 300
    }[municipio] || 0;

    console.log(`Calculating cost: capacidadPipa=${capacidadPipa}, municipio=${municipio}, baseCost=${baseCost}, deliveryCost=${deliveryCost}`);
    return baseCost + deliveryCost;
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const fetchedServices = await services.getServices();
        console.log('Fetched services:', fetchedServices);
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
      <h2>Service History</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table align='center'>
          <thead>
            <tr>
              <th>No. Pedido</th>
              <th>Nombre Receptor</th>
              <th>Calle</th>
              <th>Numero</th>
              <th>Colonia</th>
              <th>Codigo Postal</th>
              <th>Municipio</th>
              <th>Capacidad Pipa</th>
              <th>Costo</th>
            </tr>
          </thead>
          <tbody>
            {servicesList.map(([id, service]) => {
              // Verifica que service.fechaSolicitud sea un número entero
              const fechaSolicitud = typeof service.fechaSolicitud === 'number' ? service.fechaSolicitud * 1000 : 0;
              const fechaEntrega = calculateDeliveryTime(fechaSolicitud, service.municipio);
              const costo = calculateCost(service.capacidadPipa, service.municipio);
              return (
                <tr key={id}>
                  <td>{service.noPedido}</td>
                  <td>{service.nombreReceptor}</td>
                  <td>{service.calle}</td>
                  <td>{service.numero}</td>
                  <td>{service.colonia}</td>
                  <td>{service.codigoPostal}</td>
                  <td>{service.municipio}</td>
                  <td>{service.capacidadPipa}</td>
                  <td>{costo}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default History;
