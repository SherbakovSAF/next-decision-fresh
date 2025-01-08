"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { RoutePath_E } from "@/types/route-path.type";
import Link from "next/link";
import { redirect, usePathname, useRouter } from "next/navigation";
import Icon from "../ui/icon";
import { signOutService } from "@/services/auth.service";
import { UserMinDTO_I } from "@/types/user.types";
import { useUserStore } from "@/stores/user.store";
import { useEffect } from "react";
import { getUserName } from "@/lib/parse-date.lib";

interface HeaderBlockProps {
  initialUser: UserMinDTO_I;
}

const HeaderBlock: React.FC<HeaderBlockProps> = ({ initialUser }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, setUser } = useUserStore();

  useEffect(() => setUser(initialUser), [initialUser, setUser]);

  const logout = async () =>
    signOutService().then(() => redirect(RoutePath_E.AUTH));

  return (
    <header className="flex justify-between items-center py-6">
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => router.back()}
      >
        {/* TODO: Когда задеплою глянуть норм ли переходит */}
        {pathname !== "/" && <Icon name="ArrowBigLeft" />}
        <h1>
          Привет, <span>{getUserName(user)}</span>
        </h1>
      </div>

      <div className="flex gap-1">
        <TooltipProvider delayDuration={5}>
          <Tooltip>
            <TooltipTrigger>
              <Link href={"/settings"}>
                <Button className="p-2" size="icon" asChild>
                  <Icon name="Settings" />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>Настройки</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider delayDuration={5}>
          <Tooltip>
            <TooltipTrigger>
              <Button
                className="p-2"
                size="icon"
                asChild
                onClick={() => logout()}
              >
                <Icon name="LogOut" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Выйти</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </header>
  );
};

export default HeaderBlock;
