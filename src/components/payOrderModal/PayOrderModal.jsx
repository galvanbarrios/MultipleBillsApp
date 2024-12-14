import React, { useEffect, useRef } from "react";
import ButtonComponent from "../button/Button";
import { useOrderContext } from "../../context/OrderContext";

const PayOrderModal = ({ isOpen, closeModal, fullProduct }) => {
  const modalRef = useRef(null);

  const { clearOrder } = useOrderContext();

  useEffect(() => {
    if (isOpen) {
      modalRef.current.showModal();
    } else {
      modalRef.current.close();
    }
  }, [isOpen]);

  const handleCloseModal = () => {
    closeModal();
  };

  const handleClearOrder = () => {
    clearOrder(fullProduct.idOrder);
    closeModal();
  };

  return (
    <dialog className="new-order-modal" ref={modalRef}>
      <form className="" onSubmit={(e) => e.preventDefault()}>
        <h2 className="title">Realizar Pago</h2>

        <div className="payment-details">
          <p>A nombre de: {fullProduct.customerName}</p>
          <p>Mesa: {fullProduct.table}</p>
          <p>Producto: {fullProduct.product.name}</p>
          <p>Precio: ${fullProduct.product.price}</p>
          <p>Cantidad: {fullProduct.quantity}</p>
          <hr />
        </div>

        <p className="total-payment">
          Total: ${fullProduct.product.price * fullProduct.quantity}
        </p>

        <div className="form-group">
          <label htmlFor="">Método de pago</label>
          <select name="" id="">
            <option value="">Efectivo</option>
            <option value="">Por Terminal</option>
          </select>
        </div>

        <ButtonComponent order={handleClearOrder}>Pagar</ButtonComponent>
      </form>

      <ButtonComponent order={handleCloseModal}>Cerrar</ButtonComponent>
    </dialog>
  );
};

export default PayOrderModal;
