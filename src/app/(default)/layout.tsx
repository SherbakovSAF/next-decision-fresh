import HeaderBlock from "@/components/blocks/header.block";
import { getCurrentUserService } from "@/services/user.service";
import { UserMinDTO_I } from "@/types/user.types";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Decision App | Главная",
};

export default async function DefaultLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let user: UserMinDTO_I | null = null;

  try {
    user = await getCurrentUserService();
    return (
      <div className="pb-20">
        <HeaderBlock initialUser={user} />
        {children}
      </div>
    );
  } catch {
    return <div>Ошибка. Next калл</div>;
  }
}
