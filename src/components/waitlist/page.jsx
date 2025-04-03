"use client"

import { FacebookIcon, InstagramIcon, LinkedinIcon, Loader2, XIcon } from "lucide-react"
import { toast } from "sonner"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { SocialIcon } from "../ui/social-icon"
import { BiLogoDiscord } from "react-icons/bi"


const backgroundStyle = `
  .bg-pattern {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
      linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px);
    background-size: 20px 20px;
    pointer-events: none;
    z-index: 1;
  }

  .content {
    position: relative;
    z-index: 2;
  }
`

export default function Home() {
  return (
    <main
      className="min-h-screen flex items-center justify-center"
      style={{
        background: "radial-gradient(circle at center, #1E40AF, #000000)",
      }}
    >
      {/* <style jsx global>
        {backgroundStyle}
      </style> */}
      {/* <div className="bg-pattern"></div> */}
      <div className="content w-full">
       
    <div className="w-full max-w-xl mx-auto p-8 flex flex-col justify-between min-h-screen">
      <div className="flex-1 flex flex-col justify-center items-center text-center">
        <div>
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-br from-gray-200 to-gray-600">
            Join Influeweb's Launch Waitlist
          </h2>
        </div>
        <div>
          <p className="text-lg sm:text-xl mb-8 text-gray-300">
            Be part of something truly extraordinary. Join thousands of others already gaining early access to our
            revolutionary new product.
          </p>
        </div>
        <div className="w-full">
        <form  className="w-full space-y-4 mb-8">
      <div className="flex overflow-hidden rounded-xl bg-white/5 p-1 ring-1 ring-white/20 focus-within:ring-2 focus-within:ring-blue-500">
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          required
          value=""
          aria-describedby="email-error"
          className="w-full border-0 bg-transparent text-white placeholder:text-gray-400 focus:ring-0 focus:border-transparent focus-visible:border-transparent focus:outline-none active:ring-0 active:outline-none focus-visible:ring-0 focus-visible:outline-none active:border-transparent focus-visible:ring-offset-0"
        />
        <Button 
          type="submit" 
       
          className="bg-black hover:bg-gray-800 text-white font-semibold px-4 rounded-xl transition-all duration-300 ease-in-out focus:outline-none w-[120px]"
        >
          
            Get Notified
         
        </Button>
      </div>
    </form>
        </div>
        <div>
          <div className="flex items-center justify-center mt-8">
            <div className="flex -space-x-2 mr-4">
              <Avatar>      <AvatarImage src="https://i.pinimg.com/474x/58/b8/84/58b884b006f4ccd04b11abeac925c9cf.jpg" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
</Avatar>
<Avatar>      <AvatarImage src="https://i.pinimg.com/736x/c8/dd/1a/c8dd1a29eada29364d331391507dbab8.jpg" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
</Avatar>
<Avatar>      <AvatarImage src="https://i.pinimg.com/474x/e7/4e/f0/e74ef0aaed855b60109d9fd12528fd73.jpg" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
</Avatar>
            </div>
            <p className="text-white font-semibold">50+ people on the waitlist</p>
          </div>
        </div>
      </div>
      <div className="pt-8 flex justify-center space-x-6">
        <SocialIcon
          href="https://x.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="X (formerly Twitter)"
          icon={<XIcon className="w-6 h-6" />}
        />
        <SocialIcon
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          icon={<InstagramIcon className="w-6 h-6" />}
        />
        <SocialIcon
          href="https://discord.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Discord"
          icon={<BiLogoDiscord className="w-6 h-6" />}
        />
        <SocialIcon
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          icon={<FacebookIcon className="w-6 h-6" />}
        />
        <SocialIcon
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          icon={<LinkedinIcon className="w-6 h-6" />}
        />
      </div>
    </div>
      </div>
      
    </main>
  )
}

