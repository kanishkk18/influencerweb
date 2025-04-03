
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import JobApplicants from "@/components/job-applicants";

function ActiveCampaigns({ jobItem, jobApplications = [] }) {
  const [showApplicantsDrawer, setShowApplicantsDrawer] = useState(false);
  const [currentCandidateDetails, setCurrentCandidateDetails] = useState(null);
  const [showCurrentCandidateDetailsModal, setShowCurrentCandidateDetailsModal] = useState(false);

  // Safely filter job applications
  const filteredApplications = jobApplications?.filter((item) => item.jobID === jobItem?._id) || [];

  return (
    <Card className="col-span-2 animate-fade-in" style={{ animationDelay: "0.3s" }}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle>Active Campaigns</CardTitle>
          <Button variant="ghost" size="sm">View All</Button>
        </div>
        <CardDescription>Monitor your ongoing campaigns</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[280px] pr-4">
          <div className="space-y-4">
            <div className="p-4 border rounded-lg hover:shadow-sm transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">{jobItem?.title}</h4>
                <Button
            onClick={() => setShowApplicantsDrawer(true)}
            className=" dark:bg-[#fffa27] disabled:opacity-55 flex h-11 items-center justify-center px-5"
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
                  <p className="font-medium">budget</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Reels</p>
                  <p className="font-medium">reels</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Influencers</p>
                  <p className="font-medium">influencers</p>
                </div>
              </div>
              <div className="w-full bg-muted rounded-full h-2 mb-1"></div>
              <p className="text-xs text-right text-muted-foreground">% Complete</p>
            </div>
          </div>
        </ScrollArea>
      </CardContent>
      <JobApplicants
        showApplicantsDrawer={showApplicantsDrawer}
        setShowApplicantsDrawer={setShowApplicantsDrawer}
        showCurrentCandidateDetailsModal={showCurrentCandidateDetailsModal}
        setShowCurrentCandidateDetailsModal={setShowCurrentCandidateDetailsModal}
        currentCandidateDetails={currentCandidateDetails}
        setCurrentCandidateDetails={setCurrentCandidateDetails}
        jobItem={jobItem}
        jobApplications={filteredApplications}
      />
    </Card>
  );
}

export default ActiveCampaigns;


// "use client";

// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Badge } from "@/components/ui/badge";
// import { useState } from "react";
// import JobApplicants from "@/components/job-applicants";


// const campaignsData = [
// {
//   id: 1,
//   name: "Summer Collection Launch",
//   budget: "$9,500",
//   reels: 48,
//   influencers: 25,
//   status: "Active",
//   completion: 65,
// },
// {
//   id: 2,
//   name: "New Product Unboxing",
//   budget: "$7,200",
//   reels: 36,
//   influencers: 18,
//   status: "Active",
//   completion: 42,
// },
// {
//   id: 3,
//   name: "Holiday Special",
//   budget: "$12,000",
//   reels: 60,
//   influencers: 30,
//   status: "Pending",
//   completion: 10,
// },
// ];

// function ActiveCampaigns({ jobItem, jobApplications }) {
//   const [showApplicantsDrawer, setShowApplicantsDrawer] = useState(false);
//   const [currentCandidateDetails, setCurrentCandidateDetails] = useState(null);
//   const [
//     showCurrentCandidateDetailsModal,
//     setShowCurrentCandidateDetailsModal,
//   ] = useState(false);

// return (
  
//   <Card className="col-span-2 animate-fade-in" style={{ animationDelay: "0.3s" }}>
//     <CardHeader className="pb-2">
//       <div className="flex items-center justify-between">
//         <CardTitle>Active Campaigns</CardTitle>
//         <Button variant="ghost" size="sm">View All</Button>
//       </div>
//       <CardDescription>Monitor your ongoing campaigns</CardDescription>
//     </CardHeader>
//     <CardContent>
//       <ScrollArea className="h-[280px] pr-4">
//         <div className="space-y-4">
         
//             <div 
//               // key={campaign.id} 
//               className="p-4 border rounded-lg hover:shadow-sm transition-shadow"
//             >
//               <div className="flex items-center justify-between mb-2">
//                 <h4 className="font-medium">{jobItem?.title}</h4>
//                 {/* <Badge variant={campaign.status === 'Active' ? 'default' : 'outline'}>
//                   {campaign.status}
//                 </Badge> */}
//                 <Button
//             onClick={() => setShowApplicantsDrawer(true)}
//             className=" dark:bg-[#fffa27] disabled:opacity-55 flex h-11 items-center justify-center px-5"
//             disabled={
//               jobApplications.filter((item) => item.jobID === jobItem?._id)
//                 .length === 0
//             }
//           >
//             {
//               jobApplications.filter((item) => item.jobID === jobItem?._id)
//                 .length
//             }{" "}
//             Applicants
//           </Button>
//               </div>
              
//               <div className="grid grid-cols-3 gap-2 mb-3">
//                 <div>
//                   <p className="text-xs text-muted-foreground">Budget</p>
//                   <p className="font-medium">budget</p>
//                 </div>
//                 <div>
//                   <p className="text-xs text-muted-foreground">Reels</p>
//                   <p className="font-medium">reels</p>
//                 </div>
//                 <div>
//                   <p className="text-xs text-muted-foreground">Influencers</p>
//                   <p className="font-medium">influencers</p>
//                 </div>
//               </div>
              
//               <div className="w-full bg-muted rounded-full h-2 mb-1">
//                 {/* <div 
//                   className="bg-primary h-2 rounded-full" 
//                   style={{ width: `${campaign.completion}%` }}
//                 ></div> */}
//               </div>
//               <p className="text-xs text-right text-muted-foreground">% Complete</p>
//             </div>
          
//         </div>
//       </ScrollArea>
//     </CardContent>
//     <JobApplicants
//             showApplicantsDrawer={showApplicantsDrawer}
//             setShowApplicantsDrawer={setShowApplicantsDrawer}
//             showCurrentCandidateDetailsModal={showCurrentCandidateDetailsModal}
//             setShowCurrentCandidateDetailsModal={
//               setShowCurrentCandidateDetailsModal
//             }
//             currentCandidateDetails={currentCandidateDetails}
//             setCurrentCandidateDetails={setCurrentCandidateDetails}
//             jobItem={jobItem}
//             jobApplications={jobApplications.filter(
//               (jobApplicantItem) => jobApplicantItem.jobID === jobItem?._id
//             )}
//           />
//   </Card>
// );
// };

// export default ActiveCampaigns;