import { getStatusLabel } from "@/services/mockData";
import { cn } from "@/lib/utils";


export function StatusBadge({ status, className }) {
  const { label, color } = getStatusLabel(status);
  
  return (
    <span 
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
        color,
        className
      )}
    >
      {label}
    </span>
  );
}
