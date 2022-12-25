import Books from "./Books"
const Shelfs=({books,shelfType,shelfName,shelf}) => {
    const booksOnShelf = books.filter((b)=> b.shelf === shelf)
    return (
        <div className="bookshelf">
        <h2 className="bookshelf-title">{shelfName}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">{booksOnShelf.map((book)=>(
            <Books key={book.id} books={book} shelfType={shelfType}/>
          

         ))}
        </ol>
        </div>
        </div>

    )

    }


export default Shelfs