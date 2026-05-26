import React, { useState } from "react";
import { LuCopy, LuCheck, LuCode } from "react-icons/lu";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

const AIResponsePreview = ({ content }) => {
  if (!content) {
    return (
      <div className="p-4 border border-accent-soft/30 bg-accent-soft/10 rounded-xl">
        <p className="text-accent text-sm">AI response is loading or not available.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-full overflow-x-hidden">
      <div className="text-[14px] sm:text-[15px] prose prose-invert max-w-none break-words">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ className, children }) {
              const match = /language-(\w+)/.exec(className || "");
              const language = match ? match[1] : "";
              const isInline = !className;

              if (isInline) {
                return (
                  <code className="px-1.5 py-0.5 bg-surface rounded text-accent text-sm break-words border border-border">
                    {children}
                  </code>
                );
              }

              return <CodeBlock code={String(children).replace(/\n$/, "")} language={language} />;
            },
            p({ children }) {
              return <p className="mb-3 leading-7 text-text-secondary break-words">{children}</p>;
            },
            strong({ children }) {
              return <strong className="font-semibold text-text-primary">{children}</strong>;
            },
            em({ children }) {
              return <em className="italic text-text-secondary">{children}</em>;
            },
            ul({ children }) {
              return <ul className="list-disc pl-5 my-3 space-y-2">{children}</ul>;
            },
            ol({ children }) {
              return <ol className="list-decimal pl-5 my-3 space-y-2">{children}</ol>;
            },
            li({ children }) {
              return <li className="text-text-secondary leading-7">{children}</li>;
            },
            blockquote({ children }) {
              return (
                <blockquote className="border-l-4 border-accent bg-accent-soft/10 pl-4 py-2 my-4 rounded-r-lg text-text-secondary">
                  {children}
                </blockquote>
              );
            },
            h1({ children }) {
              return <h1 className="text-xl sm:text-2xl font-display font-bold mt-6 mb-4 text-text-primary">{children}</h1>;
            },
            h2({ children }) {
              return <h2 className="text-lg sm:text-xl font-display font-bold mt-5 mb-3 text-text-primary">{children}</h2>;
            },
            h3({ children }) {
              return <h3 className="text-base sm:text-lg font-display font-semibold mt-4 mb-2 text-text-primary">{children}</h3>;
            },
            a({ children, href }) {
              return (
                <a href={href} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                  {children}
                </a>
              );
            },
            table({ children }) {
              return (
                <div className="overflow-x-auto my-4 border border-border rounded-xl">
                  <table className="min-w-full">{children}</table>
                </div>
              );
            },
            img({ src, alt }) {
              return <img src={src} alt={alt} className="max-w-full h-auto rounded-xl my-4 border border-border" />;
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

function CodeBlock({ code, language }) {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-5 border border-border rounded-xl overflow-hidden bg-surface w-full max-w-full">
      <div className="flex items-center justify-between px-4 py-2.5 bg-surface-hover border-b border-border">
        <div className="flex items-center gap-2 text-xs">
          <LuCode className="text-accent" />
          <span className="uppercase text-text-muted font-medium">{language || "code"}</span>
        </div>
        <button onClick={copyCode} className="text-text-muted hover:text-text-primary transition-colors">
          {copied ? <LuCheck className="text-accent" /> : <LuCopy size={14} />}
        </button>
      </div>
      <div className="overflow-x-auto">
        <SyntaxHighlighter
          language={language}
          style={oneLight}
          customStyle={{
            fontSize: 13,
            margin: 0,
            padding: "16px",
            background: "transparent",
            width: "100%",
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}

export default AIResponsePreview;
