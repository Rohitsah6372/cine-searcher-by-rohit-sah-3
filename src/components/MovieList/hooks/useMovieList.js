import { useEffect, useState } from "react";

import { DEFAULT_PAGE_INDEX } from "components/constants";
import useDebounce from "hooks/useDebounce";
import { useSearchedMovie } from "hooks/useQuery/useMovieApi";
import useQueryParams from "hooks/useQueryParams";
import { useHistory } from "react-router-dom";
import routes from "routes";
import { buildUrl } from "utils/url";

import usefilterMovie from "./useFilterMovie";

import updateUrlWithPage from "../utils/updateUrlWithPage";

export const useMovieList = ({
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
    if (page) setCurrentPageNumber(Number(page));
  }, [page, setCurrentPageNumber]);

  useEffect(() => {
    routerHistory.replace(buildUrl(routes.root, {}));
  }, []);

  const {
    data: { search: movieList = [], totalResults: totalMovieCount } = {},
    isLoading,
    isError,
  } = useSearchedMovie(debouncedSearchKey, currentPageNumber);

  const newMovieList = usefilterMovie(movieList, year, movieType);

  const handlePageNavigation = newPage => {
    updateUrlWithPage(
      debouncedSearchKey,
      newPage,
      setIsPageChanging,
      routerHistory,
      movieType,
      year
    );
  };

  return {
    isLoading,
    isError,
    newMovieList,
    totalMovieCount,
    handlePageNavigation,
    isPageChanging,
  };
};
