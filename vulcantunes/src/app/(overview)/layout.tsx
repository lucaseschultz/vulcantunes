import '@/src/app/ui/overview/layout/overview-layout.css';
import TopNav from "@/src/app/ui/overview/layout/topnav";
import NewLook from "@/src/app/ui/overview/layout/new-look";
import HeaderLogo from "@/src/app/ui/overview/layout/header-logo";
import Footer from "@/src/app/ui/overview/layout/footer";
import React from "react";

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
          <NewLook/>
          <HeaderLogo/>
        </header>
        {children}
      </main>
      <Footer/>
    </div>
  );
}