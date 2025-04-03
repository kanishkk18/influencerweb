// import { fetchProfileAction } from "@/actions";
// import Membership from "@/components/membership";
// import { currentUser } from "@clerk/nextjs";
// import { redirect } from "next/navigation";

// async function MembershipPage() {
//   const user = await currentUser();
//   const profileInfo = await fetchProfileAction(user?.id);
//   if (!profileInfo) redirect("/onboard");

//   return <Membership profileInfo={profileInfo} />;
// }

// export default MembershipPage;

import React from "react";
async function MembershipPage() {//+
  
//+
  return (
    <div>
      <h1>Membership Page</h1>
      <p>This is the Membership Page.</p>
    </div>
  );//+
}//+
//+
export default MembershipPage;//+
