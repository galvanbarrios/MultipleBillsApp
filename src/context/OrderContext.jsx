// src/context/OrderContext.js
import React, { createContext, useContext, useState } from "react";

// Crear el contexto
const OrderContext = createContext();

// Proveedor del contexto
export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]); // Array de pedidos

  // Agregar pedido para un cliente
  const addSingleOrder = (clientName, id, productName, price) => {
    const newOrder = {
      clientName,
      items: [{ id, name: productName, price }],
    };
    setOrders((prevOrders) => [...prevOrders, newOrder]);
  };

  // Agregar pedidos para varios clientes
  const addMultipleOrders = (newOrders) => {
    // newOrders debe ser un array de objetos con clientName y items
    setOrders((prevOrders) => [...prevOrders, ...newOrders]);
  };

  // Obtener el total de un pedido por cliente
  const getTotalByClient = (clientName) => {
    const clientOrder = orders.find((order) => order.clientName === clientName);
    if (!clientOrder) return 0;
    return clientOrder.items.reduce((total, item) => total + item.price, 0);
  };

  // Limpiar todos los pedidos
  const clearOrders = () => {
    setOrders([]);
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        addSingleOrder,
        addMultipleOrders,
        getTotalByClient,
        clearOrders,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

// Hook para usar el contexto
export const useOrderContext = () => {
  return useContext(OrderContext);
};
