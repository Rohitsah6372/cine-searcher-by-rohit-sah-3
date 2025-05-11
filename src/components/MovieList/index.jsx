import { useEffect, useState } from "react";

import { Pagination } from "@bigbinary/neetoui";
import { ErrorMessage, PageLoader } from "components/commons";
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "components/constants";
import useDebounce from "hooks/useDebounce";
import useFilterMovie from "hooks/useFilterMovie";
import { useSearchedMovie } from "hooks/useQuery/useMovieApi";
import useQueryParams from "hooks/useQueryParams";
import { useHistory } from "react-router-dom";
import routes from "routes";
import { buildUrl } from "utils/url";

import FilterList from "./FilterList";
import MovieData from "./MovieData";

const MovieList = ({
  searchTerm,
  currentPageNumber,
  setCurrentPageNumber,
  isFilterOpen,
  setIsFilterOpen,
}) => {
  const [isPageChanging, setIsPageChanging] = useState(false);
  const [year, setYear] = useState("");
  const [movieType, setMovieType] = useState({
    Movie: false,
    Series: false,
  });

  const debouncedSearchKey = useDebounce(searchTerm);

  const { page = DEFAULT_PAGE_INDEX, type, year: yearParam } = useQueryParams();
  const routerHistory = useHistory();

  useEffect(() => {
    if (page) {
      setCurrentPageNumber(Number(page));
    }
  }, [page, setCurrentPageNumber]);

  useEffect(() => {
    if (type) {
      const types = type.split(",");
      setMovieType({
        Movie: types.includes("movie"),
        Series: types.includes("series"),
      });
    }
  }, [type]);

  useEffect(() => {
    if (yearParam) {
      setYear(yearParam);
    }
  }, [yearParam]);

  const handleFilterChange = (newYear, newMovieType) => {
    const types = [];
    if (newMovieType.Movie) types.push("movie");

    if (newMovieType.Series) types.push("series");

    const queryParams = {
      page: DEFAULT_PAGE_INDEX,
      pageSize: DEFAULT_PAGE_SIZE,
    };

    if (types.length > 0) queryParams.type = types.join(",");

    if (newYear) queryParams.year = newYear;

    routerHistory.replace(buildUrl(routes.root, queryParams));
  };

  const {
    data: { search: movieList = [], totalResults: totalMovieCount } = {},
    isLoading,
    isError,
  } = useSearchedMovie(debouncedSearchKey, currentPageNumber);

  const newMovieList = useFilterMovie(movieList, year, movieType);

  const handlePageNavigation = page => {
    setIsPageChanging(true);
    routerHistory.replace(
      buildUrl(routes.root, {
        page,
        pageSize: DEFAULT_PAGE_SIZE,
        type:
          movieType.Movie || movieType.Series
            ? `${movieType.Movie ? "movie" : ""}${
                movieType.Movie && movieType.Series ? "," : ""
              }${movieType.Series ? "series" : ""}`
            : undefined,
        year: year || undefined,
      })
    );

    setTimeout(() => {
      setIsPageChanging(false);
    }, 400);
  };

  if (isLoading || isPageChanging) return <PageLoader />;

  if (isError) return <ErrorMessage />;

  return (
    <div className="relative flex h-screen flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      <div>
        {isFilterOpen && (
          <FilterList
            initialMovieType={movieType}
            initialYear={year}
            setIsFilterOpen={setIsFilterOpen}
            setMovieType={setMovieType}
            setYear={setYear}
            onFilterChange={handleFilterChange}
          />
        )}
      </div>
      <div className="flex-1 overflow-y-auto px-4">
        <MovieData movieList={newMovieList} />
      </div>
      <div className="mb-12 flex items-center justify-center border-t-4 pt-1">
        <Pagination
          count={totalMovieCount}
          navigate={page => handlePageNavigation(page)}
          pageNo={currentPageNumber || DEFAULT_PAGE_INDEX}
          pageSize={DEFAULT_PAGE_SIZE}
        />
      </div>
    </div>
  );
};

export default MovieList;
