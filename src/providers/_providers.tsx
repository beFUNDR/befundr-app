/**
 * PROVIDERS ENTRY POINT
 */

"use client";
import { Toaster } from "react-hot-toast";
import QueryProvider from "./QueryProvider";
import { LocalContextProvider } from "./LocalContextProvider";
import { SolanaProvider } from "./SolanaProvider";
import { AuthProvider } from "./AuthProvider";
import dynamic from "next/dynamic";

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
