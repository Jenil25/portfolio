import { OG_SIZE, ogImage } from "@/lib/og";

export const alt = "Jenil Mahyavanshi — Software engineer building production AI systems";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function OpengraphImage() {
  return ogImage({
    title: "Jenil Mahyavanshi",
    subtitle: "Software engineer building production AI systems.",
  });
}
