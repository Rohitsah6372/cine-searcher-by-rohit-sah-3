import { Header } from "components/commons";
import { isEmpty, pick } from "ramda";
import useFavouritStore from "stores/useFavouriteStore";

import FavouriteItem from "./FavouriteItem";

const Favourites = () => {
  const { favouriteList } = useFavouritStore(state =>
    pick(["favouriteList"], state)
  );

  return (
    <div className="flex min-h-screen w-screen flex-col bg-gray-50 text-gray-800">
      <div className="flex h-16 items-center bg-white px-4 shadow-md">
        <Header />
      </div>
      <div className="flex flex-1 items-start justify-center px-4 py-6">
        <div className="outline-none h-[80vh] w-full max-w-4xl overflow-y-auto rounded-xl bg-gray-50 p-6 shadow-none ">
          {!isEmpty(favouriteList) ? (
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
