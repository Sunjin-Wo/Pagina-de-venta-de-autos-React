import React from 'react';
import './RegisterPage.css';

function RegisterPage() {
  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Registrarse</h2>
        <form>
          <label htmlFor="fullName">Nombre Completo</label>
          <input type="text" id="fullName" placeholder="Ingresa tu nombre completo" required />

          <label htmlFor="email">Correo Electrónico</label>
          <input type="email" id="email" placeholder="Ingresa tu correo" required />

          <label htmlFor="password">Contraseña</label>
          <input type="password" id="password" placeholder="Crea una contraseña" required />

          <label htmlFor="phone">Teléfono</label>
          <input type="tel" id="phone" placeholder="Ingresa tu número de teléfono" required />

          <button type="submit" className="register-button">Crear cuenta</button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
