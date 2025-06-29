import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

import { useForm, Controller } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { setSignupData } from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { sendOTP } from "../services/auth";

const Signup = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    watch,
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //   onSubmit function
  const onSubmit = async (data) => {
    if (!watch("role")) {
      return toast.error("Select a role");
    }
    if (watch("password") !== watch("confirmPassword")) {
      return toast.error("Passwords are not same");
    }
    dispatch(setSignupData(data));
    const response = await sendOTP(data.email);
    if (response.success) {
      toast.success(response.message);
      reset();
      navigate("/otp-verification");
    } else {
      toast.error(response.message);
    }
  };

  return (
    <div className="h-[90vh] w-full flex items-center justify-center">
      <Card className={"shadow-xl w-8/12 sm:w-6/12 md:w-4/12 lg:w-3/12"}>
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="rounded-md shadow-md flex flex-col gap-2"
          >
            {/* Heading of the form */}
            <div className="text-center mb-5">
              <h3 className="text-2xl font-medium">
                User <span className="text-primary">Signup</span>
              </h3>
            </div>

            {/* Fields wiht labels */}
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type={"text"}
              placeholder="Enter your name"
              {...register("name", { required: true, maxLength: 25 })}
            />
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
            <Label htmlFor="confirmPassword">Confirm password</Label>
            <Input
              id="confirmPassword"
              type={"password"}
              placeholder="Enter confirm password"
              {...register("confirmPassword", { required: true, minLength: 8 })}
            />
            <div className="flex items-center justify-between">
              <Label htmlFor="role">Role</Label>
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-[90px]">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Role</SelectLabel>
                        <SelectItem value="buyer">Buyer</SelectItem>
                        <SelectItem value="seller">Seller</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <Button type="submit" className={"cursor-pointer"}>
              Create an account
            </Button>
            <Link to="/login" className="text-sm text-primary">
              Already have an account?
            </Link>
            {errors.email && (
              <span className="text-red-800 text-xs">Invalid email.</span>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
