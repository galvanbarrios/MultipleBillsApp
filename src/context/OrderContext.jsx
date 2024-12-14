// src/context/OrderContext.js
import React, { createContext, useContext, useState } from "react";

// Crear el contexto
const OrderContext = createContext();

// Proveedor del contexto
export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]); // Array de pedidos

  // Agregar pedido para un cliente
  const addSingleOrder = (
    clientName,
    id,
    productName,
    price,
    quantity,
    table
  ) => {
    const newOrder = {
      idOrder: Math.random()
        .toString(36)
        .substring(2, 9 + 2),
      clientName,
      items: { id, name: productName, price },
      quantity,
      table,
    };
    console.log(newOrder);
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

  const clearOrder = (idToEliminate) => {
    const index = orders.findIndex((order) => order.idOrder === idToEliminate);

    console.log(index);

    if (index > -1) {
      console.log("first");
      const newOrders = [...orders.slice(0, index), ...orders.slice(index + 1)];

      setOrders(newOrders);
    }
    // setOrders((prevOrders) =>
    //   prevOrders.filter((item) => item.idOrder === idToEliminate)
    // );
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
        clearOrder,
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
