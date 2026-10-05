import Link from "next/link";
import { BrandMark } from "@/components/BrandMark";

export default function NotFound() {
  return (
    <div className="shell relative flex min-h-[70vh] flex-col justify-center overflow-hidden py-24">
      <BrandMark className="absolute right-[5%] h-64 w-64 opacity-[0.06] md:h-96 md:w-96" />
      <p className="tech text-red">404</p>
      <h1 className="mt-5 max-w-4xl text-6xl tracking-[-0.055em] md:text-8xl">
        THIS OBJECT DOES NOT EXIST.
      </h1>
      <Link href="/" className="tech link-line mt-10 w-fit py-2 text-red">
        RETURN TO RED →
      </Link>
    </div>
  );
}
