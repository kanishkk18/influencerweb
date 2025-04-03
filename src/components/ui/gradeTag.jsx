import { cn } from "@/lib/utils";

const getGradeColor = (grade) => {
  switch (grade) {
    case 1:
      return "bg-slate-800 text-slate-300 border-slate-700";
    case 2:
      return "bg-blue-900/30 text-blue-400 border-blue-800/50";
    case 3:
      return "bg-indigo-900/30 text-indigo-400 border-indigo-800/50";
    case 4:
      return "bg-violet-900/30 text-violet-400 border-violet-800/50";
    case 5:
      return "bg-purple-900/30 text-purple-400 border-purple-800/50";
    case 6:
      return "bg-fuchsia-900/30 text-fuchsia-400 border-fuchsia-800/50";
    case 7:
      return "bg-pink-900/30 text-pink-400 border-pink-800/50";
    case 8:
      return "bg-rose-900/30 text-rose-400 border-rose-800/50";
    case 9:
      return "bg-amber-900/30 text-amber-400 border-amber-800/50";
    case 10:
      return "bg-orange-900/30 text-orange-400 border-orange-800/50";
    default:
      return "bg-gray-800 text-gray-300 border-gray-700";
  }
};

export function GradeTag({ grade, name, className }) {
  const colorClass = getGradeColor(grade);
  
  return (
    <span 
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 backdrop-blur-sm",
        colorClass,
        className
      )}
    >
      {name ? name : `Grade ${grade}`}
    </span>
  );
}