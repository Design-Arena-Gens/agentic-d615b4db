"use client";

type Props = {
  role: "user" | "assistant";
  content: string;
};

export default function MessageBubble({ role, content }: Props) {
  const isUser = role === "user";

  return (
    <div className={"bubble " + (isUser ? "bubble--user" : "bubble--assistant")}
      role="group"
      aria-label={isUser ? "Your message" : "Advisor response"}
    >
      <div className="bubble__role">{isUser ? "You" : "Advisor"}</div>
      <div className="bubble__content" dangerouslySetInnerHTML={{ __html: markdownToHtml(content) }} />
      <style jsx>{`
        .bubble {
          max-width: 480px;
          padding: 16px;
          border-radius: 18px;
          line-height: 1.5;
          font-size: 0.95rem;
          box-shadow: 0 12px 30px rgba(15, 23, 42, 0.12);
        }

        .bubble + .bubble {
          margin-top: 12px;
        }

        .bubble--user {
          margin-left: auto;
          background: var(--purple);
          color: white;
        }

        .bubble--assistant {
          margin-right: auto;
          background: var(--bg-card);
          color: var(--text-main);
          border: 1px solid rgba(148, 163, 184, 0.25);
        }

        .bubble__role {
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.02em;
          text-transform: uppercase;
          margin-bottom: 6px;
          opacity: 0.7;
        }

        .bubble__content strong {
          font-weight: 600;
        }

        .bubble__content ul {
          margin: 8px 0 0 18px;
          padding: 0;
        }
      `}</style>
    </div>
  );
}

function markdownToHtml(markdown: string): string {
  return markdown
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\n\n/g, "<br/><br/>")
    .replace(/^•\s(.*)$/gm, "<ul><li>$1</li></ul>")
    .replace(/<\/ul>\s*<ul>/g, "")
    .replace(/\n/g, "<br/>");
}
