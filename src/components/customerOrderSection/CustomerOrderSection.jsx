import React, { forwardRef, useImperativeHandle, useState } from "react";

const CustomerOrderSection = forwardRef(({ productos, refreshForms }, ref) => {
  const [customerName, setCustomerName] = useState("");
  const [productValue, setProductValue] = useState(1);
  const [productQuantity, setProductQuantity] = useState(1);

  useImperativeHandle(ref, () => ({
    obtenerValores: () => ({
      customerName,
      product: productos.find(({ id }) => id == productValue),
      quantity: productQuantity,
    }),

    refreshForms: () => {
      setProductValue(1);
      setCustomerName("");
      setProductQuantity(1);
    },
  }));

  const handleChangeName = (e) => {
    const { value } = e.target;
    setCustomerName(value);
  };

  const handleChangeProduct = (e) => {
    const { value } = e.target;
    setProductValue(Number(value));
  };

  const handleAddProduct = () =>
    setProductQuantity(
      productQuantity < 15 ? productQuantity + 1 : productQuantity
    );
  const handleMinusProduct = () =>
    setProductQuantity(
      productQuantity > 1 ? productQuantity - 1 : productQuantity
    );

  return (
    <div className="customer-order">
      <div className="form-group">
        <label htmlFor="">Nombre Cliente</label>
        <input type="text" onChange={handleChangeName} value={customerName} />
      </div>
      <div className="form-group">
        <label htmlFor="">Producto</label>
        <select value={productValue} onChange={handleChangeProduct}>
          {productos.map((producto) => (
            <option
              value={producto.id}
              key={producto.id}
            >{`${producto.name} - $${producto.price}`}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="">Cantidad</label>
        <div className="quantity-section">
          <button onClick={handleMinusProduct}>-</button>
          <span>{productQuantity}</span>
          <button onClick={handleAddProduct}>+</button>
        </div>
      </div>
      <hr />
    </div>
  );
});

export default CustomerOrderSection;
