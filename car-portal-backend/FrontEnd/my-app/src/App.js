import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './combinedStyles.css';
import RegisterPage from './RegisterPage';
import LoginPage from './LoginPage';
import HomePage from './HomePage';
import CatalogPage from './CatalogPage'; // Importa el nuevo componente
import ContactPage from './ContactPage'; // Importa el nuevo componente
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleSidebarCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <Router>
      <div className={`App ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <div className={`sidebar ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
          <button className="sidebar-toggle" onClick={toggleSidebarCollapse} aria-label="Toggle sidebar"></button>
          {!isCollapsed && (
            <div className="sidebar-content">
              <h2>Información del Auto</h2>
              <ul className="car-info-list">
                <li>Ubicación</li>
                <li>Marca</li>
                <li>Modelo</li>
                <li>Categoría</li>
                <li>Año</li>
                <li>Precio</li>
                <li>Condición</li>
                <li>Kilómetros</li>
                <li>Tipo de Carrocería</li>
                <li>Tipo de Combustible</li>
              </ul>
            </div>
          )}
        </div>

        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <Link className="navbar-brand" to="/">Portal de Autos</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Inicio</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/catalog">Catálogo</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/contact">Contacto</Link>
                </li>
              </ul>
              <form className="d-flex">
                <input className="form-control me-2" type="search" placeholder="Buscar autos..." aria-label="Search" />
                <button className="btn btn-outline-success" type="submit">Buscar</button>
              </form>
              <div className="d-flex ms-3">
                <Link to="/register" className="btn btn-primary me-2">Registrarse</Link>
                <Link to="/login" className="btn btn-secondary">Iniciar Sesión</Link>
              </div>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>

        <div className="footer black-bg mt-3 p-3">
          <div className="container">
            <div className="row">
              <div className="col-md-2">
                <div className="social-media">
                  <a href="#" className="social-icon me-2" aria-label="Facebook"><FontAwesomeIcon icon={faFacebookF} /></a>
                  <a href="#" className="social-icon me-2" aria-label="Twitter"><FontAwesomeIcon icon={faTwitter} /></a>
                  <a href="#" className="social-icon me-2" aria-label="Instagram"><FontAwesomeIcon icon={faInstagram} /></a>
                  <a href="#" className="social-icon" aria-label="Email"><FontAwesomeIcon icon={faEnvelope} /></a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="arrow-container" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={sidebarOpen ? faChevronLeft : faChevronRight} />
        </div>
      </div>
    </Router>
  );
}

export default App;
