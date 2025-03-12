import { Metadata } from "next";
import React from "react";
import { ProductPageProps } from "@/src/app/lib/definitions";

export async function generateMetadata(props: ProductPageProps): Promise<Metadata> {
  // Promise.resolve = Explicitly treat params as awaitable, satisfying Next.js's requirement without TypeScript errors
  const resolvedParams = await Promise.resolve(props.params);
  const model = resolvedParams.model;

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
