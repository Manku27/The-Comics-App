import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Add People",
  description: "Add People",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <section>{children}</section>;
}
