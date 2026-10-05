import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = { title: "Privacy" };

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy"
      body="RED collects only what a project or an order requires: name, email, project details, and files you choose to send. Commerce data for paid orders is processed by Shopify. Digital files are not public on this website. There are no trackers added for marketing."
    />
  );
}
