import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Play, ThumbsUp, Instagram, Youtube, Eye, ThumbsDown } from "lucide-react";
import { VideoPlayer } from "./videoPlayer";
import { VideoDetails } from "./videoDetails";

export const VideoCard = ({ video, onApprove, onReject }) => {
  const [showContent, setShowContent] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  
  // Platform Icon component
  const PlatformIcon = ({ platform }) => {
    switch (platform) {
      case 'instagram':
        return <Instagram className="h-4 w-4" />;
      case 'youtube':
        return <Youtube className="h-4 w-4" />;
      default:
        return <Play className="h-4 w-4" />;
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

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-primary text-primary-foreground animate-pulse-subtle">Approved</Badge>;
      case 'rejected':
        return <Badge variant="destructive" className="animate-pulse-subtle">Rejected</Badge>;
      default:
        return <Badge variant="outline" className="bg-secondary">Pending</Badge>;
    }
  };

  const handleViewContent = () => {
    setShowContent(true);
  };
  
  const handleViewDetails = () => {
    setShowDetailsDialog(true);
  };

  const handleCloseContent = () => {
    setShowContent(false);
  };

  return (
    <>
      <Card key={video.id} className="overflow-hidden transition-all duration-300 hover:shadow-lg animate-slide-up">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-lg font-medium">{video.title}</CardTitle>
              <CardDescription className="flex items-center gap-1 mt-1">
                <PlatformIcon platform={video.platform} />
                <span className="capitalize">{video.platform}</span>
                <span className="mx-1">•</span>
                <span>{video.category}</span>
              </CardDescription>
            </div>
            {getStatusBadge(video.status)}
          </div>
        </CardHeader>
        <CardContent className="pb-3">
          <div className="flex mb-3">
            <Avatar className="h-8 w-8 mr-2 ring-1 ring-border">
              <AvatarImage src={`https://api.dicebear.com/7.x/personas/svg?seed=${video.creator}`} alt={video.creator} />
              <AvatarFallback>{video.creator[0]}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{video.creator}</div>
              <div className="text-sm text-muted-foreground">
                {new Date(video.submittedAt).toLocaleDateString()}
              </div>
            </div>
          </div>
          
          {showContent ? (
            <div className="space-y-3 animate-fade-in">
              <VideoPlayer video={video} onClose={handleCloseContent} />
              
              {video.status === 'pending' && (
                <div className="flex gap-2 mt-4">
                  <Button 
                    variant="default" 
                    className="flex-1 bg-primary hover:bg-primary/90 shadow-sm transition-all duration-300"
                    onClick={() => onApprove(video)}
                  >
                    <ThumbsUp className="h-4 w-4 mr-1" /> Approve
                  </Button>
                  <Button 
                    variant="destructive" 
                    className="flex-1 shadow-sm transition-all duration-300"
                    onClick={() => onReject(video)}
                  >
                    <ThumbsDown className="h-4 w-4 mr-1" /> Reject
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div>
              {video.thumbnailUrl && (
                <div className="relative mb-3 rounded-md overflow-hidden h-36 bg-muted">
                  <img 
                    src={video.thumbnailUrl} 
                    alt={video.title} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />
                  <div className="absolute bottom-2 right-2">
                    <Button 
                      size="sm" 
                      className="h-8 rounded-full bg-black/70 hover:bg-black/90 backdrop-blur-sm"
                      onClick={handleViewContent}
                    >
                      <Play className="h-4 w-4 mr-1" /> Watch
                    </Button>
                  </div>
                </div>
              )}
              
              <p className="text-sm line-clamp-2">{video.description}</p>
              {video.status === 'rejected' && video.rejectionReason && (
                <div className="mt-2 p-2 bg-destructive/10 border border-destructive/20 rounded text-sm">
                  <span className="font-semibold">Rejection Reason:</span> {video.rejectionReason}
                </div>
              )}
              <div className="flex items-center gap-3 mt-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <ThumbsUp className="h-3 w-3" />
                  <span>{formatNumber(video.likes)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  <span>{formatNumber(video.views)} views</span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="pt-3 flex gap-2">
          {!showContent && (
            <Button
              variant="outline"
              className="flex-1 transition-all hover:bg-secondary"
              onClick={handleViewContent}
            >
              <Eye className="h-4 w-4 mr-1" /> View Content
            </Button>
          )}
          
          {!showContent && video.status === 'pending' && (
            <div className="flex gap-2 flex-1">
              <Button 
                variant="default" 
                className="flex-1 bg-primary hover:bg-primary/90 shadow-sm transition-all"
                onClick={() => onApprove(video)}
              >
                <ThumbsUp className="h-4 w-4 mr-1" />
              </Button>
              <Button 
                variant="destructive" 
                className="flex-1 shadow-sm transition-all"
                onClick={() => onReject(video)}
              >
                <ThumbsDown className="h-4 w-4 mr-1" />
              </Button>
            </div>
          )}
          
          {!showContent && (
            <Button 
              className="flex-1" 
              variant="outline"
              onClick={handleViewDetails}
            >
              View Details
            </Button>
          )}
        </CardFooter>
      </Card>
      
      {/* Video Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
          <VideoDetails videoId={video.id} />
        </DialogContent>
      </Dialog>
    </>
  );
};