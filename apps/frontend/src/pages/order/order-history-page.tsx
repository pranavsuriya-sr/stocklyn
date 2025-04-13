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
      <div className="w-full min-h-[400px] flex flex-col items-center justify-center text-center py-16 px-4 bg-slate-50">
        <ShoppingBag className="h-16 w-16 mx-auto text-gray-300 mb-4" />
        <h2 className="text-2xl font-semibold mb-2 text-slate-800">
          No orders yet
        </h2>
        <p className="text-slate-600 mb-6 max-w-xs">
          Looks like you haven't placed any orders with us.
        </p>
        <Button asChild>
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
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 mt-28">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Your Orders
          </h1>
          <p className="mt-1 text-base text-slate-600">
            Track and manage your purchase history.
          </p>
        </div>
        <Badge
          variant="outline"
          className="text-sm px-3 py-1 self-start sm:self-center"
        >
          {orders.length} {orders.length === 1 ? "Order" : "Orders"} Found
        </Badge>
      </div>

      <div className="space-y-6">
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
            <Card className="overflow-hidden border border-slate-200 shadow-sm">
              <CardHeader className="pb-3 pt-4 px-4 sm:px-6 border-b border-slate-200 bg-slate-50/50">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <CardTitle className="text-base font-semibold">
                    Order #{order.id.toString().substring(0, 8).toUpperCase()}
                  </CardTitle>
                  <Badge
                    variant={getBadgeVariant()}
                    className="self-start sm:self-center"
                  >
                    {getOrderStatusText()}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {formatDistanceToNow(new Date(order.createdAt), {
                    addSuffix: true,
                  })}
                </p>
              </CardHeader>

              <CardContent className="px-4 sm:px-6 pt-4 pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm">
                    <Package className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium text-slate-700">
                      {order.OrderItems.length}{" "}
                      {order.OrderItems.length === 1 ? "item" : "items"}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-slate-800">
                      {formatCurrency(Number(order.total))}
                    </p>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="pt-0 pb-3 px-4 sm:px-6">
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex w-full items-center justify-center text-sm text-blue-600 hover:bg-blue-50 hover:text-blue-700 -ml-2"
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
                <div className="px-4 sm:px-6 pb-4 pt-2">
                  <div className="rounded-md border border-slate-200 bg-white overflow-hidden">
                    <div className="border-b border-slate-200 bg-slate-50/80 px-4 py-2 text-xs font-medium text-muted-foreground hidden md:block">
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
                            className={`border-b border-slate-200 px-4 py-3 text-sm last:border-0 ${index % 2 === 1 ? "bg-slate-50/50" : ""}`}
                          >
                            <div className="grid grid-cols-12 items-center gap-4">
                              <div className="col-span-12 md:col-span-6">
                                <div className="flex items-center gap-3">
                                  <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded border border-slate-200">
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
                                    <span className="font-medium text-slate-800 leading-tight truncate">
                                      {item.name}
                                    </span>
                                    <span className="text-xs text-muted-foreground md:hidden">
                                      {formatCurrency(item.price)} / item
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div className="col-span-6 md:col-span-3 text-center">
                                <span className="md:hidden text-xs text-muted-foreground mr-1">
                                  Qty:
                                </span>
                                <span className="font-medium text-slate-700">
                                  {quantity.toString()}
                                </span>
                              </div>

                              <div className="col-span-6 md:col-span-3 text-right">
                                <span className="md:hidden text-xs text-muted-foreground mr-1">
                                  Total:
                                </span>
                                <span className="font-medium text-slate-800">
                                  {formatCurrency(itemTotalPrice)}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="p-4 text-center text-sm text-muted-foreground">
                        Loading item details...
                        {/* Or show an error if fetch failed */}
                      </div>
                    )}
                    <div className="flex justify-end border-t border-slate-200 bg-slate-50/80 px-4 py-3">
                      <div className="flex items-baseline gap-2">
                        <span className="text-sm font-medium text-muted-foreground">
                          Order Total:
                        </span>
                        <span className="text-lg font-semibold text-slate-900">
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
