"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import CommonForm from "../common-form";
import { initialPostNewJobFormData, postNewJobFormControls } from "@/utils";
import { postNewJobAction } from "@/actions";
import { useToast } from "@/components/ui/use-toast";
// import Link from "next/link";
// import BrandDash from "@/app/brand/CreateOrder"

function PostNewJob({ profileInfo, user, jobList }) {
  console.log(jobList, "jobList");
  const [showJobDialog, setShowJobDialog] = useState(false);
  const [jobFormData, setJobFormData] = useState({
    ...initialPostNewJobFormData,
    companyName: profileInfo?.recruiterInfo?.companyName,
  });

  const { toast } = useToast();

  function handlePostNewBtnValid() {
    return Object.keys(jobFormData).every(
      (control) => jobFormData[control] !== ""
    );
  }

  function handleAddNewJob() {
    // if (!profileInfo?.isPremiumUser && jobList.length >= 2) {
    //   toast({
    //     variant: "destructive",
    //     title: "You can post max 2 jobs.",
    //     description: "Please opt for membership to post more jobs",
    //   });
    //   return;
    // }
    setShowJobDialog(true);
  }

  async function createNewJob() {
    await postNewJobAction(
      {
        ...jobFormData,
        recruiterId: user?.id,
        applicants: [],
      },
      "/jobs"
    );

    setJobFormData({
      ...initialPostNewJobFormData,
      companyName: profileInfo?.recruiterInfo?.companyName,
    });
    setShowJobDialog(false);
  }

  return (
    <div>
      <Button
        onClick={handleAddNewJob}
        className="disabled:opacity-60 flex h-9 items-center justify-center px-3"
      >
        Create Bulk Order
      </Button>
      <Dialog
        open={showJobDialog}
        onOpenChange={() => {
          setShowJobDialog(false);
          setJobFormData({
            ...initialPostNewJobFormData,
            companyName: profileInfo?.recruiterInfo?.companyName,
          });
        }}
      >

      
        <DialogContent className="sm:max-w-screen-md h-[600px] overflow-auto">
          <DialogHeader>
            <DialogTitle>Create Bulk Order</DialogTitle>
            <div className="grid gap-4 py-4">
              <CommonForm
              className="grid grid-cols-2 gap-4 py-4"
                buttonText={"Add"}
                formData={jobFormData}
                setFormData={setJobFormData}
                formControls={postNewJobFormControls}
                isBtnDisabled={!handlePostNewBtnValid()}
                action={createNewJob}
              />
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default PostNewJob;
