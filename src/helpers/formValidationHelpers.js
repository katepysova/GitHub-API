import * as yup from "yup";

export const emailRegExp = new RegExp(
  "([A-Za-z0-9]+[.-_])*[A-Za-z0-9]+@[A-Za-z0-9-]+(.[A-Z|a-z]{2,})+"
);

export const passwordValidationHelper = (label, min, max) =>
  yup
    .string()
    .label(label)
    .min(min, `${label} must contain at least ${min} characters`)
    .max(max, `${label} must contain at least ${max} characters`);
