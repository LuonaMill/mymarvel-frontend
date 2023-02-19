import "../assets/css/forms.scss";
import axios from "axios";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const fromFavorites = location.state?.fromFavorites ? true : null;

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post("http://localhost:4004/user/login", {
        email: email,
        password: password,
      });
      if (response.data.token) {
        setUser(response.data.token);
        alert("Nous sommes heureux de vous revoir parmi nous");
        navigate(fromFavorites ? "/favorites" : "/");
      }
    } catch (error) {
      if (error.response.status === 401) {
        setErrorMessage("Votre email ou votre mot de passe sont incorrects");
      }
    }
  };

  return (
    <div className="container">
      <form className="login-form" onSubmit={handleSubmit}>
        <div>
          {" "}
          <label htmlFor="email">Enter your email</label>
          <input
            type="email"
            placeholder="Votre email"
            id="email"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="password">Enter your password</label>
          <input
            type="password"
            placeholder="Votre mot de passe"
            id="password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </div>

        <button type="submit">Login</button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default Login;
