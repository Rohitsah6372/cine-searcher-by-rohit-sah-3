import axios from "axios";
import { Toastr } from "neetoui";
import { keysToCamelCase } from "utils/objectFormatter";

const apikey = process.env.REACT_APP_OMDB_API_KEY;

const responseInterceptors = () => {
  axios.interceptors.response.use(
    response => {
      const { data } = response;

      if (data.Search) {
        return {
          ...data,
          search: data.Search.map(item => keysToCamelCase(item)),
        };
      }

      if (data.Response === "False") {
        Toastr.error(data.Error || "Something went wrong", {
          autoClose: 2000,
        });
      }

      return keysToCamelCase(data);
    },
    error => {
      Toastr.error("An unexpected error occurred", {
        autoClose: 2000,
      });

      return Promise.reject(error);
    }
  );
};

const setHttpHeaders = () => {
  axios.defaults.headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
};

const initializeAxios = () => {
  axios.defaults.baseURL = "https://www.omdbapi.com";
  axios.defaults.params = {};
  axios.defaults.params["apikey"] = apikey;
  setHttpHeaders();
  responseInterceptors();
};

export default initializeAxios;
