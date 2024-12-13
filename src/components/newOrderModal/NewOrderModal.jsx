import React, { useEffect, useRef, useState } from "react";
import ButtonComponent from "../button/Button";
import CustomerOrderSection from "../customerOrderSection/CustomerOrderSection";
import productos from "../../constants/productos";
import "./newOrderModal.css";

const NewOrderModal = ({ isOpen, closeModal }) => {
  const modalRef = useRef(null);
  const [accountSelectValue, setAccountSelectValue] =
    useState("Sin seleccionar");
  const [customerArray, setCustomerArray] = useState([]);
  const [customerForms, setCustomerForms] = useState([0]);

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

  const handleAccountSelect = (e) => {
    const { value, name } = e.target;
    setAccountSelectValue(value);
  };

  const handleAddForm = (e) => {
    if (customerForms.length < 10) {
      setCustomerForms([...customerForms, customerForms.length]);
    }
  };

  const handleDropForm = () => {
    if (customerForms.length > 1) {
      setCustomerForms((prevForms) => prevForms.slice(0, -1));
    }
    console.log(customerForms);
  };

  return (
    <dialog className="new-order-modal" ref={modalRef}>
      <form className="" onSubmit={(e) => e.preventDefault()}>
        <h2 className="title">¿Cuenta Compartida o Separada?</h2>
        <select
          name="account-select"
          id=""
          value={accountSelectValue}
          onChange={handleAccountSelect}
        >
          <option value={"Sin Seleccionar"}>Sin Seleccionar</option>
          <option value={"Compartida"}>Compartida</option>
          <option value={"Separada"}>Separada</option>
        </select>
        <hr />

        {accountSelectValue === "Compartida" ? (
          <>
            <CustomerOrderSection productos={productos} />
            <ButtonComponent>Cobrar</ButtonComponent>
          </>
        ) : (
          accountSelectValue == "Separada" && (
            <>
              {customerForms.map((formId, index) => (
                <CustomerOrderSection key={formId} productos={productos} />
              ))}
              <div className="btns-section">
                <ButtonComponent order={handleAddForm}>
                  Añadir Cuenta
                </ButtonComponent>
                <ButtonComponent order={handleDropForm}>
                  Eliminar Cuenta
                </ButtonComponent>
                <ButtonComponent order={handleAddForm}>
                  Añadir a la cuenta
                </ButtonComponent>
              </div>
            </>
          )
        )}
      </form>

      <ButtonComponent order={handleCloseModal}>Cerrar</ButtonComponent>
    </dialog>
  );
};

export default NewOrderModal;
