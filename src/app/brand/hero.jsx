import React from "react";
import Image from "next/image";
import Reviews from "./Reviews";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const index = () => {
  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-28 -right-28 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -left-28 w-72 h-72 bg-purple-100 rounded-full blur-3xl"></div>
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-block animate-fade-in">
          <span className="inline-block category-label mb-4 animate-pulse-soft">
            Influewebhub Marketing Platform
          </span>
        </div>
        
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4 md:mb-6 animate-fade-in [animation-delay:150ms]">
          <span className="block">Elevate your products to a</span>
          <span className="block mt-1 bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-indigo-600">
            whole new level
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8 animate-fade-in [animation-delay:250ms]">
          Connect with influential personalities, execute targeted marketing campaigns, 
          and generate distinctive content for your brand—all with seamless efficiency.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in [animation-delay:350ms]">
          <Link href="/brand/dashboard" className="button-primary group">
            Dashboard
            <ArrowRight className="inline-block ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
          
          <button className="px-6 py-3 text-gray-700 font-medium rounded-full hover:bg-gray-100 transition-colors">
            Learn More
          </button>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-16 max-w-4xl mx-auto animate-fade-in [animation-delay:450ms]">
          <div className="p-4 rounded-xl bg-white/50 backdrop-blur-sm shadow-sm">
            <p className="text-3xl font-bold text-primary">10K+</p>
            <p className="text-sm text-gray-600">Influencers</p>
          </div>
          <div className="p-4 rounded-xl bg-white/50 backdrop-blur-sm shadow-sm">
            <p className="text-3xl font-bold text-primary">97%</p>
            <p className="text-sm text-gray-600">Success Rate</p>
          </div>
          <div className="p-4 rounded-xl bg-white/50 backdrop-blur-sm shadow-sm">
            <p className="text-3xl font-bold text-primary">5M+</p>
            <p className="text-sm text-gray-600">Audience Reach</p>
          </div>
          <div className="p-4 rounded-xl bg-white/50 backdrop-blur-sm shadow-sm">
            <p className="text-3xl font-bold text-primary">4.8</p>
            <p className="text-sm text-gray-600">Client Rating</p>
          </div>
        </div>
      </div>
    </section>
  
  );
};

export default index;