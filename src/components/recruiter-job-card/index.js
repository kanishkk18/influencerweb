"use client";

import { useState } from "react";
import CommonCard from "../common-card";
import JobIcon from "../job-icon";
import JobApplicants from "../job-applicants";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

function RecruiterJobCard({ jobItem, jobApplications }) {
  const [showApplicantsDrawer, setShowApplicantsDrawer] = useState(false);
  const [currentCandidateDetails, setCurrentCandidateDetails] = useState(null);
  const [
    showCurrentCandidateDetailsModal,
    setShowCurrentCandidateDetailsModal,
  ] = useState(false);

  return (
   
     <Card className="col-span-3 block relative z-50 min-w-[46vw]  animate-fade-in" style={{ animationDelay: "0.3s" }}>
   
    <CardContent>
      <ScrollArea className="h-fit mt-4">
        <div className="space-y-4">
         
            <div 
              // key={campaign.id} 
              className="p-4 border rounded-lg hover:shadow-sm transition-shadow"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">{jobItem?.title}</h4>
                {/* <Badge variant={campaign.status === 'Active' ? 'default' : 'outline'}>
                  {jobItem?.status}
                </Badge> */}
                <Button
            onClick={() => setShowApplicantsDrawer(true)}
            className=" dark:bg-[#394ed9] text-white disabled:opacity-55 flex py-1 items-center justify-center px-2"
            disabled={
              jobApplications.filter((item) => item.jobID === jobItem?._id)
                .length === 0
            }
          >
            {
              jobApplications.filter((item) => item.jobID === jobItem?._id)
                .length
            }{" "}
            Applicants
          </Button>
              </div>
              
              <div className="grid grid-cols-3 gap-2 mb-3">
                <div>
                  <p className="text-xs text-muted-foreground">Budget</p>
                  <p className="font-medium">{jobItem?.experience}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Reels</p>
                  <p className="font-medium">{jobItem?.skills}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Influencers</p>
                  <p className="font-medium"> {
              jobApplications.filter((item) => item.jobID === jobItem?._id)
                .length
            }</p>
                </div>
              </div>
              
              <div className="w-full bg-muted rounded-full h-2 mb-1">
                <div 
                  className="bg-primary h-2 rounded-full" 
                  // style={{ width: `${campaign.completion}%` }}

                ></div>
              </div>
              <p className="text-xs text-right text-muted-foreground">% Complete</p>
            </div>
          
        </div>
      </ScrollArea>
    </CardContent>
    <JobApplicants
        showApplicantsDrawer={showApplicantsDrawer}
        setShowApplicantsDrawer={setShowApplicantsDrawer}
        showCurrentCandidateDetailsModal={showCurrentCandidateDetailsModal}
        setShowCurrentCandidateDetailsModal={
          setShowCurrentCandidateDetailsModal
        }
        currentCandidateDetails={currentCandidateDetails}
        setCurrentCandidateDetails={setCurrentCandidateDetails}
        jobItem={jobItem}
        jobApplications={jobApplications.filter(
          (jobApplicantItem) => jobApplicantItem.jobID === jobItem?._id
        )}
      />
  </Card>
     
    
  );
}

export default RecruiterJobCard;
