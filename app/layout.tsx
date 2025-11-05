import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Advisor Agent",
  description: "Responsive personal advisor agent for lifestyle, career, and finance planning"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
