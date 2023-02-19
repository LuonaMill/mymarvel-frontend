import logo from "../assets/images/logo-marvel.png";
import "../assets/css/header.scss";
import { useLocation, useNavigate } from "react-router-dom";
import Searchbar from "./Searchbar";

const Header = ({ setSearch, setLimit, token, setToken }) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="header">
      <div className="search">
        <div className="logo">
          <img
            src={logo}
            alt="logo-marvel"
            className="logo"
            onClick={() => {
              navigate("/");
            }}
          />
        </div>

        <Searchbar setSearch={setSearch} setLimit={setLimit} />
        {token ? (
          <button
            onClick={() => {
              setToken(null);
              navigate("/");
            }}
          >
            Log out
          </button>
        ) : location.pathname !== "/signup" &&
          location.pathname !== "/login" ? (
          <div className="buttons">
            <button
              className="signup"
              onClick={() => {
                navigate("/signup");
              }}
            >
              Sign up
            </button>
            <button
              className="login"
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </button>
          </div>
        ) : null}
      </div>

      <section className="navmenu">
        <div
          className={location.pathname === "/" ? "here" : "categorie"}
          onClick={() => {
            if (location.pathname !== "/") {
              navigate("/");
            }
          }}
        >
          <h2>CHARS</h2>
        </div>
        <div
          className={location.pathname === "/comics" ? "here" : "categorie"}
          onClick={() => {
            if (location.pathname !== "/comics") {
              navigate("/comics");
            }
          }}
        >
          <h2>COMICS</h2>
        </div>
        <div
          className={location.pathname === "/favorites" ? "here" : "categorie"}
          onClick={() => {
            if (location.pathname !== "/favorites") {
              navigate("/favorites");
            }
          }}
        >
          <h2>FAVS 🤍</h2>
        </div>
      </section>
    </div>
  );
};

export default Header;
