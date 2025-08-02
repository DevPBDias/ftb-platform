import { AlertCircle } from "lucide-react";

interface EmptyStateProps {
  title: string;
  message: string;
  type?: "error" | "empty" | "loading";
}

const EmptyState = ({ title, message, type = "empty" }: EmptyStateProps) => {
  const getIconColor = () => {
    switch (type) {
      case "error":
        return "text-red-500";
      case "loading":
        return "text-blue-500";
      default:
        return "text-gray-400";
    }
  };

  const getBgColor = () => {
    switch (type) {
      case "error":
        return "bg-red-50 border-red-200";
      case "loading":
        return "bg-blue-50 border-blue-200";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center p-8 rounded-lg border ${getBgColor()}`}>
      <AlertCircle className={`w-12 h-12 mb-4 ${getIconColor()}`} />
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-center max-w-md">{message}</p>
    </div>
  );
};

export default EmptyState; 