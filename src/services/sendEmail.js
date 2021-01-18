import emailjs from "emailjs-com";

const email = async (data) => {
  return emailjs.send(process.env.REACT_APP_SERVICE_EMAIL, process.env.REACT_APP_TEMPLATE_ID, data, process.env.REACT_APP_USER_EMAIL_ID)
    
};

export default email;
