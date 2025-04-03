import { useQuery } from "@tanstack/react-query";
import { fetchInstagramUsers } from "@/services/instagramApi";
import { InstagramInfluencerCard } from "../../../components/InstagramInfluencerCard";
import { AppHeader } from "../../../components/appHeader";
import { Instagram, Search, Filter, Sparkles, Star, TrendingUp } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { toast} from "sonner";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

export default function InstagramInfluencers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [nicheFilter, setNicheFilter] = useState("all");
  
  
  const { data: influencers, isLoading, error } = useQuery({
    queryKey: ["instagramInfluencers"],
    queryFn: fetchInstagramUsers,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 2
  });

  // Log data for debugging
  console.log("Instagram influencers data:", influencers);
  console.log("Loading state:", isLoading);
  if (error) {
    console.error("Instagram data fetch error:", error);
    toast({
      title: "Error fetching data",
      description: "Could not fetch Instagram business accounts. Using mock data instead.",
      variant: "destructive"
    });
  }

  // Extract unique categories and niches for filters
  const categories = influencers ? [...new Set(influencers.map(inf => inf.category))] : [];
  const niches = influencers ? [...new Set(influencers.map(inf => inf.niche))] : [];

  // Apply all filters
  const filteredInfluencers = influencers?.filter(inf => {
    // Search term filter (case insensitive)
    const matchesSearch = searchTerm === "" || 
      inf.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inf.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inf.niche.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inf.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Category filter
    const matchesCategory = categoryFilter === "all" || inf.category === categoryFilter;
    
    // Niche filter
    const matchesNiche = nicheFilter === "all" || inf.niche === nicheFilter;
    
    return matchesSearch && matchesCategory && matchesNiche;
  });

  // Handle business account search directly
  const handleSearchBusinessAccount = (e) => {
    e.preventDefault();
    if (!searchTerm) return;
    
    // Show toast for the search
    toast({
      title: "Searching for business account",
      description: `Looking up "${searchTerm}" on Instagram`,
    });
    
    // In a real implementation, this would make a direct API call for this specific account
    console.log("Searching for specific business account:", searchTerm);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <AppHeader />
      
      <main className="container px-4 py-8 mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <div className="relative">
            <div className="absolute -top-10 -left-8 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -right-8 w-24 h-24 bg-pink-500/20 rounded-full blur-3xl"></div>
            <h1 className="text-4xl font-bold tracking-tight flex items-center gap-3 relative">
              <Instagram className="h-10 w-10 text-pink-500" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-400">
                Instagram Influencers
              </span>
              <Sparkles className="h-5 w-5 text-yellow-400 animate-pulse" />
            </h1>
            <p className="text-gray-300 mt-2 font-light text-lg flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-teal-400" />
              Discover trending business accounts and top creators
            </p>
          </div>
          
          <form onSubmit={handleSearchBusinessAccount} className="relative w-full md:w-96">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-lg blur-md -z-10"></div>
            <Search className="absolute left-3.5 top-3.5 h-5 w-5 text-pink-400" />
            <Input
              placeholder="Search by name, username, or niche..."
              className="pl-11 pr-28 h-12 bg-gray-800/70 border-gray-700 focus:border-pink-500 focus:ring-pink-500/20 text-white rounded-lg backdrop-blur-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button 
              type="submit"
              className="absolute right-2 top-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-md px-4 py-2 text-sm font-medium hover:from-pink-600 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-purple-500/20"
            >
              Search
            </button>
          </form>
        </div>

        <div className="flex flex-wrap gap-3 mb-8 bg-gray-800/50 p-4 rounded-xl backdrop-blur-sm border border-gray-700/50">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-purple-400" />
            <span className="text-sm font-medium text-gray-300">Filters:</span>
          </div>
          
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="h-9 w-[180px] bg-gray-800/80 border-gray-700 text-gray-200">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700 text-gray-200">
              <SelectItem value="all" className="focus:bg-gray-700">All Categories</SelectItem>
              {categories.map(cat => (
                <SelectItem key={cat} value={cat} className="focus:bg-gray-700">{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={nicheFilter} onValueChange={setNicheFilter}>
            <SelectTrigger className="h-9 w-[180px] bg-gray-800/80 border-gray-700 text-gray-200">
              <SelectValue placeholder="Niche" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700 text-gray-200">
              <SelectItem value="all" className="focus:bg-gray-700">All Niches</SelectItem>
              {niches.map(niche => (
                <SelectItem key={niche} value={niche} className="focus:bg-gray-700">{niche}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {(categoryFilter !== "all" || nicheFilter !== "all") && (
            <button 
              onClick={() => {
                setCategoryFilter('all');
                setNicheFilter('all');
              }}
              className="text-xs text-pink-400 hover:text-pink-300 transition-colors"
            >
              Clear filters
            </button>
          )}
          
          {categoryFilter !== "all" && (
            <Badge variant="outline" className="bg-pink-500/10 border-pink-500/30 text-pink-400">
              {categoryFilter}
              <button 
                onClick={() => setCategoryFilter('all')}
                className="ml-1 text-xs hover:text-white"
              >
                ✕
              </button>
            </Badge>
          )}
          
          {nicheFilter !== "all" && (
            <Badge variant="outline" className="bg-purple-500/10 border-purple-500/30 text-purple-400">
              {nicheFilter}
              <button 
                onClick={() => setNicheFilter('all')}
                className="ml-1 text-xs hover:text-white"
              >
                ✕
              </button>
            </Badge>
          )}
        </div>

        {isLoading && (
          <div className="flex justify-center items-center min-h-[300px]">
            <div className="relative">
              <div className="w-16 h-16 rounded-full border-t-2 border-r-2 border-pink-500 animate-spin"></div>
              <div className="w-12 h-12 rounded-full border-t-2 border-r-2 border-purple-500 animate-spin absolute inset-0 m-auto" style={{animationDirection: 'reverse', animationDuration: '1s'}}></div>
              <Star className="h-6 w-6 text-yellow-400 absolute inset-0 m-auto" />
            </div>
          </div>
        )}

        {error && (
          <div className="text-center text-red-400 min-h-[300px] flex flex-col items-center justify-center p-8 bg-red-900/20 rounded-xl border border-red-800/50">
            <div className="mb-4 p-4 rounded-full bg-red-900/40">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-400"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
            </div>
            <p className="text-lg font-medium">Error loading business accounts</p>
            <p className="text-red-300/80 mt-2">Using fallback data for demonstration</p>
          </div>
        )}

        {filteredInfluencers && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredInfluencers.map(influencer => (
                <div key={influencer.id} className="transform hover:scale-[1.02] transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10">
                  <InstagramInfluencerCard influencer={influencer} />
                </div>
              ))}
            </div>
            
            {filteredInfluencers.length === 0 && (
              <div className="text-center text-gray-400 min-h-[300px] flex flex-col items-center justify-center p-8 bg-gray-800/50 rounded-xl border border-gray-700/50">
                <div className="mb-4 p-4 rounded-full bg-gray-800/80">
                  <Search className="h-8 w-8 text-gray-500" />
                </div>
                <p className="text-lg font-medium">No business accounts found</p>
                <p className="text-gray-500 mt-2">Try adjusting your search criteria</p>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}