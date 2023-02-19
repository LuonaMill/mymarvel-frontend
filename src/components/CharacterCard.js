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

  const [favorite, setFavorite] = useState(false);

  const handleFavorite = async (event) => {
    if (!favorite) {
      try {
        event.preventDefault();
        const response = await axios.post(
          `https://site--marvel-backend--wbbmf4gr4bwy.code.run/favorites/${token}`,
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
          alert(`Congrats ! You added ${character.name} in your favs`);
        }
      } catch (error) {
        console.log(error.message);
      }
    } else {
      alert("You already have this guy in your favs");
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
