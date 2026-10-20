import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { EngineerContact } from "@/components/EngineerContact";

export const metadata: Metadata = {
  title: "Contact",
  description: "Tell RED what you’re trying to make.",
};

export default function ContactPage() {
  return (
    <div className="shell pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="grid gap-12 lg:grid-cols-12">
        <header className="lg:col-span-5">
          <div className="flex items-center gap-3">
            <span className="red-led" aria-hidden />
            <p className="tech text-red">INTAKE / CONTACT</p>
          </div>
          <h1 className="mt-6 text-6xl leading-[0.9] tracking-[-0.06em] md:text-7xl">
            START AN ENGINEERING PROJECT.
          </h1>
          <div className="mt-10">
            <EngineerContact />
          </div>
        </header>
        <div className="lg:col-span-6 lg:col-start-7">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
