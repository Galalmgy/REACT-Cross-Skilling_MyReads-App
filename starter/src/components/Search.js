
import {Link} from "react-router-dom"
import SearchResult from "./SearchResult"

const Search = ({showSearchPage,setShowSearchpage,search,books,shelfType,setQuery,navigate}) =>{
    return (
    <div className="search-books">
    <div className="search-books-bar">
      <Link to="/"
        className="close-search"
        onClick={() => {
          setShowSearchpage(!showSearchPage);
          navigate("/")
        }}
      >
        Close
      </Link>
      <div className="search-books-input-wrapper">
        <input
          type="text"
          placeholder="Search by title, author, or ISBN"
          onChange={search}
          
        />
      </div>
    </div>
    <div className="search-books-results">
      <ol className="books-grid">{
        /*<SearchResult books={books} shelfType={shelfType} />*/}
      </ol>
    </div>
  </div>)
}
export default Search