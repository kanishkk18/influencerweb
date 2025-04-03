import { useState } from "react";
import { cn } from "@/lib/utils";
import { GradeTag } from "@/components/ui/gradeTag";
import { ReelCounter } from "@/components/ui/reelCounter";
import { DeadlineDisplay } from "@/components/ui/deadLineDisplay";
import { Button } from "@/components/ui/button";
import { LockIcon, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";

function CommonCard({
  title,
  skills,
  companyName,
  description,
  footerContent,
  isAvailable = true,
  hasAlreadyClaimed = false,
  isInGradeRange = true,
  minGrade,
  maxGrade,
  minGradeName,
  maxGradeName,
  clientAvatar,
  clientName,
  deadline,
  deadlineFormatted,
  totalReels,
  remainingReels,
  compensation,
  className,
  onClaim
}) {
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClaimJob = async () => {
    setIsLoading(true);
    try {
      // Only proceed if onClaim exists and is a function
      if (onClaim && typeof onClaim === 'function') {
        await onClaim();
      }
      setConfirmDialogOpen(false);
      toast.success("Job claimed successfully!");
    } catch (error) {
      toast.error(error.message || "Failed to claim job");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-full p-2 ">
      <div
        className={cn(
          "h-full flex flex-col  rounded-lg overflow-hidden transition-all duration-300 hover:scale-[1.02] shadow-xl border border-gray-700/50 bg-neutral-800 dark:bg-gray-900 backdrop-blur-md",
          isAvailable ? "opacity-100 flex" : "opacity-70 ",
          className
        )}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0 pointer-events-none"></div>
        
        <div className="p-5 flex flex-col h-full relative z-10">
          <div className="flex justify-between items-start mb-4 gap-2">
            <div className="flex items-center gap-3 min-w-0">
              <Avatar className="h-10 w-10 flex-shrink-0 ring-2 ring-white/10">
                <AvatarImage src={clientAvatar || "https://i.pinimg.com/736x/95/c2/67/95c267ac077ca524563a89e19b756c4a.jpg"} alt={clientName} />
                <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600">
                  {clientName?.charAt(0) || "C"}
                </AvatarFallback>
              </Avatar>
              {title && (
                <div className="min-w-0">
                  <h3 className="font-semibold text-lg truncate text-white">{title}</h3>
                  <p className="text-sm text-gray-400 truncate">
                    {companyName}
                  </p>
                </div>
              )}
            </div>
            <div className="flex gap-1 flex-shrink-0">
              {minGrade && (
                <GradeTag grade={minGrade} name={minGradeName} />
              )}
              {maxGrade && maxGrade !== minGrade && (
                <GradeTag grade={maxGrade} name={maxGradeName} />
              )}
            </div>
          </div>
          
          {description && (
            <p className="text-sm mb-4 line-clamp-3 text-gray-300 flex-grow">
              {description}
            </p>
          )}
          
          <div className="mt-auto pt-4 border-t  border-gray-700/30">
            <div className="flex flex-col gap-3">
              <div className="flex justify-between bg-blue-500 items-center flex-wrap gap-2">
                {skills && (
                  <span className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">
                    {skills}
                  </span>
                )}
                {deadline && (
                  <DeadlineDisplay 
                    deadline={deadline} 
                    formattedDeadline={deadlineFormatted} 
                  />
                )}
              </div>
              
              {typeof totalReels === 'number' && typeof remainingReels === 'number' && (
                <ReelCounter 
                  total={totalReels} 
                  remaining={remainingReels} 
                />
              )}
              
              <div className="w-full mt-2">
                {hasAlreadyClaimed ? (
                  <Button variant="outline" disabled className="w-full bg-gray-800/50 border-gray-700">
                    <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                    Already Claimed
                  </Button>
                ) : isAvailable ? (
                  <Button 
                    className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 border-0"
                    onClick={() => setConfirmDialogOpen(true)}
                  >
                    Know More
                  </Button>
                ) : !isInGradeRange ? (
                  <Button variant="outline" disabled className="w-full cursor-not-allowed bg-gray-800/50 border-gray-700">
                    <LockIcon className="h-4 w-4 mr-2" />
                    Grade Restricted
                  </Button>
                ) : (
                  <Button variant="outline" disabled className="w-full bg-gray-800/50 border-gray-700">
                    No Reels Available
                  </Button>
                )}
              </div>
              {footerContent}
            </div>
          </div>
        </div>
      </div>

      <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <DialogContent className="sm:max-w-md bg-gray-900 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle>
              instructions
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              You are about to claim a job for "{title}". You will have 48 hours to submit your reel.
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col gap-4 py-4">
            {compensation && (
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-300">Compensation:</span>
                <span className="font-semibold text-green-400">${compensation}</span>
              </div>
            )}
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-300">Deadline after claiming:</span>
              <span className="text-gray-200">48 hours</span>
            </div>
          </div>
          
          <DialogFooter className="sm:justify-between gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setConfirmDialogOpen(false)}
              className="border-gray-700 bg-gray-800/50 hover:bg-gray-800 text-gray-200"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleClaimJob}
              disabled={isLoading}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 border-0"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Claiming...
                </span>
              ) : "got it"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CommonCard;