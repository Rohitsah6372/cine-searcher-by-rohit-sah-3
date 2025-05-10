import { useTranslation } from "react-i18next";

const ErrorMessage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <div className="flex items-center justify-center text-red-500">
        <p>{t("errorWhileFetchinng")}</p>
      </div>
    </div>
  );
};

export default ErrorMessage;
