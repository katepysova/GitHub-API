import PropTypes from "prop-types";
import cn from "classnames";
import { Formik, Form } from "formik";
import searchValidationSchema from "./validation.schema.js";
import "./Search.scss";

function Search({
  placeholder = "Search...",
  handleSubmit,
  buttonText = "Load issues",
  className
}) {
  return (
    <Formik
      initialValues={{
        search: ""
      }}
      validationSchema={searchValidationSchema}
      validateOnChange={true}
      onSubmit={handleSubmit}
    >
      {({ values, errors, isSubmitting, isValid, handleChange }) => (
        <Form className={cn("search-form", className)}>
          <div className="search-form__content">
            <input
              className={cn("search-form__input", {
                "search-form__input--error": errors && errors.search
              })}
              type="search"
              name="search"
              value={values.search}
              onChange={handleChange}
              placeholder={placeholder}
            />
            {errors.search && <small className="search-form__error">{errors.search}</small>}
            <button className="search-form__btn" type="submit" disabled={isSubmitting || !isValid}>
              {buttonText}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

Search.propTypes = {
  placeholder: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  buttonText: PropTypes.string,
  className: PropTypes.string
};

export default Search;
