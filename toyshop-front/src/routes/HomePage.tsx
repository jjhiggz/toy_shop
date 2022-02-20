import { useAuth } from "../providers/auth-provider";

const HomePage = () => {
  const { setUser, user } = useAuth();
  return (
    <div>
      <h1>Welcome to the Toy Shop {user?.email}</h1>
      <button
        onClick={() => {
          setUser(undefined);
        }}
      >
        logout
      </button>
    </div>
  );
};
export default HomePage;
