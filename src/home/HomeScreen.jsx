import React, { useState } from "react";
import NavbarComponent from "../components/navbar/Navbar";
import ButtonComponent from "../components/button/Button";

import { useAuth } from "../context/AuthContext";
import { useOrderContext } from "../context/OrderContext";

import "./homeScreen.css";
import OrderRow from "../components/orderRow/OrderRow";
import NewOrderModal from "../components/newOrderModal/NewOrderModal";

const HomeScreen = () => {
  const [isOpenNewOrderModal, setIsOpenNewOrderModal] = useState(false);
  const { orders } = useOrderContext();
  const { user, logout } = useAuth();

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
            {orders.length <= 0 ? (
              <h3 className="title" style={{ marginTop: 30 }}>
                No hay órdenes pendientes
              </h3>
            ) : (
              orders.map((order, index) => (
                <OrderRow
                  key={index}
                  index={index}
                  idOrder={order.idOrder}
                  customerName={order.clientName}
                  product={order.items}
                  quantity={order.quantity}
                  table={order.table}
                />
              ))
            )}
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
