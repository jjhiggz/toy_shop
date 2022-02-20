import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AuthRequests } from "../api-calls/auth.requests";
import { useAuth } from "../providers/auth-provider";

interface SigninFormInputs {
  email: string;
  password: string;
}

const SigninForm = () => {
  const { setToken } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SigninFormInputs>();

  const onSubmit: SubmitHandler<SigninFormInputs> = (data) => {
    return AuthRequests.login({ email: data.email, password: data.password })
      .then((data) => {
        setToken(data.token);
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => {
        reset();
      });
  };

  return (
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
  );
};

export default SigninForm;
