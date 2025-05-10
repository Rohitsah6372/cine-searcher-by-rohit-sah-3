import { useTransition } from "react";

const ErrorMessage = () => {
  const { t } = useTransition();

  return (
    <div>
      <div className="flex items-center justify-center text-red-500">
        <p>{t("errorWhileFetchinng")}</p>
      </div>
    </div>
  );
};

export default ErrorMessage;
