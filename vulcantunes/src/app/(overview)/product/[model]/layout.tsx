import { Metadata } from "next";
import React from "react";
import { ProductPageParams } from "@/src/app/lib/definitions";

export async function generateMetadata({ params }: ProductPageParams): Promise<Metadata> {
  const product = await fetch(`/api/products/${params.model}`).then(res => res.json())

  return {
    title: product.title || params.model,
  };
}

export default function Layout({
   children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
