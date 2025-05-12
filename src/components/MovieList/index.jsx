import { Pagination } from "@bigbinary/neetoui";
import { ErrorMessage, PageLoader } from "components/commons";
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "components/constants";

import { useMovieList } from "./hooks/useMovieList";
import MovieData from "./MovieData";

const MovieList = ({
  searchTerm,
  currentPageNumber,
  setCurrentPageNumber,
  year,
  movieType,
}) => {
  const {
    isLoading,
    isError,
    newMovieList,
    totalMovieCount,
    handlePageNavigation,
    isPageChanging,
  } = useMovieList({
    searchTerm,
    currentPageNumber,
    setCurrentPageNumber,
    year,
    movieType,
  });

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
