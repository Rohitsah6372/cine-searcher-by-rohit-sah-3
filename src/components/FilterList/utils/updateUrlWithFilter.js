const updateUrlWithFilter = (year, movieType, history, searchTerm) => {
  const queryParams = new URLSearchParams(history.location.search);

  if (year) {
    queryParams.set("year", year);
  } else {
    queryParams.delete("year");
  }

  if (searchTerm) {
    queryParams.set("search", searchTerm);
  }

  const isMovie = !!movieType.Movie;
  const isSeries = !!movieType.Series;

  if (isMovie && !isSeries) {
    queryParams.set("movieType", "Movie");
  } else if (!isMovie && isSeries) {
    queryParams.set("movieType", "Series");
  } else {
    queryParams.delete("movieType");
  }

  history.push({
    pathname: history.location.pathname,
    search: queryParams.toString(),
  });
};

export default updateUrlWithFilter;
