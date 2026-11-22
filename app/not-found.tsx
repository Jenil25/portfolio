import type { Metadata } from "next";
import Link from "next/link";
import { Page, PageHeader } from "@/components/page";

export const metadata: Metadata = { title: "Not found" };

export default function NotFound() {
  return (
    <Page>
      <PageHeader
        title="Nothing at this address."
        before={<p className="text-meta text-subtle font-mono">404</p>}
      >
        <p>
          It never existed, or it moved.{" "}
          <Link href="/projects" className="link text-foreground">
            See the projects
          </Link>
          .
        </p>
      </PageHeader>
    </Page>
  );
}
