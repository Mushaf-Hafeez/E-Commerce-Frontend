import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { CircleCheck } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect } from "react";

const Successpage = () => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    console.log("session id: ", searchParams.get("session_id"));
  }, []);

  return (
    <div className="w-full h-[90vh] flex items-center justify-center ">
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
    </div>
  );
};

export default Successpage;
