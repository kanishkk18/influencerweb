import Layout from './Layout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
const Payments = () => {
  // Sample payments data (in a real app, this would come from an API)
  const payments = [
    {
      id: "PAY-001",
      date: "2023-05-18",
      amount: "$2,500.00",
      status: "Completed",
      campaign: "Summer Collection Launch",
      method: "Credit Card",
      invoice: "INV-2023-05-001"
    },
    {
      id: "PAY-002",
      date: "2023-05-05",
      amount: "$1,800.00",
      status: "Completed",
      campaign: "Product Unboxing Series",
      method: "Bank Transfer",
      invoice: "INV-2023-05-002"
    },
    {
      id: "PAY-003",
      date: "2023-06-01",
      amount: "$3,750.00",
      status: "Pending",
      campaign: "Brand Awareness Campaign",
      method: "Credit Card",
      invoice: "INV-2023-06-001"
    },
    {
      id: "PAY-004",
      date: "2023-04-15",
      amount: "$950.00",
      status: "Completed",
      campaign: "Spring Promotion",
      method: "PayPal",
      invoice: "INV-2023-04-003"
    }
  ];
  // Sample balance and statistics
  const balance = {
    available: "$5,250.00",
    pending: "$3,750.00",
    spent: "$5,250.00"
  };
  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-medium animate-slide-down">Payments</h1>
        <p className="text-muted-foreground animate-slide-down" style={{ animationDelay: "0.1s" }}>
          Manage your payment history and balance
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="animate-fade-in">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Available Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{balance.available}</div>
            <Button className="w-full mt-4">Withdraw Funds</Button>
          </CardContent>
        </Card>
        
        <Card className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Pending Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{balance.pending}</div>
            <p className="text-sm text-muted-foreground mt-2">
              Funds will be released once campaigns are completed
            </p>
          </CardContent>
        </Card>
        
        <Card className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Spent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{balance.spent}</div>
            <p className="text-sm text-muted-foreground mt-2">
              Total amount spent on campaigns this year
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle>Payment History</CardTitle>
            <Button variant="outline" size="sm">Download Report</Button>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px]">
            <div className="space-y-4">
              {payments.map(payment => (
                <div key={payment.id} className="p-4 border rounded-lg">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                    <div>
                      <h3 className="font-medium">{payment.campaign}</h3>
                      <p className="text-sm text-muted-foreground">Payment ID: {payment.id} • {payment.date}</p>
                    </div>
                    <div className="flex items-center gap-2 mt-2 md:mt-0">
                      <span className="text-lg font-bold">{payment.amount}</span>
                      <Badge className={
                        payment.status === "Completed" ? "bg-green-500" : 
                        payment.status === "Pending" ? "bg-amber-500" : "bg-red-500"
                      }>
                        {payment.status}
                      </Badge>
                    </div>
                  </div>
                  
                  <Separator className="my-3" />
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    <div>
                      <div className="text-xs text-muted-foreground">Invoice</div>
                      <div className="text-sm">{payment.invoice}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Method</div>
                      <div className="text-sm">{payment.method}</div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end mt-3">
                    <Button variant="outline" size="sm">View Details</Button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </Layout>
  );
};
export default Payments;