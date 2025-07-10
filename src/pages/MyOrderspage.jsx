// import { useState, useEffect } from "react";
// import { getMyOrders } from "../services/order";
// import Spinner from "../custom_components/Spinner";

// import { Card, CardHeader, CardContent } from "../components/ui/card";
// import { Badge } from "../components/ui/badge";

// const MyOrderspage = () => {
//   const [myOrders, setMyOrders] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   const getStatusColor = (status) => {
//     return status === "paid"
//       ? "bg-green-100 text-green-800 hover:bg-green-200"
//       : "bg-red-100 text-red-800 hover:bg-red-200";
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString("en-GB");
//   };

//   // function to fetch orders
//   const fetchOrders = async () => {
//     setIsLoading(true);
//     const response = await getMyOrders();

//     if (response.success) {
//       setMyOrders(response.myOrders);
//     } else {
//       toast.error(response.message);
//     }

//     setIsLoading(false);
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   return (
//     <div className="min-h-full w-full px-2 flex flex-col gap-2">
//       <h2 className="text-2xl font-semibold">product List</h2>
//       {isLoading ? (
//         <Spinner />
//       ) : (
//         <div>
//           {myOrders && myOrders.length === 0 ? (
//             "No order yet"
//           ) : (
//             <div className="flex flex-col gap-2">
//               {myOrders.map((order, index) => (
//                 <Card className="w-full mb-4 shadow-sm">
//                   <CardHeader className="pb-3">
//                     <div className="flex justify-between items-start text-sm text-gray-500">
//                       <span>OrderId: {order._id}</span>
//                       <span>
//                         Payment:{" "}
//                         {order.payment_status === "paid" ? "PAID" : "COD"}
//                       </span>
//                       <span>Total Amount: ${order.amount}</span>
//                     </div>
//                   </CardHeader>
//                   <CardContent className="space-y-4">
//                     {order.subOrders.map((subOrder) => (
//                       <div
//                         key={subOrder._id}
//                         className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
//                       >
//                         <div className="flex items-center gap-4">
//                           <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center overflow-hidden">
//                             <img
//                               src={subOrder.product.productImages[0]}
//                               alt={subOrder.product.name}
//                               className="w-full h-full object-cover"
//                             />
//                           </div>
//                           <div>
//                             <h3 className="font-semibold text-gray-800">
//                               {subOrder.product.name}
//                             </h3>
//                             <p className="text-sm text-gray-500 capitalize">
//                               Category: {subOrder.product.category}
//                             </p>
//                           </div>
//                         </div>

//                         <div className="flex items-center gap-8">
//                           <div className="text-sm text-gray-500">
//                             <p>Quantity: {subOrder.quantity}</p>
//                             <Badge
//                               className={getStatusColor(order.payment_status)}
//                             >
//                               {order.payment_status === "paid"
//                                 ? "Paid"
//                                 : "Unpaid"}
//                             </Badge>
//                             <p>
//                               Date:{" "}
//                               {formatDate(subOrder.createdAt || new Date())}
//                             </p>
//                           </div>

//                           <div className="text-right">
//                             <p className="text-lg font-semibold text-green-600">
//                               Amount: ${subOrder.amount}
//                             </p>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyOrderspage;

import { useState, useEffect } from "react";
import { getMyOrders } from "../services/order";
import Spinner from "../custom_components/Spinner";
import { toast } from "react-hot-toast"; // Add this import

import { Card, CardHeader, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";

const MyOrderspage = () => {
  const [myOrders, setMyOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-GB");
  };

  // function to fetch orders
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
    <div className="min-h-full w-full px-2 flex flex-col gap-2">
      <h2 className="text-2xl font-semibold">My Orders</h2>
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
              {myOrders.map((order, index) => (
                <Card key={order._id} className="w-full shadow-sm">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start text-sm text-gray-500 dark:text-gray-400">
                      <span>OrderId: {order._id}</span>
                      <span>
                        Payment:{" "}
                        {order.payment_status === "paid" ? "PAID" : "COD"}
                      </span>
                      <span>Total Amount: ${order.amount}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {order.subOrders.map((subOrder) => (
                      <div
                        key={subOrder._id}
                        className="flex items-center justify-between p-3 bg-gray-50 dark:bg-zinc-800 rounded-lg"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center overflow-hidden">
                            <img
                              src={subOrder.product.productImages[0]}
                              alt={subOrder.product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="font-semibold text-zinc-800 dark:text-gray-200">
                              {subOrder.product.name}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                              Category: {subOrder.product.category}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-8">
                          <div className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                            <p>Quantity: {subOrder.quantity}</p>
                            <div className="flex">
                              <Badge className={"bg-primary"}>
                                {order.payment_status === "paid"
                                  ? "Paid"
                                  : "Unpaid"}
                              </Badge>
                            </div>
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
