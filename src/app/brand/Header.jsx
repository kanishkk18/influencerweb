
// import { useState } from 'react';
// import { Avatar } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import { toast } from "sonner";
// import Link from 'next/link';
// import { ClerkProvider,  SignInButton,
//   SignUpButton,
//   SignedIn,
//   SignedOut,
//   UserButton,
//   useUser,} from "@clerk/nextjs";
 


//   export default async function header() {
//   const [showNotifications, setShowNotifications] = useState(false);
//   const {user , isSignedIn , isLoaded}= useUser();

//   const toggleNotifications = () => {
//     setShowNotifications(!showNotifications);
//   };

//   return (
//     <header className="w-full px-6 py-4 flex items-center justify-between border-b animate-slide-down">
//       <div className="flex items-center gap-2">
//       <Link href='/' className='flex z-40 font-semibold items-center justify-center gap-x-2 rounded-md'>
//             <div className='flex justify-center items-center'>
//               <img className="h-16 w-16 object-cover rounded-xl p-2" src="https://res.cloudinary.com/kanishkkcloud18/image/upload/v1740647241/CONFERIO/dbbzjpqczmrz7cw8pf3w.png" alt="" />
//             </div>
//           </Link>      </div>
//       <div className="flex items-center gap-4">
//         {/* <Button 
//           variant="outline"
//           size="sm"
//           className="relative"
//           onClick={toggleNotifications}
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//             <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
//             <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
//           </svg>
//           <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-white text-xs rounded-full flex items-center justify-center">
//             3
//           </span>
//         </Button> */}
//         <div className="flex items-center gap-3">
//           <div className="text-right hidden sm:block">
//             <div className="text-sm font-medium">{user.fullName}</div>
//             <div className="text-xs text-muted-foreground">Brand Manager</div>
//           </div>
//           <UserButton/>
//         </div>
//       </div>
      
//       {/* {showNotifications && (
//         <div className="absolute right-6 top-16 w-80 z-50 bg-white dark:bg-gray-800 shadow-lg rounded-lg border p-4 animate-fade-in">
//           <h3 className="font-medium mb-2">Notifications</h3>
//           <div className="space-y-2">
//             <div className="p-2 hover:bg-muted rounded-md transition-colors">
//               <p className="text-sm">New influencer applied for your campaign</p>
//               <span className="text-xs text-muted-foreground">2 minutes ago</span>
//             </div>
//             <div className="p-2 hover:bg-muted rounded-md transition-colors">
//               <p className="text-sm">Content for "Summer Collection" is ready for review</p>
//               <span className="text-xs text-muted-foreground">1 hour ago</span>
//             </div>
//             <div className="p-2 hover:bg-muted rounded-md transition-colors">
//               <p className="text-sm">Campaign "Spring Launch" completed</p>
//               <span className="text-xs text-muted-foreground">Yesterday</span>
//             </div>
//           </div>
//           <Button variant="outline" size="sm" className="w-full mt-2">View all</Button>
//         </div>
//       )} */}
//     </header>
//   );
// };

import { useState } from 'react';
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Link from 'next/link';
import { ClerkProvider, SignInButton, SignUpButton, SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";

export default function Header() {  // Removed async
  const [showNotifications, setShowNotifications] = useState(false);
  const { user, isSignedIn, isLoaded } = useUser();

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <header className="w-full px-6 py-4 flex items-center justify-between border-b animate-slide-down">
      <div className="flex items-center gap-2">
        <Link href='/' className='flex z-40 font-semibold items-center justify-center gap-x-2 rounded-md'>
          <div className='flex justify-center items-center'>
            <img className="h-16 w-16 object-cover rounded-xl p-2" src="https://res.cloudinary.com/kanishkkcloud18/image/upload/v1740647241/CONFERIO/dbbzjpqczmrz7cw8pf3w.png" alt="" />
          </div>
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          {isLoaded && isSignedIn ? ( // Ensure user data is loaded
            <>
              <div className="text-right hidden sm:block">
                <div className="text-sm font-medium">{user.fullName}</div>
                {/* <div className="text-xs text-muted-foreground">{user.role}</div> */}
              </div>
              <UserButton />
            </>
          ) : (
            <SignInButton />
          )}
        </div>
      </div>
    </header>
  );
}



