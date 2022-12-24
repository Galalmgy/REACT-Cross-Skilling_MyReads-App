import { useEffect } from "react"
import {Link} from "react-router-dom"
import Books from "./Books"

const Home = ({showSearchPage,setShowSearchpage, books})=>{

    return (
<div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
          <Books />
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