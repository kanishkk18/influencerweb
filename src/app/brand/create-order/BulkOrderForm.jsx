
"use client";

import { filterMenuDataArray, formUrlQuery } from "@/utils";
import CandidateJobCard from "@/components/candidate-job-card";
import PostNewJob from "@/components/post-new-job";
import RecruiterJobCard from "@/components/recruiter-job-card";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function JobListing({
  user,
  profileInfo,
  jobList,
  jobApplications,
  filterCategories,
}) {
  const [filterParams, setFilterParams] = useState({});
  const searchParams = useSearchParams();
  const router = useRouter();

  function handleFilter(getSectionID, getCurrentOption) {
    let cpyFilterParams = { ...filterParams };
    const indexOfCurrentSection =
      Object.keys(cpyFilterParams).indexOf(getSectionID);
    if (indexOfCurrentSection === -1) {
      cpyFilterParams = {
        ...cpyFilterParams,
        [getSectionID]: [getCurrentOption],
      };
    } else {
      const indexOfCurrentOption =
        cpyFilterParams[getSectionID].indexOf(getCurrentOption);
      if (indexOfCurrentOption === -1)
        cpyFilterParams[getSectionID].push(getCurrentOption);
      else cpyFilterParams[getSectionID].splice(indexOfCurrentOption, 1);
    }
    setFilterParams(cpyFilterParams);
    sessionStorage.setItem("filterParams", JSON.stringify(cpyFilterParams));
  }


  useEffect(() => {
    setFilterParams(JSON.parse(sessionStorage.getItem("filterParams")));
  }, []);

  useEffect(() => {
    if (filterParams && Object.keys(filterParams).length > 0) {
      let url = "";
      url = formUrlQuery({
        params: searchParams.toString(),
        dataToAdd: filterParams,
      });

      router.push(url, { scroll: false });
    }
  }, [filterParams, searchParams]);

  // const filterMenus = filterMenuDataArray.map((item) => ({
  //   id: item.id,
  //   name: item.label,
  //   options: [
  //     ...new Set(filterCategories.map((listItem) => listItem[item.id])),
  //   ],
  // }));

  console.log(filterParams, "filterParams");

  return (
    <div>
     
      <div className="mx-auto flex">
         <div className="">
          {/* <h1 className="text-4xl dark:text-white font-bold tracking-tight text-gray-900">
            {profileInfo?.role === "candidate"
              ? "Explore All Jobs"
              : "Jobs Dashboard"}
          </h1> */}
          <div className="flex items-center">
           
            <div>
              <PostNewJob
                jobList={jobList}
                user={user}
                profileInfo={profileInfo}
              />
              </div>
            
          </div>
        </div>
        <div className="">
          <div className="grid grid-cols-1  lg:grid-cols-3">
            <div className="lg:col-span-4">
              <div className="container mx-auto p-0 space-y-8">
                <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
                  {jobList && jobList.length > 0
                    ? jobList.map((jobItem) =>
                        profileInfo?.role === "candidate" ? (
                          <CandidateJobCard
                            profileInfo={profileInfo}
                            jobItem={jobItem}
                            jobApplications={jobApplications}
                          />
                        ) : (
                          <RecruiterJobCard
                            profileInfo={profileInfo}
                            jobItem={jobItem}
                            jobApplications={jobApplications}
                          />
                        )
                      )
                    : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobListing;


// import { useState } from 'react';
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { toast } from "sonner";
// import { Separator } from "@/components/ui/separator";
// import { useRouter } from 'next/navigation';

// const BulkOrderForm = () => {
//   const Router = useRouter();
//   const [formData, setFormData] = useState({
//     campaignName: '',
//     productName: '',
//     reelRequirements: '',
//     quantity: 500,
//     budget: 5000
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: name === 'quantity' || name === 'budget' ? parseInt(value) || 0 : value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Simulate form submission
//     toast({
//       title: "Order submitted successfully!",
//       description: "Your bulk order has been created.",
//     });
//     Router.push('/brand');
//   };

//   const handleCancel = () => {
//     Router.push('/create-order');
//   };

//   return (
//     <div className="w-full max-w-4xl mx-auto px-4 py-8 animate-fade-in">
//       <div className="mb-6">
        
//         <h1 className="text-3xl font-medium mb-2">Create Bulk Order</h1>
//         <p className="text-muted-foreground">
//           Any influencer who meets your criteria can pick up this job
//         </p>
//       </div>

//       <Card>
//         <form onSubmit={handleSubmit}>
//           <CardHeader>
//             <CardTitle>Campaign Information</CardTitle>
//             <CardDescription>
//               Provide details about your campaign and requirements
//             </CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-6">
//             <div className="grid grid-cols-1 gap-4">
//               <div className="space-y-2">
//                 <Label htmlFor="campaignName">Campaign Name</Label>
//                 <Input
//                   id="campaignName"
//                   name="campaignName"
//                   placeholder="Summer Collection Launch"
//                   value={formData.campaignName}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
              
//               <div className="space-y-2">
//                 <Label htmlFor="productName">Product/Service</Label>
//                 <Input
//                   id="productName"
//                   name="productName"
//                   placeholder="Product or service being promoted"
//                   value={formData.productName}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
              
//               <div className="space-y-2">
//                 <Label htmlFor="reelRequirements">Reel Requirements</Label>
//                 <Textarea
//                   id="reelRequirements"
//                   name="reelRequirements"
//                   placeholder="Describe what you want influencers to showcase and mention in their reels"
//                   value={formData.reelRequirements}
//                   onChange={handleChange}
//                   rows={4}
//                   required
//                 />
//               </div>
//             </div>
            
//             <Separator />
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label htmlFor="quantity">Minimum Quantity</Label>
//                 <div className="relative">
//                   <Input
//                     id="quantity"
//                     name="quantity"
//                     type="number"
//                     min={100}
//                     step={50}
//                     value={formData.quantity}
//                     onChange={handleChange}
//                     required
//                   />
//                   <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-muted-foreground text-sm">
//                     Reels
//                   </div>
//                 </div>
//                 <p className="text-xs text-muted-foreground">Minimum 100 reels required</p>
//               </div>
              
//               <div className="space-y-2">
//                 <Label htmlFor="budget">Total Budget</Label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
//                     $
//                   </div>
//                   <Input
//                     id="budget"
//                     name="budget"
//                     type="number"
//                     min={1000}
//                     step={100}
//                     className="pl-8"
//                     value={formData.budget}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//                 <p className="text-xs text-muted-foreground">Estimated cost per reel: ${(formData.budget / formData.quantity).toFixed(2)}</p>
//               </div>
//             </div>
            
//             <div className="bg-muted p-4 rounded-lg">
//               <h4 className="font-medium mb-2">Order Summary</h4>
//               <ul className="space-y-1 text-sm">
//                 <li className="flex justify-between">
//                   <span>Total Reels:</span>
//                   <span>{formData.quantity}</span>
//                 </li>
//                 <li className="flex justify-between">
//                   <span>Total Budget:</span>
//                   <span>${formData.budget.toLocaleString()}</span>
//                 </li>
//                 <li className="flex justify-between">
//                   <span>Average Cost Per Reel:</span>
//                   <span>${(formData.budget / formData.quantity).toFixed(2)}</span>
//                 </li>
//               </ul>
//             </div>
//           </CardContent>
//           <CardFooter className="flex justify-between">
//             <Button variant="outline" type="button" onClick={handleCancel}>
//               Cancel
//             </Button>
//             <Button type="submit">
//               Create Bulk Order
//             </Button>
//           </CardFooter>
//         </form>
//       </Card>
//     </div>
//   );
// };

// export default BulkOrderForm;
