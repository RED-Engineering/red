import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = { title: "Privacy" };

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy"
      body="RED collects only what a project, an order, or a free-file download requires: name, email, project details, and files you choose to send. Emails entered for a free download are stored so that file can be released, not for marketing. Commerce data for paid orders is processed by Shopify. Paid CAD files are delivered after purchase through Shopify. Free files are released on this site after an email is saved. There are no trackers added for marketing."
    />
  );
}
