// import { fetchJobsForCandidateAction, fetchProfileAction } from "@/actions";
// import Companies from "@/components/companies";
// import { currentUser } from "@clerk/nextjs";
// import { redirect } from "next/navigation";

// async function CompaniesPage() {
//   const user = await currentUser();
//   const profileInfo = await fetchProfileAction(user?.id);

//   if (!profileInfo) redirect("/onboard");
//   const jobsList = await fetchJobsForCandidateAction({});

//   return <Companies jobsList={jobsList} />;
// }

// export default CompaniesPage;


"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Companies from "@/components/companies";
import { fetchJobsForCandidateAction, fetchProfileAction } from "@/actions";

export default function CompaniesPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [jobsList, setJobsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (!isLoaded) return;

      if (!user) {
        router.push("/onboard");
        return;
      }

      const profileInfo = await fetchProfileAction(user.id);
      if (!profileInfo) {
        router.push("/onboard");
        return;
      }

      const jobs = await fetchJobsForCandidateAction({});
      setJobsList(jobs);
      setLoading(false);
    }

    fetchData();
  }, [isLoaded, user, router]);

  if (loading) return <p>Loading...</p>;

  return <Companies jobsList={jobsList} />;
}
