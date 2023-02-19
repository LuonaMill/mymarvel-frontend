import "../assets/css/characters.scss";
import axios from "axios";
import { useState, useEffect } from "react";

//*Import d'images
import characterPicture from "../assets/images/not-found-characters.jpg";

//*Import de Composants
import CharacterCard from "../components/CharacterCard";
import Pagination from "../components/Pagination";

const Characters = ({
  search,
  limit,
  skip,
  setSkip,
  setFavorites,
  favorites,
  token,
}) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  //   const handleFavorites = () => {
  //     Cookies.set("favorite-id");
  //     const newTab = [...cookies];
  //     newTab.push;
  //   };

  //   const handleFavorite = (favorite) => {
  //     if (favorite) {
  //       setFavorites(favorite);
  //       Cookies.set("favorite", favorite, { expires: 7 });
  //     } else {
  //       setToken(null);
  //       Cookies.remove("token");
  //     }
  //   };

  //* Je récupère les données issues
  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4004/characters?name=${search}&limit=${limit}&skip=${skip}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchCharacters();
  }, [search, limit, skip]);

  return (
    <div className="container">
      {isLoading === true ? (
        <p>En cours de chargement</p>
      ) : (
        <div>
          <Pagination
            limit={limit}
            setSkip={setSkip}
            count={data.count}
            skip={skip}
            position="top"
          />

          <div className="all-images">
            {data.count === 0 ? (
              <h2 style={{ color: "white" }}>
                Nous sommes désolés ! Aucun personnage Marvel ne porte ce nom.
              </h2>
            ) : (
              data.results.map((character) => {
                return (
                  <CharacterCard
                    token={token}
                    character={character}
                    id={character._id}
                    setFavorites={setFavorites}
                    favorites={favorites}
                    newPicture={
                      character.thumbnail.path.includes("image_not_available")
                        ? { characterPicture }
                        : ""
                    }
                  />
                );
              })
            )}
          </div>
          <Pagination
            limit={limit}
            setSkip={setSkip}
            count={data.count}
            skip={skip}
            position="bottom"
          />
        </div>
      )}
    </div>
  );
};

export default Characters;
