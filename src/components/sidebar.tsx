"use client";

import { useEffect, useState, Fragment } from "react";
import Link from "next/link";
import { usePathname, useSelectedLayoutSegments } from "next/navigation";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { useSidebar } from "@/lib/hooks/use-sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { ChevronLeftIcon } from "./svg/chevron-left";
import { useGetSidebarMenu } from "@/handlers/menu/get-sidebar-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import { Skeleton } from "./ui/skeleton";

export const Sidebar = () => {
  const [isHover, setIsHover] = useState<boolean>(false);
  const [appId, setAppId] = useState<string | null>(null);
  const [open, setOpen] = useState<string | null>(null);

  const { isSidebarExpand, toggleSidebar } = useSidebar();

  const { data, isLoading } = useGetSidebarMenu(appId!);

  const sidebarMenu = data?.data;

  const pathname = usePathname();
  const page = useSelectedLayoutSegments();

  useEffect(() => {
    const app = localStorage.getItem("app");

    if (app) setAppId(app);
  }, []);

  useEffect(() => {
    if (pathname.includes("/wilayah")) {
      return setOpen("/wilayah");
    } else if (pathname.includes("/biodata")) {
      return setOpen("/biodata");
    } else if (pathname.includes("/mahasiswa")) {
      return setOpen("/mahasiswa");
    } else if (pathname.includes("/seleksi")) {
      return setOpen("/seleksi");
    } else if (pathname.includes("/pendaftaran")) {
      return setOpen("/pendaftaran");
    } else if (pathname.includes("/berita")) {
      return setOpen("/berita");
    } else if (pathname.includes("/jabatan")) {
      return setOpen("/jabatan");
    } else if (pathname.includes("/dokumen")) {
      return setOpen("/dokumen");
    } else if (pathname.includes("/sippm")) {
      return setOpen("/sippm");
    } else if (pathname.includes("/marketing")) {
      return setOpen("/marketing");
    }

    setOpen(null);
  }, [pathname]);

  return (
    <aside
      className={cn(
        "fixed bottom-0 left-0 top-0 z-10 hidden min-h-dvh w-64 bg-blue-05 transition-all duration-300 lg:block",
        isSidebarExpand ? "w-64" : "w-[72px]",
      )}
    >
      <div className="mt-20 flex w-full flex-col items-center justify-center px-3">
        <button
          className={cn(
            "absolute -right-5 top-36 z-10 grid h-10 w-10 place-items-center rounded-full border-[2px] border-blue-05 bg-white",
            isHover && "border-white bg-blue-05",
          )}
          onMouseOver={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          onClick={toggleSidebar}
        >
          <ChevronLeftIcon
            color={isHover ? "white" : "#10487A"}
            className={cn(
              "transition-all",
              isSidebarExpand ? "rotate-0" : "rotate-180",
            )}
          />
        </button>
        <div className="flex w-full flex-col gap-2">
          <ul
            className={cn(
              "flex flex-col gap-2 transition-all duration-500",
              !isSidebarExpand && "items-center",
            )}
          >
            {isLoading
              ? Array.from({ length: 12 }).map((_, index) => (
                  <Fragment key={index}>
                    <Skeleton className="mt-2 h-9 w-full rounded-lg bg-sky-03" />
                  </Fragment>
                ))
              : sidebarMenu?.map((menu: any) =>
                  menu.children.length ? (
                    isSidebarExpand ? (
                      <li key={menu.path}>
                        <button
                          className={`mt-2 flex w-full items-center justify-between gap-2 rounded-lg p-2 text-white hover:bg-sky-03 ${
                            page.includes(menu.path?.slice(1)) ||
                            pathname === menu.path
                              ? "bg-sky-03"
                              : null
                          }`}
                          onClick={() => {
                            setOpen(open === menu.path ? null : menu.path);
                          }}
                        >
                          <div className="flex items-center gap-2">
                            <Image
                              src={menu.icon}
                              width={24}
                              height={24}
                              alt={menu.label}
                              className="h-6 w-6"
                            />
                            {isSidebarExpand ? (
                              <p className="text-sm font-[500]">{menu.label}</p>
                            ) : null}
                          </div>
                          {isSidebarExpand ? (
                            <ChevronLeftIcon
                              className={cn(
                                "-rotate-180 transition-all",
                                open === menu.path ? "-rotate-90" : "",
                              )}
                              color="white"
                            />
                          ) : null}
                        </button>
                        <ul
                          className={cn(
                            "ease-in-ou mt-1 flex flex-col gap-1 overflow-hidden transition duration-500",
                            open === menu.path
                              ? "h-auto transition-transform"
                              : "h-0 transition-transform",
                          )}
                        >
                          {menu.children.map((child: any) => (
                            <li
                              key={child.path}
                              className="pl-4 transition-transform"
                            >
                              <Link
                                href={child.path}
                                className={`flex items-center gap-2 rounded-lg p-2 text-white hover:bg-sky-03 ${
                                  page.includes(child.path?.slice(1)) ||
                                  pathname === child.path ||
                                  pathname === `${child.path}/trash`
                                    ? "bg-sky-03"
                                    : null
                                }`}
                              >
                                <Image
                                  src={child.icon}
                                  width={24}
                                  height={24}
                                  alt={child.label}
                                />
                                <p className="text-sm font-[500]">
                                  {child.label}
                                </p>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                    ) : (
                      <NavigationMenu orientation="horizontal" key={menu.path}>
                        <NavigationMenuList>
                          <NavigationMenuItem>
                            <NavigationMenuTrigger
                              className={`flex w-full items-center justify-between gap-2 rounded-lg p-2 text-white hover:bg-sky-03 ${
                                page.includes(menu.path?.slice(1)) ||
                                pathname === menu.path ||
                                pathname === `${menu.path}/trash`
                                  ? "bg-sky-03"
                                  : null
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <Image
                                  src={menu.icon}
                                  width={24}
                                  height={24}
                                  alt={menu.label}
                                  className="h-6 w-6"
                                />
                              </div>
                            </NavigationMenuTrigger>
                            <NavigationMenuContent className="flex flex-col gap-1 border-blue-05 bg-blue-05 dark:border-none md:w-[250px]">
                              {menu.children.map((child: any) => (
                                <div
                                  key={child.path}
                                  className="transition-transform"
                                >
                                  <Link
                                    href={child.path}
                                    className={`flex items-center gap-2 rounded-lg p-2 text-white hover:bg-sky-03 ${
                                      page.includes(child.path?.slice(1)) ||
                                      pathname === child.path ||
                                      pathname === `${child.path}/trash`
                                        ? "bg-sky-03"
                                        : null
                                    }`}
                                  >
                                    <Image
                                      src={child.icon}
                                      width={24}
                                      height={24}
                                      alt={child.label}
                                    />
                                    <p className="text-sm font-[500]">
                                      {child.label}
                                    </p>
                                  </Link>
                                </div>
                              ))}
                            </NavigationMenuContent>
                          </NavigationMenuItem>
                        </NavigationMenuList>
                      </NavigationMenu>
                    )
                  ) : (
                    <TooltipProvider key={menu.path}>
                      <Tooltip>
                        <TooltipTrigger>
                          <li key={menu.path} className="transition-transform">
                            <Link
                              href={menu.path}
                              className={`flex items-center gap-2 rounded-lg p-2 text-white hover:bg-sky-03 ${
                                page.includes(menu.path?.slice(1)) ||
                                pathname === menu.path ||
                                pathname === `${menu.path}/trash`
                                  ? "bg-sky-03"
                                  : null
                              }`}
                            >
                              <Image
                                src={menu.icon}
                                width={24}
                                height={24}
                                alt={menu.label}
                                className="h-6 w-6"
                              />
                              {isSidebarExpand ? (
                                <p className="text-sm font-[500]">
                                  {menu.label}
                                </p>
                              ) : (
                                <TooltipContent
                                  side="right"
                                  sideOffset={6}
                                  className="font-semibold"
                                >
                                  {menu.label}
                                </TooltipContent>
                              )}
                            </Link>
                          </li>
                        </TooltipTrigger>
                      </Tooltip>
                    </TooltipProvider>
                  ),
                )}
          </ul>
        </div>
      </div>
    </aside>
  );
};
