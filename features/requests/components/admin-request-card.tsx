"use client";

import Link from "next/link";
import { useDraggable } from "@dnd-kit/core";
import type { FeatureRequest } from "../types";

type AdminRequestCardProps = {
  request: FeatureRequest;
};

export function AdminRequestCard({
  request,
}: AdminRequestCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    isDragging,
  } = useDraggable({
    id: request.id,
  });

  return (
    <article
      ref={setNodeRef}
      style={{
        transform: transform
          ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
          : undefined,
        position: "relative",
        zIndex: isDragging ? 20 : undefined,
      }}
      className={`min-w-0 rounded-lg border bg-base-100 p-3 shadow-sm ${
        isDragging
          ? "border-orange-500 shadow-lg"
          : "border-base-300"
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="font-mono text-[11px] text-base-content/45">
          REQ-{request.id.padStart(3, "0")}
        </span>

        <button
          ref={setActivatorNodeRef}
          type="button"
          {...attributes}
          {...listeners}
          aria-label={`Move ${request.title}`}
          title="Drag to move. With keyboard: Space, arrows, Space."
          className="-my-1 flex size-8 touch-none cursor-grab items-center justify-center rounded text-base-content/55 hover:bg-base-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 active:cursor-grabbing"
        >
          <span aria-hidden="true">⠿</span>
        </button>
      </div>

      <h3 className="mt-2 break-words text-sm font-semibold leading-snug">
        <Link
          href={`/requests/${request.id}`}
          draggable={false}
          className="rounded hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
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
            className="flex size-5 shrink-0 items-center justify-center rounded-full bg-base-200 text-[10px] font-medium"
          >
            {request.author.name.charAt(0)}
          </span>

          <span className="truncate text-[11px] text-base-content/60">
            {request.author.name}
          </span>
        </span>

        <div className="flex items-center gap-2 text-[11px] text-base-content/60">
          <Link
            href={`/requests/${request.id}#comments`}
            className="rounded hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
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