"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { SeverityBadge } from "@/components/severity-badge";
import type { Failure } from "@/lib/types";

interface FailureCardProps {
  failure: Failure;
}

const SECTIONS: { key: keyof Failure["postMortem"]; label: string }[] = [
  { key: "whatHappened", label: "What happened" },
  { key: "rootCause", label: "Root cause" },
  { key: "theFix", label: "The fix" },
  { key: "whatILearned", label: "What I learned" },
];

export function FailureCard({ failure }: FailureCardProps) {
  const [open, setOpen] = React.useState(false);
  const panelId = `failure-${failure.slug}-panel`;
  const buttonId = `failure-${failure.slug}-toggle`;

  return (
    <article className="bg-surface overflow-hidden rounded-xl border border-border">
      <button
        id={buttonId}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        className="hover:bg-elevated/40 grid w-full grid-cols-[auto_1fr_auto] items-start gap-4 px-5 py-4 text-left transition-colors"
      >
        <div className="pt-0.5">
          <SeverityBadge severity={failure.severity} />
        </div>
        <div className="flex min-w-0 flex-col gap-1.5">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 className="text-foreground text-[18px] leading-tight font-medium">
              {failure.title}
            </h3>
            <time
              dateTime={failure.date}
              className="text-muted-foreground font-mono text-[12px]"
            >
              {failure.date}
            </time>
          </div>
          <p className="text-muted-foreground line-clamp-2 text-[14px] leading-[1.55]">
            {failure.description}
          </p>
        </div>
        <ChevronDown
          aria-hidden
          className={cn(
            "text-muted-foreground mt-1 size-4 shrink-0 transition-transform",
            open && "rotate-180",
          )}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="panel"
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="overflow-hidden border-t border-border"
          >
            <div className="grid grid-cols-1 gap-5 px-5 py-5 md:grid-cols-2">
              {SECTIONS.map(({ key, label }) => (
                <section key={key} className="flex flex-col gap-1.5">
                  <h4 className="text-muted-foreground font-mono text-[11px] tracking-wide">
                    {label}
                  </h4>
                  <p className="text-foreground text-[14px] leading-[1.6]">
                    {failure.postMortem[key]}
                  </p>
                </section>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}
