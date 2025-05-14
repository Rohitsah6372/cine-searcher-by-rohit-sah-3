import { useState } from "react";

import { Alert } from "@bigbinary/neetoui";
import { pick } from "ramda";
import { useTranslation } from "react-i18next";
import useMoviesStore from "stores/useMovieStore";

const ClearAllAlert = ({ isOpen, closeModal }) => {
  const { removeAll } = useMoviesStore(state => pick(["removeAll"], state));
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      removeAll();
      setIsSubmitting(false);
      closeModal();
    }, 500);
  };

  return (
    <Alert
      closeButton
      closeOnEsc
      closeOnOutsideClick
      cancelButtonLabel={t("cancel")}
      className="right-align-alert-buttons"
      isOpen={isOpen}
      isSubmitting={isSubmitting}
      message={t("deleteWarning")}
      submitButtonLabel={t("confirm")}
      title={t("clearAllConfirmation")}
      onClose={closeModal}
      onSubmit={handleSubmit}
    />
  );
};

export default ClearAllAlert;
