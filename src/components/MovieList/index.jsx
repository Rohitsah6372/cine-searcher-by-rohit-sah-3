import { useEffect, useRef, useState } from "react";

import { Input } from "@bigbinary/neetoui";
import { ErrorMessage, PageLoader } from "components/commons";
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "components/constants";
import SearchBar from "components/SearchBar";
import useDebounce from "hooks/useDebounce";
import usefilterMovie from "hooks/useFilterMovie";
import { useSearchedMovie } from "hooks/useQuery/useMovieApi";
import useQueryParams from "hooks/useQueryParams";
import { Filter, Search } from "neetoicons";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import routes from "routes";
import { buildUrl } from "utils/url";

import FilterList from "./FilterList";
import MovieData from "./MovieData";

const MovieList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchKey = useDebounce(searchTerm);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [year, setYear] = useState("");
  const [movieType, setMovieType] = useState({
    Movie: false,
    Series: false,
  });

  const [currentPageNumber, setCurrentPageNumber] =
    useState(DEFAULT_PAGE_INDEX);

  const { t } = useTranslation();

  const { page = DEFAULT_PAGE_INDEX, type, year: yearParam } = useQueryParams();

  const routerHistory = useHistory();
  const autoInputRef = useRef(null);

  useEffect(() => {
    if (page) {
      setCurrentPageNumber(Number(page));
    }
  }, [page]);

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

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === "/") {
        event.preventDefault();
        autoInputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

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
    data: { search: movieList = [] } = {},
    isLoading,
    isError,
  } = useSearchedMovie(debouncedSearchKey, currentPageNumber);

  if (isLoading) return <PageLoader />;

  if (isError) return <ErrorMessage />;

  const newMovieList = usefilterMovie(movieList, year, movieType);

  return (
    <div className="relative flex h-screen flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      <SearchBar
        actionBlock={
          <>
            <Input
              className="mx-2 rounded-md border-[#ddd] bg-white p-2"
              placeholder={t("searchPlaceholder")}
              prefix={<Search />}
              ref={autoInputRef}
              type="Search"
              value={searchTerm}
              onChange={e => {
                setSearchTerm(e.target.value);
                setCurrentPageNumber(DEFAULT_PAGE_INDEX);
              }}
            />
            <button onClick={() => setIsFilterOpen(prev => !prev)}>
              <Filter className="outline-none mr-1 border-none border-[#ddd] p-0.5 hover:text-green-700" />
            </button>
          </>
        }
      />
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
    </div>
  );
};

export default MovieList;
