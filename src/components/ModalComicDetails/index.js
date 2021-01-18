import React, { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import "./styles.scss";

function Modal({ comicDetails, closeModal }) {
  const escFunction = (event) => {
    if (event.keyCode === 27) {
      closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);
  }, []);

  return (
    <>
      {comicDetails.image && (
        <div className="overlay">
          <div className="container-modal-details">
            <div className="image-detail">
              <img
                src={comicDetails.image}
                alt="ilustrative image of choosen comic"
              />
            </div>
            <div className="details">
            <AiOutlineClose size={20} onClick={closeModal}/>
              <h2>{comicDetails.title}</h2>
              <h3>Criadores:</h3>
              <p>
              {comicDetails.creators &&
                comicDetails.creators.items.map((creator) => (
                  <span>
                    {creator.name} - {creator.role}
                  </span>
                ))}
                </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
