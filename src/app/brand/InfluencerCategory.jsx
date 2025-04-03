import React from 'react';
import { Instagram, Youtube } from 'lucide-react';
import InfluencerCard from './InfluencerCard';
import { useIsMobile } from '@/hooks/use-mobile';

const InfluencerCategory = ({ platform, influencers = [] }) => {
  const isMobile = useIsMobile();

  // Ensure influencers is an array before filtering
  const filteredInfluencers = Array.isArray(influencers)
    ? influencers.filter((inf) => inf?.platform === platform)
    : [];

  return (
    <div className="mb-16">
      {/* Platform Header */}
      <div className="flex items-center mb-6 animate-slide-in">
        {platform === 'instagram' ? (
          <Instagram size={24} className="mr-3 text-pink-500" />
        ) : (
          <Youtube size={24} className="mr-3 text-red-500" />
        )}
        <h2 className="text-2xl font-bold">
          {platform === 'instagram' ? 'Instagram' : 'YouTube'}
        </h2>
      </div>

      {/* Influencers List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInfluencers.length > 0 ? (
          filteredInfluencers.map((influencer, index) => (
            <InfluencerCard
              key={influencer?.id || `inf-${index}`} // Fallback key
              influencer={influencer}
              index={index}
            />
          ))
        ) : (
          <p className="text-gray-500">No influencers available.</p>
        )}
      </div>
    </div>
  );
};

export default InfluencerCategory;
