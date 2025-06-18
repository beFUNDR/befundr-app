/**
 * PROVIDERS ENTRY POINT
 */

"use client";
import { Toaster } from "react-hot-toast";

import dynamic from "next/dynamic";
import { AuthProvider } from "@/providers/AuthProvider";
import { LocalContextProvider } from "@/providers/LocalContextProvider";
import QueryProvider from "@/providers/QueryProvider";
import { SolanaProvider } from "@/providers/SolanaProvider";

const ReactQueryDevtools = dynamic(() =>
  import("@tanstack/react-query-devtools").then((mod) => mod.ReactQueryDevtools)
);

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SolanaProvider>
      <AuthProvider>
        <QueryProvider>
          <LocalContextProvider>
            {children}
            <Toaster
              position="bottom-center"
              toastOptions={{
                style: {
                  background: "#171717",
                  color: "#fff",
                },
              }}
            />
          </LocalContextProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryProvider>
      </AuthProvider>
    </SolanaProvider>
  );
};
