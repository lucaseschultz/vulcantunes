import { Metadata } from "next";
import React from "react";

type Props = {
  params: {
    id: string;
  };
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
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