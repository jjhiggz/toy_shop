import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AuthRequests } from "../api-calls/auth.requests";
import { useAuth } from "../providers/auth-provider";

interface SignupFormInputs {
  email: string;
  password: string;
  confirmPassword: string;
}

const SignupForm = () => {
  const { setUser } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignupFormInputs>();

  const onSubmit: SubmitHandler<SignupFormInputs> = (data) => {
    return Promise.resolve()
      .then(() => {
        if (data.confirmPassword !== data.password) {
          throw new Error("Passwords do not match");
        }
      })
      .then(() =>
        AuthRequests.signup({ email: data.email, password: data.password })
      )
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
      <h1>Signup</h1>
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
        <div>
          <label htmlFor="password">Password</label>
          <input
            {...register("confirmPassword")}
            type="password"
            placeholder="same as above"
          />
        </div>
        <div className="submit-wrapper">
          <input type="submit" value="submit" />
        </div>
      </form>
    </>
  );
};

export default SignupForm;
