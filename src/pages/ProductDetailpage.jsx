import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Star } from "lucide-react";
import { Button } from "../components/ui/button";
import { addToCart, removeFromCart } from "../services/cart";
import { addProductToCart } from "../redux/slices/cartSlice";
import toast from "react-hot-toast";
import { productDetails } from "../services/product";
import Spinner from "../custom_components/Spinner";

const ProductDetailpage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const { cartlist } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  // Function to fetch single product from database
  const fetchProduct = async (productId) => {
    try {
      setLoading(true);
      const response = await productDetails(productId);

      if (response.success) {
        setProduct(response.product);
      } else {
        toast.error(response.message || "Failed to fetch product");
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      toast.error("Failed to fetch product");
    } finally {
      setLoading(false);
    }
  };

  // Add product to cart
  const add = async () => {
    if (!product) return;

    if (!isAuthenticated) {
      return navigate("/login");
    }

    dispatch(addProductToCart({ productId: product }));

    try {
      const response = await addToCart(product._id);
      if (response.success) {
        toast.success(response.message);
      } else {
        dispatch(removeFromCart({ productId: product._id }));
        toast.error(response.message);
      }
    } catch (error) {
      // Revert if API call fails
      dispatch(removeFromCart({ productId: product._id }));
      toast.error("Failed to add to cart");
    }
    localStorage.setItem("cart", JSON.stringify(cartlist));
  };

  // Fetch product when component mounts or id changes
  useEffect(() => {
    if (id) {
      fetchProduct(id);
    }
  }, [id]);

  // Check if product is already in cart
  useEffect(() => {
    if (cartlist && cartlist.length > 0 && product) {
      const foundInCart = cartlist.some(
        (item) => item.productId._id === product._id
      );
    }
  }, [cartlist, product]);

  if (loading) {
    return (
      <div className="min-h-[90vh] w-full px-8 md:px-16 lg:px-24 flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[90vh] w-full px-8 md:px-16 lg:px-24 flex items-center justify-center">
        <span>Product not found</span>
      </div>
    );
  }

  return (
    <div className="min-h-[90vh] w-full px-8 md:px-16 lg:px-24">
      <div className="h-full w-full my-10 flex flex-col gap-2">
        {/* breadcrumb */}
        <div className="flex items-center gap-1 text-xs md:text-sm whitespace-nowrap">
          <Link to={"/"}>Home /</Link>
          <Link to="/products">Products /</Link>
          <Link to={`/products/${product.category}`}>{product.category} /</Link>
          <p className="text-primary">{product.name}</p>
        </div>

        {/* product */}
        <div className="flex flex-col md:flex-row gap-14">
          {/* product images */}
          <div className="flex gap-2">
            <div
              id="product-images"
              className="h-96 flex flex-col gap-2 overflow-y-auto"
            >
              {product.productImages?.map((image, imgIndex) => (
                <img
                  onClick={() => setCurrentIndex(imgIndex)}
                  className="size-24 object-cover border-2 border-zinc-300 dark:border-zinc-700 rounded cursor-pointer"
                  key={imgIndex}
                  src={image}
                  alt="product image"
                />
              ))}
            </div>
            {/* current image will be displayed here */}
            <div className="size-96 border-2 border-zinc-300 dark:border-zinc-700 rounded overflow-hidden flex items-center justify-center flex-wrap">
              <img
                src={product.productImages?.[currentIndex]}
                alt="main image"
              />
            </div>
          </div>

          {/* product details */}
          <div className="flex flex-col gap-2 justify-evenly">
            <h2 className="text-4xl font-semibold">{product.name}</h2>

            <p className="flex items-center gap-1">
              {Array(product.rating)
                .fill("_")
                .map((item, index) => (
                  <Star
                    key={index}
                    className="text-primary"
                    fill="#efb100"
                    size={"18"}
                  />
                ))}
              <span className="text-zinc-400">({product.rating})</span>
            </p>

            <div className="flex flex-col gap-1 my-3">
              <h3 className="text-2xl font-semibold">
                MRP: Rs {product.price}
              </h3>
              <p className="text-md text-zinc-400">(inclusive of all taxes)</p>
            </div>

            <div className="flex flex-col gap-1">
              <h4 className="text-xl font-semibold">About Product</h4>
              <p className="w-80 text-zinc-400">{product.description}</p>
            </div>

            <Button onClick={add} className={"py-5 cursor-pointer w-80"}>
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailpage;
