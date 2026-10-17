import { Suspense } from "react";
import { notFound } from "next/navigation";
import { RequestDetails } from "@/features/requests/components/request-details";
import { mockRequests } from "@/features/requests/mock-data";

type RequestDetailsPageProps = {
  params: Promise<{ id: string }>;
};

export default function RequestDetailsPage({
  params,
}: RequestDetailsPageProps) {
  return (
    <Suspense fallback={<RequestDetailsFallback />}>
      <RequestDetailsContent params={params} />
    </Suspense>
  );
}

async function RequestDetailsContent({
  params,
}: RequestDetailsPageProps) {
  const { id } = await params;

  const request = mockRequests.find((item) => item.id === id);

  if (!request) {
    notFound();
  }

  return <RequestDetails request={request} />;
}

function RequestDetailsFallback() {
  return (
    <main
      aria-busy="true"
      className="mx-auto max-w-3xl px-3 py-5 sm:px-4 sm:py-7"
    >
      <p role="status" className="text-xs text-base-content/55">
        Loading request…
      </p>

      <div
        aria-hidden="true"
        className="mt-4 rounded-xl border border-base-300 p-4 sm:p-5"
      >
        <div className="skeleton h-5 w-24" />
        <div className="skeleton mt-4 h-7 w-3/4" />
        <div className="skeleton mt-3 h-4 w-40" />

        <div className="mt-5 space-y-2 border-t border-base-300 pt-4">
          <div className="skeleton h-4 w-full" />
          <div className="skeleton h-4 w-full" />
          <div className="skeleton h-4 w-2/3" />
        </div>
      </div>
    </main>
  );
}