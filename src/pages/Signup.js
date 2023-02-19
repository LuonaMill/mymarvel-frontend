import "../assets/css/forms.scss";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post("http://localhost:4004/user/signup", {
        email: email,
        password: password,
        username: username,
      });
      if (response.data.token) {
        setUser(response.data.token);
        setUsername("");
        setEmail("");
        setPassword("");
        setErrorMessage("");
        alert("Merci pour votre inscription");
        navigate("/");
      } else {
        alert("Une erreur est survenue, veuillez réessayer");
      }
    } catch (error) {
      if (error.response.status === 409) {
        setErrorMessage("Cet email a déjà un compte chez nous !");
      }
      if (error.response.status === 400) {
        setErrorMessage(
          "Merci de renseigner tous les champs afin de valider votre inscription"
        );
      }
      console.log(error.message);
    }
  };

  return (
    <div className="container">
      <h4>A few informations about yourself</h4>
      <form onSubmit={handleSubmit} className="signup-form">
        <div>
          <label htmlFor="username">Choose your username</label>
          <input
            type="text"
            placeholder="Username"
            id="username"
            name="username"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="email">Enter your email address</label>

          <input
            type="email"
            placeholder="Your email"
            id="email"
            name="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="password">Choose a password</label>

          <input
            type="password"
            placeholder="Your password"
            id="password"
            name="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </div>

        <button type="submit">Sign up</button>
        {errorMessage && <p>{errorMessage}</p>}
      </form>
    </div>
  );
};

export default Signup;
