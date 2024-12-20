import Image from "next/image";

export default function HeaderLogo() {
  return (
    <Image
      src="/vulcantunes-logo.png"
      alt="Vulcantunes.com logo - Your ride just got better"
      width={491}
      height={101}
      style={{
        width: '30lvw',
        height: 'auto',
        zIndex: 1,
      }}
      className={'header-logo'}
      priority
    />
  );
}