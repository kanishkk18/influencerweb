import qs from "query-string";

export const recruiterOnboardFormControls = [
  {
    label: "Name",
    name: "name",
    placeholder: "Enter your name",
    componentType: "input",
  },
  {
    label: "Company Name",
    name: "companyName",
    placeholder: "Enter your company name",
    componentType: "input",
  },
  {
    label: "Company Role",
    name: "companyRole",
    placeholder: "Enter your company role",
    componentType: "input",
  },
];

export const initialRecruiterFormData = {
  name: "",
  companyName: "",
  companyRole: "",
};

export const candidateOnboardFormControls = [
  {
    label: "Profile Image",
    name: "resume",
    componentType: "file",
  },
  {
    label: "Name",
    name: "name",
    placeholder: "Enter your name",
    componentType: "input",
  },
  {
    label: "Followers or Subscribers",
    name: "currentCompany",
    placeholder: "Your Followers or Subscribers",
    componentType: "input",
  },
  {
    label: "Engagement Rate in (%)",
    name: "currentJobLocation",
    placeholder: "Enter your Engagement Rate in (%)",
    componentType: "input",
  },
  {
    label: "Prefered Category",
    name: "preferedJobLocation",
    placeholder: "Enter your Prefered Category",
    componentType: "input",
  },
  {
    label: "Recent Campaign or Ad",
    name: "currentSalary",
    placeholder: "Enter your Recent Campaign or Ad",
    componentType: "input",
  },
  {
    label: "Content Delivery Tenure",
    name: "noticePeriod",
    placeholder: "Enter your Fastest content Delivery",
    componentType: "input",
  },
  {
    label: "Skills",
    name: "skills",
    placeholder: "Enter your skills",
    componentType: "input",
  },
  {
    label: "Address",
    name: "previousCompanies",
    placeholder: "Enter your Address",
    componentType: "input",
  },
  {
    label: "Total Experience",
    name: "totalExperience",
    placeholder: "Enter your total experience",
    componentType: "input",
  },
  {
    label: "Currency",
    name: "college",
    placeholder: "Enter your Prefered Currency",
    componentType: "input",
  },
  {
    label: "College Location",
    name: "collegeLocation",
    placeholder: "Enter your college location",
    componentType: "input",
  },
  {
    label: "Langauges",
    name: "graduatedYear",
    placeholder: "Languages you're Familiar With",
    componentType: "input",
  },
  {
    label: "Linkedin Profile",
    name: "linkedinProfile",
    placeholder: "Enter your linkedin profile",
    componentType: "input",
  },
  {
    label: "Github Profile",
    name: "githubProfile",
    placeholder: "Enter your github profile",
    componentType: "input",
  },
];

export const initialCandidateFormData = {
  resume: "",
  name: "",
  currentJobLocation: "",
  preferedJobLocation: "",
  currentSalary: "",
  noticePeriod: "",
  skills: "",
  currentCompany: "",
  previousCompanies: "",
  totalExperience: "",
  college: "",
  collegeLocation: "",
  graduatedYear: "",
  linkedinProfile: "",
  githubProfile: "",
};

export const initialCandidateAccountFormData = {
  name: "",
  currentJobLocation: "",
  preferedJobLocation: "",
  currentSalary: "",
  noticePeriod: "",
  skills: "",
  currentCompany: "",
  previousCompanies: "",
  totalExperience: "",
  college: "",
  collegeLocation: "",
  graduatedYear: "",
  linkedinProfile: "",
  githubProfile: "",
};

export const postNewJobFormControls = [
  {
    label: "Company Name",
    name: "companyName",
    placeholder: "Company Name",
    componentType: "input",
    disabled: true,
  },
  {
    label: "Title",
    name: "title",
    placeholder: "Job Title",
    componentType: "input",
  },
  {
    label: "Type",
    name: "type",
    placeholder: "Job Type",
    componentType: "input",
  },
  {
    label: "Location",
    name: "location",
    placeholder: "Job Location",
    componentType: "input",
  },
  {
    label: "Experience",
    name: "experience",
    placeholder: "Experience",
    componentType: "input",
  },
  {
    label: "Description",
    name: "description",
    placeholder: "Description",
    componentType: "input",
  },
  {
    label: "Skills",
    name: "skills",
    placeholder: "Skills",
    componentType: "input",
  },
];

export const initialPostNewJobFormData = {
  companyName: "",
  title: "",
  type: "",
  location: "",
  experience: "",
  description: "",
  skills: "",
};

export const filterMenuDataArray = [
  {
    id: "companyName",
    label: "Company Name",
  },
  {
    id: "title",
    label: "Title",
  },
  {
    id: "type",
    label: "Type",
  },
  {
    id: "location",
    label: "Location",
  },
];

export function formUrlQuery({ params, dataToAdd }) {
  let currentURL = qs.parse(params);

  if (Object.keys(dataToAdd).length > 0) {
    Object.keys(dataToAdd).map((key) => {
      if (dataToAdd[key].length === 0) delete currentURL[key];
      else currentURL[key] = dataToAdd[key].join(",");
    });
  }

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentURL,
    },
    {
      skipNull: true,
    }
  );
}

export const membershipPlans = [
  {
    heading: "Tier 1",
    price: 100,
    type: "basic",
  },
  {
    heading: "Tier 2",
    price: 1000,
    type: "teams",
  },
  {
    heading: "Tier 3",
    price: 5000,
    type: "enterprise",
  },
];


export const getAvailableOrders = () => {
  const userGrade = currentUser.grade;
  
  return mockOrders
    .filter(order => 
      order.status === "open" && 
      order.remainingReels > 0 &&
      order.minGrade <= userGrade && 
      order.maxGrade >= userGrade
    )
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

export const formatOrderDetails = (order) => {
  const client = getClientById(order.clientId);
  const userGrade = currentUser.grade;
  const isAvailable = order.status === "open" && 
                      order.remainingReels > 0 &&
                      order.minGrade <= userGrade && 
                      order.maxGrade >= userGrade;
  const hasAlreadyClaimed = hasClaimedJob(currentUser.id, order.id);

  return {
    ...order,
    clientName: client?.name || "Unknown Client",
    clientAvatar: client?.logo || "/placeholder.svg",
    minGradeName: getGradeName(order.minGrade),
    maxGradeName: getGradeName(order.maxGrade),
    isAvailable,
    hasAlreadyClaimed,
    deadlineFormatted: formatDeadline(order.deadline),
    isInGradeRange: userGrade >= order.minGrade && userGrade <= order.maxGrade,
    progress: Math.round(((order.totalReels - order.remainingReels) / order.totalReels) * 100),
  };
};

export const gradeTable = [
  {
    grade: 1,
    name: "Nano Influencer",
    followers: "1K - 10K",
    engagementRate: "5% - 10%",
    averageLikes: "500 - 2K",
    averageViews: "1K - 5K",
    description: "Small but highly engaged audience, ideal for niche campaigns.",
    inrMin: 100,
    inrMax: 500,
    usdMin: 1.1,
    usdMax: 5.6
  },
  {
    grade: 2,
    name: "Micro Influencer",
    followers: "10K - 50K",
    engagementRate: "4% - 8%",
    averageLikes: "2K - 10K",
    averageViews: "5K - 20K",
    description: "Strong local or niche influence, cost-effective for small brands.",
    inrMin: 200,
    inrMax: 1000,
    usdMin: 2.2,
    usdMax: 11.1
  },
  {
    grade: 3,
    name: "Rising Star",
    followers: "50K - 100K",
    engagementRate: "3.5% - 7%",
    averageLikes: "10K - 20K",
    averageViews: "20K - 50K",
    description: "Growing audience with high potential, suitable for emerging brands.",
    inrMin: 500,
    inrMax: 2000,
    usdMin: 5.6,
    usdMax: 22.2
  },
  {
    grade: 4,
    name: "Mid-Tier Influencer",
    followers: "100K - 250K",
    engagementRate: "3% - 6%",
    averageLikes: "20K - 50K",
    averageViews: "50K - 100K",
    description: "Established influence, ideal for mid-sized campaigns.",
    inrMin: 1000,
    inrMax: 5000,
    usdMin: 11.1,
    usdMax: 55.6
  },
  {
    grade: 5,
    name: "Macro Influencer",
    followers: "250K - 500K",
    engagementRate: "2.5% - 5%",
    averageLikes: "50K - 100K",
    averageViews: "100K - 250K",
    description: "Large audience, suitable for broader campaigns.",
    inrMin: 2000,
    inrMax: 8000,
    usdMin: 22.2,
    usdMax: 88.9
  },
  {
    grade: 6,
    name: "Mega Influencer",
    followers: "500K - 1M",
    engagementRate: "2% - 4.5%",
    averageLikes: "100K - 200K",
    averageViews: "250K - 500K",
    description: "High reach, ideal for national or regional campaigns.",
    inrMin: 5000,
    inrMax: 10000,
    usdMin: 55.6,
    usdMax: 111.1
  },
  {
    grade: 7,
    name: "Celebrity Lite",
    followers: "1M - 2M",
    engagementRate: "1.5% - 4%",
    averageLikes: "200K - 500K",
    averageViews: "500K - 1M",
    description: "Near-celebrity status, suitable for large-scale campaigns.",
    inrMin: 10000,
    inrMax: 20000,
    usdMin: 111.1,
    usdMax: 222.2
  },
  {
    grade: 8,
    name: "Celebrity",
    followers: "2M - 5M",
    engagementRate: "1% - 3.5%",
    averageLikes: "500K - 1M",
    averageViews: "1M - 2M",
    description: "Celebrity-level influence, ideal for high-budget campaigns.",
    inrMin: 20000,
    inrMax: 40000,
    usdMin: 222.2,
    usdMax: 444.4
  },
  {
    grade: 9,
    name: "Superstar",
    followers: "5M - 10M",
    engagementRate: "0.8% - 3%",
    averageLikes: "1M - 2M",
    averageViews: "2M - 5M",
    description: "Massive reach, suitable for global or high-impact campaigns.",
    inrMin: 25000,
    inrMax: 50000,
    usdMin: 277.8,
    usdMax: 555.6
  },
  {
    grade: 10,
    name: "Icon",
    followers: "10M+",
    engagementRate: "0.5% - 2.5%",
    averageLikes: "2M+",
    averageViews: "5M+",
    description: "Top-tier influencers with global recognition, ideal for premium campaigns.",
    inrMin: 50000,
    inrMax: 100000,
    usdMin: 555.6,
    usdMax: 1111.1
  }
];

export const getGradeDetails = (grade) => {
  return {
    grade,
    gradeName: getGradeName(grade),
  };
};

export const getGradeName = (grade) => {
  return gradeTable.find(g => g.grade === grade)?.name || `Grade ${grade}`;
};