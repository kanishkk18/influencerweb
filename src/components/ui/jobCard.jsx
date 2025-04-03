import { cn } from "@/lib/utils";
import { useState } from "react";
import { DeadlineDisplay } from "./deadLineDisplay";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import { formatJobDetails, submitReel } from "@/services/appService";
import { toast } from "sonner";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


export function JobCard({ job, className }) {
  const [submitDialogOpen, setSubmitDialogOpen] = useState(false);
  const [reelLink, setReelLink] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const needsSubmission = job.status === "pending-submission" || 
                         job.status === "admin-rejected" || 
                         job.status === "client-rejected";
  
  const isExpired = job.hoursRemaining <= 0 && needsSubmission;
  
  const handleSubmit = () => {
    if (!reelLink) {
      toast({
        title: "Missing link",
        description: "Please enter a valid Instagram reel link",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate a delay for better UX
    setTimeout(() => {
      const result = submitReel(job.id, reelLink);
      
      if (result.success) {
        toast({
          title: "Reel Submitted",
          description: result.message,
        });
        setSubmitDialogOpen(false);
      } else {
        toast({
          title: "Submission Failed",
          description: result.message,
          variant: "destructive",
        });
      }
      
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <>
      <div 
        className={cn(
          "glass-card rounded-lg overflow-hidden transition-all duration-300",
          isExpired ? "opacity-70" : "hover-scale",
          className
        )}
      >
        <div className="p-5 flex flex-col h-full">
          <div className="flex justify-between items-start gap-2 mb-4">
            <div className="flex flex-col">
              <h3 className="font-semibold text-lg line-clamp-1">{job.orderTitle}</h3>
              <p className="text-sm text-muted-foreground">{job.clientName}</p>
            </div>
            <StatusBadge status={job.status} />
          </div>
          
          <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <span className="font-semibold">${job.compensation}</span>
                {needsSubmission && (
                  <DeadlineDisplay 
                    deadline={job.submissionDeadline} 
                    formattedDeadline={job.deadlineFormatted} 
                  />
                )}
              </div>
              
              {needsSubmission ? (
                isExpired ? (
                  <Button variant="outline" disabled className="w-full mt-2">
                    Deadline Expired
                  </Button>
                ) : (
                  <Button 
                    className="w-full mt-2"
                    onClick={() => setSubmitDialogOpen(true)}
                  >
                    Submit Reel
                  </Button>
                )
              ) : job.reelLink ? (
                <Button 
                  variant="outline" 
                  className="w-full mt-2 gap-2"
                  onClick={() => window.open(job.reelLink, '_blank')}
                >
                  <ExternalLink className="h-4 w-4" />
                  View Submitted Reel
                </Button>
              ) : (
                <div className="text-sm text-muted-foreground mt-2 text-center">
                  Job status: {job.statusLabel}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <Dialog open={submitDialogOpen} onOpenChange={setSubmitDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Submit Your Reel</DialogTitle>
            <DialogDescription>
              Please provide the link to your Instagram reel for "{job.orderTitle}".
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col gap-4 py-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="reelLink">Instagram Reel Link</Label>
              <Input 
                id="reelLink" 
                value={reelLink} 
                onChange={(e) => setReelLink(e.target.value)}
                placeholder="https://www.instagram.com/reel/..."
              />
              <p className="text-xs text-muted-foreground">
                The link should be to a public Instagram reel that follows all the job requirements.
              </p>
            </div>
            
            <div className="flex flex-col gap-1 mt-2">
              <h4 className="text-sm font-medium">Submission Timeline:</h4>
              <p className="text-xs text-muted-foreground">
                • Your submission will be reviewed by our admin team within 24 hours.
              </p>
              <p className="text-xs text-muted-foreground">
                • If approved, it will be sent to the client for final approval.
              </p>
              <p className="text-xs text-muted-foreground">
                • You will be notified of the client's decision.
              </p>
            </div>
          </div>
          
          <DialogFooter className="sm:justify-between">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setSubmitDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Reel"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}