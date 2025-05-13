import { Input } from "neetoui";
import { useTranslation } from "react-i18next";

const YearInput = ({ value, error, onBlur, onChange }) => {
  const { t } = useTranslation();

  return (
    <Input
      className="font-medium"
      error={error}
      label={t("year")}
      name="year"
      placeholder={t("enterFourDigitYear")}
      value={value}
      onBlur={onBlur}
      onChange={onChange}
    />
  );
};

export default YearInput;
