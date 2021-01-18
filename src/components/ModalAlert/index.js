import React from "react";
import '../ModalInsertEmail/styles.scss';

function ModalAlert({ message, closeModal }) {
  return (
    <div>
      <p>{message}</p>
      <button onClick={closeModal}>OK</button>
    </div>
  );
}

export default ModalAlert;
