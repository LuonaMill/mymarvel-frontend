import "../assets/css/eachCharacter.scss";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import ComicCard from "../components/ComicCard";

const EachCharacter = () => {
  const location = useLocation();
  const { character } = location.state;
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4004/comics/${character._id}`
        );
        // console.log(character.comics);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [character._id]);

  return isLoading ? (
    <h2>En cours de chargement</h2>
  ) : (
    <div className="container">
      <div className="character-infos">
        <div className="left">
          <img
            src={`${character.thumbnail.path}/portrait_uncanny.${character.thumbnail.extension}`}
            alt="character big portrait size"
          />
        </div>
        <div className="right">
          <h2>{character.name.toUpperCase()}</h2>
          <p className="description">{character.description}</p>
          <p>
            {character.name} made an appearance in {data.comics.length} comics
            listed below
          </p>
        </div>
      </div>
      <div className="comics-infos">
        {data.comics.map((comic) => {
          return <ComicCard comic={comic} id={comic._id} />;
        })}
      </div>
    </div>
  );
};

export default EachCharacter;
