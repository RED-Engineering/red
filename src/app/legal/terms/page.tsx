import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = { title: "Terms" };

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms"
      body="Work shown on this site is by RED unless noted. CAD files bought as digital products are licensed for your own manufacturing and use, not for resale of the files. Custom engineering is scoped in writing after intake. Shopify terms apply to paid checkout."
    />
  );
}
