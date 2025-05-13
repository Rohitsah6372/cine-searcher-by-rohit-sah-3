import { Checkbox, Typography } from "neetoui";
import { useTranslation } from "react-i18next";

const MovieTypeCheckboxes = ({ movieType, onChange }) => {
  const { t } = useTranslation();

  return (
    <div className="transform transition-all duration-200 hover:scale-[1.02]">
      <Typography className="mb-4 text-lg font-semibold text-gray-800">
        {t("type")}
      </Typography>
      <div className="flex space-x-8">
        <Checkbox
          checked={movieType.Movie}
          label={t("movie")}
          name="movie"
          onChange={() => onChange(true)}
        />
        <Checkbox
          checked={movieType.Series}
          label={t("series")}
          name="series"
          onChange={() => onChange(false)}
        />
      </div>
    </div>
  );
};

export default MovieTypeCheckboxes;
