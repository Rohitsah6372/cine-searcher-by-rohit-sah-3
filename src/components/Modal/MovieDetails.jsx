import { Image } from "components/commons";
import { RatingFilled } from "neetoicons";
import { Button, Typography } from "neetoui";
import { pick } from "ramda";
import { useTranslation } from "react-i18next";
import useFavouritStore from "stores/useFavouriteStore";

import Genres from "./Genres";

const MovieDetails = ({ movieDetails }) => {
  const { isMoviePresentInFavourite, addMovie, removeMovie } = useFavouritStore(
    state =>
      pick(["isMoviePresentInFavourite", "addMovie", "removeMovie"], state)
  );

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

  const movieInfo = {
    director,
    actor: actors,
    boxOffice: boxoffice,
    year,
    runtime,
    language,
    rated,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center ">
        <Typography className="text-2xl font-semibold text-gray-800">
          {title}
        </Typography>
        <Button
          icon={RatingFilled}
          style="tertiary"
          className={`ml-2 rounded-full bg-transparent p-2 ${
            isMoviePresentInFavourite(imdbId)
              ? " text-yellow-400"
              : "text-gray-600"
          } transition hover:bg-transparent`}
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
            {Object.entries(movieInfo).map(([key, value]) => (
              <Typography className="text-sm" key={key}>
                <span className="font-semibold text-gray-800">{t(key)}:</span>{" "}
                {value}
              </Typography>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
