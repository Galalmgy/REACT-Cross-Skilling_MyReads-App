
const Books = ({books,shelfType})=>{
  const changeShelf= (e) => {
    e.preventDefault();
    shelfType(books,e.target.value)
  };
 // let smallThumbnail = books.imageLinks.smallThumbnail.isExist

    return (
        <li>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage:
                books.imageLinks ?
                  `url(${books.imageLinks.smallThumbnail})`:"",
              }}
            ></div>
            <div className="book-shelf-changer">
              <select onChange={changeShelf} value={books.shelf}>
                <option disabled>
                  Move to...
                </option>
                <option value="currentlyReading">
                  Currently Reading
                </option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{books.title}</div>
          <div className="book-authors">{books.authors}</div>
        </div>
      </li>
    
        )
}
export default Books;