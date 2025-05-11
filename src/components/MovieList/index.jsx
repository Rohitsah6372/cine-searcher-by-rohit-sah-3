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

import MovieData from "./MovieData";

const MovieList = ({
  searchTerm,
  currentPageNumber,
  setCurrentPageNumber,

  year,
  movieType,
}) => {
  const [isPageChanging, setIsPageChanging] = useState(false);

  const debouncedSearchKey = useDebounce(searchTerm);

  const { page = DEFAULT_PAGE_INDEX } = useQueryParams();
  const routerHistory = useHistory();

  useEffect(() => {
    if (page) {
      setCurrentPageNumber(Number(page));
    }
  }, [page, setCurrentPageNumber]);

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
    <div className="flex h-full flex-col items-center justify-center overflow-hidden">
      <div className="flex-1 overflow-y-auto rounded-md bg-white px-6 py-4 ">
        <MovieData movieList={newMovieList} />
      </div>
      <div className="border-t bg-white px-4 py-3 shadow">
        <Pagination
          count={totalMovieCount}
          navigate={handlePageNavigation}
          pageNo={currentPageNumber || DEFAULT_PAGE_INDEX}
          pageSize={DEFAULT_PAGE_SIZE}
        />
      </div>
    </div>
  );
};

export default MovieList;
