import { useEffect, useRef, useState } from "react";

import { Filter, Search } from "neetoicons";
import { Input } from "neetoui";
import { useTranslation } from "react-i18next";

import FilterList from "./MovieList/FilterList";

const SearchBar = ({
  onChange,
  setCurrentPageNumber,
  setIsFilterOpen,
  isFilterOpen,
  movieType,
  setMovieType,
  year,
  setYear,
  onFilterChange,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const autoInputRef = useRef(null);
  const filterButtonRef = useRef(null);

  const { t } = useTranslation();

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === "/") {
        event.preventDefault();
        autoInputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleChange = e => {
    const newValue = e.target.value;
    setSearchTerm(newValue);
    onChange(newValue);
    setCurrentPageNumber(1);
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-between">
        <Input
          className="mx-2 rounded-md border-[#ddd] bg-white "
          placeholder={t("searchPlaceholder")}
          prefix={<Search />}
          ref={autoInputRef}
          type="Search"
          value={searchTerm}
          onChange={handleChange}
        />
        <button
          ref={filterButtonRef}
          onClick={() => setIsFilterOpen(prev => !prev)}
        >
          <Filter className="outline-none mr-1 border-none border-[#ddd] p-0.5 hover:text-green-700" />
        </button>
      </div>
      {isFilterOpen && (
        <div className="absolute right-0 top-12 z-50 w-80 rounded-md bg-white p-4 shadow-xl">
          <FilterList
            initialMovieType={movieType}
            initialYear={year}
            setIsFilterOpen={setIsFilterOpen}
            setMovieType={setMovieType}
            setYear={setYear}
            onFilterChange={onFilterChange}
          />
        </div>
      )}
    </div>
  );
};

export default SearchBar;
