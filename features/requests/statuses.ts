import type { RequestStatus } from "./types";

export const requestStatuses: Record<
  RequestStatus,
  {
    label: string;
    dotClass: string;
  }
> = {
  UNDER_REVIEW: {
    label: "Under review",
    dotClass: "bg-slate-400",
  },
  PLANNED: {
    label: "Planned",
    dotClass: "bg-sky-500",
  },
  IN_PROGRESS: {
    label: "In progress",
    dotClass: "bg-orange-500",
  },
  COMPLETE: {
    label: "Complete",
    dotClass: "bg-emerald-500",
  },
};