import React, {
  createRef,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import ButtonComponent from "../button/Button";
import CustomerOrderSection from "../customerOrderSection/CustomerOrderSection";
import productos from "../../constants/productos";
import "./newOrderModal.css";
import { useOrderContext } from "../../context/OrderContext";

const NewOrderModal = ({ isOpen, closeModal }) => {
  const modalRef = useRef(null);
  const singleOrderFormRef = useRef(null);
  const multipleOrderFormRefs = useRef([]);
  const [refKey, setRefKey] = useState(0);

  const [customerForms, setCustomerForms] = useState([0]);
  const [tableNumber, setTableNumber] = useState("");
  const [accountSelectValue, setAccountSelectValue] =
    useState("Sin seleccionar");

  const { addSingleOrder } = useOrderContext();

  useEffect(() => {
    if (isOpen) {
      modalRef.current.showModal();
    } else {
      modalRef.current.close();
    }
  }, [isOpen]);

  const forceRerender = useCallback(() => {
    setRefKey((prev) => prev + 1);
  }, []);

  useEffect(() => {
    if (multipleOrderFormRefs.current.length !== customerForms.length) {
      multipleOrderFormRefs.current = customerForms.map(
        (_, i) => multipleOrderFormRefs.current[i] || createRef()
      );
      forceRerender();
      console.log(multipleOrderFormRefs.current);
    }
  }, [customerForms]);

  const handleCloseModal = () => {
    closeModal();
  };

  const handleAccountSelect = (e) => {
    const { value } = e.target;
    setAccountSelectValue(value);
  };

  const handleAddForm = () => {
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

  const handleTableNumber = (e) => {
    setTableNumber(e.target.value);
  };

  const showMultipleInfo = () => {
    let datos = [];
    multipleOrderFormRefs.current.map((formRef) => {
      datos.push(formRef.current.obtenerValores());
    });

    datos.map((data) => {
      const { id, name, price } = data.product;
      addSingleOrder(
        data.customerName,
        id,
        name,
        price,
        data.quantity,
        tableNumber
      );
    });
    closeModal();
    multipleOrderFormRefs.current.map((formRef) => {
      formRef.current.refreshForms();
    });
    setCustomerForms([0]);
    setTableNumber("");
  };

  const showInfo = () => {
    if (singleOrderFormRef.current) {
      const obj = singleOrderFormRef.current.obtenerValores();
      if (!obj) {
        alert("Algo salió mal al tomar la orden");
        return;
      }
      const { id, name, price } = obj.product;
      addSingleOrder(
        obj.customerName,
        id,
        name,
        price,
        obj.quantity,
        tableNumber
      );
      closeModal();
      singleOrderFormRef.current.refreshForms();
      setTableNumber("");
    }
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
            <CustomerOrderSection
              productos={productos}
              ref={singleOrderFormRef}
            />
            <div className="form-group">
              <label htmlFor="">Mesa</label>
              <input
                type="text"
                value={tableNumber}
                onChange={handleTableNumber}
              />
            </div>
            <ButtonComponent order={showInfo}>
              Añadir a la cuenta
            </ButtonComponent>
          </>
        ) : (
          accountSelectValue == "Separada" && (
            <>
              {customerForms.map((formId, index) => (
                <CustomerOrderSection
                  key={formId}
                  productos={productos}
                  ref={multipleOrderFormRefs.current[index]}
                />
              ))}
              <div className="form-group">
                <label htmlFor="">Mesa</label>
                <input
                  type="text"
                  value={tableNumber}
                  onChange={handleTableNumber}
                />
              </div>
              <div className="btns-section">
                <ButtonComponent
                  order={() => {
                    handleAddForm();
                    // focusItem(index);
                  }}
                >
                  Añadir Cuenta
                </ButtonComponent>
                <ButtonComponent
                  order={() => {
                    handleDropForm();
                    // focusItem(index);
                  }}
                >
                  Eliminar Cuenta
                </ButtonComponent>
                <ButtonComponent order={showMultipleInfo}>
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
