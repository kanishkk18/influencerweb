
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { useRouter } from 'next/navigation';

const CustomizedOfferForm = () => {
  const Router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    budget: '',
    timeframe: 'flexible',
    description: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRadioChange = (value) => {
    setFormData(prev => ({
      ...prev,
      timeframe: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission with delay
    setTimeout(() => {
      toast({
        title: "Request submitted successfully!",
        description: "Our team will contact you within 24 hours.",
      });
      setIsSubmitting(false);
      Router.push('/brand');
    }, 1500);
  };

  const handleCancel = () => {
    Router.push('/create-order');
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8 animate-fade-in">
      <div className="mb-6">
        
        <h1 className="text-3xl font-medium mb-2">Customized Offer</h1>
        <p className="text-muted-foreground">
          Get personalized assistance from our expert team
        </p>
      </div>

      <Card className="glass-panel">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Request a Consultation</CardTitle>
            <CardDescription>
              Our team of experts will create a tailored influencer marketing campaign for your specific needs
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  name="company"
                  placeholder="Your Company Ltd."
                  value={formData.company}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  placeholder="+1 (555) 123-4567"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <Label htmlFor="budget">Approximate Budget</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                  $
                </div>
                <Input
                  id="budget"
                  name="budget"
                  placeholder="5,000"
                  className="pl-8"
                  value={formData.budget}
                  onChange={handleChange}
                  required
                />
              </div>
              <p className="text-xs text-muted-foreground">Provide an estimate of your campaign budget</p>
            </div>
            
            <div className="space-y-3">
              <Label>Timeframe</Label>
              <RadioGroup value={formData.timeframe} onValueChange={handleRadioChange}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="urgent" id="urgent" />
                  <Label htmlFor="urgent" className="cursor-pointer">Urgent (Within 1 week)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="standard" id="standard" />
                  <Label htmlFor="standard" className="cursor-pointer">Standard (2-4 weeks)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="flexible" id="flexible" />
                  <Label htmlFor="flexible" className="cursor-pointer">Flexible (More than 4 weeks)</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Campaign Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Please describe your marketing goals, any specific requirements, target audience, and other relevant information..."
                value={formData.description}
                onChange={handleChange}
                rows={5}
                required
              />
            </div>
            
            <div className="bg-muted p-4 rounded-lg">
              <h4 className="font-medium mb-2">What happens next?</h4>
              <ol className="list-decimal pl-5 space-y-1 text-sm">
                <li>Our team will review your request within 24 hours</li>
                <li>We'll schedule a consultation call to discuss your needs in detail</li>
                <li>You'll receive a custom proposal based on your requirements</li>
                <li>Once approved, we'll handle the campaign setup and management</li>
              </ol>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </>
              ) : "Submit Request"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default CustomizedOfferForm;
