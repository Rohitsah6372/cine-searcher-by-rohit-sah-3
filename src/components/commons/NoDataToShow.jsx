import { NoData } from "neetoui";
import { Trans } from "react-i18next";

const NoDataToShow = () => (
  <div className="outline-none flex h-full w-full flex-col items-center justify-center shadow-none">
    <NoData className="text-2xl" title={<Trans>noMovieToShow</Trans>} />
    <p className="p-2">
      <Trans>trySearchingSomething</Trans>
    </p>
  </div>
);

export default NoDataToShow;
