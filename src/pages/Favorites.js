import "../assets/css/favorites.scss";
import { useState, useEffect } from "react";
import axios from "axios";

const Favorites = ({ token }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-backend--wbbmf4gr4bwy.code.run/favorites/${token}`
        );
        setData(response.data);
        console.log(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [token]);

  return (
    <div className="container">
      {!token ? (
        <h2>To reach your heroes, please login 😉</h2>
      ) : isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="favorite-card">
          {data.map((character) => {
            return (
              <div className="favorite-character">
                <div className="picture">
                  {" "}
                  <img
                    src={`${character.picturepath}/standard_fantastic.${character.pictureextension}`}
                    alt=""
                  />
                </div>
                <div className="title">
                  <p>{character.name}</p>
                </div>
                <div className="right">
                  <p>{character.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Favorites;
