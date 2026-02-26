import { useState } from "react";
import { createProduct } from "../api/products";
import { useCategories } from "../hooks/useCategories";
import {
  validateCreateProduct,
  type FormErrors,
} from "../utils/createProductValidation";
import type { CreateProductInput } from "../types";
import Button from "./ui/Button";
import FormField from "./ui/FormField";
import ErrorMessage from "./ui/ErrorMessage";
import FormSuccessAlert from "./FormSuccessAlert";

const EMPTY_FORM: CreateProductInput = {
  title: "",
  description: "",
  price: 0,
  category: "",
  image: "",
};

export default function CreateProductForm() {
  const { categories, loading: categoriesLoading } = useCategories();
  const [values, setValues] = useState<CreateProductInput>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: name === "price" ? Number.parseFloat(value) || 0 : value,
    }));
    if (errors[name as keyof CreateProductInput]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    const fieldErrors = validateCreateProduct(values);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    setSubmitting(true);
    setSubmitError(null);
    try {
      await createProduct(values);
      setSuccess(true);
      setValues(EMPTY_FORM);
      setErrors({});
    } catch {
      setSubmitError("Failed to create product. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const categoryOptions = categories.map((cat) => ({
    value: cat,
    label: cat.charAt(0).toUpperCase() + cat.slice(1),
  }));

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <FormSuccessAlert visible={success} onDismiss={() => setSuccess(false)} />
      {submitError && <ErrorMessage message={submitError} />}

      <FormField
        type="text"
        label="Title"
        name="title"
        value={values.title}
        placeholder="Product title"
        required
        error={errors.title}
        onChange={handleChange}
      />

      <FormField
        type="textarea"
        label="Description"
        name="description"
        value={values.description}
        placeholder="Product description"
        required
        error={errors.description}
        onChange={handleChange}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField
          type="number"
          label="Price ($)"
          name="price"
          value={values.price || ""}
          placeholder="0.00"
          min={0.01}
          step={0.01}
          required
          error={errors.price}
          onChange={handleChange}
        />

        <FormField
          type="select"
          label="Category"
          name="category"
          value={values.category}
          placeholder="Select a category"
          options={categoryOptions}
          disabled={categoriesLoading}
          required
          error={errors.category}
          onChange={handleChange}
        />
      </div>

      <FormField
        type="text"
        label="Image URL"
        name="image"
        value={values.image}
        placeholder="https://example.com/image.jpg"
        required
        error={errors.image}
        onChange={handleChange}
      />

      <Button type="submit" loading={submitting} className="w-full sm:w-auto">
        {submitting ? "Creating…" : "Create Product"}
      </Button>
    </form>
  );
}
