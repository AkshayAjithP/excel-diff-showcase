import { AlertCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface AlertBannerProps {
  message: string;
  onClose?: () => void;
  variant?: "error" | "success" | "warning";
}

export const AlertBanner = ({ message, onClose, variant = "error" }: AlertBannerProps) => {
  const variantStyles = {
    error: "bg-destructive text-destructive-foreground",
    success: "bg-success text-success-foreground",
    warning: "bg-yellow-500 text-white"
  };

  return (
    <div className={cn(
      "fixed top-0 left-0 right-0 z-50 p-4 flex items-center justify-between gap-4",
      "shadow-lg animate-in slide-in-from-top duration-300",
      variantStyles[variant]
    )}>
      <div className="flex items-center gap-3 flex-1">
        <AlertCircle className="w-5 h-5 flex-shrink-0" />
        <p className="text-sm font-medium">{message}</p>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="p-1 hover:bg-white/10 rounded transition-smooth"
          aria-label="Close alert"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};
