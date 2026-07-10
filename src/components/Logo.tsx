import Image from "next/image";
import { SITE } from "@/lib/site";

type LogoProps = {
  className?: string;
};

export default function Logo({ className = "" }: LogoProps) {
  return (
    <Image
      src="/brand/cybrix-wordmark.png"
      alt={SITE.name}
      width={500}
      height={300}
      priority
      sizes="80px"
      className={`h-9 w-auto sm:h-10 ${className}`}
    />
  );
}
