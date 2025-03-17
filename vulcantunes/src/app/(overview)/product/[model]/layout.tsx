import { Metadata } from "next";
import React from "react";
import { ProductPageProps } from "@/src/app/lib/definitions";

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const resolvedParams = await params;
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
