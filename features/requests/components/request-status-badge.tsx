import { requestStatuses } from "../statuses";
import type { RequestStatus } from "../types";

type RequestStatusBadgeProps = {
  status: RequestStatus;
};

export function RequestStatusBadge({
  status,
}: RequestStatusBadgeProps) {
  const configuration = requestStatuses[status];

  return (
    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-base-200 px-2 py-1 text-[10px] font-medium text-base-content/65">
      <span
        aria-hidden="true"
        className={`size-1.5 rounded-full ${configuration.dotClass}`}
      />
      {configuration.label}
    </span>
  );
}
