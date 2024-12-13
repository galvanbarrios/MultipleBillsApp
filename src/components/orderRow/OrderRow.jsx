import React from "react";
import ButtonComponent from "../button/Button";

import "./orderRow.css";

const OrderRow = () => {
  return (
    <div className="order-row">
      <section className="order-section">
        <p>Núm Orden: 1</p>
        <p>A nombre de: Sergio, Emmanuel</p>
      </section>
      <section className="order-section order-btns">
        <ButtonComponent>Realizar Cobro</ButtonComponent>
      </section>
    </div>
  );
};

export default OrderRow;
