"use client";

import type { AdvisorSummary } from "../lib/advisor";

type Props = {
  summary: AdvisorSummary;
};

export default function AdvisorSummary({ summary }: Props) {
  return (
    <section className="summary-card">
      <div className="summary-card__header">
        <span className="summary-card__badge">Navigator</span>
        <h2>{summary.focus}</h2>
        <p>Anchored takeaways and the actions that move you forward.</p>
      </div>
      <div className="summary-card__grid">
        <SummaryList title="Key Insights" items={summary.keyInsights} />
        <SummaryList title="Next Moves" items={summary.actions} />
        <SummaryList title="Signals to Track" items={summary.metrics} />
      </div>
      <style jsx>{`
        .summary-card {
          background: var(--bg-card);
          border-radius: 24px;
          padding: 24px;
          box-shadow: var(--shadow-soft);
          border: 1px solid rgba(148, 163, 184, 0.2);
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .summary-card__header h2 {
          margin: 0;
          font-size: 1.4rem;
          color: var(--text-main);
        }

        .summary-card__header p {
          margin: 6px 0 0;
          color: var(--text-muted);
          font-size: 0.92rem;
        }

        .summary-card__badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          border-radius: 999px;
          background: var(--purple-soft);
          color: var(--purple);
          font-weight: 600;
          font-size: 0.75rem;
          padding: 6px 12px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .summary-card__grid {
          display: grid;
          gap: 18px;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        }
      `}</style>
    </section>
  );
}

function SummaryList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="summary-list">
      <h3>{title}</h3>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <style jsx>{`
        .summary-list h3 {
          margin: 0 0 8px;
          font-size: 0.95rem;
          color: var(--text-muted);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .summary-list ul {
          margin: 0;
          padding-left: 18px;
          display: grid;
          gap: 8px;
          color: var(--text-main);
        }

        .summary-list li {
          font-size: 0.9rem;
          line-height: 1.4;
        }
      `}</style>
    </div>
  );
}
