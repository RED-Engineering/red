import { BrandMark } from "@/components/BrandMark";
import { RedButton } from "@/components/RedButton";

export default function NotFound() {
  return (
    <div className="shell flex min-h-[70vh] items-center py-32">
      <div className="glass-media relative max-w-3xl overflow-hidden rounded-[8px] p-8 md:p-12">
        <div className="pointer-events-none absolute -right-6 -bottom-10 opacity-[0.14]">
          <BrandMark className="h-48 w-48 md:h-64 md:w-64" />
        </div>
        <p className="tech text-red">404</p>
        <h1 className="section-title relative mt-4 max-w-[12ch]">This object does not exist.</h1>
        <p className="relative mt-5 max-w-md text-lg leading-8 text-mist">
          The page moved, or it was never drawn.
        </p>
        <div className="relative mt-8 flex flex-wrap gap-3">
          <RedButton href="/">BACK HOME</RedButton>
          <RedButton href="/products" variant="ghost">
            SHOP
          </RedButton>
        </div>
      </div>
    </div>
  );
}
