"use client";

import { useState } from "react";
import AdvisorSummary from "../components/AdvisorSummary";
import ChatInput from "../components/ChatInput";
import MessageBubble from "../components/MessageBubble";
import PersonaSelector from "../components/PersonaSelector";
import type { AdvisorSummary as AdvisorSummaryType, Persona } from "../lib/advisor";
import { generateAdvisorResponse } from "../lib/advisor";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const starterSummary: AdvisorSummaryType = {
  focus: "Balance Blueprint",
  keyInsights: [
    "Three priorities at a time keeps execution sharp.",
    "Momentum builds fastest when you have one wellbeing anchor per day.",
    "Reviewing wins weekly reinforces confidence and direction."
  ],
  actions: [
    "Capture a 5-minute weekly reflection to surface wins and lessons.",
    "Protect a daily movement or energy ritual tied to existing routines.",
    "Pinpoint one high-impact objective for the coming week and schedule it first."
  ],
  metrics: [
    "Weekly reflection streak (in weeks).",
    "Daily energy score after your ritual (1–5).",
    "Completion rate of planned highlight tasks."
  ]
};

const suggestionPrompts = [
  "I'm feeling burned out trying to juggle work and personal commitments.",
  "I want a roadmap to transition into product leadership in 12 months.",
  "Help me tighten my finances while saving for a home."
];

export default function HomePage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: createId(),
      role: "assistant",
      content:
        "**Welcome!** I'm your personal advisor. share what you're navigating and I'll synthesize a focused plan."
    }
  ]);
  const [summary, setSummary] = useState<AdvisorSummaryType>(starterSummary);
  const [persona, setPersona] = useState<Persona>("Balance");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSend = (text: string) => {
    const userMessage: Message = {
      id: createId(),
      role: "user",
      content: text
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsProcessing(true);

    window.setTimeout(() => {
      setMessages((prev) => {
        const { reply, summary: newSummary } = generateAdvisorResponse(
          text,
          persona,
          prev.map(({ role, content }) => ({ role, content }))
        );
        const assistantMessage: Message = {
          id: createId(),
          role: "assistant",
          content: reply
        };
        setSummary(newSummary);
        setIsProcessing(false);
        return [...prev, assistantMessage];
      });
    }, 420);
  };

  return (
    <main className="shell">
      <div className="shell__grid">
        <section className="panel panel--advisor">
          <header className="panel__header">
            <div>
              <h1>Personal Advisor Agent</h1>
              <p>Craft sharp direction across life, career, and finance in a single conversation.</p>
            </div>
          </header>
          <PersonaSelector value={persona} onChange={setPersona} />
          <div className="panel__suggestions">
            {suggestionPrompts.map((prompt) => (
              <button key={prompt} type="button" onClick={() => handleSend(prompt)}>
                {prompt}
              </button>
            ))}
          </div>
          <div className="panel__messages" role="log" aria-live="polite">
            {messages.map((message) => (
              <MessageBubble key={message.id} role={message.role} content={message.content} />
            ))}
            {isProcessing && (
              <div className="panel__typing">Synthesizing your plan…</div>
            )}
          </div>
          <ChatInput onSend={handleSend} disabled={isProcessing} />
        </section>
        <AdvisorSummary summary={summary} />
      </div>
    </main>
  );
}

function createId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).slice(2, 11) + Date.now().toString(36);
}
