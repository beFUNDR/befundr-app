import { getAuth } from "firebase/auth";

/**
 * Configuration options for the fetcher utility.
 */
export type FetcherOptions = {
  /**
   * HTTP method (GET, POST, PATCH, PUT, DELETE).
   * Defaults to "GET".
   */
  method?: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

  /**
   * Request body params (will be stringified).
   */
  bodyParams?: Record<string, unknown>;

  /**
   * Additional headers to include in the request.
   */
  headers?: Record<string, string>;

  /**
   * Whether to automatically include the Firebase auth token in the request.
   * Defaults to true.
   */
  withAuth?: boolean;
};

/**
 * A generic fetch utility with automatic Firebase Auth token injection.
 * Intended for use on the client side in Firebase-enabled apps.
 *
 * @template TResponse - Expected response type
 * @param url - The endpoint URL to fetch
 * @param options - Optional fetch configuration
 * @returns A parsed JSON response of type TResponse
 *
 * @example
 * ```ts
 * const data = await fetcher("/api/user/profile", {
 *   method: "POST",
 *   body: { userId: "abc123" },
 * });
 * ```
 */
export const fetcher = async <TResponse = any>(
  url: string,
  {
    method = "GET",
    bodyParams,
    headers = {},
    withAuth = true,
  }: FetcherOptions = {}
): Promise<TResponse> => {
  let token: string | undefined = undefined;

  if (withAuth) {
    const auth = getAuth();
    const user = auth.currentUser;

    // Retrieve the Firebase ID token if user is authenticated
    token = user ? await user.getIdToken() : undefined;
  }

  const finalHeaders: HeadersInit = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...headers,
  };

  const response = await fetch(url, {
    method,
    headers: finalHeaders,
    ...(bodyParams ? { body: JSON.stringify(bodyParams) } : {}),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(
      `[fetcher] ${method} ${url} → ${response.status}: ${errorText}`
    );
    throw new Error(`Fetch error ${response.status}: ${response.statusText}`);
  }

  try {
    return await response.json();
  } catch {
    return {} as TResponse;
  }
};
