import { useState, useEffect } from "react";
import { getReceivedOrders } from "../services/order"; // Update with your actual service
import Spinner from "../custom_components/Spinner";
import { toast } from "react-hot-toast";

import { Card, CardHeader, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";

const ReceivedOrderspage = () => {
  const [receivedOrders, setReceivedOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-GB");
  };

  // function to fetch received orders
  const fetchReceivedOrders = async () => {
    setIsLoading(true);
    try {
      const response = await getReceivedOrders();

      if (response.success) {
        setReceivedOrders(response.receivedOrders);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Failed to fetch received orders");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchReceivedOrders();
  }, []);

  // Group orders by mainOrder ID for better organization
  const groupedOrders = receivedOrders.reduce((acc, order) => {
    const mainOrderId = order.mainOrder;
    if (!acc[mainOrderId]) {
      acc[mainOrderId] = {
        mainOrderId,
        orders: [],
        totalAmount: 0,
        address: order.address,
        payment_status: order.payment_status,
      };
    }
    acc[mainOrderId].orders.push(order);
    acc[mainOrderId].totalAmount += order.amount;
    return acc;
  }, {});

  return (
    <div className="min-h-full w-full px-2 sm:px-4 lg:px-6 flex flex-col gap-2">
      <h2 className="text-xl sm:text-2xl font-semibold">Received Orders</h2>
      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          {receivedOrders && receivedOrders.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              No received orders yet
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {Object.values(groupedOrders).map((orderGroup) => (
                <Card key={orderGroup.mainOrderId} className="w-full shadow-sm">
                  <CardHeader className="pb-3">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-medium">
                        Order ID: {orderGroup.mainOrderId}
                      </span>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 sm:text-right">
                        {/* <span>
                          Payment:{" "}
                          {orderGroup.payment_status === "paid"
                            ? "PAID"
                            : "COD"}
                        </span> */}
                        <span className="font-semibold">
                          Total Amount: PKR {orderGroup.totalAmount}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                      <p className="font-medium">Customer Details:</p>
                      <p>
                        {orderGroup.address.firstName}{" "}
                        {orderGroup.address.lastName}
                      </p>
                      <p>
                        {orderGroup.address.street}, {orderGroup.address.city}
                      </p>
                      <p>
                        {orderGroup.address.province},{" "}
                        {orderGroup.address.country} -{" "}
                        {orderGroup.address.postalCode}
                      </p>
                      <p>Phone: {orderGroup.address.phoneNumber}</p>
                      <p>Email: {orderGroup.address.email}</p>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {orderGroup.orders.map((order) => (
                      <div
                        key={order._id}
                        className="flex flex-col lg:flex-row lg:items-center lg:justify-between p-3 bg-gray-50 dark:bg-zinc-800 rounded-lg gap-4"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-green-100 dark:bg-zinc-800 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                            <img
                              src={order.product.productImages[0]}
                              alt={order.product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-zinc-800 dark:text-gray-200 truncate">
                              {order.product.name}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                              Category: {order.product.category}
                            </p>
                            <p className="text-xs text-gray-400 dark:text-gray-500 line-clamp-2">
                              {order.product.description}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between lg:justify-end gap-4 lg:gap-8">
                          <div className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                            <p>Quantity: {order.quantity}</p>
                            <div className="flex">
                              <Badge className="bg-primary">
                                {order.payment_status === "paid"
                                  ? "Paid"
                                  : "Unpaid"}
                              </Badge>
                            </div>
                            <p>Unit Price: PKR {order.product.price}</p>
                          </div>

                          <div className="text-left sm:text-right lg:min-w-[120px]">
                            <p className="text-lg font-semibold text-primary">
                              Amount: PKR {order.amount}
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

export default ReceivedOrderspage;
