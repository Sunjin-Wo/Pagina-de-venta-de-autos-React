import React, { useState, useEffect } from 'react';
import axios from 'axios';

function HomePage() {
  const [carData, setCarData] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const carImages = ['/turismo.jpg', '/target.jpg', '/rally.jpg'];

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('http://localhost:5000/cars');
        setCarData(response.data);
      } catch (error) {
        console.error('Error al obtener los datos de autos:', error);
      }
    };

    const fetchSales = async () => {
      try {
        const response = await axios.get('http://localhost:5000/sales');
        setSalesData(response.data);
      } catch (error) {
        console.error('Error al obtener los datos de ventas:', error);
      }
    };

    fetchCars();
    fetchSales();
  }, []);

  return (
    <div className="container main-content">
      <h2>Contenido Principal</h2>

      {/* Carousel */}
      <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          {carImages.map((src, index) => (
            <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
              <img src={src} className="d-block w-100" alt={`Auto ${index + 1}`} />
            </div>
          ))}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Tabla de autos */}
      <h3>Tabla de Autos</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Año</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          {carData.map((car, index) => (
            <tr key={index}>
              <td>{car.marca}</td>
              <td>{car.modelo}</td>
              <td>{car.año}</td>
              <td>{car.precio}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Tabla de ventas */}
      <h3>Ventas Realizadas</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Comprador</th>
            <th>Vendedor</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Precio de Venta</th>
            <th>Fecha de Venta</th>
          </tr>
        </thead>
        <tbody>
          {salesData.map((sale, index) => (
            <tr key={index}>
              <td>{sale.buyer}</td>
              <td>{sale.seller}</td>
              <td>{sale.make}</td>
              <td>{sale.model}</td>
              <td>{sale.sale_price}</td>
              <td>{new Date(sale.sale_date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Footer */}
      <footer style={footerStyle}>
        <div style={containerStyle}>
          <div style={sectionStyle}>
            <h4>PROPIETARIOS</h4>
            <ul style={listStyle}>
              <li>Campañas de seguridad</li>
              <li>Servicios</li>
              <li>Mantenimiento</li>
            </ul>
          </div>
          <div style={sectionStyle}>
            <h4>ENLACES DE INTERÉS</h4>
            <ul style={listStyle}>
              <li>Noticias</li>
              <li>Mazda Global</li>
              <li>Fichas Técnicas</li>
              <li>Historias Mazda</li>
              <li>Revistas Mazda Stories</li>
            </ul>
          </div>
          <div style={sectionStyle}>
            <h4>AYUDA</h4>
            <ul style={listStyle}>
              <li>Contacto</li>
              <li>Preguntas frecuentes</li>
              <li>Concesionarios</li>
              <li>Mapa del sitio</li>
            </ul>
          </div>
          <div style={sectionStyle}>
            <h4>REDES SOCIALES</h4>
            <ul style={listStyle}>
              <li>Facebook</li>
              <li>YouTube</li>
              <li>Instagram</li>
              <li>Twitter</li>
              <li>LinkedIn</li>
            </ul>
          </div>
        </div>
        <div style={bottomStyle}>
          <p style={certifiedStyle}>Great Place to Work Certificada JUL 2023 – JUL 2024 COL</p>
          <p style={policyStyle}>Política Redes Sociales | Avisos Legales | Política de Privacidad | Protección al Consumidor</p>
        </div>
      </footer>
    </div>
  );
}

// Estilos en línea
const footerStyle = {
  backgroundColor: '#1c1c1c', // Gris antracita en lugar de negro puro
  color: '#f0f0f0', // Texto blanco humo para mayor contraste
  padding: '40px 0',
  fontFamily: 'Arial, sans-serif',
};

const containerStyle = {
  display: 'flex',
  justifyContent: 'space-around',
  padding: '20px 0',
};

const sectionStyle = {
  flex: '1',
  marginLeft: '10px',
};

const listStyle = {
  listStyleType: 'none',
  padding: 0,
  lineHeight: '2',
};

const bottomStyle = {
  textAlign: 'center',
  padding: '20px 0',
  borderTop: '1px solid #444', // Un borde gris más claro
};

const certifiedStyle = {
  marginBottom: '10px',
  color: '#17a2b8', // Azul suave para destacar certificación
};

const policyStyle = {
  fontSize: '12px',
  color: '#a0a0a0', // Texto de políticas en gris claro
};

export default HomePage;
