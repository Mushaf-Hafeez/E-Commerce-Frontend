import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import Spinner from "../custom_components/Spinner";
import { CircleCheck } from "lucide-react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { checkPaymentStatus } from "../services/order";
import { setCart } from "../redux/slices/cartSlice";
import { useDispatch } from "react-redux";

const Successpage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const checkStatus = async () => {
    setIsLoading(true);
    const response = await checkPaymentStatus(searchParams.get("session_id"));
    setIsLoading(false);
    if (response.success) {
      dispatch(setCart([]));
      localStorage.setItem("cart", JSON.stringify([]));
    } else {
      navigate("/payment/cancel");
    }
  };

  useEffect(() => {
    checkStatus();
  }, []);

  return (
    <div className="w-full h-[90vh] flex items-center justify-center ">
      {isLoading ? (
        <Spinner />
      ) : (
        <Card className={"w-3/12"}>
          <CardHeader className={"Flex justify-center"}>
            <CircleCheck size={"96"} />
          </CardHeader>
          <CardContent>
            <CardDescription className={"flex justify-center"}>
              Your payment has been completed.
            </CardDescription>
            <Button className={"w-full mt-4"} asChild>
              <Link to="/products">Finish</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Successpage;
