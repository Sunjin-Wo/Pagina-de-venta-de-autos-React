import React from 'react';
import './LoginPage.css';

function LoginPage() {
  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Iniciar Sesión</h2>
        <form>
          <label htmlFor="email">Correo </label>
          <input type="email" id="email" placeholder="Ingresa tu correo" required />

          <label htmlFor="password">Contraseña</label>
          <input type="password" id="password" placeholder="Ingresa tu contraseña" required />

          <button type="submit" className="login-button">Ingresar</button>
        </form>
        <p className="register-link">¿No estas registrado? <a href="/register">Regístrate aquí</a></p>
      </div>
    </div>
  );
}

export default LoginPage;
