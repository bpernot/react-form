import React, { useState } from "react";

const App = () => {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const isEmail = () => {
    let mail = document.getElementById('not-mail')
    let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (email.match(regex)) {
      mail.style.display = 'none'
      return true
    } else {
      mail.style.display = 'block'
      mail.style.animation = 'dongle 1s'
      setTimeout(() => {
        mail.style.animation = 'none'
      }, 1000)
      return false
    }
  }

  const failMessage = () => {
    let formMess = document.querySelector('.form-message')

    formMess.innerHTML = 'Merci de remplir correctement les champs requis *'
    formMess.style.opacity = '1'
    formMess.style.background = 'rgb(253, 87, 87)'

    document.getElementById('name').classList.add('error')
    document.getElementById('email').classList.add('error')
    document.getElementById('message').classList.add('error')
  }

  const successMessage = () => {
    let formMess = document.querySelector('.form-message')

    formMess.innerHTML = 'Message envoyé ! Nous vous recontacterons dès que possible.'
    formMess.style.background = '#00c1ec'
    formMess.style.opacity = '1'
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name && isEmail() && message) {
      sendFeedback("template_5noz07n", {
        name,
        company,
        phone,
        email,
        message,
      });
    } else {
      failMessage()
    }
  };

  const sendFeedback = (templateId, variables) => {

    window.emailjs
      .send("gmail", templateId, variables)
      .then((res) => {
        successMessage()
        setName("");
        setCompany("");
        setPhone("");
        setEmail("");
        setMessage("");
      })
      .catch(
        (err) =>
          document.querySelector('.form-message').innerHTML =
          "Une erreur s'est produite, veuillez réessayer.")
  };

  return (
    <form className="contact-form">
      <h2>Contactez-nous</h2>
      <div className="form-content">
        <input
          type="text"
          id="name"
          name="name"
          onChange={(e) => setName(e.target.value)}
          placeholder="nom *"
          value={name}
          autoComplete="off"
        />
        <input
          type="text"
          id="company"
          name="company"
          onChange={(e) => setCompany(e.target.value)}
          placeholder="société"
          value={company}
        />
        <input
          type="text"
          id="phone"
          name="phone"
          onChange={(e) => setPhone(e.target.value)}
          placeholder="téléphone"
          value={phone}
        />
        <div className="email-content">
          <label id="not-mail">Email non valide</label>
          <input
            type="mail"
            id="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email *"
            value={email}
            autoComplete="off"
          />
        </div>
        <textarea
          id="message"
          name="message"
          onChange={(e) => setMessage(e.target.value)}
          placeholder="message *"
          value={message}
        />
      </div>
      <input
        className="button"
        type="button"
        value="Envoyer"
        onClick={handleSubmit}
      />
      <div className="form-message"></div>
    </form>
  );
};

export default App;
