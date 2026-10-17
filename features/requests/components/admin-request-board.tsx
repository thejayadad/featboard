"use client";

import { useState } from "react";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  rectIntersection,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";

import type { FeatureRequest, RequestStatus } from "../types";
import { requestStatuses } from "../statuses";
import { AdminBoardColumn } from "./admin-board-column";
import { AdminRequestCard } from "./admin-request-card";

type AdminRequestBoardProps = {
  initialRequests: FeatureRequest[];
};

const statuses = Object.keys(requestStatuses) as RequestStatus[];

function isRequestStatus(value: string): value is RequestStatus {
  return Object.prototype.hasOwnProperty.call(requestStatuses, value);
}

export function AdminRequestBoard({
  initialRequests,
}: AdminRequestBoardProps) {
  const [requests, setRequests] = useState(initialRequests);
  const [search, setSearch] = useState("");
  const [notice, setNotice] = useState("");

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 6,
      },
    }),
    useSensor(KeyboardSensor, {
      scrollBehavior: "auto",
    }),
  );

  function finishDrag({ active, over }: DragEndEvent) {
    if (!over) {
      setNotice("Move cancelled. The request stayed in its original column.");
      return;
    }

    const id = String(active.id);
    const destination = String(over.id);

    if (!isRequestStatus(destination)) return;

    const request = requests.find((item) => item.id === id);

    if (!request || request.status === destination) return;

    setRequests((current) =>
      current.map((item) =>
        item.id === id ? { ...item, status: destination } : item,
      ),
    );

    setNotice(
      `${request.title} moved to ${requestStatuses[destination].label.toLowerCase()}.`,
    );
  }

  const query = search.trim().toLowerCase();

  const visibleRequests = requests.filter((request) =>
    `${request.title} ${request.description} ${request.author.name}`
      .toLowerCase()
      .includes(query),
  );

  return (
    <div className="mt-4">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <p className="text-xs text-base-content/60">
          {visibleRequests.length} of {requests.length} requests
        </p>

        <input
          type="search"
          aria-label="Search admin requests"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search requests or authors..."
          className="input input-sm w-full border-base-300 bg-base-200/40 text-xs sm:w-60"
        />
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-b border-base-300">
        <span className="border-b-2 border-orange-500 pb-2 text-xs font-medium">
          Request board
        </span>

        <span className="pb-2 text-[11px] text-base-content/55">
          Move using the card grip
        </span>
      </div>

      <p className="mt-2 text-[11px] leading-relaxed text-base-content/55">
        Drag with a mouse or touch. Keyboard: focus a grip, press Space,
        use the arrow keys to move, then Space to drop. Escape cancels.
      </p>

      <p
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="mt-2 min-h-4 text-xs text-base-content/60"
      >
        {notice}
      </p>

      <DndContext
        id="admin-request-board"
        sensors={sensors}
        collisionDetection={rectIntersection}
        onDragStart={() => setNotice("")}
        onDragEnd={finishDrag}
        onDragCancel={() => setNotice("Move cancelled.")}
        accessibility={{
          screenReaderInstructions: {
            draggable:
              "To pick up a request, press Space. Use the arrow keys to move it into another status column. Press Space to drop, or Escape to cancel.",
          },
        }}
      >
        <div className="mt-2 grid items-stretch gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {statuses.map((status) => {
            const items = visibleRequests
              .filter((request) => request.status === status)
              .sort(
                (a, b) =>
                  b.votes - a.votes || a.id.localeCompare(b.id),
              );

            return (
              <AdminBoardColumn
                key={status}
                status={status}
                count={items.length}
                isSearching={query.length > 0}
              >
                {items.map((request) => (
                  <AdminRequestCard
                    key={request.id}
                    request={request}
                  />
                ))}
              </AdminBoardColumn>
            );
          })}
        </div>
      </DndContext>

      <p className="mt-3 text-[11px] text-base-content/50">
        UI preview · Changes reset on refresh · Admin access is not
        protected yet
      </p>
    </div>
  );
}