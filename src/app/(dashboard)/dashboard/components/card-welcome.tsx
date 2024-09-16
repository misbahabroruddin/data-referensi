"use client";

import { useEffect, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetProfileUser } from "@/handlers/user/get-profile";

export const CardWelcome = () => {
  const date = new Date();
  const hour = date.getHours();
  const [greeting, setGreeting] = useState<string>("Halo");
  const { data, isLoading } = useGetProfileUser();

  useEffect(() => {
    if (hour < 12) {
      setGreeting("Selamat Pagi");
    } else if (hour >= 12 && hour <= 15) {
      setGreeting("Selamat Siang");
    } else if (hour <= 18) {
      setGreeting("Selamat Sore");
    } else if (hour > 18 && hour < 23) {
      setGreeting("Selamat Malam");
    } else {
      setGreeting("Halo");
    }
  }, [greeting]);

  return isLoading ? (
    <div className="flex h-40 items-center gap-6 rounded-2xl bg-gray-300 px-4 py-7">
      <Skeleton className="h-[102px] w-[102px] rounded-full bg-white" />
      <div className="flex flex-col gap-2 text-[26px] font-[500] text-white">
        <Skeleton className="h-[30px] w-[156px] rounded-lg bg-gray-200" />
        <Skeleton className="h-[30px] w-[156px] rounded-lg bg-gray-200" />
      </div>
    </div>
  ) : (
    <div className="flex h-24 items-center gap-6 rounded-2xl bg-gradient-to-r from-[#10487A] to-[#3EC9D6] px-4 py-7 lg:h-40">
      <Avatar className="h-12 w-12 rounded-full bg-white lg:h-[102px] lg:w-[102px]">
        <AvatarImage src={data?.data?.url_avatar} alt={"Profil"} />
        <AvatarFallback>Profil</AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-2 text-base font-[500] text-white lg:text-[26px]">
        <p>{greeting},</p>
        <p>{data?.data?.name}</p>
      </div>
    </div>
  );
};
