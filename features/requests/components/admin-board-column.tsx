import type { DragEvent, ReactNode } from "react";
import type { RequestStatus } from "../types";
import { requestStatuses } from "../statuses";

type AdminBoardColumnProps = {
  status: RequestStatus;
  count: number;
  isOver: boolean;
  isSearching: boolean;
  children: ReactNode;
  onDragOver: (event: DragEvent<HTMLElement>) => void;
  onDragLeave: (event: DragEvent<HTMLElement>) => void;
  onDrop: (event: DragEvent<HTMLElement>) => void;
};

const descriptions: Record<RequestStatus, string> = {
  UNDER_REVIEW: "Ideas to explore",
  PLANNED: "Ready for the next step",
  IN_PROGRESS: "Currently being built",
  COMPLETE: "Delivered to users",
};

export function AdminBoardColumn({
  status,
  count,
  isOver,
  isSearching,
  children,
  onDragOver,
  onDragLeave,
  onDrop,
}: AdminBoardColumnProps) {
  const configuration = requestStatuses[status];

  return (
    <section
      aria-label={`${configuration.label} requests`}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      className={`min-w-0 rounded-xl border p-2 transition-colors ${
        isOver
          ? "border-orange-500 bg-orange-500/10"
          : "border-transparent bg-base-200/70"
      }`}
    >
      <div className="px-1 pb-3 pt-1">
        <div className="flex items-center justify-between gap-2">
          <h2 className="flex items-center gap-2 text-xs font-semibold">
            <span
              aria-hidden="true"
              className={`size-1.5 rounded-full ${configuration.dotClass}`}
            />
            {configuration.label}
          </h2>

          <span className="flex size-5 items-center justify-center rounded bg-base-100 text-[10px] text-base-content/55">
            {count}
          </span>
        </div>

        <p className="mt-1 text-[10px] text-base-content/45">
          {descriptions[status]}
        </p>
      </div>

      <div className="min-h-40 space-y-2">
        {children}

        {count === 0 && (
          <div
            className={`flex min-h-40 items-center justify-center rounded-lg border border-dashed px-2 text-center text-xs ${
              isOver
                ? "border-orange-500 text-orange-600"
                : "border-base-content/15 text-base-content/45"
            }`}
          >
            {isOver
              ? "Drop request here"
              : isSearching
                ? "No matching requests"
                : "Drop a request here"}
          </div>
        )}
      </div>
    </section>
  );
}