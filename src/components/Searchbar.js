import { useLocation } from "react-router-dom";

const Searchbar = ({ setSearch, setLimit }) => {
  const location = useLocation();

  return (
    <div className="filters">
      <div className="searchbar">
        {location.pathname === "/" ? (
          <div>
            <input
              type="text"
              placeholder="Search character by name"
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
        ) : location.pathname === "/comics" ? (
          <div>
            <input
              type="text"
              placeholder="Search comics by title"
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
        ) : null}
      </div>
      {(location.pathname === "/comics" || location.pathname === "/") && (
        <div className="limit-selection">
          <select
            name="limit"
            id="limit-select"
            onChange={(event) => setLimit(event.target.value)}
          >
            <option value="100">100</option>
            <option value="50">50</option>
            <option value="25">25</option>
            <option value="10">10</option>
          </select>
          <label htmlFor="limit-select">Results per page</label>
        </div>
      )}
    </div>
  );
};

export default Searchbar;
