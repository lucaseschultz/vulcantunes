'use client';

import Image from "next/image";
import Link from "next/link";
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function HeaderLogo() {
  const [mounted, setMounted] = useState(false);
  const { theme, systemTheme } = useTheme();

  // Prevent theme flash during hydration
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }

  const currentTheme = theme === 'system' ? systemTheme : theme || 'light';

  const logoSrc = currentTheme === 'dark'
    ? '/icons&logos/vulcantunes-logo_dark.png'
    : '/icons&logos/vulcantunes-logo_light.png';

  return (
    <Link href="/public">
      <Image
        src={logoSrc}
        alt="Vulcantunes.com logo - Your ride just got better"
        width={491}
        height={101}
        className="header-logo"
        style={{
          width: '80lvw',
          maxWidth: '491px',
          height: 'auto',
        }}
        priority
      />
    </Link>
  );
}
