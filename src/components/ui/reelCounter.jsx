import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export function ReelCounter({ 
  total, 
  remaining, 
  className,
  animated = true
}) {
  const [displayRemaining, setDisplayRemaining] = useState(remaining);
  
  useEffect(() => {
    if (animated) {
      // Simple animation effect for counter changes
      const timer = setTimeout(() => {
        setDisplayRemaining(remaining);
      }, 200);
      
      return () => clearTimeout(timer);
    } else {
      setDisplayRemaining(remaining);
    }
  }, [remaining, animated]);
  
  const percentage = Math.round(((total - displayRemaining) / total) * 100);
  
  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div className="flex items-center gap-2 mb-1">
        <span className="text-sm font-medium text-gray-500">Reels:</span>
        <div className="flex items-baseline">
          <span className={cn(
            "counter-value",
            animated && remaining !== displayRemaining && "animate-pulse"
          )}>
            {displayRemaining}
          </span>
          <span className="text-sm text-gray-500">/{total}</span>
          <span className="ml-1 text-xs text-gray-400">remaining</span>
        </div>
      </div>
      
      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}