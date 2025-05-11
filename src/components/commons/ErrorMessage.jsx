import { Trans } from "react-i18next";

const ErrorMessage = () => (
  <div>
    <div className="flex items-center justify-center text-red-500">
      <p>
        <Trans>errorWhileFetchinng</Trans>
      </p>
    </div>
  </div>
);

export default ErrorMessage;
