"use client";

import CandidateList from "../candidate-list";
import { Drawer, DrawerContent } from "../ui/drawer";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { DotPattern } from "@/components/magicui/dot-pattern";
import { cn } from "@/lib/utils";
import { RetroGrid } from "@/components/magicui/retro-grid";




function JobApplicants({
  showApplicantsDrawer,
  setShowApplicantsDrawer,
  showCurrentCandidateDetailsModal,
  setShowCurrentCandidateDetailsModal,
  currentCandidateDetails,
  setCurrentCandidateDetails,
  jobItem,
  jobApplications,
}) {
  return (
    <Drawer open={showApplicantsDrawer} onOpenChange={setShowApplicantsDrawer}>
      <DrawerContent className="max-h-[65vh] border-none bg-black">
      {/* <DotPattern
        className={cn(
          "[mask-image:radial-gradient(700px_circle_at_center,white,transparent)]",
        )}
      /> */}
            <RetroGrid />

        <ScrollArea className="h-screen overflow-y-scroll" orientation="vertical">
          <CandidateList
            currentCandidateDetails={currentCandidateDetails}
            setCurrentCandidateDetails={setCurrentCandidateDetails}
            jobApplications={jobApplications}
            showCurrentCandidateDetailsModal={showCurrentCandidateDetailsModal}
            setShowCurrentCandidateDetailsModal={
              setShowCurrentCandidateDetailsModal
            }
          />
                <ScrollBar orientation="vertical" />

        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
}

export default JobApplicants;
