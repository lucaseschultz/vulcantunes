import '@/src/app/ui/(overview)/layout/styles/overview-layout.css';
import TopNav from "@/src/app/ui/(overview)/layout/components/topnav";
import NewLookNotification from "@/src/app/ui/(overview)/layout/components/new-look-notification";
import HeaderLogo from "@/src/app/ui/layout/components/header-logo";
import Footer from "@/src/app/ui/(overview)/layout/components/footer";
import React from "react";
import {NotificationProvider} from '@/src/app/ui/layout/components/notification-context';

export default function Layout({
                                 children
                               }: {
  children: React.ReactNode;
}) {
  return (
    <div className="page">
      <NotificationProvider>
        <TopNav/>
        <main>
          <header>
            <NewLookNotification/>
            <HeaderLogo/>
          </header>
          {children}
        </main>
        <Footer/>
      </NotificationProvider>
    </div>
  );
}
