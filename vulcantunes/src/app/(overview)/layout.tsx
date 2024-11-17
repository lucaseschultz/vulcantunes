import TopNav from "@/app/ui/overview/topnav";
import Footer from "@/app/ui/overview/footer";

export default function Layout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="page">
      <TopNav />
      {children}
      <Footer />
    </div>
  );
}