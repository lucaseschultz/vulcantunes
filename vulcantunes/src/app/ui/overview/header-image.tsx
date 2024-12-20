import Image from "next/image";

export default function HeaderImage() {
    return (
      <Image
          src="/vulcantunes-header-image-cropped.png"
          alt="Vulcan motorcyle being driving on winding road"
          width={1080}
          height={674}
          style={{
            width: '100vw',
            height: 'auto',
            filter: 'brightness(50%)',
          }}
          priority
      />
    );
}

