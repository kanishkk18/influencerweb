import { cn } from "@/lib/utils";
import { GradeTag } from "./gradeTag";
import { useState } from "react";
import { ReelCounter } from "./reelCounter";
import { DeadlineDisplay } from "./deadLineDisplay";
import { Button } from "@/components/ui/button";
import { claimJob, getCurrentUser } from "@/services/appService";
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



export function OrderCard({ order, className }) {
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const currentUser = getCurrentUser();

  const handleClaimJob = () => {
    setIsLoading(true);
    
    // Simulate a delay for better UX
    setTimeout(() => {
      const result = claimJob(order.id);
      
      if (result.success) {
        toast({
          title: "Job Claimed",
          description: result.message,
        });
        
        // Navigate to job detail page (to be implemented)
        if (result.job) {
          window.location.href = `/job/${result.job.id}`;
        }
      } else {
        toast({
          title: "Failed to claim job",
          description: result.message,
          variant: "destructive",
        });
      }
      
      setIsLoading(false);
      setConfirmDialogOpen(false);
    }, 500);
  };

  return (
    <>
      <div 
        className={cn(
          "rounded-lg overflow-hidden transition-all duration-300 hover:scale-102 shadow-xl border border-gray-700/50 bg-gray-800/30 backdrop-blur-md",
          order.isAvailable ? "opacity-100" : "opacity-70",
          className
        )}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0 pointer-events-none"></div>
        
        <div className="p-5 flex flex-col h-full relative z-10">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 ring-2 ring-white/10">
                <AvatarImage src={order.clientAvatar} alt={order.clientName} />
                <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600">
                  {order.clientName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-lg line-clamp-1 text-white">{order.title}</h3>
                <p className="text-sm text-gray-400">{order.clientName}</p>
              </div>
            </div>
            <div className="flex gap-1">
              <GradeTag grade={order.minGrade} name={order.minGradeName} />
              {order.maxGrade !== order.minGrade && (
                <GradeTag grade={order.maxGrade} name={order.maxGradeName} />
              )}
            </div>
          </div>
          
          <p className="text-sm mb-4 line-clamp-2 text-gray-300">
            {order.description}
          </p>
          
          <div className="mt-auto pt-4 border-t border-gray-700/30">
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">
                  ${order.compensation}
                </span>
                <DeadlineDisplay 
                  deadline={order.deadline} 
                  formattedDeadline={order.deadlineFormatted} 
                />
              </div>
              
              <ReelCounter 
                total={order.totalReels} 
                remaining={order.remainingReels} 
              />
              
              {order.hasAlreadyClaimed ? (
                <Button variant="outline" disabled className="w-full mt-2 bg-gray-800/50 border-gray-700">
                  <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                  Already Claimed
                </Button>
              ) : order.isAvailable ? (
                <Button 
                  className="w-full mt-2 bg-gradient-to-r from-indigo-500 to-purple-600 border-0"
                  onClick={() => setConfirmDialogOpen(true)}
                >
                  Claim Job
                </Button>
              ) : !order.isInGradeRange ? (
                <Button variant="outline" disabled className="w-full mt-2 cursor-not-allowed bg-gray-800/50 border-gray-700">
                  <LockIcon className="h-4 w-4 mr-2" />
                  Grade Restricted
                </Button>
              ) : (
                <Button variant="outline" disabled className="w-full mt-2 bg-gray-800/50 border-gray-700">
                  No Reels Available
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <DialogContent className="sm:max-w-md bg-gray-900 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle>Confirm Job Claim</DialogTitle>
            <DialogDescription className="text-gray-400">
              You are about to claim a job for "{order.title}". You will have 48 hours to submit your reel.
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col gap-4 py-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-300">Compensation:</span>
              <span className="font-semibold text-green-400">${order.compensation}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-300">Deadline after claiming:</span>
              <span className="text-gray-200">48 hours</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-300">Your grade:</span>
              <GradeTag grade={currentUser.grade} />
            </div>
          </div>
          
          <DialogFooter className="sm:justify-between">
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
              {isLoading ? "Claiming..." : "Confirm Claim"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}