export type RequestStatus =
  | "UNDER_REVIEW"
  | "PLANNED"
  | "IN_PROGRESS"
  | "COMPLETE";

export type FeatureRequest = {
  id: string;
  title: string;
  description: string;
  author: {
    id: string;
    name: string;
  };
  votes: number;
  comments: number;
  status: RequestStatus;
  createdAt: string;
};