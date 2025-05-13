import { Close } from "neetoicons";
import { Typography } from "neetoui";
import { useTranslation } from "react-i18next";

const FilterHeader = ({ onClose }) => {
  const { t } = useTranslation();

  return (
    <div className="mb-6 flex items-center justify-between border-b border-gray-100 pb-4">
      <Typography className="text-xl font-bold text-gray-800">
        {t("filters")}
      </Typography>
      <button
        className="rounded-full p-1.5 transition-all duration-200 hover:bg-red-50"
        onClick={onClose}
      >
        <Close className="h-5 w-5 text-gray-400 transition-colors duration-200 hover:text-red-500" />
      </button>
    </div>
  );
};

export default FilterHeader;
