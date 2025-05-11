import { useState } from "react";

import { DEFAULT_PAGE_INDEX } from "components/constants";

import Header from "./commons/Header";
import MovieList from "./MovieList";
import SearchBar from "./SearchBar";
import ViewHistory from "./ViewHistory";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPageNumber, setCurrentPageNumber] =
    useState(DEFAULT_PAGE_INDEX);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div>
      <div className="flex h-auto items-center bg-white p-1 shadow-md">
        <Header />
      </div>
      <div className="flex w-full flex-1 overflow-hidden">
        <div className="flex-1 overflow-hidden shadow-xl">
          <SearchBar
            setCurrentPageNumber={setCurrentPageNumber}
            setIsFilterOpen={setIsFilterOpen}
            onChange={setSearchTerm}
          />
          <MovieList
            currentPageNumber={currentPageNumber}
            isFilterOpen={isFilterOpen}
            searchTerm={searchTerm}
            setCurrentPageNumber={setCurrentPageNumber}
            setIsFilterOpen={setIsFilterOpen}
          />
        </div>
        <div className="w-3/12 overflow-y-auto border-4 border-gray-200 bg-white">
          <ViewHistory />
        </div>
      </div>
    </div>
  );
};

export default Home;
