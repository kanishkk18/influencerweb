"use client";

import {
  createFilterCategoryAction,
  fetchJobApplicationsForCandidate,
  fetchJobApplicationsForRecruiter,
  fetchJobsForCandidateAction,
  fetchJobsForRecruiterAction,
  fetchProfileAction,
} from "@/actions";
import JobListing from "@/components/job-listing";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import VendorDash from "@/app/brand/dashboard/index";

export default function JobsPage({ searchParams }) {
  const { user } = useUser();
  const [profileInfo, setProfileInfo] = useState(null);
  const [jobList, setJobList] = useState([]);
  const [jobApplications, setJobApplications] = useState([]);
  const [filterCategories, setFilterCategories] = useState([]);

  useEffect(() => {
    async function fetchData() {
      if (user?.id) {
        const profile = await fetchProfileAction(user.id);
        setProfileInfo(profile);

        if (profile?.role === "candidate") {
          setJobList(await fetchJobsForCandidateAction(searchParams));
          setJobApplications(await fetchJobApplicationsForCandidate(user.id));
        } else {
          setJobList(await fetchJobsForRecruiterAction(user.id));
          setJobApplications(await fetchJobApplicationsForRecruiter(user.id));
        }

        setFilterCategories(await createFilterCategoryAction());
      }
    }
    fetchData();
  }, [user, searchParams]);

  return (
    <div>
      {/* <JobListing
        user={user}
        profileInfo={profileInfo}
        jobList={jobList}
        jobApplications={jobApplications}
        filterCategories={filterCategories}
      /> */}
      <VendorDash />
    </div>
  );
}


// "use Client";

// import {
//   createFilterCategoryAction,
//   fetchJobApplicationsForCandidate,
//   fetchJobApplicationsForRecruiter,
//   fetchJobsForCandidateAction,
//   fetchJobsForRecruiterAction,
//   fetchProfileAction,
// } from "@/actions";
// import JobListing from "@/components/job-listing";
// import { currentUser } from "@clerk/nextjs";
// // import Link from "next/link";
// import VendorDash from "@/app/brand/dashboard/index"

// async function JobsPage({ searchParams }) {
//   console.log(searchParams, "searchParams");
//   const user = await currentUser();
//   const profileInfo = await fetchProfileAction(user?.id);

//   const jobList =
//     profileInfo?.role === "candidate"
//       ? await fetchJobsForCandidateAction(searchParams)
//       : await fetchJobsForRecruiterAction(user?.id);

//   const getJobApplicationList =
//     profileInfo?.role === "candidate"
//       ? await fetchJobApplicationsForCandidate(user?.id)
//       : await fetchJobApplicationsForRecruiter(user?.id);

//   const fetchFilterCategories = await createFilterCategoryAction();

//   return (
//     <div>
//     <JobListing
//       user={JSON.parse(JSON.stringify(user))}
//       profileInfo={profileInfo}
//       jobList={jobList}
//       jobApplications={getJobApplicationList}
//       filterCategories={fetchFilterCategories}
//     />
// <VendorDash/>
//     </div>
//   );
// }

// export default JobsPage;
