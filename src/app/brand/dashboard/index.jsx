"use client";

import Layout from '../Layout';
import OrderSummary from './OrderSummary';
import ActiveCampaigns from './ActiveCampaigns';
import RecentActivity from './RecentActivity';
import { Button } from "@/components/ui/button";
import Link from 'next/link';
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
import { ScrollArea } from '@/components/ui/scroll-area';

const Index = ({ searchParams }) => {
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
    <Layout>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-medium animate-slide-down">Dashboard</h1>
          <p className="text-muted-foreground animate-slide-down" style={{ animationDelay: "0.1s" }}>
            Welcome back to your influencer marketing platform
          </p>
        </div>
        
        <Link
          href="/create"
          className="animate-slide-down"
          style={{ animationDelay: "0.2s" }}
        >
          <Button variant="default">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
            <path d="M12 5v14" />
            <path d="M5 12h14" />
          </svg>
          Create New Order
          </Button>
        </Link>
      </div>
      
      <OrderSummary />
      
      <div className="grid grid-cols-1 md:flex md:w-full md:gap-6 ">
                <ScrollArea className="md:h-[390px] flex mt-6 border rounded-lg p-4 w-fit">
 <div className="flex items-center justify-between">
        <h1>Active Campaigns</h1>
        <Button variant="ghost" size="sm">View All</Button>
      </div>
      <h1>Monitor your ongoing campaigns</h1>
        <JobListing
        user={user}
        profileInfo={profileInfo}
        jobList={jobList}
        jobApplications={jobApplications}
        filterCategories={filterCategories}
      /></ScrollArea>
       <RecentActivity />
        {/* <ActiveCampaigns />  */}
      </div>
    </Layout>
  );
};

export default Index;
