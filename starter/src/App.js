import "./App.css";
import { useEffect, useState} from "react";
import Search from "./components/Search";
import Home from "./components/Home"
import { useNavigate,Route , Routes } from "react-router-dom";
import * as BookAPI from "./BooksAPI"


const App =() =>{
  const [showSearchPage, setShowSearchpage] = useState(false);
   useNavigate("/");
  const [books,setBooks]= useState([]);
  useEffect(()=>{
    const getBooks =async()=>{
      const res = await BookAPI.getAll();
      setBooks(res)
    };

    getBooks();
  },[]);

  return (
    <Routes>
     <Route
      exact
      path="/"
      element={
        <Home books={books} showSearchPage={showSearchPage} setShowSearchpage={setShowSearchpage} />}
  
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
