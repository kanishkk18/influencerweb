import Link from "next/link";

import MaxWidthWrapper from "./MaxWidthWrapper";
import { buttonVariants } from "../../../../download/components/ui/button";
import TextShine from "@/components/TextShine";
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,} from "@clerk/nextjs";


const Navbar = () => {
  const { setTheme } = useTheme()
  return (
    <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>

        <div className='flex h-14 items-center justify-between border-b border-zinc-200'>
          <Link href='/' className='flex z-40 font-semibold items-center justify-center gap-x-2 rounded-md'>
            <div className='flex justify-center items-center'>
              <img className="h-16 w-16 object-cover rounded-xl p-2" src="https://res.cloudinary.com/kanishkkcloud18/image/upload/v1740647241/CONFERIO/dbbzjpqczmrz7cw8pf3w.png" alt="" />
            </div>
          </Link>

          <div className="hidden items-center space-x-4 sm:flex">
            <Link
              href="/explore"
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
              })}
            >
              Explore
            </Link>
            <Link
              href="/brand"
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
              })}
            >
              brand
            </Link>
            {/* <Link
              href="/creator"
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
              })}
            >
              Creator
            </Link> */}
            <Link
              href="/featured/page"
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
              })}
            >
              Feature
            </Link>

            <Button variant="default"> 
              <SignInButton/>
            </Button>

            {/* <Link
              href="/login"
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
              })}
            >
              <TextShine text={"Login"} />
            </Link> */}
          
          </div>
          <DropdownMenu><DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
