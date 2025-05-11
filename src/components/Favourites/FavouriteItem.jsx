import { Typography } from "neetoui";

const FavouriteItem = ({ details }) => {
  const { title, ratings } = details;
  const value = ratings?.[0]?.value ?? "N/A";

  return (
    <div className="m-3 flex items-center justify-between rounded-2xl border border-gray-200 bg-gradient-to-r from-white to-blue-50 px-6 py-4 shadow-lg transition-transform hover:scale-[1.01] hover:shadow-xl">
      <Typography className="text-base font-semibold text-gray-800">
        {title}
      </Typography>
      <Typography className="text-sm font-medium text-blue-600">
        Rating: <span className="ml-1 font-bold text-blue-800">{value}</span>
      </Typography>
    </div>
  );
};

export default FavouriteItem;
