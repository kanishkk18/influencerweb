"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import Header from "../header";
import { fetchProfileAction } from "@/actions";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export default function CommonLayout({ children, ...props }) {
  const { user } = useUser(); // Use useUser() instead of currentUser()
  const [profileInfo, setProfileInfo] = useState(null);

  useEffect(() => {
    async function fetchUserData() {
      if (user?.id) {
        const profile = await fetchProfileAction(user.id);
        setProfileInfo(profile);
      }
    }
    fetchUserData();
  }, [user]);

  return (
    <NextThemesProvider {...props}>
      <div>
        {/* Header Component */}
        <Header className="z-50" profileInfo={profileInfo} user={user} />
        {/* Header Component */}

        {/* Main Content */}
        <main className="pt-10">{children}</main>
        {/* Main Content */}
      </div>
    </NextThemesProvider>
  );
}



// import { currentUser } from "@clerk/nextjs";
// import Header from "../header";
// import { fetchProfileAction } from "@/actions";
// import * as React from "react";
// import { ThemeProvider as NextThemesProvider } from "next-themes";

// async function CommonLayout({ children, ...props }) {
//   const user = await currentUser();
//   const profileInfo = await fetchProfileAction(user?.id);

//   return (
//     <NextThemesProvider {...props}>
//       <div className="">
//         {/* Header Component */}
//         <Header className="z-50"
//           profileInfo={profileInfo}
//           user={JSON.parse(JSON.stringify(user))}
//         />
//         {/* Header Component */}

//         {/* Main Content */}
//         <main className="pt-10">{children}</main>

//         {/* Main Content */}
//       </div>
//     </NextThemesProvider>
//   );
// }

// export default CommonLayout;
