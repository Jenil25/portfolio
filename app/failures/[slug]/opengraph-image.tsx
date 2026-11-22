import { getFailureBySlug, failures } from "@/content/failures";
import { OG_SIZE, ogImage } from "@/lib/og";

export const alt = "Post-mortem from Jenil Mahyavanshi's failure log";
export const size = OG_SIZE;
export const contentType = "image/png";

// Prerender one card per entry at build time instead of fetching fonts on every request.
export function generateStaticParams() {
  return failures.map((x) => ({ slug: x.slug }));
}

export default async function FailureOpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const failure = getFailureBySlug(slug);
  return ogImage({
    title: failure?.title ?? "Failure log",
    subtitle: failure?.description,
    label: failure ? `Failure log · ${failure.date}` : "Failure log",
  });
}
