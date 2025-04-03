"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { fetchProfileAction } from "@/actions";
import OnBoard from "@/components/on-board";

function OnBoardPage() {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    async function checkProfile() {
      if (user?.id) {
        const profileInfo = await fetchProfileAction(user.id);
        if (profileInfo?._id) {
          router.push("/");
        }
      }
    }
    checkProfile();
  }, [user, router]);

  return <OnBoard />;
}

export default OnBoardPage;


// import { fetchProfileAction } from "@/actions";
// import OnBoard from "@/components/on-board";
// import { currentUser } from "@clerk/nextjs";
// import { redirect } from "next/navigation";

// async function OnBoardPage() {
//   //get the auth user from clerk
//   const user = await currentUser();

//   //fetch the profile info -> either user is candidate / user is recruiter
//   const profileInfo = await fetchProfileAction(user?.id);

//   if (profileInfo?._id) {
//     if (profileInfo?.role === "recruiter" && !profileInfo.isPremiumUser)
//       redirect("/membership");
//     else redirect("/");
//   } else return <OnBoard />;
// }

// export default OnBoardPage;
