import { sellerStatsRoute } from "@/api/api";
import { useSession } from "@/context/session-context";
import { useQuery } from "@tanstack/react-query";
import OrdersCard from "./ordersCard/orders-card";

const SellerOrdersPage = () => {
  const { user } = useSession();
  const sellerId = user?.id;

  const getSellerOrders = async () => {
    if (sellerId === undefined) {
      return;
    }
    const response = await sellerStatsRoute.get(`/sellerOrders/${sellerId}`);
    return response.data.orderDetails;
  };

  const { data } = useQuery({
    queryKey: ["sellerOrders"],
    queryFn: getSellerOrders,
  });

  console.log(data);

  return (
    <div className="min-h-screen mt-28 ">
      <div className="text-center text-4xl font-montserrat  text-gray-800 py-8 mb-10 font-montserrat underline">
        All Orders from your store
      </div>
      <div>
        {data?.map((orderItem: any) => {
          return (
            <OrdersCard
              key={orderItem.order.id}
              imageUrl={orderItem.product.imageUrl}
              orderId={orderItem.order.id}
              userId={orderItem.order.order.userId}
              totalPrice={orderItem.product.price}
              quantity={orderItem.order.quantity}
              productName={orderItem.product.name}
              orderedAt={orderItem.order.order.createdAt}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SellerOrdersPage;
