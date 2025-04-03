
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from 'next/navigation';




const grades = [
  { id: 1, name: "Grade 1", followers: "1M+", engagement: "5%+", pricePerReel: 1000 },
  { id: 2, name: "Grade 2", followers: "500K-1M", engagement: "4-5%", pricePerReel: 800 },
  { id: 3, name: "Grade 3", followers: "250K-500K", engagement: "3-4%", pricePerReel: 600 },
  { id: 4, name: "Grade 4", followers: "100K-250K", engagement: "2-3%", pricePerReel: 400 },
  { id: 5, name: "Grade 5", followers: "50K-100K", engagement: "1.5-2%", pricePerReel: 300 },
  { id: 6, name: "Grade 6", followers: "25K-50K", engagement: "1-1.5%", pricePerReel: 200 },
  { id: 7, name: "Grade 7", followers: "10K-25K", engagement: "0.8-1%", pricePerReel: 150 },
  { id: 8, name: "Grade 8", followers: "5K-10K", engagement: "0.6-0.8%", pricePerReel: 100 },
  { id: 9, name: "Grade 9", followers: "2K-5K", engagement: "0.4-0.6%", pricePerReel: 75 },
  { id: 10, name: "Grade 10", followers: "1K-2K", engagement: "0.2-0.4%", pricePerReel: 50 }
];

// Mock data for influencers
const mockInfluencers = [
  { 
    id: 1, 
    name: "Emma Johnson", 
    username: "@emmaj", 
    avatar: "https://randomuser.me/api/portraits/women/1.jpg", 
    grade: 1, 
    tier: "Nano Influencer",
    followers: "8K", 
    engagement: "8.5%", 
    priceRange: "INR 100 - 500", // Updated to range format
    usdRange: "$1.1 - 5.6",
    niches: ["Fashion", "Beauty"],
    description: "Small but highly engaged audience, ideal for niche campaigns."
  },
  { 
    id: 2, 
    name: "Alex Smith", 
    username: "@alexsmith", 
    avatar: "https://randomuser.me/api/portraits/men/1.jpg", 
    grade: 2, 
    tier: "Micro Influencer",
    followers: "35K", 
    engagement: "6.2%", 
    priceRange: "INR 200 - 1000", // Updated to range format
    usdRange: "$2.2 - 11.1",
    niches: ["Fitness", "Nutrition"],
    description: "Strong local or niche influence, cost-effective for small brands."
  },
  { 
    id: 3, 
    name: "Sarah Parker", 
    username: "@sarahp", 
    avatar: "https://randomuser.me/api/portraits/women/2.jpg", 
    grade: 3, 
    tier: "Rising Star",
    followers: "75K", 
    engagement: "5.5%", 
    priceRange: "INR 500 - 2000", // Updated to range format
    usdRange: "$5.6 - 22.2",
    niches: ["Lifestyle", "Travel"],
    description: "Growing audience with high potential, suitable for emerging brands."
  },
  { 
    id: 4, 
    name: "James Wilson", 
    username: "@jwilson", 
    avatar: "https://randomuser.me/api/portraits/men/2.jpg", 
    grade: 4, 
    tier: "Mid-Tier Influencer",
    followers: "180K", 
    engagement: "4.8%", 
    priceRange: "INR 1000 - 5000", // Updated to range format
    usdRange: "$11.1 - 55.6",
    niches: ["Gaming", "Tech"],
    description: "Established influence, ideal for mid-sized campaigns."
  },
  { 
    id: 5, 
    name: "Olivia Davis", 
    username: "@oliviad", 
    avatar: "https://randomuser.me/api/portraits/women/3.jpg", 
    grade: 5, 
    tier: "Macro Influencer",
    followers: "350K", 
    engagement: "3.8%", 
    priceRange: "INR 2000 - 8000", // Updated to range format
    usdRange: "$22.2 - 88.9",
    niches: ["Food", "Cooking"],
    description: "Large audience, suitable for broader campaigns."
  },
  { 
    id: 6, 
    name: "Michael Brown", 
    username: "@mbrown", 
    avatar: "https://randomuser.me/api/portraits/men/3.jpg", 
    grade: 6, 
    tier: "Mega Influencer",
    followers: "750K", 
    engagement: "3.2%", 
    priceRange: "INR 5000 - 10000", // Updated to range format
    usdRange: "$55.6 - 111.1",
    niches: ["Music", "Art"],
    description: "High reach, ideal for national or regional campaigns."
  },
  { 
    id: 7, 
    name: "Sophia Miller", 
    username: "@sophiam", 
    avatar: "https://randomuser.me/api/portraits/women/4.jpg", 
    grade: 7, 
    tier: "Celebrity Lite",
    followers: "1.5M", 
    engagement: "2.7%", 
    priceRange: "INR 10000 - 20000", // Updated to range format
    usdRange: "$111.1 - 222.2",
    niches: ["Beauty", "Skincare"],
    description: "Near-celebrity status, suitable for large-scale campaigns."
  },
  { 
    id: 8, 
    name: "David Garcia", 
    username: "@davidg", 
    avatar: "https://randomuser.me/api/portraits/men/4.jpg", 
    grade: 8, 
    tier: "Celebrity",
    followers: "3M", 
    engagement: "2.2%", 
    priceRange: "INR 20000 - 40000", // Updated to range format
    usdRange: "$222.2 - 444.4",
    niches: ["Sports", "Fitness"],
    description: "Celebrity-level influence, ideal for high-budget campaigns."
  },
  { 
    id: 9, 
    name: "Mia Anderson", 
    username: "@miaa", 
    avatar: "https://randomuser.me/api/portraits/women/5.jpg", 
    grade: 9, 
    tier: "Superstar",
    followers: "7M", 
    engagement: "1.8%", 
    priceRange: "INR 25000 - 50000", // Updated to range format
    usdRange: "$277.8 - 555.6",
    niches: ["Fashion", "Lifestyle"],
    description: "Massive reach, suitable for global or high-impact campaigns."
  },
  { 
    id: 10, 
    name: "Ethan Thompson", 
    username: "@ethant", 
    avatar: "https://randomuser.me/api/portraits/men/5.jpg", 
    grade: 10, 
    tier: "Icon",
    followers: "12M", 
    engagement: "1.2%", 
    priceRange: "INR 50000 - 100000", // Updated to range format
    usdRange: "$555.6 - 1111.1",
    niches: ["Tech", "Gadgets"],
    description: "Top-tier influencers with global recognition, ideal for premium campaigns."
  }
];
const InfluencerSelectionForm = () => {
  const Router = useRouter();
  const [formData, setFormData] = useState({
    campaignName: '',
    productName: '',
    reelRequirements: '',
  });
  
  const [selectedGrades, setSelectedGrades] = useState([]);
  const [filteredInfluencers, setFilteredInfluencers] = useState([]);
  const [selectedInfluencers, setSelectedInfluencers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    if (selectedGrades.length > 0) {
      const filtered = mockInfluencers.filter(influencer => 
        selectedGrades.includes(influencer.grade) &&
        (searchTerm === '' || 
          influencer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          influencer.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
          influencer.niches.some(niche => niche.toLowerCase().includes(searchTerm.toLowerCase()))
        )
      );
      setFilteredInfluencers(filtered);
    } else {
      setFilteredInfluencers([]);
    }
  }, [selectedGrades, searchTerm]);
  
  const toggleGradeSelection = (gradeId) => {
    setSelectedGrades(prev => {
      if (prev.includes(gradeId)) {
        return prev.filter(id => id !== gradeId);
      } else {
        return [...prev, gradeId].sort((a, b) => a - b);
      }
    });
  };
  
  const toggleInfluencerSelection = (influencer) => {
    setSelectedInfluencers(prev => {
      if (prev.some(i => i.id === influencer.id)) {
        return prev.filter(i => i.id !== influencer.id);
      } else {
        return [...prev, influencer];
      }
    });
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const totalBudget = selectedInfluencers.reduce((sum, influencer) => sum + influencer.pricePerReel, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (selectedInfluencers.length === 0) {
      toast({
        title: "No influencers selected",
        description: "Please select at least one influencer before submitting.",
        variant: "destructive"
      });
      return;
    }
    
    // Simulate form submission
    toast({
      title: "Order submitted successfully!",
      description: `Your order with ${selectedInfluencers.length} influencers has been created.`,
    });
    Router.push('/brand');
  };

  const handleCancel = () => {
    Router.push('/create-order');
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 animate-fade-in">
      <div className="mb-6">
       
        <h1 className="text-3xl font-medium mb-2">Select Specific Influencers</h1>
        <p className="text-muted-foreground">
          Choose the exact influencers you want to work with
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Information</CardTitle>
              <CardDescription>
                Provide details about your campaign
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="campaignName">Campaign Name</Label>
                  <Input
                    id="campaignName"
                    name="campaignName"
                    placeholder="Premium Product Launch"
                    value={formData.campaignName}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="productName">Product/Service</Label>
                  <Input
                    id="productName"
                    name="productName"
                    placeholder="Product or service being promoted"
                    value={formData.productName}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="reelRequirements">Reel Requirements</Label>
                  <Textarea
                    id="reelRequirements"
                    name="reelRequirements"
                    placeholder="Describe what you want influencers to showcase and mention in their reels"
                    value={formData.reelRequirements}
                    onChange={handleChange}
                    rows={3}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Select Influencer Grades</CardTitle>
              <CardDescription>
                First, choose which grades of influencers you're interested in
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-6">
                {grades.map((grade) => (
                  <Badge
                    key={grade.id}
                    variant={selectedGrades.includes(grade.id) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleGradeSelection(grade.id)}
                  >
                    {grade.name} (${grade.pricePerReel}/reel)
                  </Badge>
                ))}
              </div>
              
              {selectedGrades.length > 0 && (
                <>
                  <div className="mb-4">
                    <Label htmlFor="searchInfluencers">Search Influencers</Label>
                    <Input
                      id="searchInfluencers"
                      placeholder="Search by name, username, or niche"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  
                  <div className="mb-2 text-sm">
                    Showing {filteredInfluencers.length} influencers
                  </div>
                  
                  <ScrollArea className="h-[400px] rounded-md border">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                      {filteredInfluencers.map((influencer) => (
                        <div
                          key={influencer.id}
                          className={`p-4 border rounded-lg ${
                            selectedInfluencers.some(i => i.id === influencer.id)
                              ? "border-primary bg-primary/5"
                              : "hover:border-primary/50"
                          } transition-colors cursor-pointer`}
                          onClick={() => toggleInfluencerSelection(influencer)}
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <Avatar className="h-10 w-10">
                              <img src={influencer.avatar} alt={influencer.name} />
                            </Avatar>
                            <div>
                              <div className="font-medium">{influencer.name}</div>
                              <div className="text-sm text-muted-foreground">{influencer.username}</div>
                            </div>
                            <Checkbox
                              checked={selectedInfluencers.some(i => i.id === influencer.id)}
                              className="ml-auto"
                              onCheckedChange={() => toggleInfluencerSelection(influencer)}
                            />
                          </div>
                          
                          <div className="grid grid-cols-3 gap-2 mb-2 text-sm">
                            <div>
                              <span className="text-muted-foreground">Grade:</span>{" "}
                              <Badge variant="outline" className="ml-1">
                                {grades.find(g => g.id === influencer.grade)?.name}
                              </Badge>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Followers:</span>{" "}
                              <span>{influencer.followers}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Engagement:</span>{" "}
                              <span>{influencer.engagement}</span>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-1 mb-2">
                            {influencer.niches.map((niche, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {niche}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="text-right font-medium">
                            ${influencer.pricePerReel}/reel
                          </div>
                        </div>
                      ))}
                      
                      {filteredInfluencers.length === 0 && (
                        <div className="col-span-2 text-center py-8 text-muted-foreground">
                          No influencers found matching your criteria
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </>
              )}
              
              {selectedGrades.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  Please select at least one grade to view available influencers
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div>
          <div className="sticky top-4">
            <Card>
              <CardHeader>
                <CardTitle>Your Selection</CardTitle>
                <CardDescription>
                  Selected influencers: {selectedInfluencers.length}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedInfluencers.length > 0 ? (
                  <ScrollArea className="h-[300px] pr-4">
                    <div className="space-y-3">
                      {selectedInfluencers.map((influencer) => (
                        <div key={influencer.id} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <img src={influencer.avatar} alt={influencer.name} />
                            </Avatar>
                            <div>
                              <div className="text-sm font-medium">{influencer.name}</div>
                              <div className="text-xs text-muted-foreground">
                                Grade {influencer.grade}
                              </div>
                            </div>
                          </div>
                          <div className="text-sm font-medium">${influencer.pricePerReel}</div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                ) : (
                  <div className="text-center py-8 text-muted-foreground text-sm">
                    No influencers selected yet
                  </div>
                )}
                
                <Separator className="my-4" />
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Total Influencers:</span>
                    <span className="font-medium">{selectedInfluencers.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Budget:</span>
                    <span className="font-medium">${totalBudget.toLocaleString()}</span>
                  </div>
                </div>
                
                <Button
                  className="w-full mt-6"
                  disabled={selectedInfluencers.length === 0}
                  onClick={(e) => {
                    e.preventDefault();
                    handleSubmit(e);
                  }}
                >
                  Create Order
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full mt-2"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfluencerSelectionForm;
