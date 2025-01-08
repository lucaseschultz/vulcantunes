import '@/app/ui/overview/overview.css';
import TopNav from "@/app/ui/overview/topnav";
import Footer from "@/app/ui/overview/footer";
import HeaderImage from "@/app/ui/overview/header-image";
import HeaderLogo from "@/app/ui/overview/header-logo";

export default function Layout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="page">
      <TopNav />
      <main>
        <header>
          <HeaderImage/>
          <HeaderLogo/>
        </header>
        {children}
      </main>
      <Footer/>
    </div>
  );
}