import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { CircleX } from "lucide-react";
import { Link } from "react-router-dom";

const Cancelpage = () => {
  return (
    <div className="w-full h-[90vh] flex items-center justify-center">
      <Card className={"w-3/12"}>
        <CardHeader className={"Flex justify-center"}>
          <CircleX size={"96"} />
        </CardHeader>
        <CardContent>
          <CardDescription className={"flex justify-center"}>
            Transaction Failed.
          </CardDescription>
          <Button className={"w-full mt-4"} asChild>
            <Link to={"/cart"}>Go Back</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Cancelpage;
