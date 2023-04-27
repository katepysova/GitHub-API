import PropTypes from "prop-types";
import cn from "classnames";
import { Formik, Form } from "formik";
import searchValidationSchema from "./validation.schema.js";
import "./Search.scss";

function Search({ placeHolder = "Search...", onSearch, buttonText = "Load issues" }) {
  return (
    <Formik
      initialValues={{
        search: ""
      }}
      validationSchema={searchValidationSchema}
      validateOnChange={true}
      onSubmit={onSearch}
    >
      {({ values, errors, isSubmitting, isValid, handleChange }) => (
        <Form className="search-form">
          <div className="search-form__content">
            <input
              className={cn("search-form__input", {
                "search-form__input--error": errors && errors.search
              })}
              type="search"
              name="search"
              value={values.search}
              onChange={handleChange}
              placeholder={placeHolder}
            />
            <button className="search-form__btn" disabled={isSubmitting || !isValid}>
              {buttonText}
            </button>
          </div>
          {errors.search && <small className="search-form__error">{errors.search}</small>}
        </Form>
      )}
    </Formik>
  );
}

Search.propTypes = {
  placeHolder: PropTypes.string,
  onSearch: PropTypes.func,
  buttonText: PropTypes.string
};

export default Search;
