import { Button } from "@/components/ui/button";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Decision App | Настройки",
};

export default function SettingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log("Зашли в layout");
  return (
    <div className="py-10 h-dvh">
      <header className="mb-10">
        <Link href={"/"}>
          <Button>На главную</Button>
        </Link>
      </header>
      <main>{children}</main>
    </div>
  );
}
