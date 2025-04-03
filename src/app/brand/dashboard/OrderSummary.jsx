
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const OrderSummary = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Card className="card-glow animate-fade-in">
        <CardHeader className="pb-2">
          <CardDescription>Total Orders</CardDescription>
          <CardTitle className="text-3xl font-normal">12</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">3 active campaigns</span>
            <span className="text-xs px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 rounded-full">
              +27% this month
            </span>
          </div>
        </CardContent>
      </Card>
      
      <Card className="card-glow animate-fade-in" style={{ animationDelay: "0.1s" }}>
        <CardHeader className="pb-2">
          <CardDescription>Total Reels</CardDescription>
          <CardTitle className="text-3xl font-normal">784</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">32 awaiting approval</span>
            <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 rounded-full">
              +14% this month
            </span>
          </div>
        </CardContent>
      </Card>
      
      <Card className="card-glow animate-fade-in" style={{ animationDelay: "0.2s" }}>
        <CardHeader className="pb-2">
          <CardDescription>Budget Spent</CardDescription>
          <CardTitle className="text-3xl font-normal">$25,650</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">$8,240 available</span>
            <span className="text-xs px-2 py-1 bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100 rounded-full">
              75% of total
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderSummary;
