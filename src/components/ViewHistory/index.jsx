import { useEffect, useRef, useState } from "react";

import { Typography } from "neetoui";
import { isEmpty, pick } from "ramda";
import { useTranslation } from "react-i18next";
import useMoviesStore from "stores/useMovieStore";

import ClearAllAlert from "./ClearAllAlert";
import Item from "./Item";

const ViewHistory = () => {
  const { t } = useTranslation();
  const { moviesStore, selectedMovieId } = useMoviesStore(state =>
    pick(["moviesStore", "selectedMovieId"], state)
  );
  const [isClearAllAlertOpen, setIsClearAllAlertOpen] = useState(false);

  const movieItemRefs = useRef({});

  useEffect(() => {
    if (selectedMovieId && movieItemRefs.current[selectedMovieId]) {
      movieItemRefs.current[selectedMovieId].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [selectedMovieId]);

  return (
    <div className="max-h-[400px] overflow-y-auto">
      <div className="flex items-center justify-between p-4">
        <Typography className="font-bold">{t("viewHistoryTitle")}</Typography>
        <Typography
          className="cursor-pointer text-xs font-bold text-gray-500 hover:text-red-600"
          onClick={() => setIsClearAllAlertOpen(true)}
        >
          {t("clearAll")}
        </Typography>
      </div>
      {!isEmpty(moviesStore) ? (
        moviesStore
          .filter(Boolean)
          .map(({ title, imdbId }) => (
            <Item
              id={imdbId}
              key={imdbId}
              ref={el => (movieItemRefs.current[imdbId] = el)}
              selectedMovieId={selectedMovieId}
              title={title}
            />
          ))
      ) : (
        <Typography className="p-4 text-center text-gray-500">
          {t("noHistoryAvailable")}
        </Typography>
      )}
      <ClearAllAlert
        closeModal={() => setIsClearAllAlertOpen(false)}
        isOpen={isClearAllAlertOpen}
      />
    </div>
  );
};

export default ViewHistory;
