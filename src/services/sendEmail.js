import emailjs from "emailjs-com";

const email = async (data) => {
  return emailjs.send(process.env.REACT_APP_SERVICE_ID, process.env.REACT_APP_TEMPLATE_ID, data, process.env.REACT_APP_SERVICE_ID)
    
};

export default email;
