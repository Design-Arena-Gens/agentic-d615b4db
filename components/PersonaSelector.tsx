"use client";

import clsx from "clsx";
import type { Persona } from "../lib/advisor";
import { personaOptions, personaTagline } from "../lib/advisor";

type Props = {
  value: Persona;
  onChange: (persona: Persona) => void;
};

export default function PersonaSelector({ value, onChange }: Props) {
  return (
    <div className="persona-selector">
      {personaOptions.map((persona) => {
        const active = value === persona.id;
        return (
          <button
            key={persona.id}
            className={clsx("persona-pill", active && "persona-pill--active")}
            onClick={() => onChange(persona.id)}
            type="button"
          >
            <span className="persona-pill__label">{persona.label}</span>
            <span className="persona-pill__description">{persona.description}</span>
            <span className="persona-pill__tagline">{personaTagline(persona.id)}</span>
          </button>
        );
      })}
      <style jsx>{`
        .persona-selector {
          display: grid;
          gap: 12px;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        }

        .persona-pill {
          position: relative;
          text-align: left;
          background: rgba(255, 255, 255, 0.7);
          border: 1px solid transparent;
          border-radius: 16px;
          padding: 16px;
          cursor: pointer;
          transition: all 0.25s ease;
          backdrop-filter: blur(6px);
          box-shadow: 0 6px 20px rgba(79, 70, 229, 0.08);
        }

        .persona-pill:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 35px rgba(79, 70, 229, 0.12);
        }

        .persona-pill--active {
          border-color: var(--purple);
          background: linear-gradient(135deg, rgba(108, 92, 231, 0.18), rgba(59, 130, 246, 0.12));
        }

        .persona-pill__label {
          display: block;
          font-weight: 600;
          color: var(--text-main);
          margin-bottom: 6px;
          font-size: 1rem;
        }

        .persona-pill__description {
          display: block;
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-bottom: 4px;
        }

        .persona-pill__tagline {
          font-size: 0.75rem;
          color: var(--purple);
          font-weight: 500;
        }
      `}</style>
    </div>
  );
}
