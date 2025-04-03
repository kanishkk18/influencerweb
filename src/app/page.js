"use client"

import { useState } from "react";
// import MaxWidthWrapper from "@/components/MaxWidthWrapper";
// import HomeCard from "@/components/home/HomeCard";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Waitlist from "@/components/waitlist/page"
import { cn } from "@/lib/utils"
import { ArrowUpRight } from "lucide-react"
import Image from "next/image"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import GradientCard from "@/components/ui/gradientCard";
import PhoneComponent from "@/components/ui/phone";
import { Phone, Wifi, Users, Shuffle, Globe, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import FeatureCard from "@/components/ui/chooseUs";
import Spline from '@splinetool/react-spline/next';
import Categories from "@/components/ui/categories";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import Footer from "@/components/ui/footer";



function FAQItem({ question, answer, index }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
      <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
              duration: 0.3,
              delay: index * 0.15,
              ease: "easeOut",
          }}
          className={cn(
              "group rounded-lg border-[0.5px] border-gray-800/50",
              "transition-all duration-200 ease-in-out",
              isOpen
                  ? "bg-linear-to-br from-white/5 dark:via-white/2 to-white/5"
                  : "hover:bg-white/[0.02]"
          )}
      >
          <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="w-full px-6 py-4 flex items-center justify-between gap-4"
          >
              <h3
                  className={cn(
                      "text-base font-medium transition-colors duration-200 text-left",
                      "text-gray-300",
                      isOpen && "text-white"
                  )}
              >
                  {question}
              </h3>
              <motion.div
                  animate={{
                      rotate: isOpen ? 180 : 0,
                      scale: isOpen ? 1.1 : 1,
                  }}
                  transition={{
                      duration: 0.3,
                      ease: "easeInOut",
                  }}
                  className={cn(
                      "p-0.5 rounded-full shrink-0",
                      "transition-colors duration-200",
                      isOpen
                          ? "text-primary"
                          : "text-gray-500"
                  )}
              >
                  <ChevronDown className="h-4 w-4" />
              </motion.div>
          </button>
          <AnimatePresence initial={false}>
              {isOpen && (
                  <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                          height: "auto",
                          opacity: 1,
                          transition: {
                              height: {
                                  duration: 0.4,
                                  ease: [0.04, 0.62, 0.23, 0.98],
                              },
                              opacity: {
                                  duration: 0.25,
                                  delay: 0.1,
                              },
                          },
                      }}
                      exit={{
                          height: 0,
                          opacity: 0,
                          transition: {
                              height: {
                                  duration: 0.3,
                                  ease: "easeInOut",
                              },
                              opacity: {
                                  duration: 0.25,
                              },
                          },
                      }}
                  >
                      <div className="px-6 pb-4 pt-2">
                          <motion.p
                              initial={{ y: -8, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              exit={{ y: -8, opacity: 0 }}
                              transition={{
                                  duration: 0.3,
                                  ease: "easeOut",
                              }}
                              className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed"
                          >
                              {answer}
                          </motion.p>
                      </div>
                  </motion.div>
              )}
          </AnimatePresence>
      </motion.div>
  );
}

const index = () => {
  const creator = [
    {
      _id: "1",
      name: "john_doe",
      username: "john_doe",
      profileImage: "https://i.pinimg.com/736x/af/8a/b4/af8ab4550c6b7d2d6f61fe839a4580a5.jpg",
      platforms: [{ platform: "YouTube" }, { platform: "Instagram" }],
      packages: [{ price: "₹500" }],
      category: "Tech",
    },
    {
      _id: "2",
      username: "jane_smith",
      profileImage: "https://i.pinimg.com/474x/a6/e3/1b/a6e31b8357e6fe828b9c52f4c7d07b32.jpg",
      platforms: [{ platform: "TikTok" }, { platform: "Twitch" }],
      packages: [{ price: "₹400" }],
      category: "Gaming",
    },
    {
      _id: "3",
      username: "mark_travel",
      profileImage: "https://i.pinimg.com/474x/89/b9/db/89b9dbb94d8bf13215c2e82d4ee94c33.jpg",
      platforms: [{ platform: "Facebook" }, { platform: "YouTube" }],
      packages: [{ price: "₹600" }],
      category: "Travel",
    },
    {
      _id: "4",
      username: "lisa_fitness",
      profileImage: "https://i.pinimg.com/474x/d7/1f/9e/d71f9e2f67f2abeb495afeebc7351d34.jpg",
      platforms: [{ platform: "Instagram" }, { platform: "YouTube" }],
      packages: [{ price: "₹700" }],
      category: "Fitness",
    },
    {
      _id: "5",
      username: "alex_foodie",
      profileImage: "https://i.pinimg.com/736x/63/2d/aa/632daae3fcaa72624e32a4e9df3eed59.jpg",
      platforms: [{ platform: "YouTube" }, { platform: "TikTok" }],
      packages: [{ price: "₹550" }],
      category: "Food",
    },
    {
      _id: "6",
      username: "sara_art",
      profileImage: "https://i.pinimg.com/736x/61/25/d8/6125d88deaa06f6a546ad948cd008e12.jpg",
      platforms: [{ platform: "Pinterest" }, { platform: "Instagram" }],
      packages: [{ price: "₹450" }],
      category: "Art",
    },
    {
      _id: "7",
      username: "mike_coder",
      profileImage: "https://i.pinimg.com/736x/51/23/8f/51238f09d25a4a82fa0ff8d5c7a6ea2b.jpg",
      platforms: [{ platform: "GitHub" }, { platform: "YouTube" }],
      packages: [{ price: "₹800" }],
      category: "Programming",
    },
    {
      _id: "8",
      username: "emily_dance",
      profileImage: "https://i.pinimg.com/736x/8f/9e/d7/8f9ed7b2badaf48b1d9925253aec6ed6.jpg",
      platforms: [{ platform: "TikTok" }, { platform: "Instagram" }],
      packages: [{ price: "₹500" }],
      category: "Dance",
    },
    {
      _id: "9",
      username: "robert_photography",
      profileImage: "https://i.pinimg.com/736x/be/fe/b5/befeb5b82031ada8b823a594707f1a9d.jpg",
      platforms: [{ platform: "Instagram" }, { platform: "Flickr" }],
      packages: [{ price: "₹650" }],
      category: "Photography",
    },
    {
      _id: "10",
      username: "chris_music",
      profileImage: "https://i.pinimg.com/736x/da/fe/15/dafe155b72be46e0c1f64b8a03540a36.jpg",
      platforms: [{ platform: "Spotify" }, { platform: "YouTube" }],
      packages: [{ price: "₹750" }],
      category: "Music",
    },
    {
      _id: "11",
      username: "natalie_fashion",
      profileImage: "https://i.pinimg.com/736x/af/86/6f/af866fbd51e42f27c1a92e91c15aa1c5.jpg",
      platforms: [{ platform: "Instagram" }, { platform: "Pinterest" }],
      packages: [{ price: "₹900" }],
      category: "Fashion",
    },
    {
      _id: "12",

      username: "david_film",
      profileImage: "https://i.pinimg.com/736x/ad/cb/72/adcb72d1fc1942edce89f5a6258bab85.jpg",
      platforms: [{ platform: "YouTube" }, { platform: "Vimeo" }],
      packages: [{ price: "₹850" }],
      category: "Filmmaking",
    },
  ];


  return (
    <>
   
 <div className=" min-h-screen justify-center pt-10 md:pt-0 w-full items-center flex  mx-auto px-4 sm:px-6 lg:px-8 bg-black/90">
 <ScrollProgress className="top-[65px]" />

      <div className="grid  lg:grid-cols-2 gap-12 z-50 items-center min-h-[calc(100vh-6rem)]">
        {/* Left Column */}

        <div className="relative">
          <div className="space-y-8 max-w-xl">
            <div className="inline-flex items-center mt-2 gap-2 px-3 py-1 rounded-full bg-white/5 border border-blue-500/80">
            <p className="text-blue-400 text-sm  font-semibold cursor-pointer">
            Influwebhub is now public!
          </p></div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white">
            Influencer Marketing
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-orange-400">
              Made Easy.
              </span>
            </h1>

            <p className="text-lg text-zinc-400 leading-relaxed">
            Find and hire top Instagram, YouTube and Facebook influencers to create unique content for your brand


            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/sign-in" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-colors py-1.5 h-14 px-8 bg-white text-zinc-900 hover:bg-zinc-100 text-base group">
                Get Started 
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>

              <Link href="/feed" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium border py-2 h-14 px-8 bg-black border-zinc-800 text-white hover:bg-white/5">
                Featured
              </Link>
            </div>

            {/* Awards Section */}
            <div className="pt-12 border-t border-zinc-800">
              <div className="flex gap-8">
                {[1, 2, 3].map((award) => (
                  <div key={award} className="space-y-2">
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-violet-400 to-orange-400" />
                    </div>
                    <div className="text-sm text-zinc-400">Award {award}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Grid Cards */}
        <div className="relative lg:h-[600px]">
  <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/10 via-transparent to-orange-500/10 rounded-3xl blur-3xl" />

  <div className="relative h-full grid grid-cols-2 grid-rows-2 gap-4">
  {/* Large Card */}
  <div className="group relative rounded-2xl bg-white/5 border border-white/10 overflow-hidden transition-transform hover:scale-[1.02] row-span-2">
    <img src="https://i.pinimg.com/736x/e0/4f/2a/e04f2a52d851631a858ad0ccc07fd39a.jpg" alt="" />
  </div>

  {/* Small Cards with Dynamic Images */}
  {[
    {
      img: "https://i.pinimg.com/736x/e3/fe/ff/e3fefff1c28622a441609da145540ee8.jpg",
      name: "Sofia",
    },
    {
      img: "https://i.pinimg.com/736x/c9/24/50/c92450ced172f5c8270caa43affab948.jpg",
      name: "Emily",
    },
    {
      img: "https://i.pinimg.com/736x/b7/47/89/b74789abcbaee6d80a70b4df4c2fde21.jpg",
      name: "Olivia",
      small: true, // Mark this card as small
    },
  ].map((card, index) => (
    <div
      key={index}
      className="group relative rounded-2xl bg-white/5 border border-white/10 overflow-hidden transition-transform hover:scale-[1.02]"
    >
      <div className="relative z-10 flex justify-center items-center ">
        <div
          className={`rounded-xl bg-white/10 overflow-hidden ${
            card.small ? "w-full md:h-52 object-cover" : "w-full h-full object-cover"
          }`} // Reduce size if marked as small
        >
          <img src={card.img} alt={card.name} className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  ))}
</div>

</div>

      </div>
    </div>

    <section className="relative overflow-hidden py-12 md:py-20 border-b">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left content */}
          <div className="order-2 lg:order-1">
            <h1 className="text-2xl md:text-3xl lg:text-3xl font-bold mb-6 leading-tight">
              EMPOWERING BRANDS AND INFLUENCERS
              <br />
              FUEL YOUR GROWTH WITH US - 
              <span className="gradient-text">CONNECT, COLLABORATE, AND THRIVE</span>
            </h1>

            <p className="text-gray-600 dark:text-gray-300 text-lg mb-8 leading-relaxed">
              Unlock limitless potential with our influencer marketplace. Brands gain access to a vast network of influencers, 
              enabling seamless collaborations for powerful marketing campaigns. Influencers showcase their talent, expand their reach, 
              and monetize their influence. With our robust platform, you'll discover a range of services.
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-influencer-dark dark:text-white mb-2">Influencer Discovery:</h3>
                <p className="text-gray-600 dark:text-gray-300">Find the perfect match for your brand among our diverse pool of talented influencers.</p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-influencer-dark dark:text-white mb-2">Amplify Brand Reach:</h3>
                <p className="text-gray-600 dark:text-gray-300">Tap into the vast audience of influencers to amplify your brand's visibility, reach new markets, and increase customer engagement.</p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-influencer-dark dark:text-white mb-2">Targeted Campaigns:</h3>
                <p className="text-gray-600 dark:text-gray-300">Create tailored campaigns to engage specific audiences, ensuring your message resonates with precision.</p>
              </div>
            </div>

            <div className="mt-8">
              <Link href="/sign-in" className="bg-pink-400 hover:bg-opacity-90 rounded-full px-8 py-4 text-lg">
                Get Started
              </Link>
            </div>
          </div>

          {/* Right content */}
          <div className="order-1 lg:order-2 relative">
             <div className="relative  z-10 grid grid-cols-1 md:grid-cols-1 gap-4">
                {/* Main image */}
                <div className="col-span-1">
                  <img 
                    src="https://i.pinimg.com/736x/66/ce/85/66ce857f75e7143d59ea199ca508e8a8.jpg" 
                    alt="Influencer Marketing Platform" 
                    className="w-full h-[100%] rounded-lg"
                  />
                </div>
                
                {/* Second image */}
                <div className="col-span-1 md:absolute md:-bottom-28 md:-right-12">
                  <img 
                    src="https://i.pinimg.com/736x/47/e8/48/47e84887bb183d259999accccf2c7d91.jpg" 
                    alt="Person using laptop" 
                    className="w-96 h-auto rounded-lg object-cover"
                  />
                </div>
             
            </div>
          </div>
        </div>
      </div>
    </section>
    
     
      <div className="mt-20">

        <div className='absolute -top-5 z-50 h-10 w-full [mask:linear-gradient(90deg,transparent,black_20%,black_80%,transparent)] before:absolute before:inset-0 before:top-5 before:h-[1px] before:bg-gradient-to-r before:from-[#AE48FF] before:via-[#6C47FF] before:via-[25%] before:to-[#18CCFC] before:opacity-50 before:blur-[2px] after:absolute after:inset-0 after:left-1/2 after:top-5 after:h-[1px] after:w-3/4 after:-translate-x-1/2 after:bg-gradient-to-r after:from-[#AE48FF] after:via-[#6C47FF] after:via-[25%] after:to-[#18CCFC] after:[mask:linear-gradient(90deg,transparent,black,black,transparent)]' />
        <div className='absolute inset-0 isolate z-10 overflow-hidden before:absolute before:inset-0 before:bg-[url(/img/grid.svg)] before:[mask:radial-gradient(ellipse_farthest-side_at_50%_-25vw,black,transparent)] dark:before:opacity-10'>
          <div className='absolute left-1/2 top-0 h-12 w-1/2 -translate-x-1/2 -translate-y-3/4 rounded-[50%] bg-gradient-to-r from-[#AE48FF] via-[#6C47FF] via-[25%] to-[#18CCFC] opacity-20 blur-xl' />
        </div>
      </div>
      {/* value proposition section */}

  
      <div>
        <div className="relative isolate">
          <div>
            <div className="mx-auto max-w-7xl px-6 my-4">
              <h1 className="text-xl font-semibold ">Featured</h1>
              <p className="max-w-prose text-zinc-400 pb-3">
                Hire top influencers across all platforms
              </p>
          
              <ScrollArea className="w-full flex  whitespace-nowrap rounded-2xl p-2 py-3 border">
  <div className="flex space-x-4 mx-auto justify-center items-center"> {/* This ensures horizontal layout */}
    {creator.slice(0, 4).map((item) => (
      <Link
        key={item._id}
        // href={`/creator/${item.username}`}
        href=""
        className="block w-full min-w-[280px] max-w-[280px] group"
      >
        <div
          className={cn(
            "relative overflow-hidden rounded-2xl",
            "bg-white/80 dark:bg-zinc-900/80",
            "backdrop-blur-xl",
            "border border-zinc-200/50 dark:border-zinc-800/50",
            "shadow-xs",
            "transition-all duration-300",
            "hover:shadow-md",
            "hover:border-zinc-300/50 dark:hover:border-zinc-700/50"
          )}
        >
          <div className="relative h-[320px] overflow-hidden">
            <Image src={item.profileImage} alt="" fill className="object-cover" />
          </div>

          <div
            className={cn(
              "absolute inset-0",
              "bg-gradient-to-t from-black/50 via-black/20 to-transparent",
              "group-hover:from-black/90 group-hover:via-black/40",
              "transition-all duration-300"
            )}
          />

          <div className="absolute top-3 right-3 transition-opacity duration-300">
            <span
              className={cn(
                "px-2.5 py-1 rounded-full text-xs font-medium",
                "bg-white/90 text-zinc-800",
                "dark:bg-zinc-900/90 dark:text-zinc-200",
                "backdrop-blur-md",
                "shadow-xs",
                "border border-white/20 dark:border-zinc-800/50"
              )}
            >
              Grade A+
            </span>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-5 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <div className="flex items-center justify-between gap-3">
              <div className="space-y-1.5">
                {/* <h3 className="text-lg font-semibold text-white dark:text-zinc-100 leading-snug">
                  {item.packages[0].price}
                </h3> */}
                <p className="text-sm text-zinc-200 dark:text-zinc-300 line-clamp-2">
                  {item.platforms.map((cur) => `${cur.platform} `)}
                </p>
                <p className="text-sm text-zinc-200 dark:text-zinc-300 line-clamp-2">
                  {[item.category]}
                </p>
              </div>
              <div
                className={cn(
                  "p-2 rounded-full",
                  "bg-white/10 dark:bg-zinc-800/50",
                  "backdrop-blur-md",
                  "group-hover:bg-white/20 dark:group-hover:bg-zinc-700/50",
                  "transition-colors duration-300 group"
                )}
              >
                <ArrowUpRight className="w-4 h-4 text-white group-hover:-rotate-12 transition-transform duration-300" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    ))}
  </div>
  <ScrollBar orientation="horizontal" />
</ScrollArea>

            </div>
            {/* Instagram */}
            <div className="mx-auto max-w-7xl px-6 my-16">
              <h1 className="text-xl font-semibold">Instagram</h1>
              <p className="max-w-prose text-zinc-400 pb-3">
                Hire Instagram influencers
              </p>
              <ScrollArea className="w-full  whitespace-nowrap rounded-2xl p-4 border">
  <div className="flex space-x-4 mx-auto justify-center items-center"> {/* This ensures horizontal layout */}
    {creator.slice(4, 8).map((item) => (
      <Link
        key={item._id}
        // href={`/creator/${item.username}`}
        href=""

        className="block w-full min-w-[280px] max-w-[280px] group"
      >
        <div
          className={cn(
            "relative overflow-hidden rounded-2xl",
            "bg-white/80 dark:bg-zinc-900/80",
            "backdrop-blur-xl",
            "border border-zinc-200/50 dark:border-zinc-800/50",
            "shadow-xs",
            "transition-all duration-300",
            "hover:shadow-md",
            "hover:border-zinc-300/50 dark:hover:border-zinc-700/50"
          )}
        >
          <div className="relative h-[320px] overflow-hidden">
            <Image src={item.profileImage} alt="" fill className="object-cover" />
          </div>

          <div
            className={cn(
              "absolute inset-0",
              "bg-gradient-to-t from-black/50 via-black/20 to-transparent",
              "group-hover:from-black/90 group-hover:via-black/40",
              "transition-all duration-300"
            )}
          />

          <div className="absolute top-3 right-3 transition-opacity duration-300">
            <span
              className={cn(
                "px-2.5 py-1 rounded-full text-xs font-medium",
                "bg-white/90 text-zinc-800",
                "dark:bg-zinc-900/90 dark:text-zinc-200",
                "backdrop-blur-md",
                "shadow-xs",
                "border border-white/20 dark:border-zinc-800/50"
              )}
            >
              Grade A+
            </span>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-5 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <div className="flex items-center justify-between gap-3">
              <div className="space-y-1.5">
                {/* <h3 className="text-lg font-semibold text-white dark:text-zinc-100 leading-snug">
                  {item.packages[0].price}
                </h3> */}
                <p className="text-sm text-zinc-200 dark:text-zinc-300 line-clamp-2">
                  {item.platforms.map((cur) => `${cur.platform} `)}
                </p>
                <p className="text-sm text-zinc-200 dark:text-zinc-300 line-clamp-2">
                  {[item.category]}
                </p>
              </div>
              <div
                className={cn(
                  "p-2 rounded-full",
                  "bg-white/10 dark:bg-zinc-800/50",
                  "backdrop-blur-md",
                  "group-hover:bg-white/20 dark:group-hover:bg-zinc-700/50",
                  "transition-colors duration-300 group"
                )}
              >
                <ArrowUpRight className="w-4 h-4 text-white group-hover:-rotate-12 transition-transform duration-300" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    ))}
  </div>
  <ScrollBar orientation="horizontal" />
</ScrollArea>

            </div>
            {/* Youtube */}
            <div className="mx-auto max-w-7xl px-6 my-16">
              <h1 className="text-xl font-semibold">Youtube</h1>
              <p className="max-w-prose text-zinc-400 pb-3">
                Hire Youtube influencers
              </p>
              <ScrollArea className="w-full  whitespace-nowrap rounded-2xl p-4 border">
  <div className="flex space-x-4 mx-auto justify-center items-center"> {/* This ensures horizontal layout */}
    {creator.slice(8, 12).map((item) => (
      <Link
        key={item._id}
        // href={`/creator/${item.username}`}
        href=""
        className="block w-full min-w-[280px] max-w-[280px] group"
      >
        <div
          className={cn(
            "relative overflow-hidden rounded-2xl",
            "bg-white/80 dark:bg-zinc-900/80",
            "backdrop-blur-xl",
            "border border-zinc-200/50 dark:border-zinc-800/50",
            "shadow-xs",
            "transition-all duration-300",
            "hover:shadow-md",
            "hover:border-zinc-300/50 dark:hover:border-zinc-700/50"
          )}
        >
          <div className="relative h-[320px] overflow-hidden">
            <Image src={item.profileImage} alt="" fill className="object-cover" />
          </div>

          <div
            className={cn(
              "absolute inset-0",
              "bg-gradient-to-t from-black/50 via-black/20 to-transparent",
              "group-hover:from-black/90 group-hover:via-black/40",
              "transition-all duration-300"
            )}
          />

          <div className="absolute top-3 right-3 transition-opacity duration-300">
            <span
              className={cn(
                "px-2.5 py-1 rounded-full text-xs font-medium",
                "bg-white/90 text-zinc-800",
                "dark:bg-zinc-900/90 dark:text-zinc-200",
                "backdrop-blur-md",
                "shadow-xs",
                "border border-white/20 dark:border-zinc-800/50"
              )}
            >
              Grade A+
            </span>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-5 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <div className="flex items-center justify-between gap-3">
              <div className="space-y-1.5">
                {/* <h3 className="text-lg font-semibold text-white dark:text-zinc-100 leading-snug">
                  {item.packages[0].price}
                </h3> */}
                <p className="text-sm text-zinc-200 dark:text-zinc-300 line-clamp-2">
                  {item.platforms.map((cur) => `${cur.platform} `)}
                </p>
                <p className="text-sm text-zinc-200 dark:text-zinc-300 line-clamp-2">
                  {[item.category]}
                </p>
              </div>
              <div
                className={cn(
                  "p-2 rounded-full",
                  "bg-white/10 dark:bg-zinc-800/50",
                  "backdrop-blur-md",
                  "group-hover:bg-white/20 dark:group-hover:bg-zinc-700/50",
                  "transition-colors duration-300 group"
                )}
              >
                <ArrowUpRight className="w-4 h-4 text-white group-hover:-rotate-12 transition-transform duration-300" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    ))}
  </div>
  <ScrollBar orientation="horizontal" />
</ScrollArea>


            </div>
          </div>
        </div>
        <section className="py-16 ">
          <div className="container mx-auto px-4">
            <Categories variant="featured" />
          </div>
        </section>

        <PhoneComponent/>
        <section className="py-20 overflow-hidden">
      <div className="container max-w-7xl mx-auto px-6 md:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <div className="flex justify-center items-center gap-2 mb-6">
            <motion.span 
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-block"
            >
              👋
            </motion.span>
            <h2 className="text-3xl md:text-4xl font-bold">
              WHY <span className="bg-gradient-to-r from-[#A531DC] to-[#4300B1] bg-clip-text text-transparent text-4xl font-bold">1M+ PEOPLE</span> <span className="text-primary">CHOOSE US</span>
            </h2>
            <motion.span 
              initial={{ x: 20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-block"
            >
              👋
            </motion.span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">
          <div className="space-y-16">
            <FeatureCard
              title="Exceptional Support"
              description="Our dedicated support team is always available to assist clients, answer questions, and provide guidance throughout the influencer marketing journey."
              icon={<Phone size={24} className="text-primary" />}
              alignment="right"
            />
            
            <FeatureCard
              title="Extensive Network"
              description="We have a vast network of influencers across various niches and platforms, providing brands with a wide range of options to choose from."
              icon={<Wifi size={24} className="text-primary" />}
              alignment="right"
            />
            
            <FeatureCard
              title="Seamless Collaboration"
              description="We facilitate smooth collaboration between brands and influencers, ensuring effective communication, timely deliverables, and successful partnerships."
              icon={<Users size={24} className="text-primary" />}
              alignment="right"
            />
          </div>
          
          <div className="flex justify-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-primary/20 rounded-full blur-3xl"></div>
              <img 
                src="https://i.pinimg.com/736x/36/d5/cf/36d5cf0c2a2791ada70d38d4134f0b85.jpg" 
                alt="Influencer with smartphone" 
                className="relative z-10 max-w-full h-auto rounded-2xl shadow-lg"
              />
            </motion.div>
          </div>
          
          <div className="space-y-16">
            <FeatureCard
              title="Tailored Solutions"
              description="We understand that every brand is unique, so we offer customized influencer marketing strategies tailored to specific brand objectives and target audiences."
              icon={<Shuffle size={24} className="text-primary" />}
              alignment="left"
            />
            
            <FeatureCard
              title="Transparent Processes"
              description="We prioritize transparency in all our dealings, from pricing and agreements to reporting and performance metrics, fostering trust and accountability."
              icon={<Globe size={24} className="text-primary" />}
              alignment="left"
            />
            
            <FeatureCard
              title="Unmatched Expertise"
              description="Our team comprises industry experts with years of experience in influencer marketing, ensuring exceptional results for our clients."
              icon={<Award size={24} className="text-primary" />}
              alignment="left"
            />
          </div>
        </div>
      </div>
    </section>
    <div className="bg-black md:flex justify-center items-center hidden max-w-full">
    <div className='absolute flex justify-center items-center'>
              <img className="h-48 w-48 lg:h-56 lg:w-56 md:h-56 md:w-56 object-cover rounded-2xl p-2 bg-transparent" src="https://res.cloudinary.com/dna3hwzre/image/upload/v1741412694/karv81oea0dngca9xnvn.png" alt="" />
            </div>
            <div className="hidden md:block w-fit mx-auto">
  <Spline scene="https://prod.spline.design/NL9FtFLq-elpUUD9/scene.splinecode" />
</div>
</div>
        <GradientCard/>
        {/* <Waitlist/> */}
 <Footer/>
      </div>
      
    </>
  );
};

export default index;


// import { fetchProfileAction } from "@/actions";
// import HomepageButtonControls from "@/components/homepage-button-controls";
// import { Button } from "@/components/ui/button";
// import { currentUser } from "@clerk/nextjs";
// import { redirect } from "next/navigation";
// import { Fragment } from "react";

// async function Home() {
//   const user = await currentUser();
//   const profileInfo = await fetchProfileAction(user?.id);

//   if (user && !profileInfo?._id) redirect("/onboard");

//   return (
//     <Fragment>
//       <section className="relative w-full h-full min-h-screen pb-10">
//         <div className="w-full h-full relative">
//           <div className="flex flex-col-reverse lg:flex-row gap-10 mt-16">
//             <section className="w-full lg:w-[50%] flex flex-col md:px-2 lg:px-0 p-5 lg:p-10">
//               <div className="w-full flex justify-start flex-col h-auto lg:pt-7">
//                 <span className="flex space-x-2">
//                   <span className="block w-14 mb-2 dark:border-white border-b-2 border-gray-700"></span>
//                   <span className="font-medium dark:text-white text-gray-600">
//                     One Stop Solution to Find Jobs
//                   </span>
//                 </span>
//                 <h1 className="text-3xl dark:text-white mt-5 lg:text-7xl text-black font-extrabold">
//                   Build your best job community starting from here.
//                 </h1>
//                 <div className="w-full mt-6 flex items-center text-white justify-start gap-2">
//                   <HomepageButtonControls
//                     user={JSON.parse(JSON.stringify(user))}
//                     profileInfo={profileInfo}
//                   />
//                 </div>
//               </div>
//             </section>
//             <section className="relative w-full lg:w-[50%] flex items-center justify-end">
//               <img
//                 src="https://utfs.io/f/4c9f7186-8ad0-4680-aece-a5abea608705-k6t10e.png"
//                 alt="Hero"
//                 className="h-full w-full object-contain z-10"
//               />
//             </section>
//           </div>
//         </div>
//       </section>
//     </Fragment>
//   );
// }

// export default Home;
