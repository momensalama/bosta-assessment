import type { CreateProductInput } from "../types";

export type FormErrors = Partial<Record<keyof CreateProductInput, string>>;

export function validateCreateProduct(values: CreateProductInput): FormErrors {
  const errors: FormErrors = {};

  if (!values.title.trim()) errors.title = "Title is required.";
  if (!values.description.trim())
    errors.description = "Description is required.";
  if (!values.category) errors.category = "Category is required.";
  if (!values.image.trim()) errors.image = "Image URL is required.";

  if (
    values.price === undefined ||
    values.price === null ||
    Number.isNaN(values.price)
  ) {
    errors.price = "Price is required.";
  } else if (values.price <= 0) {
    errors.price = "Price must be a positive number.";
  }

  return errors;
}
