import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";

export function DeadlineDisplay({ 
  deadline, 
  formattedDeadline, 
  className,
  showIcon = true
}) {
  const deadlineDate = new Date(deadline);
  const now = new Date();
  const isUrgent = deadlineDate.getTime() - now.getTime() < 24 * 60 * 60 * 1000; // less than 24 hours
  
  return (
    <div className={cn(
      "flex items-center gap-1.5",
      isUrgent ? "text-orange-600" : "text-gray-500",
      className
    )}>
      {showIcon && <Clock className="w-3.5 h-3.5" />}
      <span className="text-sm font-medium">
        {formattedDeadline} {isUrgent && "left"}
      </span>
    </div>
  );
}