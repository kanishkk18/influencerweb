// import { fetchProfileAction } from "@/actions";
// import AccountInfo from "@/components/account-info";
// import { currentUser } from "@clerk/nextjs";
// import { redirect } from "next/navigation";

// async function AccountPage() {
//   const user = await currentUser();
//   const profileInfo = await fetchProfileAction(user?.id);
//   if (!profileInfo) redirect("/onboard");
//   return <AccountInfo profileInfo={profileInfo} />;
// }

// export default AccountPage;
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { fetchProfileAction } from "@/actions";
import AccountInfo from "@/components/account-info";

function AccountPage() {
  const { user } = useUser();
  const router = useRouter();
  const [profileInfo, setProfileInfo] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      if (user?.id) {
        const profile = await fetchProfileAction(user.id);
        if (!profile) {
          router.push("/onboard");
        } else {
          setProfileInfo(profile);
        }
      }
    }
    fetchProfile();
  }, [user, router]);

  if (!profileInfo) return <p>Loading...</p>;

  return <AccountInfo profileInfo={profileInfo} />;
}

export default AccountPage;
