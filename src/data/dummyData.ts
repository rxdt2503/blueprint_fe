import { Client } from "../types/Client";

export const clients: Client[] = [
  {
    srNo: 1,
    name: "Client 1",
    business: "B1",
    industry: "Tech",
    status: "Active",
    lastUpdate: "2024-09-28",
    strategyStatus: "In progress",
    details: {
      name: "Client 1",
      businessName: "B1",
      status: "Active",
      lastUpdate: "2 days ago",
      strategyStatus: "In Progress",
      identity: "Who we are: Company A, focused on sustainability.",
      goals: "To expand market reach by 25% in 3 years.",
      currentStrategy: "Strategy 1: Increase digital marketing efforts.",
      progressCompleted: 45,
    },
  },
  {
    srNo: 2,
    name: "Client 2",
    business: "B2",
    industry: "Finance",
    status: "Inactive",
    lastUpdate: "2024-09-25",
    strategyStatus: "In progress",
    details: {
      name: "Client 2",
      businessName: "B2",
      status: "Active",
      lastUpdate: "1 hour ago",
      strategyStatus: "In Progress",
      identity: "Who we are: Company B, focused on innovation.",
      goals: "Launch new product line by next quarter.",
      currentStrategy: "Strategy 2: Build strategic partnerships.",
      progressCompleted: 85,
    },
  },
  {
    srNo: 3,
    name: "Client 3",
    business: "B3",
    industry: "Healthcare",
    status: "Active",
    lastUpdate: "2024-09-29",
    strategyStatus: "Completed",
    details: {
      name: "Client 3",
      businessName: "B2",
      status: "Active",
      lastUpdate: "1 hour ago",
      strategyStatus: "In Progress",
      identity: "Who we are: Company B, focused on innovation.",
      goals: "Launch new product line by next quarter.",
      currentStrategy: "Strategy 2: Build strategic partnerships.",
      progressCompleted: 100,
    },
  },
];