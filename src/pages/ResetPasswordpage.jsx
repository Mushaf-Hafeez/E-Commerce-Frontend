import {
  Card,
  CardHeader,
  CardFooter,
  CardContent,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ResetPasswordpage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useNavigate();

  return (
    <div className="h-[90vh] w-full flex items-center justify-center">
      <Card className="shadow-xl w-8/12 sm:w-6/12 md:w-4/12 lg:w-3/12">
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader className="text-center mb-5">
            <h3 className="text-2xl font-medium">
              Reset <span className="text-primary">Password</span>
            </h3>
          </CardHeader>
          <CardContent className={"flex flex-col gap-2"}>
            <Label htmlFor={"email"}>Email</Label>
            <Input
              type="email"
              id="email"
              placeholder="Enter your email"
              {...register("email", { required: true })}
            />
            <Button type="submit" className={"cursor-pointer"}>
              Submit
            </Button>
            {errors.email && (
              <span className="text-red-800 text-xs">Invalid email.</span>
            )}
          </CardContent>
          <CardFooter>
            <Link
              to={-1}
              className="flex items-center cursor-pointer text-sm mt-2 text-primary"
            >
              <ChevronLeft size={"18"} /> Go back
            </Link>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default ResetPasswordpage;
