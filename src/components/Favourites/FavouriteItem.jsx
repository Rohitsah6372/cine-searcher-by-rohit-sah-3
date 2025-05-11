import { Typography } from "neetoui";

const FavouriteItem = ({ details }) => {
  const { title, ratings: [{ value }] = [] } = details;

  return (
    <div className="m-2 flex justify-between rounded-lg border-4 border-blue-100 bg-white px-4 py-2 shadow-2xl">
      <Typography className="flex-1 text-sm  font-medium">{title}</Typography>
      <Typography className="flex w-1/4 justify-end text-sm text-gray-600  ">
        <span className="font-medium">Rating : </span>
        {value}
      </Typography>
    </div>
  );
};

export default FavouriteItem;
