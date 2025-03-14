import { Metadata } from "next";
import React from "react";
import { ProductPageProps } from "@/src/app/lib/definitions";

export async function generateMetadata(props: ProductPageProps): Promise<Metadata> {
  const params = React.use(props.params);
  const model = params.model;

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
