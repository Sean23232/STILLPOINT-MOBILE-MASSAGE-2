"use client";

import Image from "next/image";
import { useState } from "react";

interface EditorialImageProps {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  containerClassName?: string;
  sizes?: string;
  aspectClassName?: string;
}

export function EditorialImage({
  src,
  alt,
  priority = false,
  className = "",
  containerClassName = "",
  sizes = "(max-width: 768px) 100vw, 50vw",
  aspectClassName = "aspect-[4/3]",
}: EditorialImageProps) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={`relative overflow-hidden rounded-[12px] bg-[#E9E1D4] ${aspectClassName} ${containerClassName}`}
    >
      {!failed ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          loading={priority ? undefined : "lazy"}
          sizes={sizes}
          onError={() => setFailed(true)}
          className={`object-cover transition-transform duration-700 ease-out ${className}`}
        />
      ) : (
        <div
          role="img"
          aria-label={alt}
          className="flex h-full w-full flex-col items-center justify-center bg-[#E9E1D4] px-8 text-center text-[#292D29]"
        >
          <span className="mb-3 inline-block h-px w-10 bg-[#233C32]/40" />
          <p className="font-serif text-xl tracking-wide text-[#233C32]">
            Stillpoint Mobile Massage
          </p>
          <p className="mt-1 max-w-xs text-xs uppercase tracking-[0.18em] text-[#525852]">
            Your Space • Your Time • Your Moment of Calm
          </p>
        </div>
      )}
    </div>
  );
}
