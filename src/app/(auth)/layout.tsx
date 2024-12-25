import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Авторизация",
  description:
    "- Я просил купить специальный малярный скотч !- Ой, как будто малярам не все равно что пить...",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex justify-center items-center h-dvh">
      <div className="bg-primary-foreground p-4 rounded-lg max-w-screen-sm w-[90%]">
        {children}
      </div>
    </main>
  );
}
