import React, { useState, useEffect } from "react";
import api from "../../services/api";
import CryptoJS from "crypto-js";
import ModalComicDetails from "../../components/ModalComicDetails";
import { FaSpinner } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import ModalInsertEmail from "../../components/ModalInsertEmail";
import Mask from "../../Icons/Mask";
import "./styles.scss";
import ModalAlert from "../../components/ModalAlert";
import IComic from "../../models/comics";


interface IShowObject {
  class?:string,
  index?:number
}


const  ComicsList: React.FC = () => {
  const [comics, setComics] = useState<IComic[]>([]);
  const [lovedComics, setLovedComics] = useState<IComic[]>([]);
  const [classShowButton, setClassShowButton] = useState<IShowObject | undefined>();
  const [selectedComic, setSelectedComic] = useState<IComic | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");

  const ts = new Date().getTime();
  const publicKey = process.env.REACT_APP_PUBLIC_KEY;
  let privateKey = '';
  
  if (process?.env?.REACT_APP_PRIVATE_KEY){
    privateKey = CryptoJS.MD5(
      ts + process?.env?.REACT_APP_PRIVATE_KEY + publicKey
    ).toString();
  }
  const [email, setEmail] = useState<boolean>(false);

  useEffect(() => {
    loadComics();
  }, []);

  useEffect(() => {
    console.log(lovedComics);
  }, [lovedComics]);

  const loadComics = async () => {
    setLoading(true);
    await api
      .get(
        `/comics?limit=${99}&offset=${100}&ts=${ts}&apikey=${publicKey}&hash=${privateKey}`
      )
      .then(
        (response) => {
          if (response.data && response.data.data)
            setComics(response.data.data.results);
          else
            setAlertMessage(
              "Ocorreu um erro com o serviço, por favor tente novamente mais tarde."
            );
        },
        (error) => {
          setAlertMessage(
            "Ocorreu um erro com o serviço, por favor tente novamente mais tarde."
          );
        }
      );

    setLoading(false);
  };

  const showComicDetails = (comic: IComic) => {
    comic.image = `${comic?.thumbnail?.path}.${comic?.thumbnail?.extension}`;
    setSelectedComic(comic);
  };

  const closeModal = () => {
    setSelectedComic(undefined);
  };

  const closeModalEmail = () => {
    setEmail(false);
  };

  const closeModalAlert = () => {
    setAlertMessage('');
  };

  const loveComic = (comic: IComic) => {
    const icon = document.getElementById("icon-love" + comic.id);
    const card = document.getElementById("card" + comic.id);
    const comicIsLoved = lovedComics.find((com) => comic.id === com.id);

    if (!comicIsLoved) {
      setLovedComics([...lovedComics, comic]);
      icon?.classList.add("selected");
      card?.classList.add("selected");
    } else {
      setLovedComics(lovedComics.filter((item) => item.id !== comic.id));
      icon?.classList.remove("selected");
      card?.classList.remove("selected");
    }
  };

  return (
    <div className="container-list">
      <ModalComicDetails comicDetails={selectedComic} closeModal={closeModal} />
      {email && (
        <ModalInsertEmail
          sendEmailData={lovedComics}
          closeModal={closeModalEmail}
        />
      )}
      {alertMessage && (
        <ModalAlert message={alertMessage} closeModal={closeModalAlert} />
      )}
      <h1>FAVORITE SUAS HQS</h1>

      <p>
        {"Clique no coração dentro da imagem para salvar suas HQs favoritas. Em seguida adicione seu e-mail no ícone abaixo para recebê-las.".toUpperCase()}{" "}
      </p>
      {loading ? (
        <FaSpinner id="spinner" color="#FFF" size={100} />
      ) : (
        <>
          <div className="container-cards">
            {comics &&
              comics.map((comic:IComic, index:number) => (
                <div
                  id={`card${comic.id}`}
                  className="card"
                  key={comic.id}
                  onMouseOver={() => {
                    setClassShowButton({ class: "mouseOver", index });
                  }}
                  onMouseOut={() => {
                    setClassShowButton({});
                  }}
                >
                  <div
                    id={`overlay-container-options-card` + comic.id}
                    className={
                      classShowButton?.class && index === classShowButton?.index
                        ? classShowButton?.class
                        : "hide"
                    }
                  >
                    <Mask
                      id={`icon-love${comic.id}`}
                      className="icon-love"
                      width="70px"
                      height="70px"
                      onClick={() => loveComic(comic)}
                    />

                    <button
                      id={`button-see-more${comic.id}`}
                      onClick={() => showComicDetails(comic)}
                    >
                      VER MAIS
                    </button>
                  </div>
                  <span>{comic.title}</span>
                  <img
                    src={`${comic?.thumbnail?.path}.${comic?.thumbnail?.extension}`}
                    alt="ilustrative image of comic"
                  />
                </div>
              ))}
          </div>
          <div className="button">
            <button
              onClick={() => {
                if (lovedComics.length > 0) setEmail(true);
                else
                  setAlertMessage(
                    "Por favor, marque suas HQs preferidas antes."
                  );
              }}
            >
              <HiOutlineMail size={30} />
              Enviar preferidos por e-mail
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default ComicsList;
