"use client";

import { FormEvent, useState } from "react";

export default function ChatInput({
  onSend,
  disabled
}: {
  onSend: (message: string) => void;
  disabled?: boolean;
}) {
  const [value, setValue] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setValue("");
  };

  return (
    <form className="chat-input" onSubmit={handleSubmit}>
      <textarea
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Share a challenge or goal you want guidance on…"
        rows={3}
        disabled={disabled}
      />
      <div className="chat-input__actions">
        <button type="submit" disabled={disabled || value.trim().length === 0}>
          Send Insight
        </button>
      </div>
      <style jsx>{`
        .chat-input {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        textarea {
          width: 100%;
          border-radius: 14px;
          padding: 14px 16px;
          border: 1px solid var(--border);
          resize: vertical;
          min-height: 90px;
          font-family: inherit;
          font-size: 0.95rem;
          box-shadow: inset 0 1px 2px rgba(15, 23, 42, 0.08);
        }

        textarea:focus {
          outline: 2px solid rgba(108, 92, 231, 0.35);
        }

        .chat-input__actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        button {
          background: var(--purple);
          color: white;
          border: none;
          font-weight: 600;
          border-radius: 999px;
          padding: 10px 18px;
          cursor: pointer;
          transition: background 0.2s ease, transform 0.2s ease;
        }

        button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        button:not(:disabled):hover {
          transform: translateY(-1px);
          background: #5b4bd9;
        }
      `}</style>
    </form>
  );
}
