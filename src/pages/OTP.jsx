import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signup } from "../services/auth";
import { resetSignupData } from "../redux/slices/authSlice";

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "../components/ui/input-otp";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const OTP = () => {
  const { signupData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [otp, setOTP] = useState("");

  // handle click function
  const handleClick = async () => {
    const response = await signup({
      name: signupData.name,
      email: signupData.email,
      password: signupData.password,
      confirmPassword: signupData.confirmPassword,
      role: signupData.role,
      otp,
    });
    if (response.success) {
      dispatch(resetSignupData());
      toast.success(response.message);
      navigate("/");
    } else {
      toast.error("Please try again");
    }
  };

  return (
    <div className="h-[90vh] w-full flex items-center justify-center">
      <Card className={"shadow-xl w-8/12 sm:w-6/12 md:w-4/12 lg:w-3/12"}>
        <CardHeader>
          <h3 className="text-2xl font-medium text-center">
            OTP <span className="text-primary">Verification</span>
          </h3>
        </CardHeader>
        <CardContent className={"flex justify-center"}>
          <InputOTP maxLength={6} value={otp} onChange={(otp) => setOTP(otp)}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </CardContent>
        <CardFooter>
          <Button className={"w-full"} onClick={handleClick}>
            Send OTP
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default OTP;
