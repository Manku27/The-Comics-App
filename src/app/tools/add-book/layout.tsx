import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Add Book",
  description: "Add Book",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <section>{children}</section>;
}
