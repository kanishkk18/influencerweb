import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Instagram, Heart, Eye, Users, Star, TrendingUp } from "lucide-react";
import { InstagramInfluencer } from "@/components/assets/influencers";
import { formatNumber } from "@/components/assets/mockInfluencers";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";


export function InstagramInfluencerCard({ influencer }) {
  // Calculate normalized engagement percentage for the progress bar
  const normalizedEngagement = Math.min(Math.max(influencer.engagementRate / 10, 0.1), 1) * 100;
  
  return (
    <Card className="overflow-hidden transition-all border-0 shadow-xl bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-md text-white">
      <CardHeader className="relative p-0">
        {/* Gradient overlay for the header */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/80 to-pink-600/80 z-0"></div>
        
        {/* Decorative elements */}
        <div className="absolute -bottom-3 right-6 w-20 h-20 bg-purple-500/30 rounded-full blur-2xl"></div>
        <div className="absolute top-2 right-2 w-10 h-10 bg-pink-500/40 rounded-full blur-xl"></div>
        
        <div className="relative z-10 flex items-center gap-4 p-5">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full blur-sm -z-10"></div>
            <Avatar className="h-20 w-20 border-2 border-white/30 ring-2 ring-pink-500/30 shadow-lg">
              <AvatarImage src={influencer.profilePic} alt={influencer.name} />
              <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-600 text-white">
                {influencer.name.substring(0, 2)}
              </AvatarFallback>
            </Avatar>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-white text-xl">{influencer.name}</h3>
              {influencer.verified && (
                <div className="text-blue-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-blue-400">
                    <path d="M9 11.3l3.71 2.7-1.42-4.36L15 7h-4.55L9 2.5 7.55 7H3l3.71 2.64L5.29 14z"/>
                  </svg>
                </div>
              )}
            </div>
            <div className="flex items-center text-white/90 text-sm mt-1">
              <Instagram className="h-3.5 w-3.5 mr-1 text-pink-400" />
              <span className="text-gradient bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                @{influencer.username}
              </span>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-5">
        <div className="grid grid-cols-3 gap-1 mb-5">
          <div className="text-center p-2 bg-gray-800/50 rounded-lg backdrop-blur-sm">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Users className="h-3.5 w-3.5 text-blue-400" />
              <p className="text-xs text-gray-400">Followers</p>
            </div>
            <p className="font-bold text-white">{formatNumber(influencer.followers)}</p>
          </div>
          
          <div className="text-center p-2 bg-gray-800/50 rounded-lg backdrop-blur-sm">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Heart className="h-3.5 w-3.5 text-red-400" />
              <p className="text-xs text-gray-400">Avg. Likes</p>
            </div>
            <p className="font-bold text-white">{formatNumber(influencer.avgLikes)}</p>
          </div>
          
          <div className="text-center p-2 bg-gray-800/50 rounded-lg backdrop-blur-sm">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Eye className="h-3.5 w-3.5 text-teal-400" />
              <p className="text-xs text-gray-400">Avg. Views</p>
            </div>
            <p className="font-bold text-white">{formatNumber(influencer.avgViews)}</p>
          </div>
        </div>
        
        <div className="mb-5">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-1.5">
              <TrendingUp className="h-4 w-4 text-teal-400" />
              <span className="text-sm text-gray-300">Engagement Rate</span>
            </div>
            <span className="font-bold text-white flex items-center gap-1">
              {influencer.engagementRate.toFixed(1)}%
              <Star className="h-3.5 w-3.5 text-yellow-400" />
            </span>
          </div>
          
          {/* Engagement rate progress bar */}
          <div className="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
              style={{ width: `${normalizedEngagement}%` }}
            ></div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-4">
          <Badge variant="outline" className="bg-purple-500/10 border-purple-400/30 text-purple-400">
            {influencer.niche}
          </Badge>
          <Badge variant="outline" className="bg-pink-500/10 border-pink-400/30 text-pink-400">
            {influencer.category}
          </Badge>
          {influencer.topPosts && influencer.topPosts > 5 && (
            <Badge variant="outline" className="bg-yellow-500/10 border-yellow-400/30 text-yellow-400 ml-auto">
              <Star className="h-3 w-3 mr-1" /> Top Creator
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}