import {Link} from "react-router-dom"
import Shelfs from "./Shelfs"


const Home = ({showSearchPage,setShowSearchpage, books, shelfType})=>{

    return (
<div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
          <Shelfs shelfType={shelfType} books={books} shelf="currentlyReading" shelfName="Currently Reading"/>
          <Shelfs shelfType={shelfType} books={books} shelf="wantToRead" shelfName="Want to Read"/>
          <Shelfs shelfType={shelfType} books={books} shelf="read" shelfName="Read" />
          </div>
          <div >
      <Link to="/search" className="open-search"
        onClick={() => setShowSearchpage(!showSearchPage)}>
        Add a book
      
      </Link>
          
        
          
          </div>
        </div>
    )
}
export default Home