import * as Yup from "yup";

const reg = new RegExp("^https://github.com(/[\\w.-]+){2}$");

const searchValidationSchema = Yup.object({
  search: Yup.string()
    .matches(reg, "Search format does not match.")
    .required("Search is required field.")
});

export default searchValidationSchema;
