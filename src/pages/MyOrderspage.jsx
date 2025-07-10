import { useState, useEffect } from "react";
import { getMyOrders } from "../services/order";
import Spinner from "../custom_components/Spinner";
import { toast } from "react-hot-toast";

import { Card, CardHeader, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";

const MyOrderspage = () => {
  const [myOrders, setMyOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-GB");
  };

  const fetchOrders = async () => {
    setIsLoading(true);
    const response = await getMyOrders();

    if (response.success) {
      setMyOrders(response.myOrders);
    } else {
      toast.error(response.message);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="min-h-full w-full px-2 md:px-6 lg:px-10 py-4 flex flex-col gap-4">
      <h2 className="text-xl sm:text-2xl font-semibold">My Orders</h2>

      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          {myOrders && myOrders.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              No orders yet
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {myOrders.map((order) => (
                <Card key={order._id} className="w-full shadow-sm">
                  <CardHeader className="pb-3">
                    <div className="flex flex-col sm:flex-row sm:justify-between gap-1 text-sm text-gray-500 dark:text-gray-400">
                      <span>Order ID: {order._id}</span>
                      {/* <span>
                        Payment:{" "}
                        {order.payment_status === "paid" ? "PAID" : "COD"}
                      </span> */}
                      <span>Total: PKR {order.amount}</span>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {order.subOrders.map((subOrder) => (
                      <div
                        key={subOrder._id}
                        className="flex flex-col md:flex-row justify-between p-3 bg-gray-50 dark:bg-zinc-800 rounded-lg gap-4"
                      >
                        {/* Left Part - Product Info */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                          <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-lg overflow-hidden flex items-center justify-center shrink-0">
                            <img
                              src={subOrder.product.productImages[0]}
                              alt={subOrder.product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="font-semibold text-zinc-800 dark:text-gray-200 text-base">
                              {subOrder.product.name}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                              Category: {subOrder.product.category}
                            </p>
                          </div>
                        </div>

                        {/* Right Part - Status and Amount */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-4 sm:gap-8 text-sm text-gray-500 dark:text-gray-400">
                          <div className="space-y-1">
                            <p>Quantity: {subOrder.quantity}</p>
                            <Badge className="bg-primary text-white">
                              {order.payment_status === "paid"
                                ? "Paid"
                                : "Unpaid"}
                            </Badge>
                            <p>
                              Date:{" "}
                              {formatDate(subOrder.createdAt || new Date())}
                            </p>
                          </div>

                          <div className="text-right">
                            <p className="text-lg font-semibold text-primary">
                              Amount: PKR {subOrder.amount}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MyOrderspage;
