import "./App.css";
import { useEffect, useState} from "react";
import Search from "./components/Search";
import Home from "./components/Home"
import { useNavigate,Route , Routes } from "react-router-dom";
import * as BooksAPI from "./BooksAPI"


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
        <Search showSearchPage={showSearchPage} setShowSearchpage={setShowSearchpage}/>}
    />
  
    </Routes>
    );
}

export default App;
