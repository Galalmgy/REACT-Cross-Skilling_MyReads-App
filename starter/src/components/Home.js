import { useEffect } from "react"
import {Link} from "react-router-dom"
import Books from "./Books"
import Shelfs from "./Shelfs"


const Home = ({showSearchPage,setShowSearchpage, books, shelfType})=>{

    return (
<div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
          <Shelfs shelfType={shelfType} books={books} shelf="Currently Reading" shelfName="Currently Reading"/>
          <Shelfs shelfType={shelfType} books={books} shelf="Want to Read" shelfName="Want to Read"/>
          <Shelfs shelfType={shelfType} books={books} shelf="Read" shelfName="Read" />
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