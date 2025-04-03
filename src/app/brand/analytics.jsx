import Layout from './Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
const Analytics = () => {
  // Sample analytics data (in a real app, this would come from an API)
  const viewsData = [
    { name: 'Jan', views: 150000 },
    { name: 'Feb', views: 180000 },
    { name: 'Mar', views: 250000 },
    { name: 'Apr', views: 320000 },
    { name: 'May', views: 410000 },
    { name: 'Jun', views: 380000 },
  ];
  
  const campaignsData = [
    { name: 'Summer Collection', reels: 48, views: 245000, engagement: 32000 },
    { name: 'Product Unboxing', reels: 36, views: 180000, engagement: 24000 },
    { name: 'Brand Awareness', reels: 0, views: 0, engagement: 0 },
    { name: 'Spring Promotion', reels: 25, views: 120000, engagement: 18000 },
  ];
  
  const engagementData = [
    { name: 'Likes', value: 45 },
    { name: 'Comments', value: 25 },
    { name: 'Shares', value: 20 },
    { name: 'Saves', value: 10 },
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  return (
    <Layout>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-medium animate-slide-down">Analytics</h1>
          <p className="text-muted-foreground animate-slide-down" style={{ animationDelay: "0.1s" }}>
            Track and analyze your influencer marketing performance
          </p>
        </div>
        
        <div className="flex gap-2 animate-slide-down" style={{ animationDelay: "0.2s" }}>
          <Button variant="outline">Export Data</Button>
          <Button>Generate Report</Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="animate-fade-in">
          <CardHeader className="pb-2">
            <CardDescription>Total Views</CardDescription>
            <CardTitle className="text-3xl">1.69M</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-green-500 font-medium">↑ 24% from last month</div>
          </CardContent>
        </Card>
        
        <Card className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <CardHeader className="pb-2">
            <CardDescription>Engagement Rate</CardDescription>
            <CardTitle className="text-3xl">4.2%</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-green-500 font-medium">↑ 0.5% from last month</div>
          </CardContent>
        </Card>
        
        <Card className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <CardHeader className="pb-2">
            <CardDescription>Active Campaigns</CardDescription>
            <CardTitle className="text-3xl">3</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-amber-500 font-medium">1 campaign pending</div>
          </CardContent>
        </Card>
        
        <Card className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <CardHeader className="pb-2">
            <CardDescription>Total Reels</CardDescription>
            <CardTitle className="text-3xl">109</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-green-500 font-medium">↑ 18 new this month</div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <CardHeader>
            <CardTitle>Views Over Time</CardTitle>
            <CardDescription>Total views across all campaigns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={viewsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="views" name="Views" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="animate-fade-in" style={{ animationDelay: "0.5s" }}>
          <CardHeader>
            <CardTitle>Campaign Performance</CardTitle>
            <CardDescription>Views and engagement by campaign</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={campaignsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="views" name="Views" fill="#8884d8" />
                  <Bar dataKey="engagement" name="Engagement" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mb-6 animate-fade-in" style={{ animationDelay: "0.6s" }}>
        <CardHeader>
          <CardTitle>Engagement Breakdown</CardTitle>
          <CardDescription>Types of user engagement with your content</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-center justify-center">
            <div className="h-[300px] w-full md:w-1/2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={engagementData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {engagementData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="w-full md:w-1/2 grid grid-cols-2 gap-4 mt-4 md:mt-0">
              {engagementData.map((item, index) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-muted-foreground">{item.value}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
};
export default Analytics;