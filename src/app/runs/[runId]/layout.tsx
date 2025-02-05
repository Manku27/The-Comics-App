import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "The Comic Book App",
  description: "The Comic Book App",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <section>{children}</section>;
}
