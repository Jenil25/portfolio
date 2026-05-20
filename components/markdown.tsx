import ReactMarkdown from "react-markdown";

interface MarkdownProps {
  children: string;
}

export function Markdown({ children }: MarkdownProps) {
  return (
    <ReactMarkdown
      components={{
        h2: ({ children: c }) => (
          <h2 className="text-foreground mt-10 mb-3 text-[22px] font-medium tracking-tight first:mt-0">
            {c}
          </h2>
        ),
        h3: ({ children: c }) => (
          <h3 className="text-foreground mt-6 mb-2 text-[18px] font-medium">{c}</h3>
        ),
        p: ({ children: c }) => (
          <p className="text-foreground mb-4 text-[15px] leading-[1.7]">{c}</p>
        ),
        ul: ({ children: c }) => (
          <ul className="text-foreground mb-4 list-disc space-y-1.5 pl-5 text-[15px] leading-[1.7]">
            {c}
          </ul>
        ),
        ol: ({ children: c }) => (
          <ol className="text-foreground mb-4 list-decimal space-y-1.5 pl-5 text-[15px] leading-[1.7]">
            {c}
          </ol>
        ),
        li: ({ children: c }) => <li>{c}</li>,
        code: ({ children: c }) => (
          <code className="bg-elevated text-accent-teal rounded px-1 py-0.5 font-mono text-[13px]">
            {c}
          </code>
        ),
        pre: ({ children: c }) => (
          <pre className="bg-elevated text-foreground mb-4 overflow-x-auto rounded-lg border border-border p-4 font-mono text-[13px] leading-[1.55]">
            {c}
          </pre>
        ),
        a: ({ href, children: c }) => (
          <a
            href={href}
            className="text-accent-teal underline-offset-4 hover:underline"
            target={href?.startsWith("http") ? "_blank" : undefined}
            rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
          >
            {c}
          </a>
        ),
        blockquote: ({ children: c }) => (
          <blockquote className="text-muted-foreground mb-4 border-l-2 border-border pl-4 italic">
            {c}
          </blockquote>
        ),
        hr: () => <hr className="my-8 border-border" />,
        strong: ({ children: c }) => (
          <strong className="text-foreground font-medium">{c}</strong>
        ),
      }}
    >
      {children}
    </ReactMarkdown>
  );
}
