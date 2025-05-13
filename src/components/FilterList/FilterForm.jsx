import { Form, Formik } from "formik";

import MovieTypeCheckboxes from "./MovieTypeCheckboxes";
import YearInput from "./YearInput";

const FilterForm = ({
  initialYear,
  initialMovieType,
  yearSchema,
  onSubmit,
  handleYearChange,
  handleMovieTypeChange,
}) => (
  <Formik
    validateOnBlur
    validateOnChange
    initialValues={{ year: initialYear || "" }}
    validationSchema={yearSchema}
    onSubmit={onSubmit}
  >
    {({ values, errors, handleChange, handleBlur }) => (
      <Form>
        <div className="space-y-8">
          <YearInput
            error={errors.year}
            value={values.year}
            onBlur={handleBlur}
            onChange={e => handleYearChange(e, handleChange, values)}
          />
          <MovieTypeCheckboxes
            movieType={initialMovieType}
            onChange={isMovie => handleMovieTypeChange(isMovie, values)}
          />
        </div>
      </Form>
    )}
  </Formik>
);

export default FilterForm;
