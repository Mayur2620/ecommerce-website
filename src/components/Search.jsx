import "./Search.css";

const Search = ({
  searchTerm,
  setSearchTerm,
}) => {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search for products..."
        className="search-input"
        value={searchTerm}
        onChange={(e) =>
          setSearchTerm(
            e.target.value
          )
        }
      />
    </div>
  );
};

export default Search;