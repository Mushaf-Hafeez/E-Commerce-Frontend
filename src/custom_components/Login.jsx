import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";

import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  //   onSubmit function
  const onSubmit = (data) => {
    console.log("login data is: ", data);
    // Todo: store the data in a state and call the sendOTP api from the backend and then redirect the user to the opt-input page
    reset();
  };

  return (
    <div className="h-[90vh] w-full flex items-center justify-center">
      <Card className={"shadow-xl w-8/12 sm:w-6/12 md:w-4/12 lg:w-3/12"}>
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            // className="p-8 rounded-md shadow-md flex flex-col gap-2 w-8/12 sm:w-6/12 md:w-4/12 lg:w-3/12"
            className="rounded-md shadow-md flex flex-col gap-2"
          >
            {/* Heading of the form */}
            <div className="text-center mb-5">
              <h3 className="text-2xl font-medium">
                User <span className="text-primary">Login</span>
              </h3>
            </div>

            {/* Fields wiht labels */}
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type={"email"}
              placeholder="Enter your email"
              {...register("email", { required: true })}
            />
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type={"password"}
              placeholder="Enter your password"
              {...register("password", { required: true, minLength: 8 })}
            />
            <Button type="submit" className={"cursor-pointer"}>
              Login
            </Button>
            <Link to={"/signup"} className="text-sm text-primary">
              Don't have an account?
            </Link>
            {errors.email && (
              <span className="text-red-800 text-xs">Invalid email.</span>
            )}
            {errors.password && (
              <span className="text-red-800 text-xs">
                Password must be of 8 characters.
              </span>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
