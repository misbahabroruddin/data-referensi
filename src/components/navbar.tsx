"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

import { UnsiaLogoWithText } from "./svg/unsia-logo-text";
import { useGetProfileUser } from "@/handlers/user/get-profile";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { SignOutIcon } from "@/components/svg/sign-out";

interface DropdownMenu {
  icon: React.ReactElement;
  label: string;
  link: string | URL;
}

export const Navbar: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const { data, isLoading } = useGetProfileUser();

  const dropdownMenu: DropdownMenu[] = [
    {
      icon: <SignOutIcon className="h-5 w-5 lg:h-6 lg:w-6" />,
      label: "Menu",
      link: `${process.env.NEXT_PUBLIC_SSO_BASE_URL}/home`,
    },
  ];
  return (
    <header className="fixed z-[11] flex h-16 w-full items-center border-b border-[#F1F1F1] bg-white p-3 drop-shadow">
      <div className="flex w-full justify-between">
        <Link
          href={"/dashboard"}
          className="flex w-60 justify-start lg:justify-center"
        >
          <UnsiaLogoWithText />
        </Link>
        <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
          <DropdownMenuTrigger asChild className="mr-2 lg:mr-6">
            <div className="flex cursor-pointer items-center gap-1">
              {isLoading ? (
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[150px]" />
                  </div>
                </div>
              ) : (
                <>
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={data?.data?.url_avatar}
                      alt={data?.data?.username}
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <p className="hidden text-base text-black lg:block">
                    {data?.data?.name}
                  </p>
                  {isDropdownOpen ? (
                    <ChevronDown
                      className="rotate-180 transition-all"
                      color="black"
                    />
                  ) : (
                    <ChevronDown className="transition-all" color="black" />
                  )}
                </>
              )}
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-1 w-[60px] rounded p-1 text-xl text-black-07 shadow lg:w-[186px]">
            {dropdownMenu.map((item: DropdownMenu, index) => (
              <Link href={item.link} key={index}>
                <DropdownMenuItem className="flex cursor-pointer gap-2 p-2 text-sm lg:p-3 lg:text-base">
                  {item.icon}
                  <p>{item.label}</p>
                </DropdownMenuItem>
              </Link>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
