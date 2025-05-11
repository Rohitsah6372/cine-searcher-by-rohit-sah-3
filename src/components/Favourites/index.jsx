import { Header } from "components/commons";
import useFavouritStore from "stores/useFavouriteStore";

import FavouriteItem from "./FavouriteItem";

const Favourites = () => {
  const { favouriteList } = useFavouritStore();

  console.log("Fav List", favouriteList.length);

  return (
    <div className="flex min-h-screen w-screen flex-col bg-gray-50 text-gray-800">
      <div className="sticky top-0 z-10 bg-white shadow-sm">
        <Header />
      </div>
      <div className="flex flex-1 items-start justify-center px-4 py-6">
        <div className="h-[80vh] w-full max-w-4xl overflow-y-auto rounded-xl bg-white p-6 shadow-lg">
          {favouriteList.length > 0 ? (
            <>
              <h1 className="mb-4 pl-4 text-2xl font-semibold text-gray-700">
                Your Favourite Movies ({favouriteList.length})
              </h1>
              {favouriteList.map(({ imdbId: id, ...details }) => (
                <FavouriteItem key={id} {...{ details }} />
              ))}
            </>
          ) : (
            <div className="text-center text-lg text-gray-600">
              No favourites added yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Favourites;
