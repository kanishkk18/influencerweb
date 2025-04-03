"use client";

import { Fragment, useState } from "react";

import CommonCard from "../common-card";
import JobIcon from "../job-icon";
import { Button } from "../ui/button";
import { createJobApplicationAction } from "@/actions";
import { useToast } from "../ui/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"; // Assumin

function CandidateJobCard({ jobItem, profileInfo, jobApplications }) {
  const [showJobDetailsDrawer, setShowJobDetailsDrawer] = useState(false);
  console.log(jobApplications, "jobApplications");
  const { toast } = useToast();

  async function handlejobApply() {
    if (!profileInfo?.isPremiumUser && jobApplications.length >= 2) {
      setShowJobDetailsDrawer(false);
      toast({
        variant: "destructive",
        title: "You can apply max 2 jobs.",
        description: "Please opt for membership to apply for more jobs",
      });
      return;
    }

    await createJobApplicationAction(
      {
        recruiterUserID: jobItem?.recruiterId,
        name: profileInfo?.candidateInfo?.name,
        email: profileInfo?.email,
        candidateUserID: profileInfo?.userId,
        status: ["Applied"],
        jobID: jobItem?._id,
        jobAppliedDate: new Date().toLocaleDateString(),
      },
      "/jobs"
    );
    setShowJobDetailsDrawer(false);
  }

  return (
    <Fragment>
    <Dialog open={showJobDetailsDrawer} onOpenChange={setShowJobDetailsDrawer}>
      <CommonCard
        icon={<JobIcon />}
        title={jobItem?.title}
        description={jobItem?.companyName}
        footerContent={
          <Button
            onClick={() => setShowJobDetailsDrawer(true)}
            className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white 
              hover:from-purple-600 hover:via-pink-600 hover:to-red-600 transition-all duration-300 
              font-medium shadow-lg hover:shadow-xl"
          >
            Explore Campaign
          </Button>
        }
      />
      
      <AnimatePresence>
        {showJobDetailsDrawer && (
          <DialogContent className="sm:max-w-[700px] p-0 border-none bg-transparent">
            <motion.div
              initial={{ opacity: 0, y: 50, rotateX: -15 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, y: 50, rotateX: 15 }}
              transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
              className="relative bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 
                rounded-2xl shadow-2xl overflow-hidden border border-indigo-500/20"
            >
              {/* Animated Background Elements */}
              <motion.div 
                className="absolute inset-0 opacity-20"
                animate={{
                  background: [
                    "radial-gradient(circle at 20% 20%, #8b5cf6, transparent 70%)",
                    "radial-gradient(circle at 80% 80%, #ec4899, transparent 70%)",
                  ],
                }}
                transition={{ duration: 4, repeat: Infinity, repeatType: "mirror" }}
              />
              <div className="absolute inset-0 bg-grid-pattern opacity-10" />
  
              <div className="relative p-8 backdrop-blur-sm bg-black/30">
                <DialogHeader>
                  <div className="flex items-center justify-between">
                    <DialogTitle className="text-4xl font-extrabold text-transparent bg-clip-text 
                      bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 animate-text-glow">
                      {jobItem?.title}
                    </DialogTitle>
                    {/* <motion.button
                      whileHover={{ scale: 1.2, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setShowJobDetailsDrawer(false)}
                      className="p-2 rounded-full bg-gray-800/50 hover:bg-gray-700/50 text-white 
                        transition-colors border border-gray-700/50"
                    >
                      ✕
                    </motion.button> */}
                  </div>
                </DialogHeader>
  
                <DialogDescription className="mt-3 text-lg text-gray-200 font-medium">
                  {jobItem?.description}
                  <motion.span 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="block mt-2 text-base text-indigo-300"
                  >
                    🌍 {jobItem?.location}
                  </motion.span>
                </DialogDescription>
  
                <div className="mt-6 space-y-6">
                  <motion.div 
                    whileHover={{ scale: 1.05, rotate: 1 }}
                    className="inline-block px-5 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 
                      rounded-xl shadow-lg border border-purple-500/50"
                  >
                    <h2 className="text-xl font-bold text-white animate-pulse-slow">
                      {jobItem?.type}
                    </h2>
                  </motion.div>
  
                  <h3 className="text-2xl font-semibold text-white">
                     
                    <motion.span 
                      className="ml-2 text-pink-400"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {jobItem?.experience}
                    </motion.span> year{jobItem?.experience !== 1 ? 's' : ''}
                  </h3>
  
                  <div className="flex flex-wrap gap-3">
                    {jobItem?.skills.split(",").map((skillItem, index) => (
                      <motion.div
                        key={skillItem}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1, type: "spring" }}
                        whileHover={{ scale: 1.1, boxShadow: "0 0 15px rgba(168, 85, 247, 0.3)" }}
                        className="px-4 py-2 bg-gradient-to-r from-indigo-700 to-purple-700 
                          rounded-xl shadow-md border border-indigo-500/30 hover:border-purple-400/50"
                      >
                        <h2 className="text-sm font-medium text-white">
                          {skillItem.trim()}
                        </h2>
                      </motion.div>
                    ))}
                  </div>
                </div>
  
                <div className="mt-8 flex gap-4 justify-end">
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(255, 255, 255, 0.2)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowJobDetailsDrawer(false)}
                    className="px-6 py-2 rounded-xl bg-gray-800/50 text-white hover:bg-gray-700/50 
                      border border-gray-700/50 transition-colors"
                  >
                    Close
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(236, 72, 153, 0.4)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handlejobApply}
                    disabled={jobApplications.findIndex((item) => item.jobID === jobItem?._id) > -1}
                    className={`px-6 py-2 rounded-xl font-semibold transition-all duration-300
                      ${jobApplications.findIndex((item) => item.jobID === jobItem?._id) > -1
                        ? "bg-gray-700/50 text-gray-400 cursor-not-allowed border border-gray-600/50"
                        : "bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white"}`}
                  >
                    {jobApplications.findIndex((item) => item.jobID === jobItem?._id) > -1
                      ? "Applied ✓"
                      : "Apply Now"}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </DialogContent>
        )}
      </AnimatePresence>
    </Dialog>
  </Fragment>
  
 
  );
}

export default CandidateJobCard;
