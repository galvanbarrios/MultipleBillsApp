import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import LoginComponent from "./Login";
import HomeScreen from "./home/HomeScreen";
import { OrderProvider } from "./context/OrderContext";

const App = () => {
  const { login, user, logout } = useAuth();

  const handleLogin = async (username, password) => {
    const respuesta = await login(username, password);
    console.log(respuesta);

    if (respuesta.status === "error" || respuesta.error === "Error") {
      alert(respuesta.mensaje);
    }
  };

  return (
    <OrderProvider>
      <Router>
        <Routes>
          {user ? (
            <Route path="/" element={<HomeScreen />} />
          ) : (
            <Route
              path="/"
              element={<LoginComponent handleLogin={handleLogin} />}
            />
          )}
        </Routes>
      </Router>
    </OrderProvider>
  );
};

export default App;
