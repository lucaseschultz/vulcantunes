import Image from "next/image";

export default function Header() {
  return (
    <div className="header">
      <Image
          src="/vulcantunes-header-image.png"
          alt="Vulcan motorcyle rode on winding road"
          width={654}
          height={395}
          style={{
            width: '100vw',
            height: 'auto',
            filter: 'brightness(50%)',
          }}
          priority
      />
      <Image
        src="/vulcantunes-logo.png"
        alt="Vulcantunes.com logo - Your ride just got better"
        width={491}
        height={101}
        className={'header-logo'}
        style={{
          width: '40lvw',
          height: 'auto',
          zIndex: 1,
        }}
        priority
      />
    </div>
  );
}

