import React,{InputHTMLAttributes} from "react";
import "../ModalInsertEmail/styles.scss";


interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
  message?:string,
  closeModal?:Function | any,
}


const ModalAlert : React.FC<InputProps> = ({ message, closeModal }) =>{
  return (
    <div className="overlay">
      <div className="container-modal">
        <h2>{message}</h2>
        <button onClick={closeModal}>OK</button>
      </div>
    </div>
  );
}

export default ModalAlert;
