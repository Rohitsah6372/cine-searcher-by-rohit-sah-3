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
  const [year, setYear] = useState("");
  const [movieType, setMovieType] = useState({
    Movie: false,
    Series: false,
  });

  const handleFilterChange = (newYear, newMovieType) => {
    setYear(newYear);
    setMovieType(newMovieType);
  };

  return (
    <div className="flex h-screen flex-col bg-gradient-to-r from-indigo-50 to-purple-100">
      <div className="flex h-16 items-center bg-white px-4 shadow-md">
        <Header />
      </div>
      <div className="flex flex-1 overflow-hidden">
        <div className="flex flex-1 flex-col overflow-hidden px-4 py-2">
          <div className="mb-4 rounded-md bg-white p-1 shadow">
            <SearchBar
              isFilterOpen={isFilterOpen}
              movieType={movieType}
              setCurrentPageNumber={setCurrentPageNumber}
              setIsFilterOpen={setIsFilterOpen}
              setMovieType={setMovieType}
              setYear={setYear}
              year={year}
              onChange={setSearchTerm}
              onFilterChange={handleFilterChange}
            />
          </div>
          <div className="flex-1 overflow-hidden rounded-md bg-white">
            <MovieList
              currentPageNumber={currentPageNumber}
              isFilterOpen={isFilterOpen}
              movieType={movieType}
              searchTerm={searchTerm}
              setCurrentPageNumber={setCurrentPageNumber}
              setIsFilterOpen={setIsFilterOpen}
              year={year}
            />
          </div>
        </div>
        <div className="w-80 overflow-y-auto border-l border-gray-300 bg-white p-3 shadow-inner">
          <ViewHistory />
        </div>
      </div>
    </div>
  );
};

export default Home;
