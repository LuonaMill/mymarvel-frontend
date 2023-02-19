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

  //* Je récupère les données issues
  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-backend--wbbmf4gr4bwy.code.run/characters?name=${search}&limit=${limit}&skip=${skip}`
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
        <p>Loading...</p>
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
                Sorry ! No Marvel character wears this name
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
