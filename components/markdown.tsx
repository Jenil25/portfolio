import ReactMarkdown from "react-markdown";

interface MarkdownProps {
  children: string;
}

export function Markdown({ children }: MarkdownProps) {
  return (
    <ReactMarkdown
      components={{
        h2: ({ children: c }) => <h2 className="text-lead mt-10 mb-3 font-semibold">{c}</h2>,
        h3: ({ children: c }) => <h3 className="mt-8 mb-2 font-semibold">{c}</h3>,
        p: ({ children: c }) => <p className="mb-5 last:mb-0">{c}</p>,
        ul: ({ children: c }) => (
          <ul className="marker:text-subtle mb-5 list-disc space-y-1.5 pl-5">{c}</ul>
        ),
        ol: ({ children: c }) => (
          <ol className="marker:text-subtle mb-5 list-decimal space-y-1.5 pl-5">{c}</ol>
        ),
        li: ({ children: c }) => <li>{c}</li>,
        code: ({ children: c }) => (
          <code className="bg-surface rounded-[4px] px-1 py-px font-mono text-[0.875em]">{c}</code>
        ),
        pre: ({ children: c }) => (
          <pre className="bg-surface text-small mb-5 overflow-x-auto rounded-lg p-4 font-mono">
            {c}
          </pre>
        ),
        a: ({ href, children: c }) => (
          <a
            href={href}
            className="link"
            target={href?.startsWith("http") ? "_blank" : undefined}
            rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
          >
            {c}
          </a>
        ),
        blockquote: ({ children: c }) => (
          <blockquote className="text-muted mb-5 border-l-2 pl-4">{c}</blockquote>
        ),
        hr: () => <hr className="my-10" />,
        strong: ({ children: c }) => <strong className="font-semibold">{c}</strong>,
      }}
    >
      {children}
    </ReactMarkdown>
  );
}
