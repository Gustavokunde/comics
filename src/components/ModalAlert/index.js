import React from "react";
import "../ModalInsertEmail/styles.scss";

function ModalAlert({ message, closeModal }) {
  return (
    <div className="overlay">
      <div className="container-modal">
        <p>{message}</p>
        <button onClick={closeModal}>OK</button>
      </div>
    </div>
  );
}

export default ModalAlert;
