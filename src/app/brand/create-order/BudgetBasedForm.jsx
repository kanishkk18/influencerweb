
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
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

const BudgetBasedForm = () => {
  const Router = useRouter();
  const [formData, setFormData] = useState({
    campaignName: '',
    productName: '',
    reelRequirements: '',
    budget: 5000,
    totalQuantity: 50
  });
  
  const [distribution, setDistribution] = useState([]);
  const [selectedGrades, setSelectedGrades] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  
  useEffect(() => {
    calculateDistribution();
  }, [formData.budget, formData.totalQuantity, selectedGrades]);
  
  const calculateDistribution = () => {
    if (selectedGrades.length === 0) {
      setDistribution([]);
      return;
    }
    
    // Get selected grades data
    const filteredGrades = grades.filter(grade => selectedGrades.includes(grade.id));
    
    // Calculate total budget allocation
    const totalBudget = formData.budget;
    const totalTarget = formData.totalQuantity;
    
    // Simple weighted distribution based on inverse of price (more budget to lower grades)
    const totalInversePrice = filteredGrades.reduce((sum, grade) => sum + (1/grade.pricePerReel), 0);
    
    let newDistribution = [];
    let remainingBudget = totalBudget;
    let allocatedReels = 0;
    
    // First pass - allocate based on weights
    filteredGrades.forEach(grade => {
      const weight = (1/grade.pricePerReel) / totalInversePrice;
      let quantity = Math.floor((weight * totalTarget));
      let cost = quantity * grade.pricePerReel;
      
      // Ensure we don't exceed budget
      if (cost > remainingBudget) {
        quantity = Math.floor(remainingBudget / grade.pricePerReel);
        cost = quantity * grade.pricePerReel;
      }
      
      if (quantity > 0) {
        newDistribution.push({
          gradeId: grade.id,
          quantity,
          totalCost: cost
        });
        
        remainingBudget -= cost;
        allocatedReels += quantity;
      }
    });
    
    // Second pass - allocate remaining budget to highest priority grades
    if (remainingBudget > 0 && allocatedReels < totalTarget) {
      // Sort by grade (priority to higher grades)
      newDistribution.sort((a, b) => a.gradeId - b.gradeId);
      
      for (let i = 0; i < newDistribution.length && remainingBudget > 0; i++) {
        const grade = grades.find(g => g.id === newDistribution[i].gradeId);
        if (remainingBudget >= grade.pricePerReel) {
          const additionalReels = Math.floor(remainingBudget / grade.pricePerReel);
          const additionalCost = additionalReels * grade.pricePerReel;
          
          newDistribution[i].quantity += additionalReels;
          newDistribution[i].totalCost += additionalCost;
          
          remainingBudget -= additionalCost;
          allocatedReels += additionalReels;
        }
      }
    }
    
    setDistribution(newDistribution);
  };
  
  const totalAllocatedReels = distribution.reduce((sum, item) => sum + item.quantity, 0);
  const totalAllocatedBudget = distribution.reduce((sum, item) => sum + item.totalCost, 0);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'budget' || name === 'totalQuantity' ? parseInt(value) || 0 : value
    }));
  };
  
  const toggleGradeSelection = (gradeId) => {
    setSelectedGrades(prev => {
      if (prev.includes(gradeId)) {
        return prev.filter(id => id !== gradeId);
      } else {
        return [...prev, gradeId].sort((a, b) => a - b);
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (totalAllocatedBudget === 0) {
      toast({
        title: "Cannot create order",
        description: "Please select at least one grade and ensure your budget is sufficient.",
        variant: "destructive"
      });
      return;
    }
    
    // Simulate form submission
    toast({
      title: "Order submitted successfully!",
      description: "Your budget-based order has been created.",
    });
    Router.push('/brand');
  };

  const handleCancel = () => {
    Router.push('/brand/CreateOrder');
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 animate-fade-in">
      <div className="mb-6">
       
        <h1 className="text-3xl font-medium mb-2">Budget-Based Order</h1>
        <p className="text-muted-foreground">
          Specify your budget and we'll recommend the best influencer mix
        </p>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Campaign Information</CardTitle>
            <CardDescription>
              Provide details about your campaign and budget
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="campaignName">Campaign Name</Label>
                <Input
                  id="campaignName"
                  name="campaignName"
                  placeholder="Spring Collection Promotion"
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
            
            <Separator />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="budget">Your Budget</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                    $
                  </div>
                  <Input
                    id="budget"
                    name="budget"
                    type="number"
                    min={500}
                    step={100}
                    className="pl-8"
                    value={formData.budget}
                    onChange={handleChange}
                    required
                  />
                </div>
                <p className="text-xs text-muted-foreground">Minimum budget: $500</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="totalQuantity">Target Number of Reels</Label>
                <div className="relative">
                  <Input
                    id="totalQuantity"
                    name="totalQuantity"
                    type="number"
                    min={5}
                    step={5}
                    value={formData.totalQuantity}
                    onChange={handleChange}
                    required
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-muted-foreground text-sm">
                    Reels
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">Minimum: 5 reels</p>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <Label className="mb-2 block">Select Influencer Grades</Label>
              <div className="flex flex-wrap gap-2 mb-4">
                {grades.map((grade) => (
                  <Badge
                    key={grade.id}
                    variant={selectedGrades.includes(grade.id) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleGradeSelection(grade.id)}
                  >
                    {grade.name}
                  </Badge>
                ))}
              </div>
              <div className="text-xs text-muted-foreground mb-4">
                Click on grades to include/exclude them from your campaign
              </div>
            </div>
            
            <Card className="bg-muted/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Recommended Distribution</CardTitle>
                <CardDescription>
                  Based on your budget of ${formData.budget.toLocaleString()} for {formData.totalQuantity} reels
                </CardDescription>
              </CardHeader>
              <CardContent>
                {distribution.length > 0 ? (
                  <div className="space-y-3">
                    {distribution.map((item) => {
                      const grade = grades.find(g => g.id === item.gradeId);
                      return (
                        <div key={item.gradeId} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8 bg-primary/10 text-primary font-medium">
                              <span>{grade.id}</span>
                            </Avatar>
                            <div>
                              <div className="font-medium">{grade.name}</div>
                              <div className="text-xs text-muted-foreground">
                                {grade.followers} followers, ${grade.pricePerReel}/reel
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">{item.quantity} reels</div>
                            <div className="text-xs text-muted-foreground">${item.totalCost.toLocaleString()}</div>
                          </div>
                        </div>
                      );
                    })}
                    
                    <Separator className="my-2" />
                    
                    <div className="flex items-center justify-between font-medium">
                      <span>Total:</span>
                      <div className="text-right">
                        <div>{totalAllocatedReels} reels</div>
                        <div>${totalAllocatedBudget.toLocaleString()}</div>
                      </div>
                    </div>
                    
                    {totalAllocatedReels < formData.totalQuantity && (
                      <div className="text-sm text-amber-600 dark:text-amber-400 mt-2">
                        Note: Your budget allows for {totalAllocatedReels} reels, which is less than your target of {formData.totalQuantity}.
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-6 text-muted-foreground">
                    Please select at least one grade to see distribution
                  </div>
                )}
              </CardContent>
            </Card>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit">
              Create Budget-Based Order
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default BudgetBasedForm;
