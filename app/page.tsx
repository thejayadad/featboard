// "use client";

// import { useState } from "react";

// type Status = "Under review" | "Planned" | "In progress" | "Complete";

// type FeatureRequest = {
//   id: string;
//   title: string;
//   description: string;
//   author: string;
//   votes: number;
//   comments: number;
//   status: Status;
//   createdAt: string;
// };

// const initialRequests: FeatureRequest[] = [
//   {
//     id: "1",
//     title: "Add dark mode",
//     description: "A dark theme for reading comfortably at night.",
//     author: "Alex",
//     votes: 42,
//     comments: 8,
//     status: "In progress",
//     createdAt: "2026-10-15",
//   },
//   {
//     id: "2",
//     title: "Export notes as PDF",
//     description: "Download a clean, formatted copy of your notes.",
//     author: "Sam",
//     votes: 28,
//     comments: 3,
//     status: "Planned",
//     createdAt: "2026-10-16",
//   },
//   {
//     id: "3",
//     title: "Organize notes into folders",
//     description: "Group related notes together so they’re easier to find.",
//     author: "Jordan",
//     votes: 16,
//     comments: 5,
//     status: "Under review",
//     createdAt: "2026-10-17",
//   },
//   {
//     id: "4",
//     title: "Search inside notes",
//     description: "Find a word or phrase across all your saved notes.",
//     author: "Morgan",
//     votes: 11,
//     comments: 2,
//     status: "Complete",
//     createdAt: "2026-10-14",
//   },
// ];

// const statuses: Status[] = [
//   "Under review",
//   "Planned",
//   "In progress",
//   "Complete",
// ];

// const statusStyles: Record<Status, string> = {
//   "Under review": "bg-base-content/40",
//   Planned: "bg-info",
//   "In progress": "bg-warning",
//   Complete: "bg-success",
// };

// function SearchIcon() {
//   return (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       width="16"
//       height="16"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="1.8"
//       strokeLinecap="round"
//       aria-hidden="true"
//     >
//       <circle cx="11" cy="11" r="7" />
//       <path d="m16 16 4 4" />
//     </svg>
//   );
// }

// function CommentIcon() {
//   return (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       width="14"
//       height="14"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="1.8"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       aria-hidden="true"
//     >
//       <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z" />
//     </svg>
//   );
// }

// export default function HomePage() {
//   const [search, setSearch] = useState("");
//   const [activeStatus, setActiveStatus] = useState<Status | "All">("All");
//   const [sort, setSort] = useState<"votes" | "newest">("votes");
//   const [votedIds, setVotedIds] = useState<string[]>([]);

//   function toggleVote(id: string) {
//     setVotedIds((current) =>
//       current.includes(id)
//         ? current.filter((item) => item !== id)
//         : [...current, id],
//     );
//   }

//   function getVotes(request: FeatureRequest) {
//     return request.votes + (votedIds.includes(request.id) ? 1 : 0);
//   }

//   const query = search.trim().toLowerCase();

//   const visibleRequests = initialRequests
//     .filter((request) => {
//       const matchesStatus =
//         activeStatus === "All" || request.status === activeStatus;

//       const matchesSearch =
//         `${request.title} ${request.description}`.toLowerCase().includes(query);

//       return matchesStatus && matchesSearch;
//     })
//     .sort((a, b) =>
//       sort === "votes"
//         ? getVotes(b) - getVotes(a)
//         : b.createdAt.localeCompare(a.createdAt),
//     );

//   return (
//     <div className="min-h-screen bg-base-200 text-base-content">
//       <header className="sticky top-0 z-20 border-b border-base-300 bg-base-100">
//         <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
//           <a href="/" className="flex items-center gap-2 font-semibold">
//             <span className="flex size-7 items-center justify-center rounded-lg bg-orange-500 text-sm font-bold text-white">
//               F
//             </span>
//             FeatureBoard
//           </a>

//           <nav
//             aria-label="Account navigation"
//             className="flex items-center gap-1"
//           >
//             <a href="/sign-in" className="btn btn-ghost btn-sm">
//               Sign in
//             </a>
//             <a href="/sign-up" className="btn btn-neutral btn-sm">
//               Sign up
//             </a>
//           </nav>
//         </div>
//       </header>

//       <div className="mx-auto flex max-w-7xl">
//         <aside className="sticky top-14 hidden h-[calc(100dvh-3.5rem)] w-56 shrink-0 border-r border-base-300 p-4 md:block">
//           <p className="px-3 text-[10px] font-semibold uppercase tracking-widest text-base-content/45">
//             Workspace
//           </p>

//           <nav aria-label="Workspace" className="mt-3">
//             <a
//               href="/"
//               aria-current="page"
//               className="flex items-center gap-2 rounded-lg bg-base-100 px-3 py-2 text-sm font-medium shadow-sm"
//             >
//               <span aria-hidden="true" className="text-orange-500">
//                 ◫
//               </span>
//               Feedback
//             </a>
//           </nav>

//           <p className="mt-8 px-3 text-[10px] font-semibold uppercase tracking-widest text-base-content/45">
//             Filter by status
//           </p>

//           <nav
//             aria-label="Request status filters"
//             className="mt-3 space-y-1"
//           >
//             <button
//               type="button"
//               onClick={() => setActiveStatus("All")}
//               aria-pressed={activeStatus === "All"}
//               className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
//                 activeStatus === "All"
//                   ? "bg-base-300/60 font-medium"
//                   : "text-base-content/65 hover:bg-base-300/40"
//               }`}
//             >
//               All requests
//               <span className="text-xs text-base-content/45">
//                 {initialRequests.length}
//               </span>
//             </button>

//             {statuses.map((status) => (
//               <button
//                 key={status}
//                 type="button"
//                 onClick={() => setActiveStatus(status)}
//                 aria-pressed={activeStatus === status}
//                 className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
//                   activeStatus === status
//                     ? "bg-base-300/60 font-medium"
//                     : "text-base-content/65 hover:bg-base-300/40"
//                 }`}
//               >
//                 <span className="flex items-center gap-2">
//                   <span
//                     className={`size-1.5 rounded-full ${statusStyles[status]}`}
//                   />
//                   {status}
//                 </span>

//                 <span className="text-xs text-base-content/45">
//                   {
//                     initialRequests.filter(
//                       (request) => request.status === status,
//                     ).length
//                   }
//                 </span>
//               </button>
//             ))}
//           </nav>

//           <div className="mt-8 border-t border-base-300 px-3 pt-4">
//             <p className="text-xs leading-relaxed text-base-content/45">
//               Your ideas help shape what we build next.
//             </p>
//           </div>
//         </aside>

//         <main className="min-w-0 flex-1 px-4 py-7 sm:px-6 lg:px-10 lg:py-10">
//           <div className="mx-auto max-w-3xl">
//             <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
//               <div>
//                 <p className="mb-2 text-xs font-medium text-orange-500">
//                   Your feedback matters
//                 </p>

//                 <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
//                   Help shape what’s next.
//                 </h1>

//                 <p className="mt-2 text-sm leading-relaxed text-base-content/60">
//                   Share an idea or vote for an improvement you’d love to see.
//                 </p>
//               </div>

//               <a
//                 href="/requests/new"
//                 className="btn btn-sm shrink-0 border-orange-500 bg-orange-500 text-white shadow-none hover:border-orange-600 hover:bg-orange-600"
//               >
//                 <span aria-hidden="true" className="text-lg font-normal">
//                   +
//                 </span>
//                 Suggest a feature
//               </a>
//             </div>

//             <label className="input mt-7 flex w-full items-center gap-2 border-base-300 bg-base-100 shadow-none">
//               <span className="text-base-content/40">
//                 <SearchIcon />
//               </span>

//               <input
//                 type="search"
//                 aria-label="Search feedback"
//                 placeholder="Search feedback..."
//                 value={search}
//                 onChange={(event) => setSearch(event.target.value)}
//                 className="grow text-sm"
//               />
//             </label>

//             <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
//               <div
//                 role="group"
//                 aria-label="Sort requests"
//                 className="flex items-center gap-1"
//               >
//                 <button
//                   type="button"
//                   onClick={() => setSort("votes")}
//                   aria-pressed={sort === "votes"}
//                   className={`rounded-md px-3 py-1.5 text-xs font-medium ${
//                     sort === "votes"
//                       ? "bg-base-100 shadow-sm"
//                       : "text-base-content/50 hover:text-base-content"
//                   }`}
//                 >
//                   Most voted
//                 </button>

//                 <button
//                   type="button"
//                   onClick={() => setSort("newest")}
//                   aria-pressed={sort === "newest"}
//                   className={`rounded-md px-3 py-1.5 text-xs font-medium ${
//                     sort === "newest"
//                       ? "bg-base-100 shadow-sm"
//                       : "text-base-content/50 hover:text-base-content"
//                   }`}
//                 >
//                   Newest
//                 </button>
//               </div>

//               <span
//                 aria-live="polite"
//                 className="text-xs text-base-content/45"
//               >
//                 {visibleRequests.length}{" "}
//                 {visibleRequests.length === 1 ? "request" : "requests"}
//               </span>
//             </div>

//             <div className="mt-3 md:hidden">
//               <select
//                 aria-label="Filter by status"
//                 value={activeStatus}
//                 onChange={(event) =>
//                   setActiveStatus(event.target.value as Status | "All")
//                 }
//                 className="select select-sm w-full border-base-300 bg-base-100"
//               >
//                 <option value="All">All statuses</option>
//                 {statuses.map((status) => (
//                   <option key={status} value={status}>
//                     {status}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <section
//               aria-label="Feature requests"
//               className="mt-4 overflow-hidden rounded-xl border border-base-300 bg-base-100"
//             >
//               {visibleRequests.length === 0 ? (
//                 <div className="px-4 py-14 text-center">
//                   <h2 className="text-sm font-medium">No requests found</h2>
//                   <p className="mt-1 text-sm text-base-content/50">
//                     Try another search or status filter.
//                   </p>
//                   <button
//                     type="button"
//                     onClick={() => {
//                       setSearch("");
//                       setActiveStatus("All");
//                     }}
//                     className="btn btn-ghost btn-sm mt-3"
//                   >
//                     Clear filters
//                   </button>
//                 </div>
//               ) : (
//                 <div className="divide-y divide-base-300">
//                   {visibleRequests.map((request) => {
//                     const hasVoted = votedIds.includes(request.id);

//                     return (
//                       <article
//                         key={request.id}
//                         className="flex items-start gap-3 p-4 transition-colors hover:bg-base-200/40 sm:gap-4 sm:p-5"
//                       >
//                         <button
//                           type="button"
//                           onClick={() => toggleVote(request.id)}
//                           aria-pressed={hasVoted}
//                           aria-label={`Vote for ${request.title}`}
//                           className={`flex h-14 w-11 shrink-0 flex-col items-center justify-center gap-0.5 rounded-lg border text-xs font-semibold transition-colors ${
//                             hasVoted
//                               ? "border-orange-500/40 bg-orange-500/10 text-orange-500"
//                               : "border-base-300 text-base-content/65 hover:border-orange-500/50 hover:text-orange-500"
//                           }`}
//                         >
//                           <span aria-hidden="true">↑</span>
//                           <span>{getVotes(request)}</span>
//                         </button>

//                         <div className="min-w-0 flex-1">
//                           <div className="flex flex-col items-start gap-2 sm:flex-row sm:justify-between sm:gap-4">
//                             <h2 className="text-sm font-semibold">
//                               <a
//                                 href={`/requests/${request.id}`}
//                                 className="hover:text-orange-500"
//                               >
//                                 {request.title}
//                               </a>
//                             </h2>

//                             <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-base-200 px-2 py-1 text-[10px] font-medium text-base-content/65">
//                               <span
//                                 className={`size-1.5 rounded-full ${statusStyles[request.status]}`}
//                               />
//                               {request.status}
//                             </span>
//                           </div>

//                           <p className="mt-1.5 text-sm leading-relaxed text-base-content/60">
//                             {request.description}
//                           </p>

//                           <div className="mt-3 flex items-center gap-3 text-xs text-base-content/45">
//                             <span>{request.author}</span>
//                             <span aria-hidden="true">·</span>

//                             <a
//                               href={`/requests/${request.id}#comments`}
//                               className="flex items-center gap-1.5 hover:text-base-content"
//                               aria-label={`${request.comments} comments on ${request.title}`}
//                             >
//                               <CommentIcon />
//                               {request.comments}
//                             </a>
//                           </div>
//                         </div>
//                       </article>
//                     );
//                   })}
//                 </div>
//               )}
//             </section>

//             <p className="mt-4 text-center text-xs text-base-content/40">
//               Have a different idea? We’d love to hear it.
//             </p>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }
import Link from "next/link";

export default function NewRequestPage() {
  return (
    <div className="min-h-screen bg-base-200 text-base-content">
      <header className="border-b border-base-300 bg-base-100">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <span className="flex size-7 items-center justify-center rounded-lg bg-orange-500 text-sm font-bold text-white">
              F
            </span>
            FeatureBoard
          </Link>

          <Link href="/sign-in" className="btn btn-ghost btn-sm">
            Sign in
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-7 sm:px-6 sm:py-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs text-base-content/60 hover:text-base-content"
        >
          <span aria-hidden="true">←</span>
          All requests
        </Link>

        <div className="mt-6">
          <p className="text-xs font-medium text-orange-500">
            Share your idea
          </p>

          <h1 className="mt-2 text-2xl font-semibold tracking-tight">
            Suggest a feature
          </h1>

          <p className="mt-2 text-sm leading-relaxed text-base-content/60">
            Tell us what you’d like to see and how it would help.
          </p>
        </div>

        <form className="mt-6 space-y-5 rounded-xl border border-base-300 bg-base-100 p-5 sm:p-6">
          <div>
            <label htmlFor="title" className="text-sm font-medium">
              Feature title
              <span className="ml-1 text-orange-500">*</span>
            </label>

            <input
              id="title"
              name="title"
              type="text"
              required
              minLength={5}
              maxLength={120}
              placeholder="Example: Export notes as PDF"
              aria-describedby="title-hint"
              className="input mt-2 w-full border-base-300 bg-base-100 text-sm"
            />

            <p
              id="title-hint"
              className="mt-2 text-xs text-base-content/45"
            >
              Keep it clear and specific. Maximum 120 characters.
            </p>
          </div>

          <div>
            <label htmlFor="description" className="text-sm font-medium">
              Description
              <span className="ml-1 text-orange-500">*</span>
            </label>

            <textarea
              id="description"
              name="description"
              required
              minLength={20}
              maxLength={3000}
              rows={7}
              placeholder="What problem are you running into? How would this feature help?"
              aria-describedby="description-hint"
              className="textarea mt-2 w-full resize-y border-base-300 bg-base-100 text-sm leading-relaxed"
            />

            <p
              id="description-hint"
              className="mt-2 text-xs text-base-content/45"
            >
              Include an example if possible. Maximum 3,000 characters.
            </p>
          </div>

          <div className="rounded-lg border border-base-300 bg-base-200/50 p-3">
            <p className="text-xs font-medium">Before you submit</p>

            <p className="mt-1 text-xs leading-relaxed text-base-content/60">
              Search the board for a similar idea. Voting on an existing
              request helps keep the discussion in one place.
            </p>

            <Link
              href="/"
              className="mt-2 inline-block text-xs font-medium text-orange-500 hover:underline"
            >
              Browse existing requests →
            </Link>
          </div>

          <div className="flex items-center justify-between gap-3 border-t border-base-300 pt-4">
            <Link href="/" className="btn btn-ghost btn-sm">
              Cancel
            </Link>

            <button
              type="button"
              disabled
              className="btn btn-sm border-orange-500 bg-orange-500 text-white shadow-none"
            >
              Submit request
            </button>
          </div>

          <p className="text-right text-xs text-base-content/45">
            Submission will be enabled when we connect the backend.
          </p>
        </form>
      </main>
    </div>
  );
}