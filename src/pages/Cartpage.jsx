import { useSelector } from "react-redux";

const Cartpage = () => {
  const { cartlist } = useSelector((state) => state.cart);

  console.log("cartlist is: ", cartlist);

  return (
    <div className="min-h-screen w-full flex flex-col gap-2 px-6 nd:px-16 lg:px-24">
      <h2 className="text-2xl font-semibold">Shopping Cart</h2>
    </div>
  );
};

export default Cartpage;
