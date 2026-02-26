import { FiCheckCircle } from "react-icons/fi";

interface FormSuccessAlertProps {
  visible: boolean;
  onDismiss: () => void;
}

function FormSuccessAlert({
  visible,
  onDismiss,
}: Readonly<FormSuccessAlertProps>) {
  if (!visible) return null;

  return (
    <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
      <FiCheckCircle className="h-5 w-5 shrink-0" />
      Product created successfully!
      <button
        type="button"
        className="ml-auto text-xs underline hover:text-green-900 cursor-pointer"
        onClick={onDismiss}
      >
        Create another
      </button>
    </div>
  );
}

export default FormSuccessAlert;
