import { BrandMark } from "@/components/BrandMark";

export default function Loading() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-5">
      <BrandMark className="h-12 w-12" />
      <p className="tech text-red">LOADING / RED</p>
    </div>
  );
}
