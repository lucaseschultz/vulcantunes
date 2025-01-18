import '@/app/ui/overview/overview-layout.css';
import TopNav from "@/app/ui/overview/topnav";
import HeaderLogo from "@/app/ui/overview/header-logo";
import PageName from "@/app/ui/overview/page-name";
import Footer from "@/app/ui/overview/footer";

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
          <PageName/>
        </header>
        {children}
      </main>
      <Footer/>
    </div>
  );
}