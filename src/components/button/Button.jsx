import React from "react";
import { Link } from "react-router-dom";
import "./button.css";

const ButtonComponent = ({ children, order }) => {
  const handleClick = () => {
    order();
  };

  return (
    <button className="button" onClick={handleClick}>
      {children}
    </button>
  );
};

export default ButtonComponent;
