import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Comic Book App",
  description: "The Comic Book App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
