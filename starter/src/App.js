import "./App.css";
import { useEffect, useState} from "react";
import Search from "./components/Search";
import Home from "./components/Home"
import { useNavigate,Route , Routes } from "react-router-dom";
import * as BooksAPI from "./BooksAPI"


const App =() =>{
  let navigate = useNavigate();
  const [showSearchPage, setShowSearchpage] = useState(false);

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
    
  const handleSearch = async(e)=>{
      setQuery( e.target.value);
      searchBooks(query);
      console.log(query)
  
  }
 

  // const updateQuery = (query) => {
  // setQuery(query.trim());
  // }
  // const clearQuery= () =>{
  // updateQuery("");
  // }
  const searchBooks = async (query)=> {
    const res = await BooksAPI.search(query)
     //(res && !res.error)
      try{
        setBooks((res).map((booksFound)=>{
          booksFound.forEach((book)=>{
            if (booksFound.id === book.id) books.shelf=book.shelf
            console.log({books})
          })
          
        }))

      }catch {
        setBooks(`No books with this name: "${query}`)}

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
          search={handleSearch} 
          books={books}
          shelfType={shelfType}
          setQuery={setQuery}
          navigate={"navigate"}
          />}
    />
  
    </Routes>
    );
}

export default App;
