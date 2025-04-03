// "use client";

// import { Fragment } from "react";
// import { Button } from "../ui/button";
// import { Dialog, DialogContent, DialogFooter } from "../ui/dialog";
// import {
//   getCandidateDetailsByIDAction,
//   updateJobApplicationAction,
// } from "@/actions";
// import { createClient } from "@supabase/supabase-js";

// const supabaseClient = createClient(
//   "https://ymsijpnegskkoiuerthi.supabase.co",
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inltc2lqcG5lZ3Nra29pdWVydGhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQyMzYzNDYsImV4cCI6MjAyOTgxMjM0Nn0.PM7Nr9qTZFEJsf62eHgkFXKGPqt0gfMdFN6SOJjCP6M"
// );

// function CandidateList({
//   jobApplications,
//   currentCandidateDetails,
//   setCurrentCandidateDetails,
//   showCurrentCandidateDetailsModal,
//   setShowCurrentCandidateDetailsModal,
// }) {
//   async function handleFetchCandidateDetails(getCurrentCandidateId) {
//     const data = await getCandidateDetailsByIDAction(getCurrentCandidateId);

//     if (data) {
//       setCurrentCandidateDetails(data);
//       setShowCurrentCandidateDetailsModal(true);
//     }
//   }

//   console.log(currentCandidateDetails);

//   function handlePreviewResume() {
//     const { data } = supabaseClient.storage
//       .from("job-board-public")
//       .getPublicUrl(currentCandidateDetails?.candidateInfo?.resume);

//     const a = document.createElement("a");
//     a.href = data?.publicUrl;
//     a.setAttribute("download", "Resume.pdf");
//     a.setAttribute("target", "_blank");
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//   }

//   async function handleUpdateJobStatus(getCurrentStatus) {
//     let cpyJobApplicants = [...jobApplications];
//     const indexOfCurrentJobApplicant = cpyJobApplicants.findIndex(
//       (item) => item.candidateUserID === currentCandidateDetails?.userId
//     );
//     const jobApplicantsToUpdate = {
//       ...cpyJobApplicants[indexOfCurrentJobApplicant],
//       status:
//         cpyJobApplicants[indexOfCurrentJobApplicant].status.concat(
//           getCurrentStatus
//         ),
//     };

//     console.log(jobApplicantsToUpdate, "jobApplicantsToUpdate");
//     await updateJobApplicationAction(jobApplicantsToUpdate, "/jobs");
//   }

//   console.log(jobApplications);

//   return (
//     <Fragment>
//       <div className="grid grid-cols-1 gap-3 p-10 md:grid-cols-2 lg:grid-cols-3">
//         {jobApplications && jobApplications.length > 0
//           ? jobApplications.map((jobApplicantItem) => (
//               <div className="bg-white shadow-lg w-full max-w-sm rounded-lg overflow-hidden mx-auto mt-4">
//                 <div className="px-4 my-6 flex justify-between items-center">
//                   <h3 className="text-lg font-bold dark:text-black">
//                     {jobApplicantItem?.name}
//                   </h3>
//                   <Button
//                     onClick={() =>
//                       handleFetchCandidateDetails(
//                         jobApplicantItem?.candidateUserID
//                       )
//                     }
//                     className="dark:bg-[#fffa27]  flex h-11 items-center justify-center px-5"
//                   >
//                     View Profile
//                   </Button>
//                 </div>
//               </div>
//             ))
//           : null}
//       </div>
//       <Dialog
//         open={showCurrentCandidateDetailsModal}
//         onOpenChange={() => {
//           setCurrentCandidateDetails(null);
//           setShowCurrentCandidateDetailsModal(false);
//         }}
//       >
//         <DialogContent>
//           <div>
//             <h1 className="text-2xl font-bold dark:text-white text-black">
//               {currentCandidateDetails?.candidateInfo?.name},{" "}
//               {currentCandidateDetails?.email}
//             </h1>
//             <p className="text-xl font-medium dark:text-white text-black">
//               {currentCandidateDetails?.candidateInfo?.currentCompany}
//             </p>
//             <p className="text-sm font-normal dark:text-white text-black">
//               {currentCandidateDetails?.candidateInfo?.currentJobLocation}
//             </p>
//             <p className="dark:text-white">
//               Total Experience:
//               {currentCandidateDetails?.candidateInfo?.totalExperience} Years
//             </p>
//             <p className="dark:text-white">
//               Salary: {currentCandidateDetails?.candidateInfo?.currentSalary}{" "}
//               LPA
//             </p>
//             <p className="dark:text-white">
//               Notice Period:{" "}
//               {currentCandidateDetails?.candidateInfo?.noticePeriod} Days
//             </p>
//             <div className="flex items-center gap-4 mt-6">
//               <h1 className="dark:text-white">Previous Campaigns</h1>
//               <div className="flex flex-wrap items-center gap-4 mt-6">
//                 {currentCandidateDetails?.candidateInfo?.previousCompanies
//                   .split(",")
//                   .map((skillItem) => (
//                     <div className="w-[100px] dark:bg-white flex justify-center items-center h-[35px] bg-black rounded-[4px]">
//                       <h2 className="text-[13px]  dark:text-black font-medium text-white">
//                         {skillItem}
//                       </h2>
//                     </div>
//                   ))}
//               </div>
//             </div>
//             <div className="flex flex-wrap gap-4 mt-6">
//               {currentCandidateDetails?.candidateInfo?.skills
//                 .split(",")
//                 .map((skillItem) => (
//                   <div className="w-[100px] dark:bg-white flex justify-center items-center h-[35px] bg-black rounded-[4px]">
//                     <h2 className="text-[13px] dark:text-black font-medium text-white">
//                       {skillItem}
//                     </h2>
//                   </div>
//                 ))}
//             </div>
//           </div>
//           <div className="flex gap-3">
//             <Button
//               onClick={handlePreviewResume}
//               className=" flex h-11 items-center justify-center px-5"
//             >
//               Profile
//             </Button>
//             <img src={handlePreviewResume} alt="" />
//             <Button
//               onClick={() => handleUpdateJobStatus("selected")}
//               className=" disabled:opacity-65 flex h-11 items-center justify-center px-5"
//               disabled={
//                 jobApplications
//                   .find(
//                     (item) =>
//                       item.candidateUserID === currentCandidateDetails?.userId
//                   )
//                   ?.status.includes("selected") ||
//                 jobApplications
//                   .find(
//                     (item) =>
//                       item.candidateUserID === currentCandidateDetails?.userId
//                   )
//                   ?.status.includes("rejected")
//                   ? true
//                   : false
//               }
//             >
//               {jobApplications
//                 .find(
//                   (item) =>
//                     item.candidateUserID === currentCandidateDetails?.userId
//                 )
//                 ?.status.includes("selected")
//                 ? "Selected"
//                 : "Select"}
//             </Button>
//             <Button
//               onClick={() => handleUpdateJobStatus("rejected")}
//               className=" disabled:opacity-65 flex h-11 items-center justify-center px-5"
//               disabled={
//                 jobApplications
//                   .find(
//                     (item) =>
//                       item.candidateUserID === currentCandidateDetails?.userId
//                   )
//                   ?.status.includes("selected") ||
//                 jobApplications
//                   .find(
//                     (item) =>
//                       item.candidateUserID === currentCandidateDetails?.userId
//                   )
//                   ?.status.includes("rejected")
//                   ? true
//                   : false
//               }
//             >
//               {jobApplications
//                 .find(
//                   (item) =>
//                     item.candidateUserID === currentCandidateDetails?.userId
//                 )
//                 ?.status.includes("rejected")
//                 ? "Rejected"
//                 : "Reject"}
//             </Button>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </Fragment>
//   );
// }

// export default CandidateList;

"use client";

import { Fragment } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogFooter } from "../ui/dialog";
import {
  getCandidateDetailsByIDAction,
  updateJobApplicationAction,
} from "@/actions";
import { createClient } from "@supabase/supabase-js";
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Download, Activity, Clock, Camera, PackageCheck, LocateIcon, LocateOffIcon, Pointer, MapPin, Clapperboard } from "lucide-react";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import InstagramButton from "../ui/InstagramButton";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { BsPeople } from "react-icons/bs";


const supabaseClient = createClient(
  "https://ymsijpnegskkoiuerthi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inltc2lqcG5lZ3Nra29pdWVydGhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQyMzYzNDYsImV4cCI6MjAyOTgxMjM0Nn0.PM7Nr9qTZFEJsf62eHgkFXKGPqt0gfMdFN6SOJjCP6M"
);

function CandidateList({
  jobApplications,
  currentCandidateDetails,
  setCurrentCandidateDetails,
  showCurrentCandidateDetailsModal,
  setShowCurrentCandidateDetailsModal,
}) {
  async function handleFetchCandidateDetails(getCurrentCandidateId) {
    const data = await getCandidateDetailsByIDAction(getCurrentCandidateId);

    if (data) {
      setCurrentCandidateDetails(data);
      setShowCurrentCandidateDetailsModal(true);
    }
  }

  function getResumeUrl() {
    if (!currentCandidateDetails?.candidateInfo?.resume) return null;
    const { data } = supabaseClient.storage
      .from("job-board-public")
      .getPublicUrl(currentCandidateDetails.candidateInfo.resume);
    return data?.publicUrl;
  }

  const { user } = useUser();

  async function handleUpdateJobStatus(getCurrentStatus) {
    let cpyJobApplicants = [...jobApplications];
    const indexOfCurrentJobApplicant = cpyJobApplicants.findIndex(
      (item) => item.candidateUserID === currentCandidateDetails?.userId
    );
    const jobApplicantsToUpdate = {
      ...cpyJobApplicants[indexOfCurrentJobApplicant],
      status:
        cpyJobApplicants[indexOfCurrentJobApplicant].status.concat(
          getCurrentStatus
        ),
    };

    await updateJobApplicationAction(jobApplicantsToUpdate, "/jobs");
  }

  return (
    <Fragment>
      <div className="grid grid-cols-1 gap-3 p-10 md:grid-cols-2 lg:grid-cols-3">
        {jobApplications && jobApplications.length > 0
          ? jobApplications.map((jobApplicantItem) => (
              <div key={jobApplicantItem.candidateUserID} className="bg-white shadow-lg w-full max-w-sm rounded-lg overflow-hidden mx-auto mt-4">
                <div className="px-4 my-6 flex justify-between items-center">
                  <div className="flex flex-col">
                  <h3 className="text-lg font-bold dark:text-black">
                    {jobApplicantItem?.name}
                  </h3>
                  <p className="text-sm font-bold dark:text-black">{jobApplicantItem?.email}</p>
                  </div>
                  <Button
                    onClick={() =>
                      handleFetchCandidateDetails(
                        jobApplicantItem?.candidateUserID
                      )
                    }
                    className="dark:bg-[#7d4ff1] bg-blue-600 flex h-11 text-white items-center justify-center px-5"
                  >
                    View Profile
                  </Button>
                </div>
              </div>
            ))
          : null}
      </div>
      <Dialog
        open={showCurrentCandidateDetailsModal}
        onOpenChange={() => {
          setCurrentCandidateDetails(null);
          setShowCurrentCandidateDetailsModal(false);
        }}
      >
        <DialogContent className="max-w-2xl mt-8 p-0 bg-neutral-950 border h-[88vh] border-neutral-700 w-full rounded-md overflow-hidden ">
          <ScrollArea>
          <div className=" text-white ">
          <div className=" flex items-center justify-between border-b border-neutral-700 p-3">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-r from-purple-500 to-pink-500 p-[2px]">
                      <img 
                        src={getResumeUrl()}
                        alt="" 
                        className="w-full h-full object-cover rounded-full border-2 border-neutral-800"
                      />
                    </div>
                    <div className="grid">
                    <span className="font-medium text-sm">{currentCandidateDetails?.candidateInfo?.name}</span>
                    <span className="font-medium text-sm">{currentCandidateDetails?.email}</span>
                    </div>
                  </div>
                  <div className="flex gap-4 justify-center items-center mr-8">
  {!jobApplications
    .find((item) => item.candidateUserID === currentCandidateDetails?.userId)
    ?.status.includes("rejected") && (
    <Button
      onClick={() => handleUpdateJobStatus("selected")}
      className={`flex  items-center justify-center px-4 rounded-lg font-medium transition-all duration-200
        ${jobApplications
          .find((item) => item.candidateUserID === currentCandidateDetails?.userId)
          ?.status.includes("selected")
          ? "bg-green-500 text-white cursor-default"
          : "bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-65 disabled:hover:bg-blue-500"}`}
      disabled={jobApplications
        .find((item) => item.candidateUserID === currentCandidateDetails?.userId)
        ?.status.includes("selected")}
    >
      {jobApplications
        .find((item) => item.candidateUserID === currentCandidateDetails?.userId)
        ?.status.includes("selected")
        ? "Selected ✓"
        : "Select Candidate"}
    </Button>
  )}
  
  {!jobApplications
    .find((item) => item.candidateUserID === currentCandidateDetails?.userId)
    ?.status.includes("selected") && (
    <Button
      onClick={() => handleUpdateJobStatus("rejected")}
      className={`flex  items-center justify-center px-4 rounded-lg font-medium transition-all duration-200
        ${jobApplications
          .find((item) => item.candidateUserID === currentCandidateDetails?.userId)
          ?.status.includes("rejected")
          ? "bg-red-500 text-white cursor-default"
          : "bg-gray-500 text-white hover:bg-gray-600 disabled:opacity-65 disabled:hover:bg-gray-500"}`}
      disabled={jobApplications
        .find((item) => item.candidateUserID === currentCandidateDetails?.userId)
        ?.status.includes("rejected")}
    >
      {jobApplications
        .find((item) => item.candidateUserID === currentCandidateDetails?.userId)
        ?.status.includes("rejected")
        ? "Rejected ✗"
        : "Reject Candidate"}
    </Button>
  )}
</div>
                </div>
           

                <div className="aspect-square relative">
  {getResumeUrl() || user?.imageUrl ? (
    <img 
      src={getResumeUrl() || user?.imageUrl}
      alt="Profile" 
      className="w-full h-full object-cover"
    />
  ) : (
    <p className="text-gray-500">No Profile Image available</p>
  )}
</div>
                
          </div>
          <div  className="bg-white border h-full w-full border-gray-200 rounded-md overflow-hidden">

                
                {/* Action buttons */}
                <div className="p-4 flex flex-wrap justify-between items-center">
                 
                    <button className=" flex justify-center items-center gap-2 text-gray-800 hover:text-gray-600">
                      {/* <Heart size={24} fill={likedPosts[candidate.id] ? "#ef4444" : "none"} color={likedPosts[candidate.id] ? "#ef4444" : "currentColor"} /> */}
                    <BsPeople size={24} />
                    {currentCandidateDetails?.candidateInfo?.currentCompany}
                    </button>
                    <button className=" flex justify-center items-center gap-2 text-gray-800 hover:text-gray-600">
                      <PackageCheck size={24} />
                      {currentCandidateDetails?.candidateInfo?.totalExperience}

                    </button>
                    <div className="flex justify-center items-center gap-2 text-gray-800 hover:text-gray-600">
                      <Activity size={24} />
                      {currentCandidateDetails?.candidateInfo?.currentJobLocation}
                    </div>
                  
                  <button className=" flex justify-center items-center gap-2 text-gray-800 hover:text-gray-600">
                    <Clock size={24} /> 
                    {currentCandidateDetails?.candidateInfo?.noticePeriod}
                  </button>

                  <button className=" flex justify-center items-center gap-2 text-gray-800 hover:text-gray-600">
                    <Camera size={24} />
                    {currentCandidateDetails?.candidateInfo?.currentSalary}
                  </button>

                </div>
                
               
                
                {/* Profile button */}
                <div className="p-2 space-y-2">
                  <InstagramButton 
                    // onClick={() => handleFetchCandidateDetails(candidate.candidateUserID)}
                    variant="primary" 
                    className="w-full text-sm"
                  >
                    View Content
                  </InstagramButton>

                  <div className="flex justify-center gap-2 items-center">
                    <Link className="w-full h-full" href={currentCandidateDetails?.candidateInfo?.linkedinProfile || "/jobs"}>
                  <InstagramButton 
                    // onClick={() => handleFetchCandidateDetails(candidate.candidateUserID)}
                    variant="primary" 
                    className="min-w-full h-full text-sm"
                  >
                 Instagram Profile
                  </InstagramButton>
                  </Link>
                  <Link className="w-full h-full" href={currentCandidateDetails?.candidateInfo?.githubProfile || "/jobs"} >
                  <Button variant="destructive" className="w-full h-full bg-red-500">
                  Youtube Profile
                  </Button>
                  </Link>
                  </div>
                </div>
              </div>
          <DialogFooter className="">



<div className="bg-gradient-to-br from-[#3793FF] to-[#0017E4] w-full p-4 py-8 gap-4 flex flex-col justify-start items-start">
 
    <div className="flex w-full items-start justify-start gap-2">
      <MapPin className="md:h-8 md:w-8 text-white -ml-1 mr-1"/>
      {currentCandidateDetails?.candidateInfo?.previousCompanies
        ?.split(",")
        .map((company, index) => (
          <div 
            key={index} 
            className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg 
            shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
              {company.trim()}
            </span>
          </div>
        ))}
    </div>
  

  
    <div className="flex  gap-2 justify-center items-center">
      <Clapperboard className="md:h-8 md:w-8 text-white"/>
      {currentCandidateDetails?.candidateInfo?.skills
        ?.split(",")
        .map((skill, index) => (
          <div 
            key={index} 
            className="px-4 py-2 bg-blue-50 dark:bg-blue-900 rounded-lg 
            shadow-sm hover:shadow-md transition-shadow duration-200 border border-blue-100 dark:border-blue-800/30"
          >
            <span className="text-sm font-medium text-blue-700 dark:text-blue-200">
              {skill.trim()}
            </span>
          </div>
        ))}
    </div>
 
</div>

            {/* <div className="flex gap-3">
              <Button
                onClick={() => handleUpdateJobStatus("selected")}
                className="disabled:opacity-65 flex h-11 items-center justify-center px-5"
                disabled={
                  jobApplications
                    .find(
                      (item) =>
                        item.candidateUserID === currentCandidateDetails?.userId
                    )
                    ?.status.includes("selected") ||
                  jobApplications
                    .find(
                      (item) =>
                        item.candidateUserID === currentCandidateDetails?.userId
                    )
                    ?.status.includes("rejected")
                }
              >
                {jobApplications
                  .find(
                    (item) =>
                      item.candidateUserID === currentCandidateDetails?.userId
                  )
                  ?.status.includes("selected")
                  ? "Selected"
                  : "Select"}
              </Button>
              <Button
                onClick={() => handleUpdateJobStatus("rejected")}
                className="disabled:opacity-65 flex h-11 items-center justify-center px-5"
                disabled={
                  jobApplications
                    .find(
                      (item) =>
                        item.candidateUserID === currentCandidateDetails?.userId
                    )
                    ?.status.includes("selected") ||
                  jobApplications
                    .find(
                      (item) =>
                        item.candidateUserID === currentCandidateDetails?.userId
                    )
                    ?.status.includes("rejected")
                }
              >
                {jobApplications
                  .find(
                    (item) =>
                      item.candidateUserID === currentCandidateDetails?.userId
                  )
                  ?.status.includes("rejected")
                  ? "Rejected"
                  : "Reject"}
              </Button>
            </div> */}
          </DialogFooter>
          <ScrollBar orientation="vertical" className="hidden"/>
          </ScrollArea>
        </DialogContent>
      </Dialog>
      
    </Fragment>
  );
}

export default CandidateList;