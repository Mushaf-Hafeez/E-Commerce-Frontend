import { useEffect } from "react";
import { useSelector } from "react-redux";

const Homepage = () => {
  const { cartlist } = useSelector((state) => state.cart);

  // useEffect(() => {
  //   console.log("cart is: ", cartlist);
  // }, []);

  return (
    <div className="h-full w-full">{import.meta.env.VITE_BACKEND_URL}</div>
  );
};

export default Homepage;
