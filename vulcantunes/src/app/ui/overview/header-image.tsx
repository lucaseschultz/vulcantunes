import Image from "next/image";

export default function HeaderImage() {
    return (
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
    );
}

