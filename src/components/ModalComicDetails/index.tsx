import React, { useEffect, InputHTMLAttributes } from "react";
import IComic from '../../models/comics';
import { AiOutlineClose } from "react-icons/ai";
import "./styles.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
  comicDetails?:IComic | undefined,
  closeModal?:Function | any,
}


const Modal : React.FC<InputProps> =  ({ comicDetails, closeModal }) => {
  const escFunction = (event : any) => {
    if (event.keyCode === 27) {
      closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);
  }, []);

  return (
    <> 
      {comicDetails?.image && (
        <div className="overlay">
          <div className="container-modal-details">
            <div className="image-detail">
              <img
                src={comicDetails?.image}
                alt="ilustrative image of choosen comic"
              />
            </div>
            <div className="details">
              <AiOutlineClose id="closeIcon" size={20} onClick={closeModal} />
              <h2>{comicDetails.title}</h2>
              <h3>Criadores:</h3>
              <p>
                {comicDetails.creators &&
                  comicDetails.creators.items.map(
                    (creator, index) =>
                      index < 15 && (
                        <span key={creator.name}>
                          {creator.name} - {creator.role}
                        </span>
                      )
                  )}
              </p>
              <h3> Custos:</h3>
              <p>
                {comicDetails?.prices &&
                  comicDetails?.prices?.map(
                    (price, index) =>
                      index < 10 && (
                        <span key={index}>
                          {price.type === "printPrice"
                            ? "Preço de impressão"
                            : price.type === "digitalPrice"
                            ? "Preço de digitalização"
                            : price.type}{" "}
                          -{" "}
                          {price?.price?.toLocaleString("en-us", {
                            style: "currency",
                            currency: "USD",
                          })}
                        </span>
                      )
                  )}
              </p>
              <button id="closeButton" onClick={closeModal}>
                FECHAR
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
