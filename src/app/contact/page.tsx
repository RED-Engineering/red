import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Tell RED what you’re trying to make.",
};

export default function ContactPage() {
  return (
    <div className="shell py-16 md:py-24">
      <div className="grid gap-12 lg:grid-cols-12">
        <header className="lg:col-span-5">
          <div className="flex items-center gap-3">
            <span className="red-led" aria-hidden />
            <p className="tech text-red">INTAKE / CONTACT</p>
          </div>
          <h1 className="mt-6 text-6xl leading-[0.9] tracking-[-0.06em] md:text-7xl">
            START AN ENGINEERING PROJECT.
          </h1>
          <p className="mt-7 max-w-md text-lg leading-8 text-mist">
            Send the project details, requirements and any files you already have.
          </p>
          <dl className="mt-12 grid grid-cols-2 gap-6 border-t border-paper/10 pt-6">
            <div>
              <dt className="tech">ACCEPTED</dt>
              <dd className="mt-2 font-mono text-[10px] leading-5 tracking-[0.1em]">
                STEP / STL / DXF
                <br />
                PDF / IMAGES
              </dd>
            </div>
            <div>
              <dt className="tech">RESPONSE</dt>
              <dd className="mt-2 font-mono text-[10px] leading-5 tracking-[0.1em]">
                PROJECT REVIEW
                <br />
                NEXT STEP
              </dd>
            </div>
          </dl>
        </header>
        <div className="lg:col-span-6 lg:col-start-7">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
