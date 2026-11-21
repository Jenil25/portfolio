import type { Metadata } from "next";
import Link from "next/link";
import { Page } from "@/components/page";

export const metadata: Metadata = { title: "Not found" };

export default function NotFound() {
  return (
    <Page className="sm:pt-32">
      <div className="enter">
        <p className="text-meta text-subtle font-mono">404</p>
        <h1 className="text-display mt-3">Nothing at this address.</h1>
        <p className="text-lead text-muted mt-4">
          It never existed, or it moved.{" "}
          <Link href="/projects" className="link text-foreground">
            See the projects
          </Link>
          .
        </p>
      </div>
    </Page>
  );
}
