import { toast } from "sonner";

// Mock data function - replace with actual API in production
const getMockVideos = () => {
  return [
    {
      id: "1",
      title: "Essential Design Principles",
      description: "A detailed exploration of minimalist design principles, focusing on how simplicity and clarity enhance user experience in digital products. This video covers key concepts from leading designers.",
      creator: "DesignMaster",
      platform: "youtube",
      category: "Design",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      thumbnailUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2340&auto=format&fit=crop",
      views: 24500,
      likes: 2100,
      status: "approved",
      submittedAt: "2023-11-15T14:48:00.000Z",
    },
    {
      id: "2",
      title: "Modern UI Animation Techniques",
      description: "Learn advanced animation techniques that can elevate your UI design. This tutorial covers timing, easing, and psychological impact of motion in interfaces.",
      creator: "AnimationPro",
      platform: "instagram",
      category: "Animation",
      url: "https://www.instagram.com/p/abcdefg/",
      thumbnailUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2340&auto=format&fit=crop",
      views: 18300,
      likes: 1840,
      status: "pending",
      submittedAt: "2023-12-02T09:30:00.000Z",
    },
    {
      id: "3",
      title: "Typography in Digital Products",
      description: "A comprehensive guide to typography in digital products. This video examines font selection, hierarchy, and readability across different devices and contexts.",
      creator: "TypeGeek",
      platform: "youtube",
      category: "Typography",
      url: "https://www.youtube.com/watch?v=abcdefg",
      thumbnailUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2340&auto=format&fit=crop",
      views: 32100,
      likes: 2700,
      status: "rejected",
      submittedAt: "2023-10-28T16:15:00.000Z",
      rejectionReason: "Content contains copyrighted material",
    },
    {
      id: "4",
      title: "Color Theory for UX Designers",
      description: "Explore how color theory influences user experience design. This tutorial covers color psychology, accessibility considerations, and practical applications in digital products.",
      creator: "UXMaster",
      platform: "instagram",
      category: "UX Design",
      url: "https://www.instagram.com/p/hijklmn/",
      thumbnailUrl: "https://images.unsplash.com/photo-1523821741446-edb2b68bb7a0?q=80&w=2340&auto=format&fit=crop",
      views: 15600,
      likes: 1420,
      status: "approved",
      submittedAt: "2023-11-10T11:20:00.000Z",
    },
    {
      id: "5",
      title: "Interaction Design Fundamentals",
      description: "Master the principles of interaction design with practical examples. This in-depth guide explores how to create intuitive and engaging user interactions across different platforms.",
      creator: "InteractionPro",
      platform: "youtube",
      category: "Interaction Design",
      url: "https://www.youtube.com/watch?v=hijklmn",
      thumbnailUrl: "https://images.unsplash.com/photo-1565106430482-8f6e74349ca1?q=80&w=2340&auto=format&fit=crop",
      views: 28900,
      likes: 2350,
      status: "pending",
      submittedAt: "2023-12-05T13:45:00.000Z",
    }
  ];
};

// Production-ready fetch functions
export const fetchVideos = async () => {
  try {
    // For production, replace with actual API call:
    // const response = await fetch('https://api.example.com/videos');
    // if (!response.ok) throw new Error('Failed to fetch videos');
    // return await response.json();
    
    // Simulating network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    return getMockVideos();
  } catch (error) {
    console.error("Error fetching videos:", error);
    toast.error("Failed to load videos. Please try again later.");
    return [];
  }
};

export const fetchVideoDetails = async (videoId) => {
  try {
    // For production, replace with actual API call:
    // const response = await fetch(`https://api.example.com/videos/${videoId}`);
    // if (!response.ok) throw new Error('Failed to fetch video details');
    // return await response.json();
    
    // Simulating network delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const video = getMockVideos().find(v => v.id === videoId);
    if (!video) return null;
    
    // Add extra details for the details view
    return {
      ...video,
      comments: [
        {
          id: "c1",
          author: "DesignEnthusiast",
          text: "This is exactly what I needed to improve my design process. Great insights!",
          timestamp: "2023-12-10T09:15:00.000Z"
        },
        {
          id: "c2",
          author: "CreativeMind",
          text: "Love the examples and practical applications. Would be great to see a follow-up on advanced techniques.",
          timestamp: "2023-12-11T14:30:00.000Z"
        }
      ],
      tags: ["design", "ux", "minimalism", "interface"],
      duration: "14:25"
    };
  } catch (error) {
    console.error("Error fetching video details:", error);
    toast.error("Failed to load video details. Please try again later.");
    return null;
  }
};

export const updateVideoStatus = async (
  videoId, 
  status, 
  rejectionReason
) => {
  try {
    // For production, replace with actual API call:
    // const response = await fetch(`https://api.example.com/videos/${videoId}/status`, {
    //   method: 'PATCH',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ status, rejectionReason })
    // });
    // if (!response.ok) throw new Error('Failed to update video status');
    // return true;
    
    // Simulating network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    console.log(`Video ${videoId} status updated to ${status}`, rejectionReason ? `Reason: ${rejectionReason}` : '');
    toast.success(`Video has been ${status === 'approved' ? 'approved' : 'rejected'}`);
    return true;
  } catch (error) {
    console.error("Error updating video status:", error);
    toast.error("Failed to update video status. Please try again later.");
    return false;
  }
};