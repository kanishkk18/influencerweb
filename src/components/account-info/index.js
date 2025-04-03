"use client";

import {
  candidateOnboardFormControls,
  initialCandidateAccountFormData,
  initialCandidateFormData,
  initialRecruiterFormData,
  recruiterOnboardFormControls,
} from "@/utils";
import { useEffect, useState } from "react";
import CommonForm from "../common-form";
import { updateProfileAction } from "@/actions";
import { useUser } from "@clerk/nextjs";


function AccountInfo({ profileInfo }) {
  const [candidateFormData, setCandidateFormData] = useState(
    initialCandidateAccountFormData
  );
  const [recruiterFormData, setRecruiterFormData] = useState(
    initialRecruiterFormData
  );

  const { user } = useUser();

  useEffect(() => {
    if (profileInfo?.role === "recruiter")
      setRecruiterFormData(profileInfo?.recruiterInfo);

    if (profileInfo?.role === "candidate")
      setCandidateFormData(profileInfo?.candidateInfo);
  }, [profileInfo]);

  console.log(profileInfo, "candidateFormData", profileInfo);

  async function handleUpdateAccount() {
    await updateProfileAction(
      profileInfo?.role === "candidate"
        ? {
            _id: profileInfo?._id,
            userId: profileInfo?.userId,
            email: profileInfo?.email,
            role: profileInfo?.role,
            isPremiumUser: profileInfo?.isPremiumUser,
            memberShipType: profileInfo?.memberShipType,
            memberShipStartDate: profileInfo?.memberShipStartDate,
            memberShipEndDate: profileInfo?.memberShipEndDate,
            candidateInfo: {
              ...candidateFormData,
              resume: profileInfo?.candidateInfo?.resume,
            },
          }
        : {
            _id: profileInfo?._id,
            userId: profileInfo?.userId,
            email: profileInfo?.email,
            role: profileInfo?.role,
            isPremiumUser: profileInfo?.isPremiumUser,
            memberShipType: profileInfo?.memberShipType,
            memberShipStartDate: profileInfo?.memberShipStartDate,
            memberShipEndDate: profileInfo?.memberShipEndDate,
            recruiterInfo: {
              ...recruiterFormData,
            },
          },
      "/account"
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    {/* Header Section */}
    <div className="flex items-center justify-between pb-8 border-b border-gray-800/20 dark:border-gray-200/20 pt-24">
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 dark:from-indigo-300 dark:via-purple-300 dark:to-pink-300 animate-text">
        Account Details
      </h1>
      <div className="hidden sm:flex items-center space-x-4">
        <button className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-indigo-500/50">
          Save Changes
        </button>
      </div>
    </div>
  
    {/* Form Section */}
    <div className="py-20 pb-24 pt-6">
      <div className="container mx-auto p-0 space-y-10">
        
        <div className="bg-white dark:bg-gray-900/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-gray-200/50 dark:border-gray-700/50 hover:border-indigo-400/50 transition-all duration-300">
        <img 
      src={user.imageUrl} 
      alt="Profile image" 
      className="rounded-full w-36 h-36 justify-self-center"
    />
          <CommonForm
            action={handleUpdateAccount}
            formControls={
              profileInfo?.role === "candidate"
                ? candidateOnboardFormControls.filter(
                    (formControl) => formControl.name !== "resume"
                  )
                : recruiterOnboardFormControls
            }
            formData={
              profileInfo?.role === "candidate"
                ? candidateFormData
                : recruiterFormData
            }
            setFormData={
              profileInfo?.role === "candidate"
                ? setCandidateFormData
                : setRecruiterFormData
            }
            buttonText="Update Profile"
            // Custom button styling
            buttonClassName="w-full sm:w-auto px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-full hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 transform"
          />
        </div>
      </div>
    </div>
  
    {/* Optional Floating Animation for Futuristic Touch */}
    {/* <div className="fixed bottom-10 right-10 z-50">
      <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full animate-pulse shadow-lg flex items-center justify-center">
        <span className="text-white text-2xl">✨</span>
      </div>
    </div> */}
  </div>
  
    // <div className="mx-auto max-w-7xl">
    //   <div className="flex items-baseline dark:border-white justify-between pb-6 border-b pt-24">
    //     <h1 className="text-4xl font-bold dark:text-white tracking-tight text-gray-950">
    //       Account Details
    //     </h1>
    //   </div>
    //   <div className="py-20 pb-24 pt-6">
    //     <div className="container mx-auto p-0 space-y-8">
    //       <CommonForm
    //         action={handleUpdateAccount}
    //         formControls={
    //           profileInfo?.role === "candidate"
    //             ? candidateOnboardFormControls.filter(
    //                 (formControl) => formControl.name !== "resume"
    //               )
    //             : recruiterOnboardFormControls
    //         }
    //         formData={
    //           profileInfo?.role === "candidate"
    //             ? candidateFormData
    //             : recruiterFormData
    //         }
    //         setFormData={
    //           profileInfo?.role === "candidate"
    //             ? setCandidateFormData
    //             : setRecruiterFormData
    //         }
    //         buttonText="Update Profile"
    //       />
    //     </div>
    //   </div>
    // </div>
  );
}

export default AccountInfo;
