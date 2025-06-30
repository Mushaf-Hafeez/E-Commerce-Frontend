import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Star } from "lucide-react";
import { Button } from "../components/ui/button";
import { addToCart, removeFromCart } from "../services/cart";
import { addProductToCart } from "../redux/slices/cartSlice";
import toast from "react-hot-toast";

const ProductDetailpage = () => {
  const [index, setIndex] = useState(-1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { cartlist } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const { id } = useParams();

  // add product to cart
  const add = async () => {
    dispatch(addProductToCart({ productId: cartlist[index].productId }));
    const response = await addToCart(cartlist[index].productId._id);
    if (response.success) {
      toast.success(response.message);
    } else {
      dispatch(removeFromCart({ productId: cartlist[index].productId }));
      toast.error(response.message);
    }
  };

  useEffect(() => {
    if (cartlist && cartlist.length > 0) {
      const foundedIndex = cartlist.findIndex(
        (item) => item.productId._id === id
      );
      setIndex(foundedIndex);
    }
  }, [id, cartlist]);

  return (
    <div className="min-h-[90vh] w-full px-8 md:px-16 lg:px-24">
      {index === -1 ? (
        <span>No product found</span>
      ) : (
        <div className="h-full w-full my-10 flex flex-col gap-2">
          {/* breadcrumb */}
          <div className="flex items-center gap-1 text-xs md:text-sm whitespace-nowrap">
            <Link to={"/"}>Home /</Link>
            <Link to="/products">Products /</Link>
            <Link to={`/products/${cartlist[index].productId.category}`}>
              {cartlist[index].productId.category} /
            </Link>
            <p className="text-primary">{cartlist[index].productId.name}</p>
          </div>

          {/* product */}
          <div className="flex flex-col md:flex-row gap-14">
            {/* product images */}
            <div className="flex gap-2">
              <div
                id="product-images"
                className="h-96 flex flex-col gap-2 overflow-y-auto"
              >
                {cartlist[index].productId.productImages.map(
                  (image, imgIndex) => (
                    <img
                      onClick={() => setCurrentIndex(imgIndex)}
                      className="size-24 object-cover border-2 border-zinc-300 dark:border-zinc-700 rounded cursor-pointer"
                      key={imgIndex}
                      src={image}
                      alt="product image"
                    />
                  )
                )}
              </div>
              {/* current image will be displayed here */}
              <div className="size-96 border-2 border-zinc-300 dark:border-zinc-700 rounded overflow-hidden flex items-center justify-center flex-wrap">
                <img
                  src={cartlist[index].productId.productImages[currentIndex]}
                  alt="main image"
                />
              </div>
            </div>
            {/* product details */}
            <div className="flex flex-col gap-2 justify-evenly">
              <h2 className="text-4xl font-semibold">
                {cartlist[index].productId.name}
              </h2>
              <p className="flex items-center gap-1">
                {Array(cartlist[index].productId.rating)
                  .fill("_")
                  .map((item, index) => (
                    <Star
                      key={index}
                      className="text-primary"
                      fill="#efb100"
                      size={"18"}
                    />
                  ))}
                <span className="text-zinc-400">
                  ({cartlist[index].productId.rating})
                </span>
              </p>
              <div className="flex flex-col gap-1 my-3">
                <h3 className="text-2xl font-semibold">
                  MRP: Rs {cartlist[index].productId.price}
                </h3>
                <p className="text-md text-zinc-400">
                  (inclusive of all taxes)
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="text-xl font-semibold">About Product</h4>
                <p className="w-80 text-zinc-400">
                  {cartlist[index].productId.description}
                </p>
              </div>
              <Button onClick={add} className={"py-5 cursor-pointer w-80"}>
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailpage;
