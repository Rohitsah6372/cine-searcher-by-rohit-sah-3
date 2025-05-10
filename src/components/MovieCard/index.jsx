import { Button, Typography } from "neetoui";
import { useTranslation } from "react-i18next";

import Image from "../commons/Image";

const MovieCard = ({ movie }) => {
  const { t } = useTranslation();

  const { title, year, poster, type } = movie;

  return (
    <div className="">
      <div
        className="bg-white-900 flex w-56
      flex-col items-center  justify-between rounded-xl p-4 shadow-2xl"
      >
        <div className="h-1/2 px-4">
          <Image {...{ title, poster }} />
        </div>
        <Typography className="inline-block w-40 truncate text-center font-bold">
          {title}
        </Typography>
        <Typography className="text-gray-500">
          {type === "movie" ? t("movie") : t("series")} - {year}
        </Typography>
        <Button
          className="neeto-ui-cursor-pointer neeto-ui-text-center  neeto-ui-shadow-sm m-1 text-blue-700"
          label={t("showMovieDetails")}
          style="tertiary"
        />
      </div>
    </div>
  );
};

export default MovieCard;
