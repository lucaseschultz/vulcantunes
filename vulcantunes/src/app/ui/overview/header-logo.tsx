import Image from "next/image";

export default function HeaderLogo() {
  return (
    <Image
      src="/vulcantunes-header-image-cropped.png"
      alt="Vulcantunes.com logo - Your ride just got better"
      width={1080}
      height={674}
      priority
    />
  );
}