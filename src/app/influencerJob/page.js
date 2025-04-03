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
// import { ScrollArea } from "@/components/ui/scroll-area";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { formatOrderDetails, getAvailableOrders } from "@/utils";
import { ChevronRight, BarChart2, Star, TrendingUp, Users, Award, Instagram, Youtube, IndianRupee } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";



export default function JobsPage({ searchParams, status }) {
  const { user } = useUser();
  const [profileInfo, setProfileInfo] = useState(null);
  const [jobList, setJobList] = useState([]);
  const [jobApplications, setJobApplications] = useState([]);
  const [filterCategories, setFilterCategories] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  
  
    useEffect(() => {
      // Simulate loading data
      const loadData = () => {
        const availableOrders = getAvailableOrders();
        setOrders(availableOrders.map(order => formatOrderDetails(order)));
        setLoading(false);
      };
  
      // Add a small delay to simulate API call
      const timer = setTimeout(loadData, 500);
      return () => clearTimeout(timer);
    }, []);
  
    const stats = [
      { 
        title: "Total Earnings", 
        value: "₹500", 
        change: "+22%", 
        icon: <TrendingUp className="h-5 w-5 text-emerald-500" /> 
      },
      { 
        title: "Jobs Completed", 
        value: "2", 
        change: "+1", 
        icon: <Award className="h-5 w-5 text-purple-500" /> 
      },
      { 
        title: "Current Grade", 
        value: "Grade 8", 
        change: "", 
        icon: <Star className="h-5 w-5 text-amber-500" /> 
      },
      { 
        title: "Campaigns", 
        value: "11", 
        change: "+1", 
        icon: <BarChart2 className="h-5 w-5 text-blue-500" /> 
      },
    ];
  
    const platforms = [
      {
        name: "Instagram",
        influencers: 2450,
        icon: <Instagram className="h-5 w-5 text-text-white" />,
        color: "from-pink-500 to-purple-500",
        link: "/instagram-influencers"
      },
      {
        name: "YouTube",
        influencers: 1820,
        icon: <Youtube className="h-5 w-5 text-white" />,
        color: "from-red-500 to-orange-500",
        link: "/youtube-influencers"
      }
    ];

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
    <div className="py-20 bg-black ">

      <div className="px-[66px]">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Dashboard</h1>
                  <p className="text-muted-foreground mt-1">Welcome back to your influencer dashboard</p>
                </div>
                
                <div className="flex gap-3">
                  <p>{jobList?.length}</p>
                   <Link href="/grading">
                  <Button className="bg-gradient-to-r from-purple-500 to-pink-500 border-0">
                    Grade System
                  </Button></Link>
                  <Button variant="outline" className="border-border bg-background/30 hover:bg-secondary/70 text-foreground">
                    View Analytics
                  </Button>
                </div>
              </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                       
                          <Card className="bg-gray-800/30 border-gray-700 backdrop-blur-md overflow-hidden">
                           <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0 pointer-events-none"></div>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                              <CardTitle className="text-sm font-medium text-muted-foreground">Total Earnings</CardTitle>
                              <div className="p-2 bg-gray-800/50 rounded-md"><TrendingUp className="h-5 w-5 text-emerald-500" /> </div>
                            </CardHeader>
                            <CardContent>
                              <div className="flex items-baseline gap-2">
                                <div className="text-2xl font-bold flex justify-center items-center gap-1"><IndianRupee/>0</div>
                               
                              </div>
                            </CardContent>
                          </Card>

                          <Card className="bg-gray-800/30 border-gray-700 backdrop-blur-md overflow-hidden">
                           <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0 pointer-events-none"></div>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                              <CardTitle className="text-sm font-medium text-muted-foreground">Jobs Completed</CardTitle>
                              <div className="p-2 bg-gray-800/50 rounded-md"><Award className="h-5 w-5 text-purple-500" /> </div>
                            </CardHeader>
                            <CardContent>
                            <div className="flex items-baseline gap-2">
  <div className="text-2xl font-bold">
    {jobList && jobList.profileInfo && jobList.profileInfo.status
      ? jobList.profileInfo.status.length
      : "0"}
  </div>
</div>
                            </CardContent>
                          </Card>

                          <Card className="bg-gray-800/30 border-gray-700 backdrop-blur-md overflow-hidden">
                           <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0 pointer-events-none"></div>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                              <CardTitle className="text-sm font-medium text-muted-foreground">Current Grade</CardTitle>
                              <div className="p-2 bg-gray-800/50 rounded-md"><Star className="h-5 w-5 text-amber-500" /> </div>
                            </CardHeader>
                            <CardContent>
                              <div className="flex items-baseline gap-2">
                                <div className="text-2xl font-bold">Grade 8</div>
                               
                              </div>
                            </CardContent>
                          </Card>

                          <Card className="bg-gray-800/30 border-gray-700 backdrop-blur-md overflow-hidden">
                           <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0 pointer-events-none"></div>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                              <CardTitle className="text-sm font-medium text-muted-foreground">Campaigns</CardTitle>
                              <div className="p-2 bg-gray-800/50 rounded-md"><BarChart2 className="h-5 w-5 text-blue-500" /> </div>
                            </CardHeader>
                            <CardContent>
                              <div className="flex items-baseline gap-2">
                                <div className="text-2xl font-bold">{jobList?.length}</div>
                               
                              </div>
                            </CardContent>
                          </Card>
                          
                       
                      </div>

                       {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        {jobList.map((stat, index) => (
                          <Card key={index} className="bg-gray-800/30 border-gray-700 backdrop-blur-md overflow-hidden">
                           <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0 pointer-events-none"></div>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                              <div className="p-2 bg-gray-800/50 rounded-md">{stat.icon}</div>
                            </CardHeader>
                            <CardContent>
                              <div className="flex items-baseline gap-2">
                                <div className="text-2xl font-bold">{stat.experience}</div>
                                {stat.change && (
                                  <p className="text-xs font-medium text-emerald-400">{stat.change}</p>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div> */}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                {platforms.map((platform, index) => (
                                  <Card key={index} className="bg-gray-800/30 border-gray-700 backdrop-blur-md overflow-hidden">
                                    <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${platform.color}`}></div>
                                    <CardHeader className="flex flex-row items-center justify-between">
                                      <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-md bg-gradient-to-br ${platform.color}`}>
                                          {platform.icon}
                                        </div>
                                        <CardTitle className="text-lg">{platform.name}</CardTitle>
                                      </div>
                                      <Button variant="ghost" className="text-muted-foreground hover:text-foreground" asChild>
                                        <Link href="#">
                                          <span>View All</span>
                                          <ChevronRight className="h-4 w-4 ml-1" />
                                        </Link>
                                      </Button>
                                    </CardHeader>
                                    <CardContent>
                                      <div className="flex items-center justify-between">
                                        <div>
                                          <p className="text-sm text-muted-foreground mb-1">Available Influencers</p>
                                          <div className="flex items-baseline gap-2">
                                            <p className="text-2xl font-bold">{platform.influencers.toLocaleString()}</p>
                                            <Users className="h-4 w-4 text-muted-foreground" />
                                          </div>
                                        </div>
                                        <Button asChild className={`bg-gradient-to-r ${platform.color} border-0 text-white`}>
                                          <Link href={platform.link}>Browse</Link>
                                        </Button>
                                      </div>
                                    </CardContent>
                                  </Card>
                                ))}
                              </div>
                              </div>
      
      <JobListing
        user={user}
        profileInfo={profileInfo}
        jobList={jobList}
        jobApplications={jobApplications}
        filterCategories={filterCategories}
      />
     
    </div>
  );
}