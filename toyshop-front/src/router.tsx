import { Route, Routes } from "react-router-dom";
import RequireAuth, {
  RequireAdmin,
  RequireUnauthenticated,
} from "./components/require-auth";
import HomePage from "./routes/HomePage";
import LoginPage from "./routes/LoginPage";

const AppRouter = () => (
  <Routes>
    <Route
      path="/"
      element={
        <RequireAuth>
          <HomePage />
        </RequireAuth>
      }
    />
    <Route
      path="/login"
      element={
        <RequireUnauthenticated>
          <LoginPage />
        </RequireUnauthenticated>
      }
    />
    <Route
      path="/admin-only"
      element={
        <RequireAdmin>
          <div>only an admin can see this</div>
        </RequireAdmin>
      }
    />
  </Routes>
);

export default AppRouter;
