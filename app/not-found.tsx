import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Not found" };

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-[900px] flex-col gap-4 px-6 py-24">
      <p className="text-muted-foreground font-mono text-[13px]">404</p>
      <h1 className="text-h1 text-foreground">Nothing at this address.</h1>
      <p className="text-muted-foreground text-[16px] leading-[1.55]">
        It never existed, or it moved.{" "}
        <Link
          href="/projects"
          className="text-accent-teal decoration-accent-teal/40 hover:decoration-accent-teal underline underline-offset-4"
        >
          See the projects →
        </Link>
      </p>
    </div>
  );
}
