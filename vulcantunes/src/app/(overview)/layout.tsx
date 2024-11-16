import TopNav from "@/app/ui/topnav";
import Footer from "@/app/ui/footer";

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

