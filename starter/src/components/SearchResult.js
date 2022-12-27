import Books from "./Books";
const SearchResult = ({ books, shelfType, query, searchState }) => {
  if (!searchState || query === "") {
    return "";
  } else {
    if (!books.length) {
      return <span>{`No books found with this name "${query}"`}</span>;
    }
  }

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">Add a book</h2>
      <div className="bookshelf-books">
        {/*console.log("SearchResults Component is:", books)*/}
        {/*console.log("Search State is:",searchState)*/}
        <ol className="books-grid">
          {searchState === true && query !== ""
            ? books.map((book) => (
                <Books key={book.id} books={book} shelfType={shelfType} />
              ))
            : books}
        </ol>
      </div>
    </div>
  );
};
export default SearchResult;
