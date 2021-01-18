import React, { useState, useEffect } from "react";
import api from "../../services/api";
import CryptoJS from "crypto-js";
import ModalComicDetails from "../../components/ModalComicDetails";
import { FaSpinner } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import ModalInsertEmail from "../../components/ModalInsertEmail";
import Mask from'../../Icons/Mask';
import "./styles.scss";

function ComicsList() {
  const [comics, setComics] = useState([]);
  const [lovedComics, setLovedComics] = useState([]);
  const [classShowButton, setClassShowButton] = useState("");
  const [selectedComic, setSelectedComic] = useState({});
  const [loading, setLoading] = useState(false);
  const ts = new Date().getTime();
  const publicKey = "a9c872e621bea639063b886de6f2a77a";
  const privateKey = CryptoJS.MD5(
    ts + "4f7fa7d20c0f3a139e6da96d2098a87a8e26647f" + publicKey
  ).toString();
  const [email, setEmail] = useState(false);

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
      .then((response) => {
        setComics(response.data.data.results);
      });

    setLoading(false);
  };

  const showComicDetails = (comic) => {
    comic.image = `${comic.thumbnail.path}.${comic.thumbnail.extension}`;
    setSelectedComic(comic);
  };

  const closeModal = () => {
    setSelectedComic({});
  };

  const closeModalEmail = () => {
    setEmail(false);
  };

  const loveComic = (comic) => {
    const icon = document.getElementById("icon-love" + comic.id);
      const card = document.getElementById("card" + comic.id);
    const comicIsLoved = lovedComics.find((com) => comic.id === com.id);

    if (!comicIsLoved) {
      setLovedComics([...lovedComics, comic]);
      icon.classList.add("selected");
      card.classList.add("selected");
    } else {
      setLovedComics(lovedComics.filter((item) => item.id !== comic.id));
      icon.classList.remove("selected");
      card.classList.remove("selected");
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
      <h1>
        {"Escolha as suas HQs preferidas e as envie por e-mail".toUpperCase()}{" "}
      </h1>
      {loading ? (
        <FaSpinner id="spinner" color="#FFF" size={100} />
      ) : (
        <>
          <div className="container-cards">
            {comics &&
              comics.map((comic, index) => (
                <div
                  id={`card${comic.id}`}
                  className="card"
                  key={comic.id}
                  onMouseOver={() => {
                    setClassShowButton({ class: "mouseOver", index });
                  }}
                  onMouseOut={() => {
                    setClassShowButton("");
                  }}
                >
                  <div
                    id={`overlay-container-options-card`+comic.id}
                    className={
                      classShowButton.class && index === classShowButton.index
                        ? classShowButton.class
                        : "hide"
                    }
                  >
                    <Mask
                      id={`icon-love${comic.id}`}
                      width="70px" height="70px"
                      onClick={() => loveComic(comic)}
                    />

                    <button id={`button-see-more${comic.id}`} onClick={() => showComicDetails(comic)}>
                      VER MAIS
                    </button>
                  </div>
                  <span>{comic.title}</span>
                  <img
                    src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                    alt="ilustrative image of comic"
                  />
                </div>
              ))}
          </div>
          <div className="button">
            <button
              onClick={() => {
                setEmail(true);
              }}
            >
              <HiOutlineMail size={30}/>
              Enviar preferidos por e-mail
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default ComicsList;
