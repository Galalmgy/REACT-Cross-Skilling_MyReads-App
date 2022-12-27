import "./App.css";
import { useEffect, useState } from "react";
import Search from "./components/Search";
import Home from "./components/Home";
import { useNavigate, Route, Routes } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";

const App = () => {
  useNavigate();
  const [showSearchPage, setShowSearchpage] = useState(false);

  const [books, setBooks] = useState([]);
  useEffect(() => {
    const getBooks = async () => {
      const res = await BooksAPI.getAll();
      setBooks(res);
    };

    getBooks();
  }, []);

  const shelfType = async (book, shelf) => {
    await BooksAPI.update(book, shelf);
    const res = await BooksAPI.getAll();
    setBooks(res);
  };

  const [query, setQuery] = useState("");
  const [booksFound, setBooksFound] = useState([]);
  const [searchState, setSearchState] = useState(false);

  const handleSearch = async (query) => {
    setQuery(query);
    setSearchState(true);

    if (query === "") {
      setBooksFound([]);
    } else {
      searchBook(query);
    }
  };
  const searchBook = async (query) => {
    const res = await BooksAPI.search(query);

    if (res.length > 0) {
      setBooksFound(
        res.map((item) => {
          item.shelf = "none";
          let bookExist = books.find((book) => book.id === item.id);
          console.log(bookExist);
          if (bookExist) {
            item.shelf = bookExist.shelf;
            console.log(bookExist.shelf);
          }

          return item;
        })
      );
    } else {
      console.log("No books Found");
      //setSearchState(false);
      return setBooksFound([]);
    }
  };

  return (
    <Routes>
      <Route
        exact
        path="/"
        element={
          <Home
            books={books}
            showSearchPage={showSearchPage}
            setShowSearchpage={setShowSearchpage}
            shelfType={shelfType}
          />
        }
      />
      <Route
        path="/search"
        element={
          <Search
            showSearchPage={showSearchPage}
            setShowSearchpage={setShowSearchpage}
            searchState={searchState}
            search={handleSearch}
            books={booksFound}
            query={query}
            shelfType={shelfType}
            setQuery={setQuery}
            navigate={useNavigate}
          />
        }
      />
    </Routes>
  );
};

export default App;
