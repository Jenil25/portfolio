import type { Metadata, Viewport } from "next";
import { Fragment_Mono, Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { SITE_URL } from "@/lib/site";

// Google's Inter keeps the opsz axis (Display cut at large sizes) and tabular figures,
// but strips the stylistic sets, so don't reach for ss01/cv11 here.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  axes: ["opsz"],
});

const fragmentMono = Fragment_Mono({
  variable: "--font-fragment-mono",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: {
    default: "Jenil Mahyavanshi",
    template: "%s · Jenil Mahyavanshi",
  },
  description:
    "AI-systems engineer · MS CS at Northeastern. Shipping production LLM systems and agentic workflows.",
  metadataBase: new URL(SITE_URL),
};

export const viewport: Viewport = { themeColor: "#0f0e0c" };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Font variables go on <html>: the base styles set the font on `html`, and a variable
    // declared on <body> is undefined there, so every page would fall back to serif.
    <html
      lang="en"
      className={`${inter.variable} ${fragmentMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen">
        <a
          href="#main"
          className="bg-foreground text-background text-small sr-only rounded-md px-3 py-2 focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50"
        >
          Skip to content
        </a>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <Nav />
            <main id="main" className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
