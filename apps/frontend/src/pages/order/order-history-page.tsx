import { orderRoute } from "@/api/api";
import { useSession } from "@/context/session-context";
import { useQuery } from "@tanstack/react-query";

const OrderHistory = () => {
  const { user } = useSession();

  const FetchOrderDetails = async () => {
    const response = await orderRoute.get(`/getOrder/${user?.id}`);
    console.log(response.data);
    return response;
  };

  const {} = useQuery({
    queryKey: ["orders"],
    queryFn: FetchOrderDetails,
  });

  return (
    <div className="w-min-screen h-screen pt-6">
      <h1 className="mt-28 w-[75%] mx-auto text-4xl">Your Orders</h1>
    </div>
  );
};

export default OrderHistory;
