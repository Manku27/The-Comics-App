import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Image Converter",
  description: "Image Converter",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <section>{children}</section>;
}
