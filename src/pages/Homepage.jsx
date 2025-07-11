import { useSelector } from "react-redux";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Homepage = () => {
  const { cartlist } = useSelector((state) => state.cart);

  // useEffect(() => {
  //   console.log("cart is: ", cartlist);
  // }, []);

  return (
    <section className="h-[90vh] w-full flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <Button
          className={
            "bg-zinc-200 hover:bg-zinc-300 text-zinc-900 dark:text-zinc-100 dark:bg-zinc-900 dark:hover:bg-zinc-800 rounded-full"
          }
          asChild
        >
          <Link to={"/products"}>
            Browse products <ArrowRight />
          </Link>
        </Button>
        <h2 className="text-primary text-4xl font-semibold">
          Built to Perform. Designed for Precision.
        </h2>
        <p className="w-5/12 text-center">
          Shop premium keyboards, mouses, and mousepads — engineered for
          comfort, speed, and accuracy. Sign in to explore curated collections
          and personalized deals.
        </p>
        <div className="flex items-center gap-2">
          <Button className={"font-semibold"} asChild>
            <Link to="/login">Get Started</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Homepage;
