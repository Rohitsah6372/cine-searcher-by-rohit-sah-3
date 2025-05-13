import { createYearValidationSchema } from "constants";

import { useEffect, useState } from "react";

import useQueryParams from "hooks/useQueryParams";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import FilterForm from "./FilterForm";
import FilterHeader from "./FilterHeader";
import updateUrlWithFilter from "./utils/updateUrlWithFilter";

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
  const [searchTerm, setSearchTerm] = useState("");
  const yearSchema = createYearValidationSchema(t);
  const query = useQueryParams();
  const searchTermFromQuery = query.search || "";

  useEffect(() => {
    setSearchTerm(searchTermFromQuery);
  }, [searchTermFromQuery]);

  const handleCloseFilter = () => {
    setIsFilterOpen(prev => !prev);
  };

  const handleYearChange = (e, handleChange) => {
    const value = e.target.value;
    if (value.length <= 4 && /^\d*$/.test(value)) {
      handleChange(e);
      setYear(value);
      onFilterChange(value, initialMovieType);
      updateUrlWithFilter(value, initialMovieType, history, searchTerm);
    }
  };

  const handleMovieTypeChange = (isMovie, values) => {
    const newMovieType = {
      ...initialMovieType,
      Movie: isMovie ? !initialMovieType.Movie : initialMovieType.Movie,
      Series: !isMovie ? !initialMovieType.Series : initialMovieType.Series,
    };
    setMovieType(newMovieType);
    onFilterChange(values.year, newMovieType);
    updateUrlWithFilter(values.year, newMovieType, history, searchTerm);
  };

  const handleSubmit = values => {
    setYear(values.year);
    onFilterChange(values.year, initialMovieType);
    updateUrlWithFilter(values.year, initialMovieType, history, searchTerm);
  };

  return (
    <div className="outline-none w-full transform rounded-xl bg-white p-6 transition-all duration-300">
      <FilterHeader onClose={handleCloseFilter} />
      <FilterForm
        handleMovieTypeChange={handleMovieTypeChange}
        handleYearChange={handleYearChange}
        initialMovieType={initialMovieType}
        initialYear={initialYear}
        yearSchema={yearSchema}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default FilterList;
