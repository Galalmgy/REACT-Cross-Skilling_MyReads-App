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
  };

  const [query,setQuery] = useState("");
  const [booksFound,setBooksFound]=useState([]);
  const [searchState,setSearchState] = useState(false);
    
  const handleSearch = async (query)=>{
    
    setQuery(query); 
    setSearchState(true)     
    //console.log("query returned is:",query)
    
    if (query === "" ){ setBooksFound([]) }else {searchBook(query)};
  
  }
  const searchBook = async (query)=> {
   
    //try {
      
      const res = await  BooksAPI.search(query)
      /*console.log(query)
      console.log("Server response is:",res)
      console.log("Server response length is:",res.length)*/
      if (res.length > 0){
        
        setBooksFound(res.map((item)=>{
          item.shelf='none'
          let bookExist = books.find((book)=> book.id === item.id);
          console.log(bookExist)
          if (bookExist) {
            item.shelf = bookExist.shelf
             console.log(bookExist.shelf)
           }
          //console.log(item);
          return item;
        }
        ))
        //return
        //
          //console.log("returned response=",res)
      } else {
        console.log("No books Found");
        //setSearchState(false);
        return setBooksFound([]);

      // console.log("No books Found")}
      // if (searchState=== false) {
       }     
//        return(setBooksFound) 
      
        //b.id === booksFound.id ? b.shelf=booksFound.shelf : b.shelf=""
     //
    
   /*  
    catch  { 
      setSearchState(false)
      console.log("No books Found")
      return setBooksFound( `No books found with this name: "${query}"`)
  }*/
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
          searchState ={searchState}
          search={handleSearch}
          books={booksFound}
          query={query}
          shelfType={shelfType}
          setQuery={setQuery}
          navigate={useNavigate}
          />}
    />
  
    </Routes>
    );
}

export default App;
