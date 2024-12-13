// context/AuthContext.js
import React, { createContext, useState, useContext } from "react";
import { users } from "../constants/users";

// Crear el contexto
const AuthContext = createContext();

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Estado para el usuario autenticado

  const login = async (username, password) => {
    let userFound = false;

    if (username === "" || password === "") {
      return { status: "error", mensaje: "Por favor llena todos los campos" };
    }

    for (const user of users) {
      if (username === user.nombreUsuario) {
        if (userFound === false) {
          userFound = true;
        }
        if (password === user.contrasenia) {
          setUser(user);
          return { status: "success", mensaje: "Bienvenido " + username };
        }
      }
    }

    if (userFound) {
      return { status: "Error", mensaje: "Contraseña Incorrecta" };
    }

    return {
      status: "error",
      mensaje: "El usuario introducido no existe",
    };
  };

  // Función para cerrar sesión
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useAuth = () => useContext(AuthContext);
