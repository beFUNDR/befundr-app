import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import toast from "react-hot-toast";

/**
 * QueryProvider Component
 *
 * Provides a React Query context to manage the server state throughout the application.
 * It configures a custom QueryClient that handles query and mutation caching,
 * error handling, and integrates with the Solana blockchain and a potential database.
 *
 * Error Handling:
 * - Displays toast notifications when queries or mutations encounter an error.
 * - Logs errors to the console with contextual information.
 * - If a mutation has a custom `onError` handler defined, the default toast is not shown.
 *
 * @param children - The React child components that will have access to the React Query context.
 *
 * @returns A React Query context provider that wraps its children with the configured QueryClient.
 */
const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5,
        retry: 1,
        refetchOnWindowFocus: false,
      },
    },
    queryCache: new QueryCache({
      onError: (error, query) => {
        console.error("[React Query]Error in query", query.queryKey, error);
        toast.error(
          `There was an error performing the query: ${error.message}`
        );
      },
    }),
    mutationCache: new MutationCache({
      onError: (error, vars, ctx, mutation) => {
        if (mutation.options.onError) return;
        console.error(
          "[React Query]Error in mutation",
          mutation.options.mutationKey,
          error
        );
        toast.error(
          `There was an error performing the mutation: ${error.message}`
        );
      },
    }),
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProvider;
