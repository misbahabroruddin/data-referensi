"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Spinner } from "@/components/ui/spinner";
import { useSession } from "@/lib/hooks/use-session";

export default function Home() {
  const searchParam = useSearchParams();
  const { setToken, setRole, setApp } = useSession();
  const router = useRouter();

  const token = searchParam.get("key");
  const role = searchParam.get("role");
  const app = searchParam.get("app");
  useEffect(() => {
    setToken(token as string);
    setRole(role as string);
    setApp(app as string);

    if (token && role && app) {
      router.push("/dashboard");
    } else {
      window.location.href = `${process.env.NEXT_PUBLIC_SSO_BASE_URL}/backend/login`;
    }
  }, [searchParam]);

  return (
    <div className="grid h-dvh w-screen place-items-center">
      <Spinner />
    </div>
  );
}
