import React, { useState, useEffect } from "react";
import { fetchVideoDetails } from "./videoServices";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Instagram, Youtube, Play, ThumbsUp, Eye, Clock } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { VideoPlayer } from "./videoPlayer";

// Updated PlatformIcon component with className support
export const VideoDetails = ({ videoId }) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDetails = async () => {
      try {
        setLoading(true);
        const data = await fetchVideoDetails(videoId);
        setDetails(data);
      } catch (err) {
        console.error("Failed to load video details:", err);
        setError("Unable to load video details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadDetails();
  }, [videoId]);

  // Platform Icon component with className support
  const PlatformIcon = ({ platform, className }) => {
    const iconClass = className || "h-5 w-5";
    
    switch (platform) {
      case 'instagram':
        return <Instagram className={iconClass} />;
      case 'youtube':
        return <Youtube className={iconClass} />;
      default:
        return <Play className={iconClass} />;
    }
  };

  // Format numbers for display
  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="space-y-2">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        
        <Skeleton className="h-[300px] w-full rounded-lg" />
        
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>
    );
  }

  if (error || !details) {
    return (
      <div className="text-center py-8">
        <p className="text-destructive">{error || "Video details not found"}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">{details.title}</h2>
        <div className="flex items-center gap-2 mt-1">
          <Badge variant="outline" className="flex items-center gap-1">
            <PlatformIcon platform={details.platform} />
            <span className="capitalize">{details.platform}</span>
          </Badge>
          <Badge variant="outline">{details.category}</Badge>
          {details.tags?.map(tag => (
            <Badge key={tag} variant="secondary">#{tag}</Badge>
          ))}
        </div>
      </div>
      
      <div className="pt-2">
        <VideoPlayer video={details} onClose={() => {}} />
      </div>
      
      <div className="flex flex-wrap gap-6 items-start">
        <div className="flex-1 min-w-[280px]">
          <h3 className="text-lg font-medium mb-2">About this video</h3>
          <p className="text-muted-foreground">{details.description}</p>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Views</span>
              <div className="flex items-center gap-1 font-medium">
                <Eye className="h-4 w-4 text-muted-foreground" />
                {formatNumber(details.views)}
              </div>
            </div>
            
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Likes</span>
              <div className="flex items-center gap-1 font-medium">
                <ThumbsUp className="h-4 w-4 text-muted-foreground" />
                {formatNumber(details.likes)}
              </div>
            </div>
            
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Duration</span>
              <div className="flex items-center gap-1 font-medium">
                <Clock className="h-4 w-4 text-muted-foreground" />
                {details.duration || "Unknown"}
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex-1 min-w-[280px]">
          <h3 className="text-lg font-medium mb-2">Creator</h3>
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 ring-1 ring-border">
              <AvatarImage src={`https://api.dicebear.com/7.x/personas/svg?seed=${details.creator}`} alt={details.creator} />
              <AvatarFallback>{details.creator[0]}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-semibold">{details.creator}</div>
              <div className="text-sm text-muted-foreground">Submitted on {formatDate(details.submittedAt)}</div>
            </div>
          </div>
          
          <div className="mt-4">
            <a 
              href={details.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-primary hover:underline text-sm inline-flex items-center gap-1"
            >
              <PlatformIcon platform={details.platform} className="h-3 w-3" />
              View original content
            </a>
          </div>
        </div>
      </div>
      
      {details.comments && details.comments.length > 0 && (
        <>
          <Separator />
          <div>
            <h3 className="text-lg font-medium mb-3">Comments</h3>
            <div className="space-y-4">
              {details.comments.map(comment => (
                <div key={comment.id} className="bg-secondary/40 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={`https://api.dicebear.com/7.x/personas/svg?seed=${comment.author}`} />
                      <AvatarFallback>{comment.author[0]}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{comment.author}</span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(comment.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm pl-8">{comment.text}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};