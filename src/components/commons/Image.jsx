import { DEFAULT_IMG_URL } from "constants";

import { useTranslation } from "react-i18next";

const Image = ({ title, poster: posterUrl }) => {
  const { t } = useTranslation();

  const fallbackPosterUrl = DEFAULT_IMG_URL;

  const handleImageError = event => {
    event.target.onerror = null;
    event.target.src = fallbackPosterUrl;
  };

  return (
    <img
      alt={t("moviePosterAlt", { title })}
      className="h-60 w-44"
      src={posterUrl}
      onError={handleImageError}
    />
  );
};

export default Image;
