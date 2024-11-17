import TopNav from "@/app/ui/overview/topnav";
import Footer from "@/app/ui/overview/footer";

export default function Layout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={"page"}>
      <header>
        <TopNav></TopNav>
      </header>
      {children}
      <Footer></Footer>
    </div>
  );
};

