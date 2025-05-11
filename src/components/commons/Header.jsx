import { Typography } from "neetoui";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import routes from "routes";

const Header = () => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center">
      <Typography className="px-2 font-bold" style="h2">
        <span className="text-blue-600">Cine </span>Searcher
      </Typography>
      <NavLink
        exact
        activeClassName="px-2 font-semibold text-blue-600"
        className="px-2 text-black"
        to={routes.root}
      >
        {t("home")}
      </NavLink>
      <NavLink
        exact
        activeClassName="px-2 font-semibold text-blue-500"
        className="px-2 text-black"
        to={routes.favourite}
      >
        {t("favourites")}
      </NavLink>
    </div>
  );
};

export default Header;
