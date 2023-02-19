import "../assets/css/characterCard.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const CharacterCard = ({
  character,
  id,
  newPicture,
  setFavorites,
  favorites,
  token,
}) => {
  const navigate = useNavigate();
  // JE tente de créer un state favoris au format tableau pour y stocker plusieurs Cookies
  // const [favorites, setFavorites] = useState([]);

  const [favorite, setFavorite] = useState(false);

  const handleFavorite = async (event) => {
    if (!favorite) {
      try {
        event.preventDefault();
        const response = await axios.post(
          `http://localhost:4004/favorites/${token}`,
          {
            token: token,
            name: character.name,
            picturepath: character.thumbnail.path,
            pictureextension: character.thumbnail.extension,
            description: character.description,
          }
        );
        if (response.data._id) {
          setFavorite(true);
          alert(`Vous avez ajouté ${character.name} dans vos favoris`);
        }
      } catch (error) {
        console.log(error.message);
      }
    } else {
      alert("Ce personnage est déjà dans vos favoris");
    }
  };

  return (
    <div className="card" key={id}>
      <div className="left">
        <img
          src={
            newPicture
              ? newPicture.characterPicture
              : `${character.thumbnail.path}/standard_large.${character.thumbnail.extension}`
          }
          alt=""
          onClick={() => {
            navigate(`/character/${id}`, { state: { character: character } });
          }}
        />

        <div className="title">
          <p>{character.name}</p>
          {token && (
            <button key={id} onClick={handleFavorite}>
              ❤️
            </button>
          )}
        </div>
      </div>
      {character.description && (
        <div className="right">{character.description}</div>
      )}
    </div>
  );
};

export default CharacterCard;
