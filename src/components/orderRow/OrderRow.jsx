import React, { useState } from "react";
import ButtonComponent from "../button/Button";

import "./orderRow.css";
import PayOrderModal from "../payOrderModal/PayOrderModal";

const OrderRow = ({
  index,
  idOrder,
  customerName,
  product,
  quantity,
  table,
}) => {
  const [isOpenPayModal, setIsOpenPayModal] = useState(false);

  const handlePayModal = () => {
    setIsOpenPayModal(!isOpenPayModal);
  };

  const fullProduct = {
    idOrder,
    customerName,
    product,
    quantity,
    table,
  };

  return (
    <>
      <div className="order-row">
        <section className="order-section">
          <p>Núm Orden: {index}</p>
          <p>A nombre de: {customerName}</p>
          <p>Mesa: {table}</p>
        </section>
        <section className="order-section order-btns">
          <ButtonComponent order={handlePayModal}>
            Realizar Cobro
          </ButtonComponent>
        </section>
      </div>
      <PayOrderModal
        isOpen={isOpenPayModal}
        closeModal={handlePayModal}
        fullProduct={fullProduct}
      />
    </>
  );
};

export default OrderRow;
