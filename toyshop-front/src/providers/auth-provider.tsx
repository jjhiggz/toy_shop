import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import useLocalStorage from "../hooks/use-local-storage";

export type AuthState = "loggedIn" | "loggedOut" | "loading";

export interface AuthProviderProps {
  state: AuthState;
  email?: string;
  setToken: Dispatch<SetStateAction<string | undefined>>;
}

const defaultAuthState: AuthProviderProps = {
  state: "loggedOut",
  setToken: () => {},
};

const AuthContext = createContext<AuthProviderProps>(defaultAuthState);

export const AuthProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [token, setToken] = useLocalStorage("token");

  const [authState, setAuthState] = useState<AuthState>(
    token ? "loading" : "loggedOut"
  );

  const [email, setEmail] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!token) {
      setAuthState("loggedOut");
      return;
    }
    if (token) {
      setAuthState("loggedIn");
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        state: authState,
        email,
        setToken: setToken as Dispatch<SetStateAction<string | undefined>>,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
