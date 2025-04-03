import React from 'react';
import { Palette, Type, Grid, Image, BookOpen, Layers } from 'lucide-react';

function GradientCard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-black to-blue-600 pb-10 flex flex-col items-center justify-center p-6">
      <div className="bg-gradient-to-r from-[#FF3F3F] to-[#063CFF] text-white font-medium px-6 py-2 rounded-full mb-4">
        influwebhub
      </div>
      
      <h1 className="text-4xl md:text-5xl font-semibold text-white mb-16 text-center">
      How it Works
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl">
        {/* Card 1 - Logo System */}
        <Card 
          icon={<Layers className="w-10 h-10 text-purple-300" />}
          title="Verified & Authentic Influencers "
          description="Brands partner with genuine influencers for credibility, while influencers access quality collaborations."
        />
        
        {/* Card 2 - Color System */}
        <Card 
          icon={
            <div className="relative flex justify-center items-center p-1">
              <div className="absolute w-8 h-8 rounded-full bg-cyan-300 left-[0.1rem]"></div>
              <div className="absolute w-8 h-8 rounded-full bg-blue-600 right-[0.1rem]"></div>
            </div>
          }
          title="Flexible Collaboration Options "
          description="Brands manually select influencers, set budgets, or post bulk orders for efficiency. Influencers choose jobs that fit their niche."
        />
        
        {/* Card 3 - Type System */}
        <Card 
          icon={<Type className="w-10 h-10 text-white" />}
          title="Secure & Transparent Payments "
          description="Payments are held in escrow and released upon approval, ensuring quality work and timely payouts for influencers."
        />
        
        {/* Card 4 - Grid System */}
        <Card 
          icon={<Grid className="w-10 h-10 text-blue-400" />}
          title="Performance-Based Grading"
          description="Influencers are ranked by engagement, quality, and authenticity, helping brands find top creators and boost influencer earnings."
        />
        
        {/* Card 5 - Icon & Image Library */}
        <Card 
          icon={<Image className="w-10 h-10 text-orange-400" />}
          title="Fraud Prevention & Brand Safety "
          description="AI tools detect fake engagement, protecting brands’ budgets and ensuring a trusted space for influencers."
        />
        
        {/* Card 6 - Full Brand Book */}
        <Card 
          icon={<BookOpen className="w-10 h-10 text-white" />}
          title="Seamless Campaign Management"
          description="Brands access real-time analytics for ROI, while influencers get structured campaigns matching their style."
        />
      </div>
    </div>
  );
}

// Card component with shining border effect
function Card({ icon, title, description }) {
  return (
    <div className="relative group">
      {/* Shining border effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600  rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-gradient-x"></div>
      
      <div className="relative flex flex-col items-center py-8 px-6 border-l-[1.7px] border-t-[1.7px] border-neutral-700 bg-black rounded-2xl shadow-xl">
        {/* Icon container */}
        <div className="w-24 h-24 flex items-center justify-center border border-gray-800 rounded-lg mb-6">
          {icon}
        </div>
        
        {/* Title */}
        <h3 className="text-lg text-center font-semibold text-white mb-2">{title}</h3>
        
        {/* Description */}
        <p className="text-gray-400 text-sm text-center">{description}</p>
      </div>
    </div>
  );
}

export default GradientCard;