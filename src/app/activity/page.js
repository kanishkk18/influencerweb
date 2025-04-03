// import {
//   fetchJobApplicationsForCandidate,
//   fetchJobsForCandidateAction,
// } from "@/actions";
// import CandidateActivity from "@/components/candidate-activity";
// import { currentUser } from "@clerk/nextjs";

// export default async function Activity() {
//   const user = await currentUser();
//   const jobList = await fetchJobsForCandidateAction();
//   const jobApplicants = await fetchJobApplicationsForCandidate(user?.id);

//   return <CandidateActivity jobList={jobList} jobApplicants={jobApplicants} />;
// }

"use client";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import CandidateActivity from "@/components/candidate-activity";
import { fetchJobApplicationsForCandidate, fetchJobsForCandidateAction } from "@/actions";

export default function Activity() {
  const { user, isLoaded } = useUser();
  const [jobList, setJobList] = useState([]);
  const [jobApplicants, setJobApplicants] = useState([]);

  useEffect(() => {
    if (isLoaded && user) {
      async function fetchData() {
        const jobs = await fetchJobsForCandidateAction();
        const applications = await fetchJobApplicationsForCandidate(user.id);
        setJobList(jobs);
        setJobApplicants(applications);
      }
      fetchData();
    }
  }, [isLoaded, user]);

  if (!isLoaded) return <p>Loading...</p>;

  return <CandidateActivity jobList={jobList} jobApplicants={jobApplicants} />;
}
