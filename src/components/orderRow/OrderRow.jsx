import React from "react";
import ButtonComponent from "../button/Button";

import "./orderRow.css";

const OrderRow = ({ index, customerName, product, quantity, table }) => {
  return (
    <div className="order-row">
      <section className="order-section">
        <p>Núm Orden: {index}</p>
        <p>A nombre de: {customerName}</p>
        <p>Mesa: {table}</p>
      </section>
      <section className="order-section order-btns">
        <ButtonComponent>Realizar Cobro</ButtonComponent>
      </section>
    </div>
  );
};

export default OrderRow;
