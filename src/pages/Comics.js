import axios from "axios";
import { useState, useEffect } from "react";
import "../assets/css/characters.scss";
import ComicCard from "../components/ComicCard";
import comicPicture from "../assets/images/not-found-comics.jpg";
import Pagination from "../components/Pagination";

const Comics = ({ search, limit, setSkip, skip }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchComics = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-backend--wbbmf4gr4bwy.code.run/comics?title=${search}&limit=${limit}&skip=${skip}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchComics();
  }, [search, limit, skip]);

  return (
    <div className="container">
      {isLoading === true ? (
        <p>L/oading...</p>
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
                Sorry ! No Marvel comic exists with this title
              </h2>
            ) : (
              data.results.map((comic, index) => {
                return (
                  <ComicCard
                    comic={comic}
                    id={comic._id}
                    newPicture={
                      comic.thumbnail.path.includes("image_not_available")
                        ? { comicPicture }
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

export default Comics;
