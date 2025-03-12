import { Metadata } from "next";
import React from "react";
import { ProductPageParams } from "@/src/app/lib/definitions";

export async function generateMetadata(
  props: ProductPageParams
): Promise<Metadata> {
  // Next.js needs us to treat params as potentially async
  // @ts-ignore - Suppress TypeScript warning as Next.js requires this pattern
  const resolvedParams = await props.params;

  const product = await fetch(`/api/products/${resolvedParams.model}`).then(res => res.json());

  return {
    title: model,
  };
}

export default function Layout({
   children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
