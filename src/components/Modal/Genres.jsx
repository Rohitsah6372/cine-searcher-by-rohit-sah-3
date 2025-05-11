import { Typography } from "neetoui";

const Genres = ({ genres }) => (
  <div>
    {genres.split(", ").map(genre => (
      <Typography
        className="m-1 inline-block rounded-xl bg-gray-300 px-2 "
        key={genre}
        lineHeight="normal"
        style=""
      >
        {genre}
      </Typography>
    ))}
  </div>
);

export default Genres;
