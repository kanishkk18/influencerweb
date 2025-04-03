// import { fetchAllFeedPostsAction, fetchProfileAction } from "@/actions";
// import Feed from "@/components/feed";
// import { currentUser } from "@clerk/nextjs";
// import { redirect } from "next/navigation";

// async function FeedPage() {
//   const user = await currentUser();
//   const profileInfo = await fetchProfileAction(user?.id);
//   if (!profileInfo) redirect("/onboard");

//   const allFeedPosts = await fetchAllFeedPostsAction();

//   return (
//     <Feed
//       allFeedPosts={allFeedPosts}
//       user={JSON.parse(JSON.stringify(user))}
//       profileInfo={profileInfo}
//     />
//   );
// }

// export default FeedPage;
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { fetchAllFeedPostsAction, fetchProfileAction } from "@/actions";
import Feed from "@/components/feed";

function FeedPage() {
  const { user } = useUser();
  const router = useRouter();
  const [profileInfo, setProfileInfo] = useState(null);
  const [allFeedPosts, setAllFeedPosts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      if (user?.id) {
        const profile = await fetchProfileAction(user.id);
        if (!profile) {
          router.push("/onboard");
          return;
        }
        setProfileInfo(profile);

        const feedPosts = await fetchAllFeedPostsAction();
        setAllFeedPosts(feedPosts);
      }
    }
    fetchData();
  }, [user, router]);

  if (!profileInfo) return <p>Loading...</p>;

  return (
    <Feed
      allFeedPosts={allFeedPosts}
      user={JSON.parse(JSON.stringify(user))}
      profileInfo={profileInfo}
    />
  );
}

export default FeedPage;
