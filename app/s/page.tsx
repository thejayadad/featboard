"use client";

import Link from "next/link";
import { use, useState } from "react";
import { notFound } from "next/navigation";

type Status = "Under review" | "Planned" | "In progress" | "Complete";

type Comment = {
  id: string;
  author: string;
  authorId: string;
  message: string;
  date: string;
  admin?: boolean;
  pinned?: boolean;
  edited?: boolean;
  parentId?: string;
};

const demoUser = { id: "demo-user", name: "Alex" };

const requests: Record<
  string,
  {
    title: string;
    description: string;
    author: string;
    votes: number;
    status: Status;
  }
> = {
  "1": {
    title: "Add dark mode",
    description:
      "A dark theme would make the app more comfortable to use at night.\n\nIt would be helpful to choose between light mode, dark mode, and a setting that follows the device theme.",
    author: "Alex",
    votes: 42,
    status: "In progress",
  },
  "2": {
    title: "Export notes as PDF",
    description:
      "Download a formatted copy of a note to share with people who don’t use the app.\n\nThe export should preserve headings, lists, and spacing.",
    author: "Sam",
    votes: 28,
    status: "Planned",
  },
  "3": {
    title: "Organize notes into folders",
    description:
      "Group related notes by project or topic so they’re easier to find.",
    author: "Jordan",
    votes: 16,
    status: "Under review",
  },
  "4": {
    title: "Search inside notes",
    description:
      "Search for a word or phrase across all saved notes, with a preview of matching text.",
    author: "Morgan",
    votes: 11,
    status: "Complete",
  },
};

const initialComments: Record<string, Comment[]> = {
  "1": [
    {
      id: "c1",
      author: "Alex",
      authorId: "demo-user",
      message: "Following my device theme would be especially useful.",
      date: "Oct 17",
    },
    {
      id: "c2",
      author: "Taylor",
      authorId: "user-2",
      message: "Agreed. I’d prefer that over switching it manually.",
      date: "Oct 17",
      parentId: "c1",
    },
    {
      id: "c3",
      author: "Product team",
      authorId: "admin",
      message:
        "We’re working on light, dark, and system theme options. We’ll share another update when testing begins.",
      date: "Oct 17",
      admin: true,
      pinned: true,
    },
  ],
};

export default function RequestDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const request = requests[id];

  if (!request) notFound();

  // A key resets local discussion state when navigating between requests.
  return <RequestDiscussion key={id} id={id} request={request} />;
}

function RequestDiscussion({
  id,
  request,
}: {
  id: string;
  request: (typeof requests)[string];
}) {
  const [comments, setComments] = useState<Comment[]>(
    initialComments[id] ?? [],
  );
  const [tab, setTab] = useState<"comments" | "activity">("comments");
  const [draft, setDraft] = useState("");
  const [replyTo, setReplyTo] = useState<Comment | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editDraft, setEditDraft] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [voted, setVoted] = useState(false);
  const [notice, setNotice] = useState("");

  const rootComments = comments
    .filter((comment) => !comment.parentId)
    .sort((a, b) => Number(Boolean(b.pinned)) - Number(Boolean(a.pinned)));

  function postComment(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const message = draft.trim();
    if (!message) return;

    const comment: Comment = {
      id: crypto.randomUUID(),
      author: demoUser.name,
      authorId: demoUser.id,
      message,
      date: "Just now",
      parentId: replyTo?.id,
    };

    setComments((current) => [...current, comment]);
    setDraft("");
    setReplyTo(null);
    setNotice("Comment posted in this preview.");
  }

  function saveEdit(commentId: string) {
    const message = editDraft.trim();
    if (!message) return;

    setComments((current) =>
      current.map((comment) =>
        comment.id === commentId && comment.authorId === demoUser.id
          ? { ...comment, message, edited: true }
          : comment,
      ),
    );

    setEditingId(null);
    setNotice("Comment updated.");
  }

  function deleteComment(commentId: string) {
    const target = comments.find((comment) => comment.id === commentId);
    if (!target || target.authorId !== demoUser.id) return;

    // Preserve other people's replies by promoting them to top-level comments.
    setComments((current) =>
      current
        .filter((comment) => comment.id !== commentId)
        .map((comment) =>
          comment.parentId === commentId
            ? { ...comment, parentId: undefined }
            : comment,
        ),
    );

    if (replyTo?.id === commentId) setReplyTo(null);
    if (editingId === commentId) setEditingId(null);
    setDeleteId(null);
    setNotice("Comment deleted.");
  }

  function renderComment(comment: Comment, isReply = false) {
    const isOwn = comment.authorId === demoUser.id;
    const isEditing = editingId === comment.id;

    return (
      <article
        key={comment.id}
        className={`flex min-w-0 gap-2.5 ${
          isReply
            ? "ml-5 border-l border-base-300 py-3 pl-3 sm:ml-8"
            : "py-4"
        }`}
      >
        <span
          aria-hidden="true"
          className={`flex size-7 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold ${
            comment.admin
              ? "bg-orange-500/10 text-orange-600"
              : "bg-base-200 text-base-content/65"
          }`}
        >
          {comment.author.charAt(0)}
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5 text-[10px]">
            <span className="text-xs font-semibold">{comment.author}</span>

            {comment.admin && (
              <span className="rounded bg-orange-500/10 px-1.5 py-0.5 text-orange-600">
                Admin
              </span>
            )}

            {!comment.admin && comment.author === request.author && (
              <span className="rounded bg-base-200 px-1.5 py-0.5 text-base-content/60">
                Author
              </span>
            )}

            {comment.pinned && (
              <span className="text-orange-600">Pinned update</span>
            )}

            <span className="text-base-content/40">{comment.date}</span>

            {comment.edited && (
              <span className="text-base-content/40">(edited)</span>
            )}
          </div>

          {isEditing ? (
            <div className="mt-2">
              <label htmlFor={`edit-${comment.id}`} className="sr-only">
                Edit your comment
              </label>

              <textarea
                id={`edit-${comment.id}`}
                value={editDraft}
                onChange={(event) => setEditDraft(event.target.value)}
                maxLength={2000}
                rows={3}
                className="textarea w-full border-base-300 text-xs"
              />

              <div className="mt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => saveEdit(comment.id)}
                  disabled={!editDraft.trim()}
                  className="btn btn-neutral btn-xs"
                >
                  Save changes
                </button>

                <button
                  type="button"
                  onClick={() => setEditingId(null)}
                  className="btn btn-ghost btn-xs"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <p className="mt-2 whitespace-pre-wrap break-words text-xs leading-relaxed text-base-content/70">
                {comment.message}
              </p>

              <div className="mt-2 flex flex-wrap items-center gap-3 text-[10px] text-base-content/50">
                <button
                  type="button"
                  onClick={() => {
                    const parent = comment.parentId
                      ? comments.find((item) => item.id === comment.parentId)
                      : comment;

                    setReplyTo(parent ?? comment);
                  }}
                  className="hover:underline"
                >
                  Reply
                </button>

                {isOwn && (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingId(comment.id);
                        setEditDraft(comment.message);
                      }}
                      className="hover:underline"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeleteId(comment.id)}
                      className="text-error hover:underline"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>

              {deleteId === comment.id && (
                <div className="mt-3 rounded-lg border border-base-300 bg-base-200/50 p-3">
                  <p className="text-xs">
                    Delete your comment? Replies will remain.
                  </p>

                  <div className="mt-2 flex gap-2">
                    <button
                      type="button"
                      onClick={() => deleteComment(comment.id)}
                      className="btn btn-error btn-xs"
                    >
                      Delete
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeleteId(null)}
                      className="btn btn-ghost btn-xs"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </article>
    );
  }

  return (
    <div className="min-h-dvh bg-base-100 text-base-content">
      <header className="border-b border-base-300">
        <div className="mx-auto flex min-h-12 max-w-6xl items-center justify-between gap-2 px-3 py-2 sm:px-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-lg bg-neutral text-xs font-bold text-neutral-content">
              F
            </span>
            <span className="text-sm font-semibold">FeatureBoard</span>
          </Link>

          <span className="text-[10px] text-base-content/45">
            Demo account: {demoUser.name}
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-3 py-5 sm:px-4">
        <Link
          href="/"
          className="text-xs text-base-content/50 hover:text-base-content"
        >
          ← All requests
        </Link>

        <section className="mt-4 rounded-xl border border-base-300 p-4">
          <div className="flex items-start gap-3">
            <button
              type="button"
              aria-pressed={voted}
              aria-label={`Vote for ${request.title}`}
              onClick={() => setVoted((current) => !current)}
              className={`flex h-14 w-11 shrink-0 flex-col items-center justify-center rounded-lg border text-xs font-semibold ${
                voted
                  ? "border-orange-500 bg-orange-500/10 text-orange-600"
                  : "border-base-300 bg-base-200/40"
              }`}
            >
              <span aria-hidden="true">↑</span>
              {request.votes + Number(voted)}
            </button>

            <div className="min-w-0 flex-1">
              <span className="rounded-full bg-base-200 px-2 py-1 text-[10px] text-base-content/65">
                {request.status}
              </span>

              <h1 className="mt-3 break-words text-xl font-semibold tracking-tight">
                {request.title}
              </h1>

              <p className="mt-1 text-[10px] text-base-content/45">
                Submitted by {request.author}
              </p>
            </div>
          </div>

          <p className="mt-4 whitespace-pre-line text-sm leading-7 text-base-content/70">
            {request.description}
          </p>
        </section>

        <section
          id="comments"
          aria-label="Discussion"
          className="mt-4 rounded-xl border border-base-300"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-base-300 px-4 pt-3">
            <h2 className="pb-3 text-sm font-semibold">
              Discussion
              <span className="ml-2 text-xs font-normal text-base-content/40">
                {comments.length}
              </span>
            </h2>

            <div role="group" aria-label="Discussion view" className="flex gap-4">
              {(["comments", "activity"] as const).map((item) => (
                <button
                  key={item}
                  type="button"
                  aria-pressed={tab === item}
                  onClick={() => setTab(item)}
                  className={`border-b-2 pb-3 text-xs capitalize ${
                    tab === item
                      ? "border-orange-500 font-medium"
                      : "border-transparent text-base-content/45"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {tab === "comments" ? (
            <>
              <div className="px-4">
                {rootComments.length === 0 && (
                  <p className="py-8 text-center text-xs text-base-content/45">
                    No comments yet. Start the conversation.
                  </p>
                )}

                <div className="divide-y divide-base-300">
                  {rootComments.map((comment) => (
                    <div key={comment.id}>
                      {renderComment(comment)}

                      {comments
                        .filter((reply) => reply.parentId === comment.id)
                        .map((reply) => renderComment(reply, true))}
                    </div>
                  ))}
                </div>
              </div>

              <form
                onSubmit={postComment}
                className="rounded-b-xl border-t border-base-300 bg-base-200/30 p-4"
              >
                {replyTo && (
                  <div className="mb-2 flex items-center justify-between gap-2 text-[11px]">
                    <span className="text-base-content/60">
                      Replying to {replyTo.author}
                    </span>

                    <button
                      type="button"
                      onClick={() => setReplyTo(null)}
                      className="hover:underline"
                    >
                      Cancel reply
                    </button>
                  </div>
                )}

                <label htmlFor="comment" className="text-xs font-medium">
                  {replyTo ? "Your reply" : "Join the discussion"}
                </label>

                <textarea
                  id="comment"
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  required
                  maxLength={2000}
                  rows={3}
                  placeholder="Share your thoughts or add an example..."
                  className="textarea mt-2 w-full border-base-300 bg-base-100 text-xs leading-relaxed"
                />

                <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[10px] text-base-content/45">
                    Keep feedback constructive. {draft.length}/2000
                  </span>

                  <button
                    type="submit"
                    disabled={!draft.trim()}
                    className="btn btn-sm border-orange-500 bg-orange-500 text-white shadow-none hover:bg-orange-600"
                  >
                    {replyTo ? "Post reply" : "Post comment"}
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="p-4">
              <p className="mb-4 text-[10px] text-base-content/45">
                Sample request history
              </p>

              <ol className="space-y-5 border-l border-base-300 pl-4">
                <li>
                  <p className="text-xs font-medium">
                    Current status: {request.status}
                  </p>
                  <p className="mt-1 text-[10px] text-base-content/45">
                    Product team · Latest update
                  </p>
                </li>

                <li>
                  <p className="text-xs font-medium">Request submitted</p>
                  <p className="mt-1 text-[10px] text-base-content/45">
                    {request.author}
                  </p>
                </li>
              </ol>
            </div>
          )}
        </section>

        <p
          role="status"
          aria-live="polite"
          className="mt-3 min-h-4 text-xs text-base-content/60"
        >
          {notice}
        </p>

        <p className="mt-2 text-[10px] text-base-content/40">
          Demo account · Changes reset on refresh · Permissions and storage
          will be handled by the backend.
        </p>
      </main>
    </div>
  );
}