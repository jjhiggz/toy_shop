import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import useLocalStorage from "../hooks/use-local-storage";
import { TUser } from "../types/user.type";

export type AuthState = "loggedIn" | "loggedOut" | "loading";

export interface AuthProviderProps {
  state: AuthState;
  email?: string;
  setUser: Dispatch<SetStateAction<TUser | undefined>>;
  user: TUser | undefined;
}

const defaultAuthState: AuthProviderProps = {
  state: "loggedOut",
  setUser: () => {},
  user: undefined,
};

const AuthContext = createContext<AuthProviderProps>(defaultAuthState);

export const AuthProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [user, setUser] = useLocalStorage("user");

  const [authState, setAuthState] = useState<AuthState>(
    user ? "loading" : "loggedOut"
  );

  const [email, setEmail] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!user) {
      setAuthState("loggedOut");
      return;
    }
    if (user) {
      setAuthState("loggedIn");
    }
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user: user as any as TUser,
        state: authState,
        email,
        setUser: setUser as Dispatch<SetStateAction<TUser | undefined>>,
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
