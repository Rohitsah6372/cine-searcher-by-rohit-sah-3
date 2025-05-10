import { create } from "zustand";
import { persist } from "zustand/middleware";

const useFavouritStore = create(
  persist(
    (set, get) => ({
      favouriteList: [],
      isMoviePresentInFavourite: movieId => {
        const { favouriteList } = get();

        return favouriteList.some(item => item.id === movieId);
      },
      addMovie: movieDetails =>
        set(({ favouriteList }) => {
          const exists = favouriteList.some(
            item => item.id === movieDetails.imdbId
          );
          if (exists) return { favouriteList };

          return {
            favouriteList: [
              { id: movieDetails.imdbId, ...movieDetails },
              ...favouriteList,
            ],
          };
        }),

      removeMovie: movieDetails =>
        set(({ favouriteList }) => ({
          favouriteList: favouriteList.filter(
            item => item.id !== movieDetails.imdbId
          ),
        })),
    }),
    { name: "favourite-store" }
  )
);

export default useFavouritStore;
