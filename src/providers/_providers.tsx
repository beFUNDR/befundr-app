/**
 * PROVIDERS ENTRY POINT
 */

"use client";
import { Toaster } from "react-hot-toast";
import QueryProvider from "./QueryProvider";
import { LocalContextProvider } from "./LocalContextProvider";
import { SolanaProvider } from "./SolanaProvider";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SolanaProvider>
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
      </QueryProvider>
    </SolanaProvider>
  );
};
