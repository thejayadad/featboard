import type { FeatureRequest } from "./types";

export const mockRequests: FeatureRequest[] = [
  {
    id: "1",
    title: "Add dark mode",
    description: "A comfortable experience for evening reading.",
    author: {
      id: "user-1",
      name: "Alex",
    },
    votes: 42,
    comments: 8,
    status: "IN_PROGRESS",
    createdAt: "2026-10-15T12:00:00Z",

  },
  {
    id: "2",
    title: "Export notes as PDF",
    description: "Download and share a formatted copy of any note.",
    author: {
      id: "user-2",
      name: "Sam",
    },
    votes: 28,
    comments: 3,
    status: "PLANNED",
    createdAt: "2026-10-16T12:00:00Z",

  },
  {
    id: "3",
    title: "Organize notes into folders",
    description: "Keep projects and related ideas together.",
    author: {
      id: "user-3",
      name: "Jordan",
    },
    votes: 16,
    comments: 5,
    status: "UNDER_REVIEW",
    createdAt: "2026-10-17T12:00:00Z",

  },
  {
    id: "4",
    title: "Search inside notes",
    description: "Find words and phrases across saved notes.",
    author: {
      id: "user-4",
      name: "Morgan",
    },
    votes: 11,
    comments: 2,
    status: "COMPLETE",
    createdAt: "2026-10-14T12:00:00Z",
  },
];