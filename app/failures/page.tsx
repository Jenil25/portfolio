import type { Metadata } from "next";
import { FailuresView } from "@/components/failures-view";
import { failures } from "@/content/failures";

export const metadata: Metadata = {
  title: "Failures",
  description: "Bugs, bad calls, and what they taught me. The opposite of a highlight reel.",
};

export default function FailuresPage() {
  return (
    <div className="mx-auto max-w-[900px] px-6 py-12">
      <header className="mb-8 flex flex-col gap-2">
        <h1 className="text-h1 text-foreground">Failure log</h1>
        <p className="text-muted-foreground text-[16px] leading-[1.55]">
          Bugs, bad calls, and what they taught me. The opposite of a highlight reel.
        </p>
      </header>
      <FailuresView failures={[...failures].sort((a, b) => b.date.localeCompare(a.date))} />
    </div>
  );
}
