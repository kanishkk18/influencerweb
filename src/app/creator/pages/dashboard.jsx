import { AppHeader } from "../../../components/appHeader";
import { OrderCard } from "../../../components/OrderCard";
import { formatOrderDetails, getAvailableOrders } from "@/services/appService";
import { useEffect, useState } from "react";
import { ChevronRight, BarChart2, Star, TrendingUp, Users, Award, Instagram, Youtube } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Index = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    // Simulate loading data
    const loadData = () => {
      const availableOrders = getAvailableOrders();
      setOrders(availableOrders.map(order => formatOrderDetails(order)));
      setLoading(false);
    };

    // Add a small delay to simulate API call
    const timer = setTimeout(loadData, 500);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    { 
      title: "Total Earnings", 
      value: "$12,450", 
      change: "+22%", 
      icon: <TrendingUp className="h-5 w-5 text-emerald-500" /> 
    },
    { 
      title: "Jobs Completed", 
      value: "24", 
      change: "+12", 
      icon: <Award className="h-5 w-5 text-purple-500" /> 
    },
    { 
      title: "Current Grade", 
      value: "Grade 8", 
      change: "", 
      icon: <Star className="h-5 w-5 text-amber-500" /> 
    },
    { 
      title: "Campaigns", 
      value: "14", 
      change: "+3", 
      icon: <BarChart2 className="h-5 w-5 text-blue-500" /> 
    },
  ];

  const platforms = [
    {
      name: "Instagram",
      influencers: 2450,
      icon: <Instagram className="h-5 w-5 text-pink-500" />,
      color: "from-pink-500 to-purple-500",
      link: "/instagram-influencers"
    },
    {
      name: "YouTube",
      influencers: 1820,
      icon: <Youtube className="h-5 w-5 text-red-500" />,
      color: "from-red-500 to-orange-500",
      link: "/youtube-influencers"
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground bg-gradient-to-br from-gray-900 to-black">
      <AppHeader />
      
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516796181074-bf453fbfa3e6')] bg-cover opacity-5 z-0"></div>
      
      <main className="container py-6 md:py-10 animate-fade-in relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Dashboard</h1>
            <p className="text-muted-foreground mt-1">Welcome back to your influencer dashboard</p>
          </div>
          
          <div className="flex gap-3">
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 border-0">
              Create Campaign
            </Button>
            <Button variant="outline" className="border-border bg-background/30 hover:bg-secondary/70 text-foreground">
              View Analytics
            </Button>
          </div>
        </div>
        
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-gray-800/30 border-gray-700 backdrop-blur-md overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0 pointer-events-none"></div>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <div className="p-2 bg-gray-800/50 rounded-md">{stat.icon}</div>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-2">
                  <div className="text-2xl font-bold">{stat.value}</div>
                  {stat.change && (
                    <p className="text-xs font-medium text-emerald-400">{stat.change}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Platform Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {platforms.map((platform, index) => (
            <Card key={index} className="bg-gray-800/30 border-gray-700 backdrop-blur-md overflow-hidden">
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${platform.color}`}></div>
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-md bg-gradient-to-br ${platform.color}`}>
                    {platform.icon}
                  </div>
                  <CardTitle className="text-lg">{platform.name}</CardTitle>
                </div>
                <Button variant="ghost" className="text-muted-foreground hover:text-foreground" asChild>
                  <Link href={platform.link}>
                    <span>View All</span>
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Available Influencers</p>
                    <div className="flex items-baseline gap-2">
                      <p className="text-2xl font-bold">{platform.influencers.toLocaleString()}</p>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                  <Button asChild className={`bg-gradient-to-r ${platform.color} border-0`}>
                    <Link href={platform.link}>Browse</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold tracking-tight">Available Orders</h2>
            <Button variant="outline" className="border-border bg-background/30 hover:bg-secondary/70 text-foreground">
              View All
            </Button>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((index) => (
                <div 
                  key={index} 
                  className="h-[280px] rounded-lg bg-gray-800/30 animate-pulse"
                />
              ))}
            </div>
          ) : orders.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {orders.slice(0, 3).map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          ) : (
            <div className={`flex flex-col items-center justify-center py-12 ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-800/30'} rounded-lg backdrop-blur-sm`}>
              <h3 className="text-xl font-semibold mb-2">No Available Orders</h3>
              <p className="text-muted-foreground text-center max-w-md">
                There are currently no orders available for your influencer grade. 
                Check back later or upgrade your grade to access more opportunities.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Index;