import { NoData } from "neetoui";
import { useTranslation } from "react-i18next";

const NoDataToShow = () => {
  const { t } = useTranslation();

  return (
    <div className="outline-none flex h-full w-full flex-col items-center justify-center shadow-none">
      <NoData className="text-2xl" title={t("noMovieToShow")} />
      <p className="p-2">{t("trySearchingSomething")}</p>
    </div>
  );
};

export default NoDataToShow;
