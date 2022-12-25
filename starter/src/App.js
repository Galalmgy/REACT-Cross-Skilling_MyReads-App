import "./App.css";
import { useEffect, useState} from "react";
import Search from "./components/Search";
import Home from "./components/Home"
import { useNavigate,Route , Routes } from "react-router-dom";
import * as BooksAPI from "./BooksAPI"
import { forEach } from "spec";
import { handlers } from "reporter";


const App =() =>{

  const [showSearchPage, setShowSearchpage] = useState(false);
   useNavigate("/");
  const [books,setBooks]= useState([]);
  useEffect(()=>{
    const getBooks =async()=>{
      const res = await BooksAPI.getAll();
      setBooks(res)
    };

    getBooks();
  },[]);

  const shelfType= async(book,shelf) => {
    await BooksAPI.update(book,shelf);
    const res = await BooksAPI.getAll();
    setBooks(res)

  }
  const [query,setQuery] = useState("");
    
  const handlerSearch = async(e)=>{
      setQuery( e.target.value);
      searchBooks(query);
  
  }
 

  // const updateQuery = (query) => {
  // setQuery(query.trim());
  // }
  // const clearQuery= () =>{
  // updateQuery("");
  // }
  const searchBooks = async (query)=> {
    const res = await BooksAPI.search(query)
    if (res && !res.error){
      setBooks(res.map((booksFound)=>{
        res.forEach((book)=>{
          if (booksFound.id === book.id) booksFound.shelf=book.shelf
        })
        
      }))} else {
        setBooks(`No books with this name: "${query}`)
      }

      
    }
    
  

  return (
    <Routes>
     <Route
      exact
      path="/"
      element={
        <Home books={books} showSearchPage={showSearchPage} setShowSearchpage={setShowSearchpage} shelfType={shelfType} />}
  
    />
    <Route
      path="/search"
      element={
        <Search 
          showSearchPage={showSearchPage} 
          setShowSearchpage={setShowSearchpage} 
          search={handlerSearch} 
          books={books}
          shelfType={shelfType}
          />}
    />
  
    </Routes>
    );
}

export default App;
