import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

//* Import des composants et des pages
import Header from "./components/Header";
import Characters from "./pages/Characters";
import Comics from "./pages/Comics";
import EachCharacter from "./pages/EachCharacter";
import Favorites from "./pages/Favorites";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Footer from "./components/Footer";

const App = () => {
  //* Créations de states utilisés pour Searchbar et Pagination
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(100);
  const [skip, setSkip] = useState(0);

  const [token, setToken] = useState(Cookies.get("token") || null);

  //Je crée une fonction pour créer et stocker un token afin d'identifier mon user
  const setUser = (token) => {
    if (token) {
      setToken(token);
      Cookies.set("token", token, { expires: 7 });
    } else {
      setToken(null);
      Cookies.remove("token");
    }
  };

  return (
    <Router>
      <Header
        setSearch={setSearch}
        setLimit={setLimit}
        setUser={setUser}
        token={token}
        setToken={setToken}
      />
      <Routes>
        <Route path="/signup" element={<Signup setUser={setUser} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route
          path="/"
          element={
            <Characters
              search={search}
              limit={limit}
              skip={skip}
              setSearch={setSearch}
              setLimit={setLimit}
              setSkip={setSkip}
              token={token}
            />
          }
        />
        <Route
          path="/comics"
          element={
            <Comics
              search={search}
              limit={limit}
              skip={skip}
              setSearch={setSearch}
              setLimit={setLimit}
              setSkip={setSkip}
              token={token}
            />
          }
        />

        <Route path="/character/:id" element={<EachCharacter />} />
        <Route path="/favorites" element={<Favorites token={token} />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
