import { cache } from "react";
import { QueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const STALE_TIME = 1000 * 60 * 1; // 1 minutes

export const queryClientConfig = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: STALE_TIME,
    },
    mutations: {
      onError: (error: Error) => {
        toast.error(error.message || "Something went wrong");
      },
    },
  },
};

export const getQueryClient = cache(() => new QueryClient(queryClientConfig));
