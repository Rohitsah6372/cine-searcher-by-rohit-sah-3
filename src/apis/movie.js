import axios from "axios";

const fetch = (searchTerm, currentPage) =>
  axios.get("/", {
    params: {
      s: searchTerm,
      page: currentPage,
    },
  });

const show = imbdId =>
  axios.get("/", {
    params: {
      i: imbdId,
    },
  });

const moviesApi = { fetch, show };

export default moviesApi;
