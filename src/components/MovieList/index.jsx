import { useState } from "react";

import SearchBar from "components/SearchBar";
import { Search } from "neetoicons";
import { Input } from "neetoui";

const MovieList = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <SearchBar
      actionBlock={
        <Input
          className="mx-2 rounded-md border-[#ddd] bg-white p-2"
          placeholder="Search Here"
          prefix={<Search />}
          type="Search"
          value={searchTerm}
          onChange={e => {
            setSearchTerm(e.target.value);
          }}
        />
      }
    />
  );
};

export default MovieList;
