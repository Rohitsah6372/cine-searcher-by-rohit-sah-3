import * as yup from "yup";

export const DEFAULT_IMG_URL =
  "https://img.freepik.com/premium-photo/empty-frame-background-film-computer-generated_476363-737.jpg?w=826";

export const createYearValidationSchema = t =>
  yup.object().shape({
    year: yup
      .string()
      .required(t("yearRequired"))
      .matches(/^\d{4}$/, t("yearMustBeFourDigits"))
      .test("year-range", t("yearMustBeValid"), value => {
        if (!value) return false;
        const year = parseInt(value);
        const currentYear = new Date().getFullYear();

        return year >= 1895 && year <= currentYear;
      }),
  });
