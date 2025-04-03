import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { getCurrentUser, switchUser } from "@/services/appService";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { mockInfluencers } from "@/services/mockData";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { getGradeDetails } from "@/services/appService";
import { GradeTag } from "./gradeTag";
import { 
  Building, 
  Home, 
  Menu, 
  User,
  Users,
  Star,
  Instagram,
  Youtube
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

export function AppHeader() {
  const router = useRouter();  // ✅ Next.js Router
  const currentUser = getCurrentUser();
  const gradeDetails = getGradeDetails(currentUser.grade);
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!isMobile && open) {
      setOpen(false);
    }
  }, [isMobile, open]);

  // ✅ Navigation Items
  const navItems = [
    { name: "Dashboard", href: "/", icon: <Home className="w-4 h-4 mr-2" /> },
    { name: "My Jobs", href: "/creator/pages/myjob", icon: <Building className="w-4 h-4 mr-2" /> },
    { name: "Grade System", href: "/creator/pages/gradeSystem", icon: <Star className="w-4 h-4 mr-2" /> },
    { name: "Instagram Influencers", href: "/creator/pages/instagramInfluencers", icon: <Instagram className="w-4 h-4 mr-2" /> },
    { name: "YouTube Influencers", href: "/creator/pages/youtubeInfluencers", icon: <Youtube className="w-4 h-4 mr-2" /> },
  ];

  const renderNavLinks = () => (
    <>
      {navItems.map((item) => {
        const isActive = router.pathname === item.href;  // ✅ Next.js Route Matching
        return (
          <Button 
            key={item.name} 
            variant={isActive ? "default" : "ghost"} 
            asChild 
            className={`justify-start ${isActive ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary'}`}
          >
            <Link href={item.href}>
              {item.icon}
              {item.name}
            </Link>
          </Button>
        );
      })}
    </>
  );

  // ✅ Switch User (Demo)
  const handleSwitchUser = (userId) => {
    switchUser(userId);
    window.location.reload();
  };

  return (
    <header className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
      <div className="flex h-16 items-center px-4 container mx-auto">
        
        {/* Logo */}
        <div className="flex items-center mr-4 text-xl font-bold">
          
          <span className="text-foreground">Influwebhub</span>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-2 ml-4">
          {renderNavLinks()}
        </nav>
        
        {/* Mobile Navigation */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 sm:w-80">
            <div className="flex items-center mr-4 text-xl font-bold mt-6 mb-6">
              <Users className="w-6 h-6 mr-2 text-primary" />
              <span>InfluMarket</span>
            </div>
            <nav className="flex flex-col space-y-1">
              {renderNavLinks()}
            </nav>
          </SheetContent>
        </Sheet>
        
        {/* User Profile & Grade */}
        <div className="ml-auto flex items-center space-x-4">
          
          {/* Grade Badge */}
          <GradeTag grade={currentUser.grade} />
          
          {/* User Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={currentUser.avatar || ""} alt={currentUser.name} />
                  <AvatarFallback className="bg-primary">
                    {currentUser.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{currentUser.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {currentUser.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>
                <div className="flex justify-between items-center">
                  <span>Grade</span>
                  <span className="text-sm font-semibold">
                    {gradeDetails.gradeName}
                  </span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Switch User (Demo)</DropdownMenuLabel>
              {mockInfluencers.map(user => (
                <DropdownMenuItem key={user.id} onClick={() => handleSwitchUser(user.id)}>
                  <User className="w-4 h-4 mr-2" />
                  <span>{user.name}</span>
                  <GradeTag grade={user.grade} className="ml-auto" />
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
