"use client";

import { useState, type DragEvent } from "react";
import type { FeatureRequest, RequestStatus } from "../types";
import { requestStatuses } from "../statuses";
import { AdminBoardColumn } from "./admin-board-column";
import { AdminRequestCard } from "./admin-request-card";

type AdminRequestBoardProps = {
  initialRequests: FeatureRequest[];
};

const statuses = Object.keys(requestStatuses) as RequestStatus[];

export function AdminRequestBoard({
  initialRequests,
}: AdminRequestBoardProps) {
  const [requests, setRequests] = useState(initialRequests);
  const [search, setSearch] = useState("");
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [overStatus, setOverStatus] = useState<RequestStatus | null>(null);
  const [notice, setNotice] = useState("");

  function moveRequest(id: string, status: RequestStatus) {
    const request = requests.find((item) => item.id === id);

    if (!request || request.status === status) return;

    setRequests((current) =>
      current.map((item) =>
        item.id === id ? { ...item, status } : item,
      ),
    );

    setNotice(
      `${request.title} moved to ${requestStatuses[status].label.toLowerCase()}.`,
    );
  }

  function startDrag(
    event: DragEvent<HTMLDivElement>,
    requestId: string,
  ) {
    event.dataTransfer.setData("text/plain", requestId);
    event.dataTransfer.effectAllowed = "move";

    setDraggedId(requestId);
    setNotice("");
  }

  function endDrag() {
    setDraggedId(null);
    setOverStatus(null);
  }

  function dropRequest(
    event: DragEvent<HTMLElement>,
    status: RequestStatus,
  ) {
    event.preventDefault();

    if (draggedId) {
      moveRequest(draggedId, status);
    }

    endDrag();
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
        <p className="text-xs text-base-content/55">
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

        <span className="pb-2 text-[10px] text-base-content/45">
          Drag cards using the grip to change status
        </span>
      </div>

      <p
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="mt-2 min-h-4 text-[11px] text-base-content/55"
      >
        {notice}
      </p>

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
              isOver={overStatus === status}
              isSearching={query.length > 0}
              onDragOver={(event) => {
                if (!draggedId) return;

                event.preventDefault();
                event.dataTransfer.dropEffect = "move";
                setOverStatus(status);
              }}
              onDragLeave={(event) => {
                const nextTarget = event.relatedTarget;

                if (
                  nextTarget instanceof Node &&
                  event.currentTarget.contains(nextTarget)
                ) {
                  return;
                }

                setOverStatus((current) =>
                  current === status ? null : current,
                );
              }}
              onDrop={(event) => dropRequest(event, status)}
            >
              {items.map((request) => (
                <AdminRequestCard
                  key={request.id}
                  request={request}
                  isDragging={draggedId === request.id}
                  onDragStart={startDrag}
                  onDragEnd={endDrag}
                />
              ))}
            </AdminBoardColumn>
          );
        })}
      </div>

      <p className="mt-3 text-[10px] text-base-content/45">
        Desktop drag preview · Changes reset on refresh · Admin access
        is not protected yet
      </p>
    </div>
  );
}