import { useAuth } from "../providers/auth-provider";

const HomePage = () => {
  const { setToken } = useAuth();
  return (
    <div>
      <h1>Home</h1>
      <button
        onClick={() => {
          setToken(undefined);
        }}
      >
        logout
      </button>
    </div>
  );
};
export default HomePage;
