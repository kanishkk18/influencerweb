import { useQuery } from "@tanstack/react-query";
import { fetchYouTubeInfluencers } from "@/components/assets/mockInfluencers";
import { YouTubeInfluencerCard } from "../../../components/youtubeInfluencerCard";
import { AppHeader } from "../../../components/appHeader";
import { Youtube, Search, Loader2 } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function YouTubeInfluencers() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const { data: influencers, isLoading, error } = useQuery({
    queryKey: ["youtubeInfluencers"],
    queryFn: fetchYouTubeInfluencers
  });

  const filteredInfluencers = influencers?.filter(inf => 
    inf.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inf.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inf.niche.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inf.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <AppHeader />
      
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1611162616475-46b635cb6868')] bg-cover opacity-5 z-0 dark:opacity-[0.03]"></div>
      
      <main className="container px-4 py-6 mx-auto max-w-7xl relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="bg-red-600 p-2 rounded-lg">
                <Youtube className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600 dark:from-red-500 dark:to-orange-500">
                YouTube Influencers
              </h1>
            </div>
            <p className="text-muted-foreground mt-1 ml-1">
              Discover popular YouTube content creators for your campaigns
            </p>
          </div>
          
          <div className="relative w-full md:w-80">
            <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-orange-600/20 blur-lg dark:from-red-600/10 dark:to-orange-600/10"></div>
            <div className="relative bg-background/50 dark:bg-gray-800/50 border border-border rounded-lg flex items-center">
              <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search influencers..."
                className="pl-9 border-0 bg-transparent h-11 text-foreground placeholder:text-muted-foreground focus-visible:ring-red-500/50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="mr-1 text-muted-foreground hover:text-foreground hover:bg-secondary"
                  onClick={() => setSearchTerm("")}
                >
                  Clear
                </Button>
              )}
            </div>
          </div>
        </div>

        {isLoading && (
          <div className="flex justify-center items-center min-h-[300px]">
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="h-12 w-12 text-red-500 animate-spin" />
              <p className="text-muted-foreground">Loading YouTube influencers...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="text-center text-red-500 min-h-[300px] flex items-center justify-center p-8 bg-red-500/10 rounded-lg backdrop-blur-sm">
            <p>Error loading influencers. Please try again later.</p>
          </div>
        )}

        {filteredInfluencers && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
              {filteredInfluencers.map(influencer => (
                <YouTubeInfluencerCard key={influencer.id} influencer={influencer} />
              ))}
            </div>
            
            {filteredInfluencers.length === 0 && (
              <div className="text-center text-muted-foreground min-h-[300px] flex flex-col items-center justify-center bg-background/20 dark:bg-gray-800/20 rounded-lg backdrop-blur-sm p-8 border border-border">
                <Search className="h-12 w-12 mb-4 text-muted-foreground" />
                <p className="text-xl font-medium mb-2">No results found</p>
                <p>No influencers found matching "{searchTerm}". Try a different search term.</p>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}