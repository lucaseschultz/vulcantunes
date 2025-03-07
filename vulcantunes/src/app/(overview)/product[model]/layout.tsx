import { Metadata } from "next";
import React from "react";
import { ProductPageParams } from "@/src/app/lib/definitions";

export async function generateMetadata({ params }: ProductPageParams): Promise<Metadata> {
  return {
    title: `${params.id}`,
  };
}

export default function Layout({
   children,
}: {
  children: React.ReactNode;
}) {
  return children;
}