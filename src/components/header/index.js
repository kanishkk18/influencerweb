"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { AlignJustify, Moon } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { useTheme } from "next-themes";

function Header({ user, profileInfo }) {
  const { theme, setTheme } = useTheme();

  const menuItems = [
    { label: "Home", path: "/", show: true },
    { label: "Feed", path: "/feed", show: profileInfo },
    { label: "Login", path: "/sign-in", show: !user },
    { label: "Register", path: "/sign-up", show: !user },
    { label: "Activity", path: "/activity", show: profileInfo?.role === "candidate" },
    { label: "Companies", path: "/companies", show: profileInfo?.role === "candidate" },
    { label: "Dashboard", path: "/jobs", show: profileInfo?.role === "recruiter" },
    { label: "InfluencerDash", path: "/influencerJob", show: profileInfo?.role === "candidate" },
    { label: "Create", path: "/create", show: profileInfo?.role === "recruiter" },
    { label: "Account", path: "/account", show: profileInfo },
    { label: "Admin", path: "/admin", show: profileInfo?.role === "admin" },

];

  return (
    <div>
      <header className="fixed top-0 left-0 w-full z-[999] h-16 flex items-center backdrop-blur-lg bg-white/65 dark:bg-black/30 shadow-md">
        <Sheet>
          <SheetTrigger asChild>
            <Button className="lg:hidden">
              <AlignJustify className="h-6 w-6" />
              <span className="sr-only">Toggle Navigation Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <Link href="/" className="flex z-40 font-semibold items-center justify-center gap-x-2 rounded-md">
              <div className="flex justify-center items-center">
                <img className="h-32 w-32 object-cover p-2" src="https://res.cloudinary.com/dna3hwzre/image/upload/v1741412694/karv81oea0dngca9xnvn.png" alt="Logo" />
              </div>
            </Link>
            <div className="grid gap-2 py-6">
              {menuItems.map((menuItem, index) =>
                menuItem.show ? (
                  <Link key={index} href={menuItem.path} className="flex w-full items-center py-2 text-lg font-semibold">
                    {menuItem.label}
                  </Link>
                ) : null
              )}
              <Moon
                className="cursor-pointer mb-4"
                fill={theme === "dark" ? "light" : "dark"}
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              />
              <UserButton afterSignOutUrl="/" />
            </div>
          </SheetContent>
        </Sheet>

        <Link href="/" className="flex z-40 font-semibold items-center justify-center gap-x-2 rounded-md">
          <div className="flex justify-center items-center">
            <img className="h-32 w-32 object-cover p-2" src="https://res.cloudinary.com/dna3hwzre/image/upload/v1741412694/karv81oea0dngca9xnvn.png" alt="Logo" />
          </div>
        </Link>

        <nav className="ml-auto hidden lg:flex gap-6 items-center">
          {menuItems.map((menuItem, index) =>
            menuItem.show ? (
              <Link
                key={index}
                href={menuItem.path}
                onClick={() => sessionStorage.removeItem("filterParams")}
                className="group inline-flex h-9 w-max items-center rounded-md px-4 py-2 text-sm font-medium"
              >
                {menuItem.label}
              </Link>
            ) : null
          )}
          <Moon
            className="cursor-pointer"
            fill={theme === "dark" ? "light" : "dark"}
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          />
          <UserButton afterSignOutUrl="/" />
        </nav>
      </header>
    </div>
  );
}

export default Header;
