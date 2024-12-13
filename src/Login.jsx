import React, { useState } from "react";
import "./login.css";

const LoginComponent = ({ handleLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsername = (e) => {
    const { value } = e.target;
    setUsername(value);
  };

  const handlePassword = (e) => {
    const { value } = e.target;
    setPassword(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(username, password);
  };

  return (
    <div className="login-screen">
      <h1 className="title">Iniciar Sesión</h1>
      <form className="login-form">
        <div className="form-group">
          <label htmlFor="">Nombre de Usuario</label>
          <input type="text" onChange={handleUsername} value={username} />
        </div>
        <div className="form-group">
          <label htmlFor="">Contraseña</label>
          <input type="password" onChange={handlePassword} value={password} />
        </div>
        <button onClick={handleSubmit}>Ingresar</button>
      </form>
    </div>
  );
};

export default LoginComponent;
