import { useState } from 'react';
import Layout from '../brand/Layout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useRouter } from 'next/navigation';
import { Toaster } from "@/components/ui/sonner";


const MyOrders = () => {
  const Router = useRouter();
  
  // Sample orders data (in a real app, this would come from an API)
  const [orders, setOrders] = useState([
    {
      id: "ORD-001",
      campaignName: "Summer Collection Launch",
      date: "2023-05-15",
      budget: "$5,000",
      status: "Active",
      influencers: 25,
      reels: 48,
      views: "245K",
      description: "Showcase our summer clothing line with emphasis on beach wear and accessories."
    },
    {
      id: "ORD-002",
      campaignName: "Product Unboxing Series",
      date: "2023-04-20",
      budget: "$3,200",
      status: "Completed",
      influencers: 18,
      reels: 36,
      views: "180K",
      description: "Authentic unboxing videos featuring our premium tech gadgets."
    },
    {
      id: "ORD-003",
      campaignName: "Brand Awareness Campaign",
      date: "2023-06-01",
      budget: "$7,500",
      status: "Pending",
      influencers: 40,
      reels: 0,
      views: "0",
      description: "Increase brand visibility among target demographics using lifestyle content."
    }
  ]);

  // State for managing dialogs
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [editFormData, setEditFormData] = useState({
    campaignName: "",
    budget: "",
    status: "",
    description: ""
  });

  // Handle viewing order details
  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setIsDetailsOpen(true);
  };

  // Handle opening edit dialog
  const handleEditOpen = (order) => {
    setSelectedOrder(order);
    setEditFormData({
      campaignName: order.campaignName,
      budget: order.budget.replace("$", ""),
      status: order.status,
      description: order.description || ""
    });
    setIsEditOpen(true);
  };

  // Handle edit form changes
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle status change in dropdown
  const handleStatusChange = (value) => {
    setEditFormData(prev => ({
      ...prev,
      status: value
    }));
  };

  // Handle saving edit changes
  const handleSaveChanges = () => {
    const updatedOrders = orders.map(order => {
      if (order.id === selectedOrder.id) {
        return {
          ...order,
          campaignName: editFormData.campaignName,
          budget: `$${editFormData.budget}`,
          status: editFormData.status,
          description: editFormData.description
        };
      }
      return order;
    });
    
    setOrders(updatedOrders);
    setIsEditOpen(false);
    
    toast({
      title: "Campaign updated",
      description: "Your campaign has been successfully updated."
    });
  };

  // Handle delete confirmation
  const handleDeleteConfirm = () => {
    const updatedOrders = orders.filter(order => order.id !== selectedOrder.id);
    setOrders(updatedOrders);
    setIsDeleteOpen(false);
    
    toast({
      title: "Campaign deleted",
      description: "Your campaign has been successfully deleted."
    });
  };

  // Handle opening delete dialog
  const handleDeleteOpen = (order) => {
    setSelectedOrder(order);
    setIsDeleteOpen(true);
  };

  return (
    <Layout>
        
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-medium animate-slide-down">My Orders</h1>
          <p className="text-muted-foreground animate-slide-down" style={{ animationDelay: "0.1s" }}>
            Manage and track all your influencer marketing campaigns
          </p>
        </div>
        
        <Button 
          onClick={() => Router.push('/brand/CreateOrder')}
          className="animate-slide-down"
          style={{ animationDelay: "0.2s" }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
            <path d="M12 5v14" />
            <path d="M5 12h14" />
          </svg>
          Create New Order
        </Button>
      </div>
      
      <div className="space-y-4">
        {orders.map(order => (
          <Card key={order.id} className="animate-fade-in">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{order.campaignName}</CardTitle>
                  <div className="text-sm text-muted-foreground mt-1">Order ID: {order.id} • Created: {order.date}</div>
                </div>
                <Badge className={
                  order.status === "Active" ? "bg-green-500" : 
                  order.status === "Completed" ? "bg-blue-500" : "bg-amber-500"
                }>
                  {order.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <div className="text-sm text-muted-foreground">Budget</div>
                  <div className="font-medium">{order.budget}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Influencers</div>
                  <div className="font-medium">{order.influencers}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Reels Created</div>
                  <div className="font-medium">{order.reels}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Total Views</div>
                  <div className="font-medium">{order.views}</div>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex justify-end gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleViewDetails(order)}
                >
                  View Details
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleEditOpen(order)}
                >
                  Edit
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDeleteOpen(order)}
                >
                  Delete
                </Button>
                <Button 
                  size="sm"
                  onClick={() => {
                    toast({
                      title: "Campaign management",
                      description: "You can now manage all aspects of your campaign."
                    });
                  }}
                >
                  Manage Campaign
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* View Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Campaign Details</DialogTitle>
            <DialogDescription>
              Detailed information about your campaign.
            </DialogDescription>
          </DialogHeader>
          
          {selectedOrder && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Campaign ID:</Label>
                <div className="col-span-3">{selectedOrder.id}</div>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Campaign Name:</Label>
                <div className="col-span-3">{selectedOrder.campaignName}</div>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Created Date:</Label>
                <div className="col-span-3">{selectedOrder.date}</div>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Budget:</Label>
                <div className="col-span-3">{selectedOrder.budget}</div>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Status:</Label>
                <div className="col-span-3">
                  <Badge className={
                    selectedOrder.status === "Active" ? "bg-green-500" : 
                    selectedOrder.status === "Completed" ? "bg-blue-500" : "bg-amber-500"
                  }>
                    {selectedOrder.status}
                  </Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Total Influencers:</Label>
                <div className="col-span-3">{selectedOrder.influencers}</div>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Reels Created:</Label>
                <div className="col-span-3">{selectedOrder.reels}</div>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Total Views:</Label>
                <div className="col-span-3">{selectedOrder.views}</div>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right align-top">Description:</Label>
                <div className="col-span-3">{selectedOrder.description}</div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button onClick={() => setIsDetailsOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Campaign Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Edit Campaign</DialogTitle>
            <DialogDescription>
              Make changes to your campaign here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="campaignName">Campaign Name</Label>
              <Input
                id="campaignName"
                name="campaignName"
                value={editFormData.campaignName}
                onChange={handleEditChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="budget">Budget ($)</Label>
              <Input
                id="budget"
                name="budget"
                value={editFormData.budget}
                onChange={handleEditChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={editFormData.status}
                onValueChange={handleStatusChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={editFormData.description}
                onChange={handleEditChange}
                rows={3}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveChanges}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the campaign 
              "{selectedOrder?.campaignName}" and remove all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 hover:bg-red-600"
              onClick={handleDeleteConfirm}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Layout>
  );
};

export default MyOrders;