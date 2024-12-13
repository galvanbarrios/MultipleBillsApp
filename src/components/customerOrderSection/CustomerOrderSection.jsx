import React from "react";

const CustomerOrderSection = ({ productos }) => {
  return (
    <div className="customer-order">
      <div className="form-group">
        <label htmlFor="">Nombre Cliente</label>
        <input type="text" />
      </div>
      <div className="form-group">
        <label htmlFor="">Producto</label>
        <select name="" id="">
          {productos.map((producto) => (
            <option
              value={producto.nombre}
            >{`${producto.nombre} - $${producto.precio}`}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CustomerOrderSection;
