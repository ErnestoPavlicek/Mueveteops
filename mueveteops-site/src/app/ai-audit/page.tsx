import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AuditFunnel } from "@/components/AuditFunnel";

export const metadata: Metadata = {
  title: "Free AI Audit | MueveOps",
  description:
    "Get a personalized AI automation audit for your business. We analyze your website and operations to identify the highest-value automation opportunities.",
  alternates: {
    canonical: "/ai-audit",
  },
};

export default function AIAuditPage() {
  return (
    <div className="flex flex-col min-h-full">
      <Navbar />
      <main className="flex-1 flex flex-col">
        <AuditFunnel />
      </main>
      <Footer />
    </div>
  );
}
