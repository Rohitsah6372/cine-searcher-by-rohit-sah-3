import { useState } from "react";

import { ErrorMessage, PageLoader } from "components/commons";
import { DEFAULT_PAGE_INDEX } from "components/constants";
import SearchBar from "components/SearchBar";
import useDebounce from "hooks/useDebounce";
import { useSearchedMovie } from "hooks/useQuery/useMovieApi";
import { Search } from "neetoicons";
import { Input } from "neetoui";

import MovieData from "./MovieData";

const MovieList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchKey = useDebounce(searchTerm);

  const [currentPageNumber, setCurrentPageNumber] =
    useState(DEFAULT_PAGE_INDEX);

  const {
    data: { search: movieList = [], totalResults: totalMovieCount } = {},
    isLoading,
    isError,
  } = useSearchedMovie(debouncedSearchKey, currentPageNumber);

  if (isLoading) return <PageLoader />;

  if (isError) return <ErrorMessage />;

  console.log(totalMovieCount);

  return (
    <div>
      <SearchBar
        actionBlock={
          <Input
            className="mx-2 rounded-md border-[#ddd] bg-white p-2"
            placeholder="Search Here"
            prefix={<Search />}
            type="Search"
            value={searchTerm}
            onChange={e => {
              setSearchTerm(e.target.value);
              setCurrentPageNumber(DEFAULT_PAGE_INDEX);
            }}
          />
        }
      />
      <div className="flex-1 overflow-y-auto px-4">
        <MovieData movieList={movieList} />
      </div>
    </div>
  );
};

export default MovieList;
