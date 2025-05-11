import { Button, Typography } from "neetoui";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Typography style="h1">{t("pageNotFound")}</Typography>
      <Link className="mt-4" to="/">
        <Button label={t("goBack")} style="primary" />
      </Link>
    </div>
  );
};

export default PageNotFound;
