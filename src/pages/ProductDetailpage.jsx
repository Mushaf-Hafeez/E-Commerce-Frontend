import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

const ProductDetailpage = () => {
  const [index, setIndex] = useState(-1);
  const { cartlist } = useSelector((state) => state.cart);

  const { id } = useParams();

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
        <div className="h-full w-full flex flex-col gap-2">
          <div className="flex items-center">
            <Link to={"/"}>Home/</Link>
            <Link to="/products">Products/</Link>
            <Link to={`/products/${cartlist[index].productId.category}`}>
              {cartlist[index].productId.category}/
            </Link>
            <p className="text-primary">{cartlist[index].productId.name}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailpage;
