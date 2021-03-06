import React, { useState, useEffect , InputHTMLAttributes} from "react";
import IComic from '../../models/comics';
import { AiOutlineClose } from "react-icons/ai";
import sendEmail from "../../services/sendEmail";
import "./styles.scss";
import { FaSpinner } from "react-icons/fa";


interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
  sendEmailData?:IComic[],
  closeModal?:Function | any
}

const ModalInsertEmail : React.FC<InputProps> = ({ sendEmailData, closeModal })  => {
  
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const sendEmailContent = async () => {
    setLoading(true);

    const templateHTML = generateTemplateHTML();

    const data = {
      name,
      email,
      message: templateHTML,
    };

    await sendEmail(data).then(
      (response) => {
        console.log(response);
        if (response.status == 200 || response.text == "OK")
          setAlertMessage("E-mail enviado com sucesso.");
        else
          setAlertMessage(
            "Ocorreu um erro, verifique o e-mail digitado e tente novamente mais tarde."
          );
        setLoading(false);
      },
      (error) => {
        setAlertMessage(
          "Ocorreu um erro, verifique o e-mail digitado e tente novamente mais tarde."
        );
        setLoading(false);
      }
    );
  };

  const generateTemplateHTML = () => {
    return sendEmailData?.map(
      (comic:IComic) =>
        `<div>
        <img style="height:300px" src=${comic?.thumbnail?.path}.${
          comic?.thumbnail?.extension
        }>
      
    </div>
    <div>
      <span>${comic.title}</span>
      ${
        comic.creators &&
        comic.creators.items.map(
          (creator) =>
            `<p>
            <span>${creator.name}</span>
            <span>${creator.role}</span>
          </p>`
        )
      }
    </div>
  `
    );
  };

  const escFunction = (event : any) => {
    if (event.keyCode === 27) {
      closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);
  }, []);

  return (
    <div className="overlay">
      <div className="container-modal">
        <AiOutlineClose size={20} onClick={closeModal} />
        <h2> Por favor, digite os campos abaixo: </h2>
        <input
          type="text"
          placeholder="Nome"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <button onClick={sendEmailContent}>
          {loading ? (
            <FaSpinner id="spinner" color="#FFF" size={18} />
          ) : (
            "ENVIAR E-MAIL"
          )}
        </button>
        {alertMessage && <span id="alert">{alertMessage}</span>}
      </div>
    </div>
  );
}

export default ModalInsertEmail;
