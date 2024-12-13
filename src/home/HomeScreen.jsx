import React, { useState } from "react";
import NavbarComponent from "../components/navbar/Navbar";
import ButtonComponent from "../components/button/Button";

import { useAuth } from "../context/AuthContext";

import "./homeScreen.css";
import OrderRow from "../components/orderRow/OrderRow";
import NewOrderModal from "../components/newOrderModal/NewOrderModal";

const HomeScreen = () => {
  const [isOpenNewOrderModal, setIsOpenNewOrderModal] = useState(false);

  const { user, logout } = useAuth();
  console.log(user);

  const handleNewOrderModal = () =>
    setIsOpenNewOrderModal(!isOpenNewOrderModal);

  return (
    <>
      <NavbarComponent logoutFunction={logout} />
      <div className="home-section">
        <h1 className="title">Bienvenido {user.nombre}</h1>
        <div className="menu-section">
          <ButtonComponent order={handleNewOrderModal}>
            Realizar Pedido
          </ButtonComponent>
        </div>
        <div className="orders-div">
          <div className="orders-section">
            <h2 className="title">Pedidos</h2>
            <OrderRow></OrderRow>
          </div>
        </div>
      </div>
      <NewOrderModal
        isOpen={isOpenNewOrderModal}
        closeModal={handleNewOrderModal}
      />
    </>
  );
};

export default HomeScreen;
