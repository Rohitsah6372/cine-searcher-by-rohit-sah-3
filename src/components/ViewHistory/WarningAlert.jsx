import { useState } from "react";

import { Alert } from "@bigbinary/neetoui";
import { useTranslation } from "react-i18next";
import useMoviesStore from "stores/useMovieStore";
import { shallow } from "zustand/shallow";

const WarningAlert = ({ id, title, setIsDeleted, closeModal }) => {
  const { removeMovie } = useMoviesStore(
    state => ({
      removeMovie: state.removeMovie,
    }),
    shallow
  );
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    setIsSubmitting(true);
    setIsDeleted(true);
    setTimeout(() => {
      removeMovie(id);
      setIsSubmitting(false);
      closeModal();
    }, 500);
  };

  return (
    //not able to put the buttons in the right
    <Alert
      closeButton
      closeOnEsc
      closeOnOutsideClick
      isOpen
      cancelButtonLabel={t("cancel")}
      className="right-align-alert-buttons"
      isSubmitting={isSubmitting}
      message={t("deleteWarning")}
      submitButtonLabel={t("confirm")}
      title={t("deleteConfirmation", { title })}
      onClose={closeModal}
      onSubmit={handleSubmit}
    />
  );
};

export default WarningAlert;
