import { isEmpty } from "ramda";

const usefilterMovie = (movieList, year, { Movie: movie, Series: series }) => {
  let filteredList = movieList;

  if (!isEmpty(year)) {
    filteredList = movieList.filter(item => item.year === year);
  }

  console.log("useFilte");

  if (movie && !series) {
    filteredList = filteredList.filter(item => item.type === "movie");
  } else if (!movie && series) {
    filteredList = filteredList.filter(item => item.type === "series");
  }

  return filteredList;
};

export default usefilterMovie;
