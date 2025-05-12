import { DEFAULT_PAGE_SIZE } from "components/constants";
import routes from "routes";
import { buildUrl } from "utils/url";

const updateUrlWithPage = (
  debouncedSearchKey,
  page,
  setIsPageChanging,
  routerHistory,
  movieType,
  year
) => {
  setIsPageChanging(true);

  routerHistory.replace(
    buildUrl(routes.root, {
      search: debouncedSearchKey || undefined,
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

  setTimeout(() => setIsPageChanging(false), 700);
};

export default updateUrlWithPage;
