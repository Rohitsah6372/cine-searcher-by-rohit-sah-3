import React from "react";

import { Delete } from "neetoicons";
import { Typography } from "neetoui";

const Item = React.forwardRef(({ id, selectedMovieId, title }, ref) => (
  <div
    ref={ref}
    className={`m-3 flex items-center justify-between rounded-xl px-4 py-3 transition-all duration-300 ${
      id === selectedMovieId
        ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white"
        : "bg-gray-50 hover:bg-gray-100"
    } `}
  >
    <Typography
      className={`flex-1 truncate px-2 text-sm font-medium ${
        id === selectedMovieId ? "text-white" : "text-gray-700"
      }`}
    >
      {title}
    </Typography>
    <button className="flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200 hover:bg-gray-200">
      <Delete
        className={`h-4 w-4 transition-all duration-200 hover:h-5 hover:w-5 ${
          id === selectedMovieId ? "text-white" : "text-gray-500"
        } hover:text-red-600
          `}
      />
    </button>
  </div>
));

Item.displayName = "ViewHistoryItem";

export default Item;
