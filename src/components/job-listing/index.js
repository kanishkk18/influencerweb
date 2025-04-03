"use client";

import { filterMenuDataArray, formUrlQuery } from "@/utils";
import CandidateJobCard from "../candidate-job-card";
import PostNewJob from "../post-new-job";
import RecruiterJobCard from "../recruiter-job-card";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "../ui/menubar";
import { Label } from "../ui/label";
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

  const filterMenus = filterMenuDataArray.map((item) => ({
    id: item.id,
    name: item.label,
    options: [
      ...new Set(filterCategories.map((listItem) => listItem[item.id])),
    ],
  }));

  console.log(filterParams, "filterParams");

  return (
    <div>
     
      <div className="mx-auto flex">
         <div className="flex w-full flex-col items-baseline  justify-between  h-fit  ">
          {/* <h1 className="text-4xl dark:text-white font-bold tracking-tight text-gray-900">
            {profileInfo?.role === "candidate"
              ? "Explore All Jobs"
              : "Jobs Dashboard"}
          </h1> */}
          <div className="flex h-full w-full flex-col items-center ">
            
            {profileInfo?.role === "candidate" ? (
              <div className="min-w-full flex px-16 py-6 justify-between items-center ">
                <h1 className="text-4xl dark:text-white font-bold tracking-tight text-gray-900">Available Campaigns </h1>
              <Menubar className=" relative h-fit flex justify-center items-center">
                {filterMenus.map((filterMenu) => (
                  <MenubarMenu>
                    <MenubarTrigger>{filterMenu.name}</MenubarTrigger>
                    <MenubarContent>
                      {filterMenu.options.map((option, optionIdx) => (
                        <MenubarItem
                          key={optionIdx}
                          className="flex items-center"
                          onClick={() => handleFilter(filterMenu.id, option)}
                        >
                          <div
                            className={`h-4 w-4 dark:border-white border rounded border-gray-900 ${
                              filterParams &&
                              Object.keys(filterParams).length > 0 &&
                              filterParams[filterMenu.id] &&
                              filterParams[filterMenu.id].indexOf(option) > -1
                                ? "bg-black dark:bg-white"
                                : ""
                            } `}
                          />

                          <Label className="ml-3 dark:text-white cursor-pointer text-sm text-gray-600">
                            {option}
                          </Label>
                        </MenubarItem>
                      ))}
                    </MenubarContent>
                  </MenubarMenu>
                ))}
              </Menubar>
              </div>
            ) : (
              <div>
            <div className="absolute top-5 right-4 ">
              <PostNewJob
                jobList={jobList}
                user={user}
                profileInfo={profileInfo}
              />
              </div>
              </div>
             )} 
          </div>
       
       
              <div className="container mx-auto p-0 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 ">
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
              </div> </div>
      </div>
    </div>
  );
}

export default JobListing;
