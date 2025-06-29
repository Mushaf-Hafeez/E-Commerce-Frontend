import { useDispatch, useSelector } from "react-redux";

import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "../components/ui/table";
import { CircleX } from "lucide-react";
import { removeProductFromCart } from "../redux/slices/cartSlice";
import { removeFromCart } from "../services/cart";
import toast from "react-hot-toast";

const Cartpage = () => {
  const { cartlist } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // Todo: implement onclick functionality
  const remove = async (productId) => {
    dispatch(removeProductFromCart({ productId }));
    localStorage.setItem("cart", JSON.stringify(cartlist));
    const response = await removeFromCart(productId._id);
    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col gap-2 px-6 nd:px-16 lg:px-24">
      <div className="flex items-baseline gap-2">
        <h2 className="text-2xl font-semibold">Shopping Cart</h2>
        <p className="text-primary">{cartlist.length} items</p>
      </div>
      <div className="h-full w-full flex flex-col items-center md:flex-row md:justify-between gap-2">
        <Table>
          <TableHeader className={"border-b border-zinc-700"}>
            <TableRow>
              <TableHead>Product Details</TableHead>
              <TableHead>Subtotal</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cartlist &&
              cartlist.length > 0 &&
              cartlist.map((item, index) => (
                <TableRow key={index} className={"border-b border-zinc-700"}>
                  <TableCell className={"flex gap-2"}>
                    <img
                      src={item.productId.productImages[0]}
                      alt="product image"
                      className="size-20 object-cover rounded-md"
                    />
                    <div className="flex flex-col gap-1">
                      <h2 className="text-lg font-semibold">
                        {item.productId.name}
                      </h2>
                      <p className="text-md text-zinc-400">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>{item.amount}</TableCell>
                  <TableCell>
                    <CircleX
                      onClick={() => remove(item.productId)}
                      color="red"
                      className="cursor-pointer"
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>

        {/* Todo: here the form will be added to place the order */}
        {/* <div>right</div> */}
      </div>
    </div>
  );
};

export default Cartpage;
