import HeaderImage from "@/app/ui/overview/header-image";
import HeaderLogo from "@/app/ui/overview/header-logo";
import Products from "@/app/ui/overview/products"

export default function Home() {
  return (
    <main>
      <header>
        <HeaderImage />
        <HeaderLogo />
      </header>
      <Products />
    </main>
  );
};
