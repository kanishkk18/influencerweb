
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const activityData = [
  {
    id: 1,
    type: "content_uploaded",
    influencer: "Alex Johnson",
    campaign: "Summer Collection",
    time: "10 minutes ago",
  },
  {
    id: 2,
    type: "order_approved",
    influencer: "Sarah Miller",
    campaign: "Product Launch",
    time: "2 hours ago",
  },
  {
    id: 3,
    type: "influencer_joined",
    influencer: "Chris Davis",
    campaign: "New Product Unboxing",
    time: "4 hours ago",
  },
  {
    id: 4,
    type: "content_published",
    influencer: "Priya Sharma",
    campaign: "Summer Collection",
    time: "Yesterday",
  },
  {
    id: 5,
    type: "payment_processed",
    influencer: "Jordan Lee",
    campaign: "Holiday Special",
    time: "Yesterday",
  },
];

const ActivityIcon = ({ type }) => {
  switch (type) {
    case "content_uploaded":
      return (
        <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-700 dark:text-blue-300">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
            <path d="M12 12v9" />
            <path d="m16 16-4-4-4 4" />
          </svg>
        </div>
      );
    case "order_approved":
      return (
        <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center text-green-700 dark:text-green-300">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
      );
    case "influencer_joined":
      return (
        <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center text-purple-700 dark:text-purple-300">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M19 8v6" />
            <path d="M16 11h6" />
          </svg>
        </div>
      );
    case "content_published":
      return (
        <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center text-amber-700 dark:text-amber-300">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
        </div>
      );
    case "payment_processed":
      return (
        <div className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center text-teal-700 dark:text-teal-300">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="14" x="2" y="5" rx="2" />
            <line x1="2" x2="22" y1="10" y2="10" />
          </svg>
        </div>
      );
    default:
      return (
        <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center text-gray-700 dark:text-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" x2="12" y1="8" y2="12" />
            <line x1="12" x2="12.01" y1="16" y2="16" />
          </svg>
        </div>
      );
  }
};

const RecentActivity = () => {
  return (
    <Card className="animate-fade-in h-fit md:max-w-[28vw] w-auto md:mt-6" style={{ animationDelay: "0.4s" }}>
      <CardHeader className="pb-2">
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest updates from your campaigns</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[280px] pr-4">
          <div className="space-y-4">
            {activityData.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3">
                <ActivityIcon type={activity.type} />
                <div>
                  <p className="text-sm">
                    <span className="font-medium">{activity.influencer}</span>{" "}
                    {activity.type === "content_uploaded" && "uploaded new content for"}
                    {activity.type === "order_approved" && "had their order approved for"}
                    {activity.type === "influencer_joined" && "joined your campaign"}
                    {activity.type === "content_published" && "published content for"}
                    {activity.type === "payment_processed" && "received payment for"}
                    {" "}
                    <span className="font-medium">{activity.campaign}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
