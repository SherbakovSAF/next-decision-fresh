import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Decision App | Авторизация",
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
