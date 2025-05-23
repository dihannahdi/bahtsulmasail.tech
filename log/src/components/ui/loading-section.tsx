import { Loader2 } from "lucide-react";

interface LoadingSectionProps {
  message?: string;
}

export function LoadingSection({ message = "Loading..." }: LoadingSectionProps) {
  return (
    <div className="flex flex-col items-center justify-center py-8 space-y-4">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
} 