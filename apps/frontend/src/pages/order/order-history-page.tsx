import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { orderRoute, productRoute } from "@/api/api";
import { useSession } from "@/context/session-context";
import { OrderType } from "@/types/order-type";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge, BadgeProps } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { ProductsType } from "@/types/product-type";
import {
  AlertCircle,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Loader2,
  Package,
  ShoppingBag,
} from "lucide-react";

const formatCurrency = (amount: number | string): string => {
  const numericAmount =
    typeof amount === "string" ? parseFloat(amount) : amount;
  if (isNaN(numericAmount)) {
    return "₹0.00";
  }
  return numericAmount.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
  });
};

const OrderHistory = () => {
  const { user } = useSession();
  const navigate = useNavigate();
  const [productDetails, setProductDetails] = useState<ProductsType[]>([]);
  const [quantityArr, setQuantityArr] = useState<Number[]>([]);

  const [expandedOrders, setExpandedOrders] = useState<Record<string, boolean>>(
    {}
  );

  const toggleOrderExpansion = (orderId: string) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  const fetchOrderDetails = async () => {
    if (!user?.id) throw new Error("User not logged in");
    const response = await orderRoute.get(`/getOrder/${user.id}`);
    const orderDetails: OrderType[] = response.data;
    orderDetails.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    return orderDetails;
  };

  const {
    data: orders,
    isLoading,
    error,
  } = useQuery<OrderType[], Error>({
    queryKey: ["orders", user?.id],
    queryFn: fetchOrderDetails,
    enabled: !!user?.id,
  });

  const getBadgeVariant = (): BadgeProps["variant"] => {
    return "secondary";
  };
  const getOrderStatusText = (): string => {
    return "PROCESSED";
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    const isAuthError =
      error.message.includes("logged in") ||
      error.message.includes("Unauthorized");

    return (
      <div className="max-w-2xl mx-auto py-8 px-4">
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error Loading Orders</AlertTitle>
          <AlertDescription>
            {isAuthError
              ? "Authentication required. Please sign in to view your orders."
              : "Sorry, we couldn't load your orders at this time. Please try again later."}
            <br />
            <span className="text-xs opacity-80">({error.message})</span>
          </AlertDescription>
        </Alert>

        <div className="flex justify-center">
          {isAuthError ? (
            <Button onClick={() => navigate("/login")}>Go to Sign In</Button>
          ) : (
            <Button onClick={() => window.location.reload()}>Try Again</Button>
          )}
        </div>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="w-full min-h-[400px] flex flex-col items-center justify-center text-center py-16 px-4 bg-white mt-20 md:mt-28 rounded-lg shadow-sm border border-gray-200">
        <ShoppingBag className="h-16 w-16 mx-auto text-gray-400 mb-6" />
        <h2 className="text-2xl font-semibold mb-2 text-gray-800">
          No orders yet
        </h2>
        <p className="text-gray-600 mb-8 max-w-xs">
          Looks like you haven't placed any orders with us.
        </p>
        <Button asChild className="bg-slate-800 hover:bg-slate-900 text-white">
          <Link to="/">
            Start Shopping
            <ChevronRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    );
  }

  const getProductDetailArray = async (orderId: String) => {
    const currentOrder = orders.find((order) => {
      return order.id === orderId;
    });
    const productIds = currentOrder?.OrderItems.map((item) => item.productId);
    const currentQuatity = currentOrder?.OrderItems.map(
      (item) => item.quantity
    );

    try {
      const response = await productRoute.post("/productDetails", {
        productIds,
      });
      setQuantityArr(currentQuatity != undefined ? currentQuatity : []);
      setProductDetails(response.data);
    } catch (fetchError) {
      console.error("Failed to fetch product details:", fetchError);

      setProductDetails([]);
      setQuantityArr([]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 mt-20 md:mt-28">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Your Orders
          </h1>
          <p className="mt-2 text-base text-gray-600">
            Track and manage your purchase history.
          </p>
        </div>
        <Badge
          variant="outline"
          className="text-sm px-4 py-2 self-start sm:self-center border-gray-300 text-gray-700 bg-white"
        >
          {orders.length} {orders.length === 1 ? "Order" : "Orders"} Found
        </Badge>
      </div>

      <div className="space-y-8">
        {orders.map((order) => (
          <Collapsible
            key={order.id.toString()}
            open={expandedOrders[order.id.toString()] ?? false}
            onOpenChange={() => {
              const isOpen = expandedOrders[order.id.toString()];

              if (!isOpen) {
                getProductDetailArray(order.id);
              }
              toggleOrderExpansion(order.id.toString());
            }}
            className="w-full"
          >
            <Card className="overflow-hidden border border-gray-200 shadow-lg rounded-xl bg-white">
              <CardHeader className="pb-4 pt-5 px-5 sm:px-6 border-b border-gray-100 bg-gray-50">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                  <CardTitle className="text-lg font-semibold text-gray-800">
                    Order #{order.id.toString().substring(0, 8).toUpperCase()}
                  </CardTitle>
                  <Badge
                    variant={getBadgeVariant()}
                    className="self-start sm:self-auto px-3 py-1 text-xs font-medium bg-blue-100 text-blue-700 border-blue-200"
                  >
                    {getOrderStatusText()}
                  </Badge>
                </div>
                <p className="text-xs text-gray-500 mt-1.5">
                  {formatDistanceToNow(new Date(order.createdAt), {
                    addSuffix: true,
                  })}
                </p>
              </CardHeader>

              <CardContent className="px-5 sm:px-6 pt-5 pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 text-sm">
                    <Package className="h-5 w-5 text-gray-500" />
                    <span className="font-medium text-gray-700">
                      {order.OrderItems.length}{" "}
                      {order.OrderItems.length === 1 ? "item" : "items"}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-lg text-gray-800">
                      {formatCurrency(Number(order.total))}
                    </p>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="pt-2 pb-4 px-5 sm:px-6 bg-gray-50/70 border-t border-gray-100">
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex w-full items-center justify-center text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-800 font-medium -ml-2"
                  >
                    {expandedOrders[order.id.toString()] ? (
                      <>
                        Hide details <ChevronUp className="ml-1.5 h-4 w-4" />
                      </>
                    ) : (
                      <>
                        View items <ChevronDown className="ml-1.5 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </CollapsibleTrigger>
              </CardFooter>

              <CollapsibleContent>
                <div className="px-5 sm:px-6 pb-5 pt-3 bg-white border-t border-gray-100">
                  <div className="rounded-lg border border-gray-200 bg-white overflow-hidden">
                    <div className="border-b border-gray-200 bg-gray-50 px-4 py-2.5 text-xs font-semibold text-gray-600 hidden md:block">
                      <div className="grid grid-cols-12 gap-4 items-center">
                        <div className="col-span-6">Product</div>
                        <div className="col-span-3 text-center">Quantity</div>
                        <div className="col-span-3 text-right">Price</div>
                      </div>
                    </div>

                    {productDetails.length > 0 ? (
                      productDetails.map((item, index) => {
                        const quantity = quantityArr[index] ?? 0;
                        const itemTotalPrice = item.price * Number(quantity);

                        return (
                          <div
                            key={item.id.toString()}
                            className={`border-b border-gray-100 px-4 py-4 text-sm last:border-0 ${index % 2 === 1 ? "bg-gray-50/60" : "bg-white"}`}
                          >
                            <div className="grid grid-cols-12 items-center gap-4">
                              <div className="col-span-12 md:col-span-6">
                                <div className="flex items-center gap-3.5">
                                  <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 bg-gray-50">
                                    <img
                                      src={item.displayImage}
                                      alt={item.name}
                                      className="h-full w-full object-cover"
                                      onError={(e) =>
                                        (e.currentTarget.src =
                                          "/placeholder-image.png")
                                      }
                                    />
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="font-medium text-gray-800 leading-tight">
                                      {item.name}
                                    </span>
                                    <span className="text-xs text-gray-500 md:hidden mt-0.5">
                                      {formatCurrency(item.price)} / item
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div className="col-span-6 md:col-span-3 text-left md:text-center">
                                <span className="md:hidden text-xs text-gray-500 mr-1.5">
                                  Qty:
                                </span>
                                <span className="font-medium text-gray-700">
                                  {quantity.toString()}
                                </span>
                              </div>

                              <div className="col-span-6 md:col-span-3 text-left md:text-right">
                                <span className="md:hidden text-xs text-gray-500 mr-1.5">
                                  Total:
                                </span>
                                <span className="font-medium text-gray-800">
                                  {formatCurrency(itemTotalPrice)}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="p-6 text-center text-sm text-gray-500">
                        Loading item details...
                        {/* Or show an error if fetch failed */}
                      </div>
                    )}
                    <div className="flex justify-end border-t border-gray-200 bg-gray-50 px-4 py-3.5">
                      <div className="flex items-baseline gap-2">
                        <span className="text-sm font-medium text-gray-600">
                          Order Total:
                        </span>
                        <span className="text-xl font-semibold text-gray-900">
                          {formatCurrency(order.total.toString())}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CollapsibleContent>
            </Card>
          </Collapsible>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;
