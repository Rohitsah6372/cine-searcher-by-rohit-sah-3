import { useEffect, useRef, useState } from "react";

import { Filter, Search } from "neetoicons";
import { Input } from "neetoui";
import { useTranslation } from "react-i18next";

const SearchBar = ({ onChange, setCurrentPageNumber, setIsFilterOpen }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const autoInputRef = useRef(null);

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
    <div className="flex items-center justify-between">
      <Input
        className="mx-2 rounded-md border-[#ddd] bg-white p-2"
        placeholder={t("searchPlaceholder")}
        prefix={<Search />}
        ref={autoInputRef}
        type="Search"
        value={searchTerm}
        onChange={handleChange}
      />
      <button onClick={() => setIsFilterOpen(prev => !prev)}>
        <Filter className="outline-none mr-1 border-none border-[#ddd] p-0.5 hover:text-green-700" />
      </button>
    </div>
  );
};

export default SearchBar;
