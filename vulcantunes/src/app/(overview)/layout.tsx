import '@/src/app/ui/overview/overview-layout.css';
import TopNav from "@/src/app/ui/overview/topnav";
import HeaderLogo from "@/src/app/ui/overview/header-logo";
import PageName from "@/src/app/ui/overview/page-name";
import Footer from "@/src/app/ui/overview/footer";

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