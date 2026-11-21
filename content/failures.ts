import type { Failure } from "@/lib/types";

// Dates are month precision (YYYY-MM), like the changelog. Pages read these through the helpers
// below, which sort newest first, so array order doesn't matter.
// TODO(jenil): dates marked "estimate" are guesses — confirm the months.
export const failures: Failure[] = [
  {
    slug: "n8n-sql-injection",
    title: "n8n SQL injection in workflow API",
    date: "2026-02", // estimate
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
    date: "2026-02", // estimate
    severity: "major",
    category: "architecture",
    description:
      "The resume tailoring step kept emitting the master LaTeX template with no edits. The merge code was looking for placeholders the template no longer had.",
    postMortem: {
      whatHappened:
        "For dozens of consecutive jobs, the tailored-resume artifact was byte-identical to the master template. The pipeline didn't fail, so it kept running.",
      rootCause:
        "The merge step, an n8n Code node, swapped tokens like `__EXPERIENCE_SECTION__` for the tailored sections. After a template change the tokens were gone, and JavaScript's `replace` returns the original string when nothing matches, so the model's output was dropped without an error. Fixing that exposed two more problems: the model was undersized for the rewrite, and the prompt's many 'must keep' rules left it little room to change anything.",
      theFix:
        "Replaced placeholder-token matching with regex \\section{} boundary detection, so the merge operates on real LaTeX structure and throws if it can't find the sections. Then switched to gemini-2.5-flash and loosened the constraint set.",
      whatILearned:
        "When output collapses to a no-op, suspect the plumbing before tuning prompts. The model's output was there all along; the merge code was quietly throwing it away.",
    },
  },
  {
    slug: "jina-reader-trailing-space",
    title: "Jina Reader credential header had a trailing space",
    date: "2026-02", // estimate
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
    date: "2026-02", // estimate
    severity: "major",
    category: "decision",
    description:
      "Optimized for cost over quality on the resume tailoring node. The rewrites weren't good enough to use, and the cost saving was meaningless.",
    postMortem: {
      whatHappened:
        "Chose a smaller, cheaper model for the resume rewrite step on the assumption that the task was 'simple structured editing'. It wasn't — the model didn't follow instructions well enough to handle a full LaTeX template plus a job description plus the rewrite rules.",
      rootCause:
        "Cost-first thinking before validating quality. The cheaper model's per-call savings were trivial against the cost of weak output and the time spent working around it.",
      theFix:
        "Moved up to gemini-2.5-flash. Re-ran the whole backlog. Established a rule: validate quality at the largest reasonable model first, then downsize if metrics hold.",
      whatILearned:
        "The cost of a bad output is almost never the per-token spend — it's the wasted downstream work and the time spent diagnosing the wrong layer. Choose the model that makes the task trivially solvable, then optimize.",
    },
  },
  {
    slug: "tailored-resume-one-page",
    title: "Tailored resumes wouldn't stay on one page",
    date: "2026-02",
    severity: "major",
    category: "architecture",
    description:
      "Tailored resumes could spill onto a second page. The model writing the LaTeX never sees the compiled PDF, so it can't tell when an edit overflows.",
    postMortem: {
      whatHappened:
        "Every job got its own rewritten LaTeX resume, and the PDF had to fit on one page. Some ran onto a second, and despite a lot of attempts I never got the limit to hold.",
      rootCause:
        "The model edits LaTeX source but never sees the rendered page, so it has no way to know when its edits push the resume past one page. Holding the limit meant checking the compiled PDF inside the pipeline, and I couldn't find a LaTeX-to-PDF converter consistent enough to build that check on, or get one working.",
      theFix:
        "No automated fix. Dropped the one-page requirement and exposed the LaTeX source next to the PDF, so the user can edit it by hand when a resume runs long or anything else breaks.",
      whatILearned:
        "A model can't hold a limit it can't see: page count only exists after rendering, so the check has to run on the PDF, not in the prompt. When I couldn't build that check, handing over the editable source was the honest fallback.",
    },
  },
  {
    slug: "recruitease-token-limit",
    title: "RecruitEase kept hitting GPT-3.5's token limit",
    date: "2023-05",
    severity: "major",
    category: "bug",
    description:
      "Our first app built on LLM APIs kept failing with token-limit errors. Long resumes and job descriptions didn't fit in GPT-3.5's 4,096-token window.",
    postMortem: {
      whatHappened:
        "RecruitEase sent a job description, a resume, and each feature's instructions to GPT-3.5 in a single request. Long inputs regularly came back with a token-limit error instead of an answer.",
      rootCause:
        "GPT-3.5's 4,096-token window is shared by the prompt and the response. A full resume, a full JD, and the instructions could fill most of it on their own, leaving too little room for the output.",
      theFix:
        "Designed each feature's prompt around that budget: pruned the context down to what the feature needed and tightened output formats so responses stayed short.",
      whatILearned:
        "A context window is a budget split between what you send and what you get back. Size the prompt for the longest real input, not the demo one.",
    },
  },
  {
    slug: "adapt-celery-missing-id",
    title: "Celery workers never picked up our jobs",
    date: "2024-09",
    severity: "major",
    category: "bug",
    description:
      "Jobs published to RabbitMQ never got processed. Celery expects an id on every task message, and ours didn't have one.",
    postMortem: {
      whatHappened:
        "At the start of Adapt, our services published jobs to RabbitMQ for the Celery workers, and the workers never processed them. Nothing in the docs we could find explained why.",
      rootCause:
        "Our services wrote messages straight to RabbitMQ instead of going through Celery's client, and Celery's task format expects an id field on every message. Without one, the workers never picked the job up.",
      theFix:
        "Checked the message structure by hand and reverse-engineered what the workers expected until we found the missing field, then added an id to every job we published.",
      whatILearned:
        "A message format shared over a queue is a contract, even when nobody wrote it down. Bypass a library's client and you inherit every field it used to fill in for you.",
    },
  },
  {
    slug: "adapt-stream-split-answers",
    title: "Long answers broke mid-stream",
    date: "2025-03",
    severity: "major",
    category: "bug",
    description:
      "Long streamed answers broke partway and users had to reload. The backend sent big answers in several parts; the frontend expected one stream.",
    postMortem: {
      whatHappened:
        "Once Adapt streamed its answers, long ones would break in the middle of streaming, and the user had to reload the page.",
      rootCause:
        "An answer bigger than the backend's per-request limit was sent in several parts, and the frontend assumed a single continuous stream, so it broke when an answer hit the limit.",
      theFix:
        "Rebuilt the frontend's stream handling to expect an answer in parts and stitch them back into one.",
      whatILearned:
        "Debug the parts you're sure are working. The stream handling looked fine because short answers never hit the limit, and that's exactly where the bug was.",
    },
  },
  {
    slug: "adapt-unusual-characters",
    title: "Files with unusual characters failed on every retry",
    date: "2025-01",
    severity: "major",
    category: "bug",
    description:
      "Some uploads broke text extraction, and every retry failed the same way. Checkpointed retries only help when the failure is transient.",
    postMortem: {
      whatHappened:
        "Some uploaded files contained characters that text extraction couldn't handle. The pipeline failed on them, and retrying failed again every time.",
      rootCause:
        "Text extraction choked on the characters themselves. A retry replays the same input, so a failure caused by the file can't succeed on retry.",
      theFix:
        "Made text extraction skip characters it couldn't handle and process the rest of the file.",
      whatILearned:
        "Retries fix transient failures, not bad input. When the input is the problem, degrade instead: drop what you can't read and keep the rest.",
    },
  },
  {
    slug: "adapt-email-templates",
    title: "Fixing an email template in one inbox broke it in the others",
    date: "2024-11",
    severity: "minor",
    category: "decision",
    description:
      "Adapt's outgoing emails were designed to look like the app. Gmail, Hotmail, Yahoo, and AOL each rendered them differently.",
    postMortem: {
      whatHappened:
        "We designed Adapt's email templates to match the app's UI. In practice each provider rendered them differently, and I was hand-editing the HTML to make them match: every fix for one provider broke the layout in another.",
      rootCause:
        "Email clients don't render HTML like browsers do. Each supports its own subset of HTML and CSS, so a template built like a web page breaks differently in each one.",
      theFix:
        "Moved the templates to an email service that previews how a template renders in each provider, so we could check them all before sending instead of fixing them one by one.",
      whatILearned:
        "Email HTML isn't web HTML. Design for what every client supports, and check every client before you ship, not just the one you use.",
    },
  },
  {
    slug: "vito-whisper-intermediate-files",
    title: "Whisper's leftover files filled the server's memory",
    date: "2023-08",
    severity: "major",
    category: "bug",
    description:
      "Vito's transcription backend would stall and then fail until it was restarted. Whisper never deleted its intermediate files.",
    postMortem: {
      whatHappened:
        "The transcription backend would pause: API calls waited a long time, then failed, and kept failing until the service was restarted.",
      rootCause:
        "Whisper wrote intermediate files while transcribing and never deleted them, so they piled up until the server ran out of memory.",
      theFix:
        "Cleaned up the intermediate files after each transcription, and added automatic crash recovery so a stuck service restarted on its own instead of waiting for someone to notice.",
      whatILearned:
        "A model can leak through what it writes, not just what it holds. And when a service can wedge, make recovery automatic, so a hang doesn't wait on a person.",
    },
  },
  {
    slug: "vito-cloudfront-invalidation",
    title: "Spent two days fixing a bug that was already fixed",
    date: "2023-06",
    severity: "minor",
    category: "bug",
    description:
      "A frontend fix worked locally but not in production. CloudFront was still serving the old build.",
    postMortem: {
      whatHappened:
        "Very early in my job, I fixed a frontend bug in Vito's React app. It worked locally, but after I uploaded the new build to S3, production still showed the bug. I spent two days debugging a fix that was already correct.",
      rootCause:
        "The app was served from S3 through CloudFront, which caches files at the edge. Until the cache was invalidated, CloudFront kept serving the old build.",
      theFix:
        "My team lead spotted it. Invalidating the CloudFront cache after the upload put the new build live.",
      whatILearned:
        "When a fix works locally and not in production, first prove production is running the new code. The kind of lesson you remember for life.",
    },
  },
  {
    slug: "cma-sharing-indentation",
    title: "One misindented line broke team sharing",
    date: "2023-02",
    severity: "major",
    category: "bug",
    description:
      "Sharing a document with a team or group only reached one member. The cause was a single line of Python at the wrong indentation.",
    postMortem: {
      whatHappened:
        "In CMA DocShare, sharing a document with a team or a group of users gave access to only one of them. The code was inherited from earlier interns, and the whole team was hunting for the cause.",
      rootCause:
        "An indentation error: one line sat at the wrong level, so the sharing step ran for one member instead of every member. Python doesn't flag that, because the code is still valid; it just means something else.",
      theFix: "I found the misindented line in the inherited code and fixed it.",
      whatILearned:
        "In Python, indentation is logic. A line one level off is still valid code that does something else, so in inherited code, read the structure, not just the statements.",
    },
  },
  {
    slug: "adapt-video-skip-back",
    title: "Skipping back 10 seconds broke the video player",
    date: "2025-03",
    severity: "minor",
    category: "bug",
    description:
      "The custom video player broke when someone skipped back just as the button became available at the 10-second mark.",
    postMortem: {
      whatHappened:
        "Adapt's video player had 10-second skip-back and skip-forward buttons, with skip-back disabled for the first 10 seconds. Pressing it right after it switched on, at or just past the 10-second mark, broke playback and the video stuttered.",
      rootCause:
        "An edge case at the boundary the disabled state was meant to guard. A skip back from right around 10 seconds could land at or before the start of the video, and the player didn't handle that position.",
      theFix: "Clamped the skip target so it can never land before the start of the video.",
      whatILearned:
        "Disabling a button isn't validation. Guard the value where it's used, because the edge you disabled your way around sits right next to the one you didn't.",
    },
  },
  {
    slug: "early-prod-db-credentials",
    title: "Weak credentials on an early production database",
    date: "2024-10", // estimate
    severity: "critical",
    category: "architecture",
    description:
      "An early production database was protected by a weak password and reachable from outside the team. An unrecognized login in the logs surfaced it.",
    postMortem: {
      whatHappened:
        "Early on, while a handful of users were testing the platform, the database logs showed a login from an IP we didn't recognize. The database held only test data at that point.",
      rootCause:
        "The database relied on a single weak password, and nothing at the network level limited who could reach it.",
      theFix:
        "Moved to long, randomly generated passwords and restricted database access to the team's IPs.",
      whatILearned:
        "A weak password and an open network are two separate mistakes, and either one alone is enough. 'It's only test data' is the reason to fix it now, while the data is still cheap.",
    },
  },
  {
    slug: "cma-uuid-encryption-keys",
    title: "Encrypted documents with keys made from user IDs",
    date: "2023-01", // estimate
    severity: "major",
    category: "decision",
    description:
      "CMA DocShare encrypted documents with keys based on each user's UUID. A UUID identifies a user; it isn't a secret, so the encryption protected less than it appeared to.",
    postMortem: {
      whatHappened:
        "As an intern on CMA DocShare, I implemented document encryption using keys based on each user's UUID. Files were encrypted at rest, and it looked like a secure design.",
      rootCause:
        "A UUID is an identifier, not a secret. It travels through URLs, API responses, and logs, and it lived in the same database as the files it was protecting, so anyone who could read that database could rebuild the keys. A key tied to an ID can never be rotated, either.",
      theFix:
        "What I'd do now: envelope encryption. Each document gets a random key, that key is stored encrypted under a master key in a key service like AWS KMS, and access is decided by the permissions table, not by the key. Sharing becomes a new permission row instead of re-encryption.",
      whatILearned:
        "Tying a key to a user is fine; making the key out of their ID isn't. A key has to be secret and replaceable, and an identifier is neither.",
    },
  },
];

/** Newest first. Same-month entries keep their array order (the sort is stable). */
export function getFailuresByDate(): Failure[] {
  return [...failures].sort((a, b) => b.date.localeCompare(a.date));
}

export function getFailureBySlug(slug: string): Failure | undefined {
  return failures.find((f) => f.slug === slug);
}
