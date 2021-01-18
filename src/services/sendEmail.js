import emailjs from "emailjs-com";

const email = async (data) => {
  return emailjs.send("gmail", "teste_gustavo", data, "user_WPXJoZkANDAMzZI3y3lvX")
    
};

export default email;
