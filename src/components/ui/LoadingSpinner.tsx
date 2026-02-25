import { ImSpinner2 } from "react-icons/im";

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-20">
      <ImSpinner2 className="h-10 w-10 animate-spin text-red-600" aria-label="Loading" />
    </div>
  );
}
