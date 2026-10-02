import type { Failure } from "@/lib/types";

// TODO: dates are placeholders — replace with the real timestamps from the incidents.
export const failures: Failure[] = [
  {
    slug: "n8n-sql-injection",
    title: "n8n SQL injection in workflow API",
    date: "2026-02-01",
    severity: "critical",
    category: "bug",
    description:
      "Apostrophes in job titles broke the n8n workflow API. Strings were interpolated directly into SQL.",
    postMortem: {
      whatHappened:
        'Job postings with apostrophes in their titles (e.g. "Engineer\'s role", "O\'Reilly Media") triggered SQL syntax errors mid-workflow, halting downstream resume generation. The first noticed failure was silent — the workflow logged the error but the dashboard kept showing the job as "queued".',
      rootCause:
        "A custom code node was assembling the insert statement with string concatenation. Apostrophes closed the quoted literal early; whatever followed parsed as identifier or keyword, depending on the title.",
      theFix:
        "Replaced the string-concatenated SQL with parameterized queries through the n8n Postgres node. Audited every other workflow for similar concatenation; found two more.",
      whatILearned:
        "Treat any LLM-touched user data as adversarial — even job postings scraped from public boards. The 'small' nodes between LLM calls are exactly where injection bugs hide because the attention is all on the model.",
    },
  },
  {
    slug: "resume-tailoring-template-unchanged",
    title: "Resume tailoring node returned the template unchanged",
    date: "2026-02-15",
    severity: "major",
    category: "architecture",
    description:
      "The resume tailoring step kept emitting the master LaTeX template with no edits. Three independent causes stacked.",
    postMortem: {
      whatHappened:
        "For ~40 consecutive jobs, the tailored-resume artifact was byte-identical to the master template. The pipeline didn't fail, so it kept running.",
      rootCause:
        "Three causes stacked. (1) The chosen model was undersized for the rewrite task. (2) The prompt was over-constrained — too many 'must keep' rules left no degrees of freedom for the model to make edits. (3) The placeholder tokens the prompt instructed the model to replace did not exist verbatim in the template, so even when the model tried, nothing matched.",
      theFix:
        "Switched to gemini-2.5-flash, loosened the constraint set, and replaced placeholder-token matching with regex \\section{} boundary detection so the rewrite operates on real LaTeX structure.",
      whatILearned:
        "When output collapses to a no-op, suspect upstream contract drift before tuning prompts. The 'placeholder doesn't exist in the template' bug was invisible from the model's side — it would have done the right thing if asked correctly.",
    },
  },
  {
    slug: "jina-reader-trailing-space",
    title: "Jina Reader credential header had a trailing space",
    date: "2026-01-10",
    severity: "minor",
    category: "bug",
    description:
      "Auth header was being rejected by Jina Reader. The token had a trailing space copied from the dashboard.",
    postMortem: {
      whatHappened:
        "Every Jina Reader call returned 401. The token worked on curl but not from the workflow.",
      rootCause:
        "When the token was pasted into the n8n credential field, a trailing space came along. The field accepted it; the API didn't.",
      theFix: "Trimmed the credential. Added a trim-on-save snippet to the credential helper.",
      whatILearned:
        "Whitespace in credentials is the dumbest possible bug and I will hit it again. Worth a one-line trim everywhere a token gets stored.",
    },
  },
  {
    slug: "wrong-model-size-resume-tailoring",
    title: "Picked the wrong model size for resume tailoring",
    date: "2026-02-12",
    severity: "major",
    category: "decision",
    description:
      "Optimized for cost over quality on the resume tailoring node. The output collapsed and the cost saving was meaningless.",
    postMortem: {
      whatHappened:
        "Chose a smaller, cheaper model for the resume rewrite step on the assumption that the task was 'simple structured editing'. It wasn't — the model lacked the context window and instruction-following to handle a 600-line LaTeX template plus a job description plus the rewrite rules.",
      rootCause:
        "Cost-first thinking before validating quality. The cheaper model's per-call savings were trivial against the cost of unusable output and the time spent debugging it as if it were a prompt or template bug.",
      theFix:
        "Moved up to gemini-2.5-flash. Re-ran the whole backlog. Established a rule: validate quality at the largest reasonable model first, then downsize if metrics hold.",
      whatILearned:
        "The cost of a bad output is almost never the per-token spend — it's the wasted downstream work and the time spent diagnosing the wrong layer. Choose the model that makes the task trivially solvable, then optimize.",
    },
  },
];
