import "../assets/css/characterCard.scss";

const ComicCard = ({ comic, id, newPicture }) => {
  return (
    <div className="card" key={id}>
      <div className="left">
        <img
          src={
            newPicture
              ? newPicture.comicPicture
              : `${comic.thumbnail.path}/standard_large.${comic.thumbnail.extension}`
          }
          alt=""
        />

        <div className="title">
          <p>{comic.title}</p>
        </div>
      </div>
      {comic.description && <div className="right">{comic.description}</div>}
    </div>
  );
};

export default ComicCard;
