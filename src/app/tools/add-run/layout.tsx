import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Add Run",
  description: "Add Run",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <section>{children}</section>;
}
