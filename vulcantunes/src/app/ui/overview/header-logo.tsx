'use client';

import Image from "next/image";
import { useTheme } from 'next-themes';

export default function HeaderLogo() {
  const { theme, systemTheme } = useTheme();

  const currentTheme = theme === 'system' ? systemTheme : theme || 'dark';

  const logoSrc = currentTheme === 'dark'
    ? '/vulcantunes-logo-dark.png'
    : '/vulcantunes-logo-light.png';

  return (
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
  );
}
