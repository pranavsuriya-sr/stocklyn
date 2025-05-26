import React from "react";

interface OrderCardProps {
  orderId: string;
  userId: string;
  totalPrice: number;
  quantity: number;
  imageUrl: string;
  productName?: string;
  orderedAt: string;
}

const OrdersCard: React.FC<OrderCardProps> = ({
  orderId,
  userId,
  totalPrice,
  quantity,
  imageUrl,
  productName = "Product Image",
  orderedAt,
}) => {
  const dateObject = new Date(orderedAt);
  const formattedDate = dateObject.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedTime = dateObject.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div className="flex flex-col bg-white shadow-lg rounded-lg overflow-hidden h-full transition-all duration-300 hover:shadow-xl">
      {/* Image Section */}
      <div className="w-full h-48 md:h-56 flex-shrink-0">
        <img
          className="object-cover w-full h-full"
          src={imageUrl}
          alt={productName}
        />
      </div>

      <div className="w-full p-6 flex flex-col flex-grow font-montserrat">
        <div className="flex-grow mb-4">
          <div className="mb-4">
            <h2 className="text-lg md:text-xl text-gray-800 font-semibold tracking-tight mb-1">
              Order ID:{" "}
              <span className="font-normal text-gray-700">{orderId}</span>
            </h2>
            <p className="text-xs text-gray-500 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5 mr-1.5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {formattedDate}
            </p>
          </div>

          <div className="space-y-2 text-sm text-gray-700">
            <p>
              <span className="font-medium text-gray-800">User ID:</span>{" "}
              {userId}
            </p>
            {productName && productName !== "Product Image" && (
              <p>
                <span className="font-medium text-gray-800">Product:</span>{" "}
                {productName}
              </p>
            )}
            <p>
              <span className="font-medium text-gray-800">Total Price:</span>{" "}
              <span className="text-green-600 font-semibold">
                ${totalPrice}
              </span>
            </p>
            <p>
              <span className="font-medium text-gray-800">Quantity:</span>{" "}
              {quantity}
            </p>
          </div>
        </div>

        <div className="mt-auto pt-4 text-right">
          <p className="text-xs text-gray-500 flex items-center justify-end">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5 mr-1 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            at {formattedTime}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrdersCard;
