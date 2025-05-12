import { sellerStatsRoute } from "@/api/api";
import { useSession } from "@/context/session-context";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const SellerDashboardPage: React.FC = () => {
  const { user } = useSession();
  const sellerId = user?.id;

  const GetSellerDetails = async ({
    sellerId,
  }: {
    sellerId: string | undefined;
  }) => {
    if (sellerId === undefined) {
      return;
    }
    const response = await sellerStatsRoute.get(`/${sellerId}`);

    return response.data;
  };

  const { data } = useQuery({
    queryKey: ["sellerStats"],
    queryFn: () => GetSellerDetails({ sellerId: sellerId }),
  });
  console.log(data);
  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8 mt-20">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Seller Dashboard</h1>
      </header>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Total Sales
          </h2>
          <p className="text-3xl font-bold text-indigo-600">$0.00</p>
          <p className="text-sm text-gray-500 mt-1">+0% from last month</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Total Orders
          </h2>
          <p className="text-3xl font-bold text-green-600">
            {data?.totalOrders}
          </p>
          <p className="text-sm text-gray-500 mt-1">+0% from last month</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Active Listings
          </h2>
          <p className="text-3xl font-bold text-blue-600">
            {data?.totalProducts}
          </p>
          <p className="text-sm text-gray-500 mt-1">Manage your products</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Total Items sold
          </h2>
          <p className="text-3xl font-bold text-yellow-500">
            {data?.totalCountOfItemsSold}
          </p>
          <p className="text-sm text-gray-500 mt-1">Based on 0 reviews</p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sales Chart Placeholder */}
        <div className="lg:col-span-2 bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Sales Overview
          </h2>
          <div className="h-64 bg-gray-200 rounded flex items-center justify-center">
            <p className="text-gray-500">Sales chart will be displayed here.</p>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Recent Activity
          </h2>
          <ul className="space-y-4">
            <li className="flex items-center">
              <div className="bg-blue-500 text-white rounded-full h-8 w-8 flex items-center justify-center mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path
                    fillRule="evenodd"
                    d="M4 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">
                  New order #12345
                </p>
                <p className="text-xs text-gray-500">2 minutes ago</p>
              </div>
            </li>
            <li className="flex items-center">
              <div className="bg-green-500 text-white rounded-full h-8 w-8 flex items-center justify-center mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">
                  Product "Awesome T-Shirt" approved
                </p>
                <p className="text-xs text-gray-500">1 hour ago</p>
              </div>
            </li>
            <li className="flex items-center">
              <div className="bg-yellow-500 text-white rounded-full h-8 w-8 flex items-center justify-center mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">
                  Payout of $250.00 initiated
                </p>
                <p className="text-xs text-gray-500">Yesterday</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboardPage;
