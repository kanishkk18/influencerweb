import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const InstagramButton = forwardRef(({ className, variant, size, disabled, ...props }, ref) => {
  return (
    <button
      className={cn(
        "px-4 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 inline-flex items-center justify-center gap-2",
        {
          "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white disabled:opacity-50 disabled:cursor-not-allowed": variant === "primary",
          "bg-gray-100 hover:bg-gray-200 text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed": variant === "secondary",
          "border border-gray-300 hover:bg-gray-50 text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed": variant === "outline",
          "px-3 py-1.5 text-sm": size === "sm",
          "px-6 py-2.5": size === "lg",
        },
        className
      )}
      ref={ref}
      disabled={disabled}
      {...props}
    />
  );
});

InstagramButton.displayName = "InstagramButton";

export default InstagramButton;
