import { GUTTER } from "@/components/page";
import { ThemeToggle } from "@/components/theme-toggle";
import { REPO_URL } from "@/lib/site";
import { cn } from "@/lib/utils";

const buildDate = new Date().toISOString().slice(0, 10);
// Set by Vercel at build time; undefined locally, where there's no deployed commit to link.
const commitSha = process.env.VERCEL_GIT_COMMIT_SHA;

export function Footer() {
  return (
    <footer className="border-t">
      <div
        className={cn(GUTTER, "text-meta text-subtle flex items-center justify-between gap-4 py-5")}
      >
        <p className="flex flex-wrap gap-x-4 gap-y-1">
          <span>© {buildDate.slice(0, 4)} Jenil Mahyavanshi</span>
          <a href={REPO_URL} className="hover:text-foreground transition-colors">
            Source
          </a>
          {commitSha ? (
            <a
              href={`${REPO_URL}/commit/${commitSha}`}
              className="hover:text-foreground font-mono transition-colors"
            >
              Built {buildDate} from {commitSha.slice(0, 7)}
            </a>
          ) : (
            <span className="font-mono">Built {buildDate}</span>
          )}
        </p>
        <ThemeToggle />
      </div>
    </footer>
  );
}
