import Link from "next/link";
import type { DragEvent } from "react";
import type { FeatureRequest } from "../types";

type AdminRequestCardProps = {
  request: FeatureRequest;
  isDragging: boolean;
  onDragStart: (
    event: DragEvent<HTMLDivElement>,
    requestId: string,
  ) => void;
  onDragEnd: () => void;
};

export function AdminRequestCard({
  request,
  isDragging,
  onDragStart,
  onDragEnd,
}: AdminRequestCardProps) {
  return (
    <article
      className={`min-w-0 rounded-lg border border-base-300 bg-base-100 p-3 shadow-sm transition-opacity ${
        isDragging ? "opacity-40" : "opacity-100"
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="font-mono text-[9px] text-base-content/40">
          REQ-{request.id.padStart(3, "0")}
        </span>

        <div
          draggable
          onDragStart={(event) => onDragStart(event, request.id)}
          onDragEnd={onDragEnd}
          title={`Drag ${request.title} to another column`}
          className="-my-1 cursor-grab select-none rounded px-2 py-1 text-base-content/45 hover:bg-base-200 active:cursor-grabbing"
        >
          <span aria-hidden="true">⠿</span>
        </div>
      </div>

      <h3 className="mt-2 break-words text-sm font-semibold leading-snug">
        <Link
          href={`/requests/${request.id}`}
          draggable={false}
          className="hover:underline"
        >
          {request.title}
        </Link>
      </h3>

      <p className="mt-1.5 line-clamp-2 break-words text-xs leading-relaxed text-base-content/60">
        {request.description}
      </p>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-base-300 pt-2">
        <span className="flex min-w-0 items-center gap-1.5">
          <span
            aria-hidden="true"
            className="flex size-5 shrink-0 items-center justify-center rounded-full bg-base-200 text-[9px] font-medium"
          >
            {request.author.name.charAt(0)}
          </span>

          <span className="truncate text-[10px] text-base-content/55">
            {request.author.name}
          </span>
        </span>

        <div className="flex items-center gap-2 text-[10px] text-base-content/55">
          <Link
            href={`/requests/${request.id}#comments`}
            className="hover:underline"
          >
            {request.comments} comments
          </Link>

          <span className="rounded bg-base-200 px-1.5 py-1 font-medium">
            ↑ {request.votes}
          </span>
        </div>
      </div>
    </article>
  );
}