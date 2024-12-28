import { Button } from "@/components/ui/button";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Настройки",
  description:
    "- Я просил купить специальный малярный скотч !- Ой, как будто малярам не все равно что пить...",
};

export default function SettingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="py-10 h-dvh">
      <header className="mb-10">
        <Link href={"/"}>
          <Button>На главную</Button>
        </Link>
      </header>
      <main className="flex justify-center items-center ">{children}</main>
    </div>
  );
}
