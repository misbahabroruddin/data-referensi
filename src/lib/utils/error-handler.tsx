"use client";

import { useRouter } from "next/navigation";
import { useSession } from "../hooks/use-session";

export const useErrorHandling = () => {
  const { signOut } = useSession();

  const router = useRouter();

  const errorHandler = (error: any) => {
    if (error.response.status === 401) {
      signOut();
    } else if (error.response.status === 403) {
      router.replace(`${process.env.NEXT_PUBLIC_SSO_BASE_URL}/home`);
    } else if (error.response.status === 404) {
      throw new Error(error.response.message);
    } else if (error.response.status === 500) {
      throw new Error("Internal Server Error");
    }

    throw new Error(error.message);
  };

  return { errorHandler };
};
