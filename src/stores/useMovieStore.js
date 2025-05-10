import { create } from "zustand";
import { persist } from "zustand/middleware";

const useMoviesStore = create(
  persist(
    set => ({
      selectedMovieId: null,
      moviesStore: [],
      removeMovie: id =>
        set(({ moviesStore }) => {
          console.log("id from movie Store : ", id);
          const updatedMoviesStore = moviesStore.filter(
            movie => movie.imdbId !== id
          );

          return { moviesStore: updatedMoviesStore };
        }),
      removeAll: () =>
        set(() => ({
          moviesStore: [],
        })),
      toggleInMovie: movie =>
        set(({ moviesStore }) => {
          const found = moviesStore.some(
            movieDetail => movieDetail.imdbId === movie.imdbId
          );

          return {
            moviesStore: found ? moviesStore : [movie, ...moviesStore],
            selectedMovieId: movie.imdbId,
          };
        }),
      // clearSelectedMovieId: () => set({ selectedMovieId: null }),
    }),
    { name: "movie-store" }
  )
);

export default useMoviesStore;
