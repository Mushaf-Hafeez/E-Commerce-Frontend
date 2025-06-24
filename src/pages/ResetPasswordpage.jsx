import { Card, CardHeader, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { resetPassword } from "../services/auth";

const ResetPasswordpage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useNavigate();

  const { id } = useParams();

  // onSubmit function
  const onSubmit = async (data) => {
    const response = await resetPassword(id, {
      password: data.password,
      confirmPassword: data.confirmPassword,
    });
    if (response.success) {
      toast.success(response.message);
      reset();
      navigate("/login");
    } else {
      toast.error(response.message);
    }
  };

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
            <Label htmlFor={"password"}>Password</Label>
            <Input
              type="password"
              id="password"
              placeholder="Enter password"
              {...register("password", { required: true, minLength: 8 })}
            />
            <Label htmlFor={"confirmPassword"}>Confirm password</Label>
            <Input
              type="password"
              id="confirmPassword"
              placeholder="Enter confirm password"
              {...register("confirmPassword", { required: true, minLength: 8 })}
            />
            <Button type="submit" className={"cursor-pointer"}>
              Submit
            </Button>
            {errors.password && (
              <span className="text-red-800 text-xs">
                Password must be of atleast 8 characters
              </span>
            )}
            {errors.confirmPassword && (
              <span className="text-red-800 text-xs">
                Password must be of atleast 8 characters
              </span>
            )}
          </CardContent>
        </form>
      </Card>
    </div>
  );
};

export default ResetPasswordpage;
