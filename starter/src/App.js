import "./App.css";
import { useEffect, useState} from "react";
import Search from "./components/Search";
import Home from "./components/Home"
import { useNavigate,Route , Routes } from "react-router-dom";
import * as BooksAPI from "./BooksAPI"


const App =() =>{
  useNavigate();
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
  const [booksFound,setBooksFound]=useState([]);
    
  const handleSearch = async (query)=>{
    setQuery(query);      
      console.log("query is:",query)
    searchBook(query);
  
  }
  const searchBook = async (query)=> {
    try {
      const res = await  BooksAPI.search(query)
      console.log("response is:",res)
      setBooksFound(res.map((b)=>{
        b.id === booksFound.id ? b.shelf=booksFound.shelf : b.shelf=""
      return b
      }
       ))
  console.log("returned response=",res)
    }
   
   // if (res && !res.error){
               
    catch {
      return  `No books with this name: "${query}"`}

  }  

    
        

    
          
         
  
 

  // const updateQuery = (query) => {
  // setQuery(query.trim());
  // }
  // const clearQuery= () =>{
  // updateQuery("");
  // }

    
  

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
          books={booksFound}
          shelfType={shelfType}
          setQuery={setQuery}
          navigate={useNavigate}
          />}
    />
  
    </Routes>
    );
}

export default App;
