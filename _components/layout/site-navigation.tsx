"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigationLinks = [
  {
    href: "/",
    label: "Feedback",
    matches: (pathname: string) =>
      pathname === "/" || pathname.startsWith("/requests/"),
  },
  {
    href: "/admin",
    label: "Admin preview",
    matches: (pathname: string) =>
      pathname === "/admin" || pathname.startsWith("/admin/"),
  },
];

export function SiteNavigation() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Main navigation"
      className="flex items-center gap-1"
    >
      {navigationLinks.map((link) => {
        const isActive = link.matches(pathname);
        const isCurrentPage = pathname === link.href;

        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={
              isCurrentPage ? "page" : isActive ? "location" : undefined
            }
            className={`rounded-md px-3 py-2 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 ${
              isActive
                ? "bg-base-200 text-base-content"
                : "text-base-content/55 hover:bg-base-200/60 hover:text-base-content"
            }`}
          >
            {link.label}

            {link.href === "/admin" && (
              <span
                aria-hidden="true"
                className="ml-1.5 inline-block size-1.5 rounded-full bg-orange-500"
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
}