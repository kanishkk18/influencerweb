import React, { useState, useEffect } from "react";
import { VideoCard } from "../../components/videoCard";
import { fetchVideos, updateVideoStatus } from "../../components/videoServices";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";

const VideoSharing = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  useEffect(() => {
    const loadVideos = async () => {
      setLoading(true);
      try {
        const data = await fetchVideos();
        setVideos(data);
      } catch (error) {
        console.error("Failed to load videos:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadVideos();
  }, []);
  const handleApprove = async (video) => {
    try {
      const success = await updateVideoStatus(video.id, "approved");
      if (success) {
        setVideos(prevVideos => 
          prevVideos.map(v => 
            v.id === video.id ? { ...v, status: "approved" } : v
          )
        );
      }
    } catch (error) {
      console.error("Error approving video:", error);
    }
  };
  const handleReject = (video) => {
    setSelectedVideo(video);
    setRejectDialogOpen(true);
  };
  const confirmReject = async () => {
    if (!selectedVideo) return;
    
    try {
      const success = await updateVideoStatus(
        selectedVideo.id, 
        "rejected", 
        rejectionReason
      );
      
      if (success) {
        setVideos(prevVideos => 
          prevVideos.map(v => 
            v.id === selectedVideo.id ? 
              { ...v, status: "rejected", rejectionReason } : v
          )
        );
        setRejectDialogOpen(false);
        setRejectionReason("");
        setSelectedVideo(null);
      }
    } catch (error) {
      console.error("Error rejecting video:", error);
    }
  };
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const filteredVideos = videos.filter(video => {
    // First filter by tab
    const matchesTab = activeTab === "all" || video.status === activeTab;
    
    // Then filter by search query (if any)
    const matchesSearch = searchQuery === "" || 
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.creator.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesTab && matchesSearch;
  });
  return (
    <div className="min-h-screen bg-background transition-all duration-500 animate-fade-in">
      <header className="py-6 px-6 md:px-10 border-b bg-card">
        <div className="container mx-auto">
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-semibold tracking-tight">Video Vault</h1>
            <p className="text-muted-foreground max-w-2xl">
              Browse, review, and manage video submissions across various platforms.
            </p>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto py-8 px-6 md:px-10">
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <TabsList className="grid grid-cols-3 w-full md:w-[400px]">
              <TabsTrigger value="all">All Videos</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="approved">Approved</TabsTrigger>
            </TabsList>
            
            <div className="flex items-center w-full md:w-auto">
              <Input 
                placeholder="Search videos..." 
                className="w-full md:w-[250px]" 
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
          </div>
          
          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? (
                Array(6).fill(0).map((_, i) => (
                  <div key={i} className="space-y-3">
                    <Skeleton className="h-[300px] w-full rounded-lg" />
                  </div>
                ))
              ) : filteredVideos.length > 0 ? (
                filteredVideos.map(video => (
                  <VideoCard 
                    key={video.id} 
                    video={video} 
                    onApprove={handleApprove} 
                    onReject={handleReject} 
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-muted-foreground">
                    {searchQuery ? "No videos match your search" : "No videos found"}
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="pending" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? (
                Array(3).fill(0).map((_, i) => (
                  <div key={i} className="space-y-3">
                    <Skeleton className="h-[300px] w-full rounded-lg" />
                  </div>
                ))
              ) : filteredVideos.length > 0 ? (
                filteredVideos.map(video => (
                  <VideoCard 
                    key={video.id} 
                    video={video} 
                    onApprove={handleApprove} 
                    onReject={handleReject} 
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-muted-foreground">
                    {searchQuery ? "No pending videos match your search" : "No pending videos found"}
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="approved" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? (
                Array(3).fill(0).map((_, i) => (
                  <div key={i} className="space-y-3">
                    <Skeleton className="h-[300px] w-full rounded-lg" />
                  </div>
                ))
              ) : filteredVideos.length > 0 ? (
                filteredVideos.map(video => (
                  <VideoCard 
                    key={video.id} 
                    video={video} 
                    onApprove={handleApprove} 
                    onReject={handleReject} 
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-muted-foreground">
                    {searchQuery ? "No approved videos match your search" : "No approved videos found"}
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      {/* Rejection Dialog */}
      <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Reject Video</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this video submission.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Textarea
              placeholder="Rejection reason..."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setRejectDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={confirmReject}
              disabled={!rejectionReason.trim()}
            >
              Reject Video
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default VideoSharing;