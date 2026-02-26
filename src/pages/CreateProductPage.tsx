import CreateProductForm from "../components/CreateProductForm";

export default function CreateProductPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Create Product</h1>
        <p className="mt-1 text-sm text-gray-500">
          Fill in the details below to add a new product.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 sm:p-8">
        <CreateProductForm />
      </div>
    </div>
  );
}
