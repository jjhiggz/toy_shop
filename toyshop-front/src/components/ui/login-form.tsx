import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AuthRequests } from "../../api-calls/auth.requests";
import { useAuth } from "../../providers/auth-provider";

interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginForm = () => {
  const { setUser } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    return AuthRequests.login({ email: data.email, password: data.password })
      .then((user) => {
        setUser(user);
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => {
        reset();
      });
  };

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email">Email</label>
          <input {...register("email")} placeholder="xxx@xx.com" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            {...register("password")}
            type="password"
            placeholder="password"
          />
        </div>
        <div className="submit-wrapper">
          <input type="submit" value="submit" />
        </div>
      </form>
    </>
  );
};

export default LoginForm;
