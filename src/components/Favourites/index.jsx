import { Header } from "components/commons";
import useFavouritStore from "stores/useFavouriteStore";

import FavouriteItem from "./FavouriteItem";

const Favourites = () => {
  const { favouriteList } = useFavouritStore();

  return (
    <div className="h-screen w-screen overflow-hidden ">
      <div className="flex h-auto items-center bg-white p-1 shadow-md">
        <Header />
      </div>
      <div className="flex h-screen w-screen justify-center p-4">
        <div className="h-4/5 w-3/5 overflow-y-auto bg-white">
          {favouriteList.map(({ imdbId: id, ...details }) => (
            <FavouriteItem key={id} {...{ details }} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favourites;
