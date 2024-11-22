import Image from "next/image";

export default function HeaderImage() {
    return (
      <div>
        <Image
            src="/vulcantunes-header-image-with-logo.png"
            alt="Vulcantunes.com logo - Your ride just got better"
            width={1080}
            height={674}
            priority
        />
      </div>
    );
}

