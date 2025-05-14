import { create } from "zustand";
import { persist } from "zustand/middleware";

const useMoviesStore = create(
  persist(
    set => ({
      selectedMovieId: null,
      moviesStore: [],
      setMoviesStore: movies => set({ moviesStore: movies }),
      setSelectedMovieId: id => set({ selectedMovieId: id }),
      removeAll: () => set({ moviesStore: [] }),
      removeMovie: id =>
        set(({ moviesStore, selectedMovieId }) => {
          const updatedMoviesStore = moviesStore.filter(
            movie => movie.imdbId !== id
          );

          let newSelectedMovieId = selectedMovieId;
          if (id === selectedMovieId) {
            const currentIndex = moviesStore.findIndex(
              movie => movie.imdbId === id
            );
            if (currentIndex > 0) {
              newSelectedMovieId = moviesStore[currentIndex - 1].imdbId;
            } else if (updatedMoviesStore.length > 0) {
              newSelectedMovieId = updatedMoviesStore[0].imdbId;
            } else {
              newSelectedMovieId = null;
            }
          }

          return {
            moviesStore: updatedMoviesStore,
            selectedMovieId: newSelectedMovieId,
          };
        }),
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
    }),
    { name: "movie-store" }
  )
);

export default useMoviesStore;
