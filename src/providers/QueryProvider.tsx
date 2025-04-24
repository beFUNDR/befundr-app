/**
 * QUERY PROVIDER
 *
 * This provider is used to manage the server state of the application.
 * It is used to fetch and mutate data from the solana blockchain and a potential data base.
 */
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProvider;
