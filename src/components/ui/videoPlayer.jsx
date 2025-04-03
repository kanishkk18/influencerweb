import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, Volume2, VolumeX, Maximize, Play, Pause } from "lucide-react";

export const VideoPlayer = ({ video, onClose }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  
  // Extract video ID for embedding
  const getEmbedUrl = (url, platform) => {
    try {
      if (platform === 'youtube') {
        const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
        const match = url.match(youtubeRegex);
        return match && match[1] 
          ? `https://www.youtube-nocookie.com/embed/${match[1]}?autoplay=0&modestbranding=1&rel=0` 
          : url;
      } else if (platform === 'instagram') {
        // Extract Instagram post ID
        const instagramRegex = /instagram\.com\/p\/([^/?]+)/;
        const match = url.match(instagramRegex);
        return match && match[1]
          ? `https://www.instagram.com/p/${match[1]}/embed`
          : url;
      }
      return url;
    } catch (e) {
      console.error("Error parsing video URL:", e);
      setError("Unable to display video content");
      return url;
    }
  };

  const embedUrl = getEmbedUrl(video.url, video.platform);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (error) {
    return (
      <div className="bg-gray-100 rounded-md p-8 text-center">
        <p className="text-destructive">{error}</p>
        <Button variant="outline" onClick={onClose} className="mt-4">
          Close
        </Button>
      </div>
    );
  }

  // Use different renderers based on platform
  const renderVideoContent = () => {
    if (video.platform === 'instagram') {
      return (
        <div className="instagram-embed w-full h-full min-h-[450px]">
          <iframe
            src={embedUrl}
            className="w-full h-full"
            frameBorder="0"
            scrolling="no"
            allowTransparency="true"
            title={`Instagram post by ${video.creator}`}
          ></iframe>
        </div>
      );
    } else {
      // Youtube or other platform with standard iframe
      return (
        <div className="aspect-video w-full">
          <iframe
            src={embedUrl}
            className="w-full h-full"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            title={video.title}
          ></iframe>
        </div>
      );
    }
  };

  return (
    <div className="video-player-container relative rounded-lg overflow-hidden">
      {loading ? (
        <div className="bg-muted w-full h-60 sm:h-72 md:h-80 flex items-center justify-center animate-pulse">
          <div className="flex flex-col items-center space-y-2">
            <div className="h-10 w-10 rounded-full border-4 border-primary border-t-transparent animate-spin" />
            <p className="text-sm text-muted-foreground">Loading content...</p>
          </div>
        </div>
      ) : (
        <>
          {renderVideoContent()}
          
          {video.platform !== 'instagram' && (
            <div className="video-controls">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20">
                    <Play className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-white hover:bg-white/20"
                    onClick={() => setIsMuted(!isMuted)}
                  >
                    {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </Button>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20">
                    <Maximize className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-white hover:bg-white/20"
                    onClick={onClose}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="relative w-full h-1 bg-white/30 rounded-full mt-2">
                <div className="absolute h-full w-1/3 bg-primary rounded-full"></div>
                <div className="absolute h-3 w-3 bg-white rounded-full -top-1 left-1/3 transform -translate-x-1/2"></div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};