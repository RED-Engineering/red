import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = { title: "Returns" };

export default function ReturnsPage() {
  return (
    <LegalPage
      title="Returns"
      body="Digital files are not returnable once delivered. Manufactured objects can be discussed if they arrived damaged or not as described. Custom work is not returnable unless RED failed the agreed specification."
    />
  );
}
