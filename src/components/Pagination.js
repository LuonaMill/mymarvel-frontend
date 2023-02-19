const Pagination = ({ limit, setSkip, count, skip, position }) => {
  const pagesCounter = Math.floor(count / limit);
  let page = Math.floor(skip / limit) + 1;

  return (
    <section className="infos-pages">
      <div className="pagination">
        {count !== 0 && (
          <span className="page" value="1" onClick={() => setSkip(0)}>
            1
          </span>
        )}

        {pagesCounter > 0 && (
          <span className="page" value="2" onClick={() => setSkip(limit)}>
            2
          </span>
        )}
        {pagesCounter > 1 && (
          <span className="page" value="3" onClick={() => setSkip(limit * 2)}>
            3
          </span>
        )}
        {pagesCounter > 2 && (
          <span className="page" value="4" onClick={() => setSkip(limit * 3)}>
            4
          </span>
        )}
        {pagesCounter > 3 && (
          <input
            type="number"
            placeholder="5+"
            min="5"
            defaultValue=""
            onChange={(event) => {
              if (event.target.value > 4) {
                setSkip((event.target.value - 1) * limit);
              }
            }}
          />
        )}
      </div>
      {position === "bottom" ? (
        <p>🔥🔥🔥</p>
      ) : count !== 0 ? (
        <p className="infos-pages">
          Vous êtes actuellement sur la page n° {page} sur {pagesCounter}
        </p>
      ) : (
        <p className="infos-pages">
          Voici tous les résultars correspondant à votre recherche
        </p>
      )}
    </section>
  );
};

export default Pagination;
