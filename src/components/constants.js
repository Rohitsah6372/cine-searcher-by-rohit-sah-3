import * as yup from "yup";

export const DEFAULT_PAGE_SIZE = 10;

export const DEFAULT_PAGE_INDEX = 1;

export const DEFAULT_IMG_URL =
  "https://img.freepik.com/premium-photo/empty-frame-background-film-computer-generated_476363-737.jpg?w=826";

export const YEAR_VALIDATION_SCHEMA = yup.object().shape({
  year: yup
    .number()
    .typeError("Year must be a number")
    .integer("Year must be an integer")
    .min(1000, "Enter a valid 4-digit year")
    .max(9999, "Enter a valid 4-digit year")
    .nullable(),
});
