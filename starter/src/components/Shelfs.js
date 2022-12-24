import Books from "./Books"
const Shelf=({books,shelfType}) => {
    const booksOnShelf = books.filter((b)=> b.shelf === shelfType)
    return (
        <div className="bookshelf">
        <h2 className="bookshelf-title">Currently Reading</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">{booksOnShelf.map((book)=>(
            <Books key={book.id} books={book} />
          

         ))}
        </ol>
        </div>
        </div>

    )

    }


export default Shelf