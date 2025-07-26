import { cn } from "@/lib/utils";

interface SubmissionStatusProps {
  message: { type: "success" | "error"; message: string } | null;
}

export function SubmissionStatus({ message }: SubmissionStatusProps) {
  if (!message) return null;

  return (
    <div
      className={cn(
        "p-3 rounded-md text-center",
        message.type === "success"
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-700"
      )}
    >
      {message.message}
    </div>
  );
}
