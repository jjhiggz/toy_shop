import { AuthState, useAuth } from "./providers/auth-provider";
import HomePage from "./routes/HomePage";
import LoadingPage from "./routes/LoadingPage";
import LoginPage from "./routes/LoginPage";

const AppRouter = () => {
  const { state: authState } = useAuth();

  return (
    <>
      {authState === "loading" && <LoadingPage />}
      {authState === "loggedOut" && <LoginPage />}
      {authState === "loggedIn" && <HomePage />}
    </>
  );
};

export default AppRouter;
