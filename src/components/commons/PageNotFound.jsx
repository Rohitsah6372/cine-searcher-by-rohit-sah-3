import { Button, Typography } from "neetoui";
import { Trans } from "react-i18next";
import { Link } from "react-router-dom";

const PageNotFound = () => (
  <div className="flex min-h-screen flex-col items-center justify-center">
    <Typography style="h1">
      <Trans>pageNotFound</Trans>
    </Typography>
    <Link className="mt-4" to="/">
      <Button label={<Trans>goBack</Trans>} style="primary" />
    </Link>
  </div>
);

export default PageNotFound;
