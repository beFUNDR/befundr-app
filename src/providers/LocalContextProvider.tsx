/**
 * LOCAL CONTEXT PROVIDER
 *
 * This provider is used to manage the local state of the application.
 */
import { createContext, useContext, useState } from "react";

// Context type
type LocalContextProviderType = {
  isGameOngoing: boolean;
  setIsGameOngoing: (isGameOngoing: boolean) => void;
};

// Create the default context
const LocalContext = createContext<LocalContextProviderType>({
  isGameOngoing: false,
  setIsGameOngoing: () => {},
});

// Create a provider for the context
export const LocalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isGameOngoing, setIsGameOngoing] = useState(false);

  return (
    <LocalContext.Provider value={{ isGameOngoing, setIsGameOngoing }}>
      {children}
    </LocalContext.Provider>
  );
};

// Custom hook to use the local context
export const useLocalContext = () => {
  return useContext(LocalContext);
};
