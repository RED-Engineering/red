import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = { title: "Shipping" };

export default function ShippingPage() {
  return (
    <LegalPage
      title="Shipping"
      body="Physical objects ship after they are made or packed. Lead times depend on the part, not a warehouse clock. Digital files are delivered after payment is confirmed — they are not exposed as public downloads. Shopify calculates shipping at checkout when the store is connected."
    />
  );
}
