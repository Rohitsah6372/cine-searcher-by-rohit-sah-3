import { Button, Typography } from "neetoui";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="absolute left-1/3 top-1/3">
      <Typography style="h1">{t("pageNotFound")}</Typography>
      <Link to="/">
        <Button label={t("goBack")} style="primary" />
      </Link>
    </div>
  );
};

export default PageNotFound;
