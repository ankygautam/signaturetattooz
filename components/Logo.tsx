"use client";

import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  size?: number;
  alt?: string;
}

export const Logo = ({ size = 48, alt = "SignatureTattooz Logo" }: LogoProps) => {
  return (

      <Image
        src="/logo.png" 
        width={size}
        height={size}
        alt={alt}
        priority
      />

  );
};
