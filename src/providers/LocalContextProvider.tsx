/**
 * LOCAL CONTEXT PROVIDER
 *
 * This provider is used to manage the local state of the application.
 */
import { createContext, useContext, useState } from "react";

// Context type
type LocalContextProviderType = {
  user: User | null;
  setUser: (user: User) => void;
};

// Create the default context
const LocalContext = createContext<LocalContextProviderType>({
  user: null,
  setUser: () => {},
});

// Create a provider for the context
export const LocalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <LocalContext.Provider value={{ user, setUser }}>
      {children}
    </LocalContext.Provider>
  );
};

// Custom hook to use the local context
export const useLocalContext = () => {
  return useContext(LocalContext);
};
