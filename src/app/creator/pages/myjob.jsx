import { AppHeader } from "../../../components/appHeader";
import { JobCard } from "../../../components/jobCard";
import { formatJobDetails, getUserJobs } from "@/services/appService";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const MyJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const loadData = () => {
      const userJobs = getUserJobs();
      setJobs(userJobs.map(job => formatJobDetails(job)));
      setLoading(false);
    };

    // Add a small delay to simulate API call
    const timer = setTimeout(loadData, 500);
    return () => clearTimeout(timer);
  }, []);

  // Filter jobs based on status
  const pendingJobs = jobs.filter(job => 
    job.status === "pending-submission" || 
    job.status === "admin-rejected" || 
    job.status === "client-rejected"
  );
  
  const inProgressJobs = jobs.filter(job => 
    job.status === "submitted" || 
    job.status === "admin-review" || 
    job.status === "admin-approved" 
  );
  
  const completedJobs = jobs.filter(job => 
    job.status === "client-approved" || 
    job.status === "completed"
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AppHeader />
      
      <main className="flex-1 container py-6 md:py-10 animate-fade-in">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">My Jobs</h1>
          <p className="text-muted-foreground mt-2">
            Track and manage all your claimed jobs
          </p>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((index) => (
              <div 
                key={index} 
                className="h-[200px] rounded-lg bg-gray-100 animate-pulse"
              />
            ))}
          </div>
        ) : jobs.length > 0 ? (
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Jobs ({jobs.length})</TabsTrigger>
              <TabsTrigger value="pending">Pending ({pendingJobs.length})</TabsTrigger>
              <TabsTrigger value="in-progress">In Progress ({inProgressJobs.length})</TabsTrigger>
              <TabsTrigger value="completed">Completed ({completedJobs.length})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="pending" className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pendingJobs.length > 0 ? (
                  pendingJobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))
                ) : (
                  <div className="col-span-full text-center py-8">
                    <p className="text-muted-foreground">No pending jobs</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="in-progress" className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {inProgressJobs.length > 0 ? (
                  inProgressJobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))
                ) : (
                  <div className="col-span-full text-center py-8">
                    <p className="text-muted-foreground">No jobs in progress</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="completed" className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {completedJobs.length > 0 ? (
                  completedJobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))
                ) : (
                  <div className="col-span-full text-center py-8">
                    <p className="text-muted-foreground">No completed jobs</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <h3 className="text-xl font-semibold mb-2">No Jobs Yet</h3>
            <p className="text-muted-foreground text-center max-w-md">
              You haven't claimed any jobs yet. Browse available orders and start earning!
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default MyJobs;