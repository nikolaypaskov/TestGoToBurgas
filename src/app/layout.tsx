import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Go to Burgas — Exciting and Artistic",
  description: "Your guide to Burgas – events, landmarks, hotels, restaurants and more",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
