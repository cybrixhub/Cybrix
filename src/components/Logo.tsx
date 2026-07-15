import Image from "next/image";
import { SITE } from "@/lib/site";

type LogoVariant = "framed" | "mono" | "raw";

type LogoProps = {
  className?: string;
  /** "framed" (default) sits the color mark in a navy chip so it holds its
   *  own on parchment; "mono" paints it cream via CSS mask for contexts
   *  where the chip would be visually loud; "raw" is the bare PNG. */
  variant?: LogoVariant;
};

export default function Logo({
  className = "",
  variant = "framed",
}: LogoProps) {
  if (variant === "mono") {
    return (
      <span
        role="img"
        aria-label={SITE.name}
        className={`inline-block h-9 w-[64px] bg-current sm:h-10 sm:w-[72px] ${className}`}
        style={{
          WebkitMaskImage: "url(/brand/cybrix-wordmark.png)",
          maskImage: "url(/brand/cybrix-wordmark.png)",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          maskPosition: "center",
          WebkitMaskSize: "contain",
          maskSize: "contain",
        }}
      />
    );
  }

  const img = (
    <Image
      src="/brand/cybrix-wordmark.png"
      alt={SITE.name}
      width={500}
      height={300}
      priority
      sizes="120px"
      className="h-full w-auto"
    />
  );

  if (variant === "raw") {
    return (
      <span className={`inline-flex items-center ${className}`}>
        {img}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex h-10 items-center rounded-md border bg-navy px-2.5 py-1 sm:h-11 ${className}`}
      style={{
        borderColor: "color-mix(in srgb, var(--color-navy-line) 70%, transparent)",
        boxShadow:
          "0 10px 22px -14px rgba(14,26,58,0.9), inset 0 0 0 1px rgba(123,229,216,0.06)",
      }}
    >
      <span className="block h-full">{img}</span>
    </span>
  );
}
