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

function HeaderBlock() {
  const router = useRouter();
  const pathname = usePathname();

  const logout = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_URL_PATH}/api/auth/logout`, {
      method: "DELETE",
    });
    redirect(RoutePath_E.AUTH);
  };
  return (
    <header className="flex justify-between items-center py-6">
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => router.back()}
      >
        {/* TODO: Когда задеплою глянуть норм ли переходит */}
        {pathname !== "/" && <Icon name="ArrowBigLeft" />}
        <h1>
          Привет, <span>Сергей</span>
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
}

export default HeaderBlock;
