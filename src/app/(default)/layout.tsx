import HeaderBlock from "@/components/blocks/header.block";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Decision App",
  description: "Generated by create next app",
};

export default function DefaultLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="pb-20">
      <HeaderBlock />
      {children}
    </div>
  );
}
