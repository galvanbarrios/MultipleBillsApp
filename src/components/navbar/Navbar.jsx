import React from "react";
import "./navbar.css";

const NavbarComponent = ({ logoutFunction }) => {
  const handleExit = () => {
    logoutFunction();
  };

  return (
    <nav className="navbar">
      <ul>
        <li>
          <a href="#">Inicio</a>
        </li>
      </ul>

      <ul>
        <li>
          <a href="#">Perfil</a>
        </li>
        <li>
          <a href="#" onClick={handleExit}>
            Cerrar Sesión
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default NavbarComponent;
