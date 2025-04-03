import React, { useState } from 'react';
import { Users, BarChart3 } from 'lucide-react';

const InfluencerCard = ({ influencer = {}, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="glass-card rounded-2xl overflow-hidden card-hover animate-scale-in"
      style={{ animationDelay: `${150 * index}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Section */}
      <div className="relative overflow-hidden h-52">
        <img 
          src={influencer?.imageUrl || "/placeholder.png"}  
          alt={influencer?.name || "Unknown"}
          className="w-full h-full object-cover transition-transform duration-700 ease-out"
          style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        
        <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center">
          <span className="category-label bg-white/80 text-primary">
            {influencer?.category || "Unknown"}
          </span>
          <span className="category-label bg-black/60 text-white">
            {influencer?.platform === 'instagram' ? 'Instagram' : 'YouTube'}
          </span>
        </div>
      </div>
      
      {/* Info Section */}
      <div className="p-5">
        <h3 
          className="text-xl font-semibold mb-2 transition-colors duration-300"
          style={{ color: isHovered ? 'hsl(var(--primary))' : 'inherit' }}
        >
          {influencer?.name || "Unknown"}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {influencer?.description || "No description available"}
        </p>
        
        {/* Stats Section */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <Users size={16} className="mr-1" />
            <span>{influencer?.followers?.toLocaleString() || "0"}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-500">
            <BarChart3 size={16} className="mr-1" />
            <span>{influencer?.engagement?.toLocaleString() || "0"}</span>
          </div>
        </div>
        
        {/* Price & Button */}
        <div className="flex justify-between items-center">
          <p className="text-xl font-bold text-primary">
            ₹{influencer?.price ? influencer.price.toLocaleString() : "N/A"}
          </p>
          
          <button className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium hover:bg-primary/20 transition-colors">
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfluencerCard;
