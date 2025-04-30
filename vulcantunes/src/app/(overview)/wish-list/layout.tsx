import {Metadata} from "next";
import React from "react";

export const metadata: Metadata = {
  title: 'Wish List',
  description: 'View and manage your saved products',
};

export default function Layout({
                                 children,
                               }: {
  children: React.ReactNode;
}) {
  return children;
}