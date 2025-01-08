import '@/app/ui/overview/overview-layout.css';
import TopNav from "@/app/ui/overview/topnav";
import Footer from "@/app/ui/overview/footer";
import HeaderImage from "@/app/ui/overview/header-image";

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
        </header>
        {children}
      </main>
      <Footer/>
    </div>
  );
}