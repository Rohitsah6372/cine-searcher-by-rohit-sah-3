import { useState } from "react";

import { Alert } from "@bigbinary/neetoui";
import { useTranslation } from "react-i18next";
import useMoviesStore from "stores/useMovieStore";

const WarningAlert = ({ id, title, setIsDeleted, closeModal }) => {
  const { removeMovie } = useMoviesStore();
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
    <Alert
      closeButton
      closeOnEsc
      closeOnOutsideClick
      isOpen
      cancelButtonLabel={t("cancel")}
      isSubmitting={isSubmitting}
      message={title}
      submitButtonLabel={t("confirm")}
      title={t("deleteConfirmation")}
      onClose={closeModal}
      onSubmit={handleSubmit}
    />
  );
};

export default WarningAlert;
