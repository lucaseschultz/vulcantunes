import {Metadata} from "next";
import React from "react";

export const metadata: Metadata = {
  title: 'Shopping Cart',
  description: 'View and manage your shopping cart',
};

export default function Layout({
                                 children,
                               }: {
  children: React.ReactNode;
}) {
  return children;
}