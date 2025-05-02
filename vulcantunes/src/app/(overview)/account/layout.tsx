import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: 'Account',
  description: 'Sign into your VulcanTunes account',
};

export default function Layout({
   children,
}: {
  children: React.ReactNode;
}) {
  return children;
}