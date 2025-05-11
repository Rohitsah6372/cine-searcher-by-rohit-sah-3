import { Form, Formik } from "formik";
import { Close } from "neetoicons";
import { Checkbox, Input, Typography } from "neetoui";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import routes from "routes";
import { buildUrl } from "utils/url";
import * as Yup from "yup";

const FilterList = ({
  setYear,
  setMovieType,
  setIsFilterOpen,
  onFilterChange,
  initialYear,
  initialMovieType,
}) => {
  const { t } = useTranslation();
  const history = useHistory();

  const yearSchema = Yup.object().shape({
    year: Yup.string()
      .required(t("yearRequired"))
      .matches(/^\d{4}$/, t("yearMustBeFourDigits"))
      .test("year-range", t("yearMustBeValid"), value => {
        if (!value) return false;
        const year = parseInt(value);
        const currentYear = new Date().getFullYear();

        return year >= 1900 && year <= currentYear;
      }),
  });

  const updateUrlWithFilters = (year, movieType) => {
    const type =
      movieType.Movie || movieType.Series
        ? `${movieType.Movie ? "movie" : ""}${
            movieType.Movie && movieType.Series ? "," : ""
          }${movieType.Series ? "series" : ""}`
        : undefined;

    history.replace(
      buildUrl(routes.root, {
        type,
        year: year || undefined,
      })
    );
  };

  return (
    <div className="outline-none w-full transform rounded-xl bg-white p-6 transition-all duration-300">
      <div className="mb-6 flex items-center justify-between border-b border-gray-100 pb-4">
        <Typography className="text-xl font-bold text-gray-800">
          {t("filters")}
        </Typography>
        <button
          className="rounded-full p-1.5 transition-all duration-200 hover:bg-red-50"
          onClick={() => setIsFilterOpen(prev => !prev)}
        >
          <Close className="h-5 w-5 text-gray-400 transition-colors duration-200 hover:text-red-500" />
        </button>
      </div>
      <Formik
        validateOnBlur
        validateOnChange
        initialValues={{ year: initialYear || "" }}
        validationSchema={yearSchema}
        onSubmit={values => {
          setYear(values.year);
          onFilterChange(values.year, initialMovieType);
          updateUrlWithFilters(values.year, initialMovieType);
        }}
      >
        {({ values, errors, handleChange, handleBlur }) => (
          <Form>
            <div className="space-y-8">
              <div className="transform transition-all duration-200 hover:scale-[1.02]">
                <Input
                  className="font-medium"
                  error={errors.year}
                  label={t("year")}
                  name="year"
                  placeholder={t("enterFourDigitYear")}
                  value={values.year}
                  onBlur={handleBlur}
                  onChange={e => {
                    const value = e.target.value;
                    if (value.length <= 4 && /^\d*$/.test(value)) {
                      handleChange(e);
                      setYear(value);
                      onFilterChange(value, initialMovieType);
                      updateUrlWithFilters(value, initialMovieType);
                    }
                  }}
                />
              </div>
              <div className="transform transition-all duration-200 hover:scale-[1.02]">
                <Typography className="mb-4 text-lg font-semibold text-gray-800">
                  {t("type")}
                </Typography>
                <div className="flex space-x-8">
                  <Checkbox
                    checked={initialMovieType.Movie}
                    label={t("movie")}
                    onChange={() => {
                      const newMovieType = {
                        ...initialMovieType,
                        Movie: !initialMovieType.Movie,
                      };
                      setMovieType(newMovieType);
                      onFilterChange(values.year, newMovieType);
                      updateUrlWithFilters(values.year, newMovieType);
                    }}
                  />
                  <Checkbox
                    checked={initialMovieType.Series}
                    label={t("series")}
                    onChange={() => {
                      const newMovieType = {
                        ...initialMovieType,
                        Series: !initialMovieType.Series,
                      };
                      setMovieType(newMovieType);
                      onFilterChange(values.year, newMovieType);
                      updateUrlWithFilters(values.year, newMovieType);
                    }}
                  />
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FilterList;
