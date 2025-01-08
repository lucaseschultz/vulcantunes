import '@/app/ui/overview/overview-layout.css';
import TopNav from "@/app/ui/overview/topnav";
import Footer from "@/app/ui/overview/footer";
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
          <HeaderLogo/>
        </header>
        {children}
      </main>
      <Footer/>
    </div>
  );
}