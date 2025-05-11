import { Typography } from "neetoui";
import { Trans } from "react-i18next";
import { NavLink } from "react-router-dom";
import routes from "routes";

const Header = () => (
  <div className="flex items-center">
    <Typography className="px-2 font-bold" style="h2">
      <span className="text-blue-600">
        <Trans>cine</Trans>
      </span>
      <Trans>searcher</Trans>
    </Typography>
    <NavLink
      exact
      activeClassName="px-2 font-semibold text-blue-600"
      className="px-2 text-black"
      to={routes.root}
    >
      <Trans>home</Trans>
    </NavLink>
    <NavLink
      exact
      activeClassName="px-2 font-semibold text-blue-500"
      className="px-2 text-black"
      to={routes.favourite}
    >
      <Trans>favourites</Trans>
    </NavLink>
  </div>
);

export default Header;
