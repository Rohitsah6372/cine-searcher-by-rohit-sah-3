import { useEffect } from "react";

import { ErrorMessage, PageLoader } from "components/commons";
import { useShowMovie } from "hooks/useQuery/useMovieApi";
import { Modal } from "neetoui";
import { pick } from "ramda";
import useMoviesStore from "stores/useMovieStore";

import MovieDetails from "./MovieDetails";

const MovieModal = ({ id, setIsModalOpen }) => {
  const { data: movieDetails, isLoading, isError } = useShowMovie(id);
  const { toggleInMovie } = useMoviesStore(state =>
    pick(["toggleInMovie"], state)
  );

  useEffect(() => {
    if (movieDetails) {
      toggleInMovie(movieDetails);
    }
  }, [movieDetails, toggleInMovie]);

  if (isError) {
    return <ErrorMessage />;
  }

  return (
    <Modal
      closeOnEsc
      closeOnOutsideClick
      isOpen
      className="mx-auto flex max-w-4xl flex-col rounded-lg bg-white p-6 shadow-xl"
      size="large"
      onClose={() => setIsModalOpen(false)}
    >
      {isLoading ? <PageLoader /> : <MovieDetails {...{ movieDetails }} />}
    </Modal>
  );
};

export default MovieModal;
