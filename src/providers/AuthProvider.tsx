import { createContext, useContext, useEffect, useRef, useState } from "react";
import { onAuthStateChanged, User, signOut } from "firebase/auth";
import { useWallet } from "@solana/wallet-adapter-react";
import { auth } from "@/shared/utils/firebase-client";
import { signInWithSolana } from "@/shared/utils/sign-in-with-solana";

/**
 * Defines the shape of the authentication context value
 */
type AuthContextType = {
  user: User | null; // Currently authenticated Firebase user, or null if none
  loading: boolean; // Loading state during auth initialization
  refreshAuth: () => Promise<void>; // Function to refresh the current user’s Firebase token
};

/**
 * React context to provide auth state and methods to components
 */
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  refreshAuth: async () => {},
});

/**
 * AuthProvider component wraps the app and manages Firebase authentication state,
 * including integration with Solana wallet sign-in via SIWS (Sign In With Solana).
 */
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // Local state for Firebase user and loading indicator
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Ref to prevent duplicate SIWS attempts during component lifecycle
  const hasAttemptedSIWS = useRef(false);

  // Wallet state/hooks from @solana/wallet-adapter-react
  const { publicKey, connected, signIn, disconnect } = useWallet();

  /**
   * Listen for Firebase auth state changes and update user/loading accordingly.
   * Subscribes on mount, unsubscribes on unmount.
   */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      console.log("Firebase user changed:", firebaseUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  /**
   * Trigger Sign In With Solana (SIWS) flow when wallet is connected,
   * user is not authenticated, and SIWS was not already attempted.
   */
  useEffect(() => {
    if (loading || !signIn) return; // Wait for Firebase to finish loading and ensure signIn is available

    if (!connected || !publicKey || user || hasAttemptedSIWS.current) return; // Preconditions not met

    const signInFunc = async () => {
      hasAttemptedSIWS.current = true; // Mark SIWS attempt in progress
      try {
        await signInWithSolana(signIn, publicKey); // Perform SIWS sign-in
      } catch (error: any) {
        disconnect(); // If sign-in fails, disconnect the wallet to reset state
      }
      hasAttemptedSIWS.current = false; // Reset attempt flag
    };

    signInFunc();
  }, [connected, publicKey, user, loading]);

  /**
   * Monitor changes to user or wallet publicKey to handle sign-out logic.
   * Signs out if the Firebase user UID doesn’t match the current wallet publicKey.
   */
  useEffect(() => {
    if (!user) return;

    if (publicKey && user.uid !== publicKey.toString()) {
      signOut(auth); // Sign out from Firebase when wallet changes
    }
  }, [connected, publicKey, user]);

  /**
   * Function to refresh the Firebase ID token forcefully.
   * Can be called to ensure the client has a fresh token.
   */
  const refreshAuth = async () => {
    if (auth.currentUser) await auth.currentUser.getIdToken(true);
  };

  // Provide user, loading state, and refreshAuth method via context
  return (
    <AuthContext.Provider value={{ user, loading, refreshAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook to access the authentication context easily from components
 */
export const useAuth = () => useContext(AuthContext);
