import Image from "next/image";

export default function HeaderLogo() {
  return (
    <Image
      src="/vulcantunes-logo.png"
      alt="Vulcantunes.com logo - Your ride just got better"
      width={491}
      height={101}
      className={'header-logo'}
      style={{
        width: '80lvw',
        maxWidth: '491px',
        height: 'auto',
      }}
      priority
    />
  );
}

