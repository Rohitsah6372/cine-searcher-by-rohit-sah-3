import { Image } from "components/commons";
import { Favorite } from "neetoicons";
import { Button, Typography } from "neetoui";
import { useTranslation } from "react-i18next";
import useFavouritStore from "stores/useFavouriteStore";

import Genres from "./Genres";

const MovieDetails = ({ movieDetails }) => {
  const { isMoviePresentInFavourite, addMovie, removeMovie } =
    useFavouritStore();
  const { t } = useTranslation();

  const {
    title,
    genre: genres,
    poster,
    plot,
    director,
    actors,
    boxoffice,
    year,
    runtime,
    language,
    rated,
    imdbId,
  } = movieDetails || {};

  return (
    <div className="space-y-6">
      <div className="flex items-center ">
        <Typography className="text-2xl font-semibold text-gray-800">
          {title}
        </Typography>
        <Button
          icon={Favorite}
          style={isMoviePresentInFavourite(imdbId) ? "danger" : "tertiary"}
          className={`ml-4 rounded-full p-2 ${
            isMoviePresentInFavourite(imdbId)
              ? "bg-red-400 text-red-600"
              : "bg-gray-100 text-gray-600"
          } transition hover:bg-gray-200`}
          tooltipProps={{
            content: t(
              isMoviePresentInFavourite(imdbId)
                ? "removeFromFavourite"
                : "addToFavourite"
            ),
            position: "right",
          }}
          onClick={() =>
            isMoviePresentInFavourite(imdbId)
              ? removeMovie(movieDetails)
              : addMovie(movieDetails)
          }
        />
      </div>
      <Genres {...{ genres }} />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="col-span-1">
          <Image
            {...{ title, poster }}
            className="h-auto w-full rounded-xl shadow-md"
          />
        </div>
        <div className="col-span-2 space-y-4 text-gray-600">
          <Typography className="text-base leading-relaxed">{plot}</Typography>
          <div className="space-y-2">
            <Typography className="text-sm">
              <span className="font-semibold text-gray-800">
                {t("director")}:
              </span>{" "}
              {director}
            </Typography>
            <Typography className="text-sm">
              <span className="font-semibold text-gray-800">{t("actor")}:</span>{" "}
              {actors}
            </Typography>
            <Typography className="text-sm">
              <span className="font-semibold text-gray-800">
                {t("boxOffice")}:
              </span>{" "}
              {boxoffice}
            </Typography>
            <Typography className="text-sm">
              <span className="font-semibold text-gray-800">{t("year")}:</span>{" "}
              {year}
            </Typography>
            <Typography className="text-sm">
              <span className="font-semibold text-gray-800">
                {t("runtime")}:
              </span>{" "}
              {runtime}
            </Typography>
            <Typography className="text-sm">
              <span className="font-semibold text-gray-800">
                {t("language")}:
              </span>{" "}
              {language}
            </Typography>
            <Typography className="text-sm">
              <span className="font-semibold text-gray-800">{t("rated")}:</span>{" "}
              {rated}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
