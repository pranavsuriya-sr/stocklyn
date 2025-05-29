import { sellerStatsRoute } from "@/api/api";
import { AnimatedList } from "@/components/magicui/animated-list";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useSession } from "@/context/session-context";
import { useQuery } from "@tanstack/react-query";
import {
  Activity,
  AlertCircle,
  CreditCard,
  IndianRupee,
  Package,
  PlusCircle,
  Settings,
  ShoppingBag,
  TrendingUp,
  Users,
} from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

const StatCard: React.FC<{
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  trendColor?: string;
  onClick?: () => void;
  className?: string;
}> = ({ title, value, icon, trend, trendColor, onClick, className }) => (
  <div
    className={`bg-white p-6 rounded-2xl shadow-sm border border-neutral-200/80 hover:shadow-lg transition-all duration-300 ease-out group ${onClick ? "cursor-pointer" : ""} ${className || ""}`}
    onClick={onClick}
  >
    <div className="flex items-center justify-between mb-3">
      <h3 className="text-sm font-medium text-neutral-500 uppercase tracking-wider group-hover:text-indigo-600 transition-colors duration-300">
        {title}
      </h3>
      <div className="text-neutral-400 group-hover:text-indigo-500 transition-colors duration-300">
        {icon}
      </div>
    </div>
    <p className="text-3xl font-semibold text-neutral-800 mb-1">{value}</p>
    {trend && value != 0 && (
      <div>
        <p
          className={`text-xs flex items-center ${trendColor || "text-neutral-500"}`}
        >
          {trendColor?.includes("green") && (
            <TrendingUp size={14} className="mr-1" />
          )}
          {trendColor?.includes("red") && (
            <AlertCircle size={14} className="mr-1" />
          )}
          {trend}
        </p>
      </div>
    )}
  </div>
);

const QuickActionButton: React.FC<{
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
}> = ({ label, icon, onClick, variant = "primary" }) => (
  <button
    onClick={onClick}
    className={`flex items-center justify-center space-x-2.5 font-medium py-2.5 px-5 rounded-lg shadow-xs hover:shadow-sm transition-all duration-300 ease-out transform hover:-translate-y-px focus:outline-none focus:ring-2 focus:ring-offset-2
      ${variant === "primary" ? "bg-indigo-600 hover:bg-indigo-500 text-white focus:ring-indigo-500" : "bg-white hover:bg-neutral-50 text-neutral-700 border border-neutral-300 focus:ring-indigo-500"}`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

const SellerDashboardPage: React.FC = () => {
  const { user } = useSession();
  const navigate = useNavigate();
  const sellerId = user?.id;
  const [topPerformingProductsInfo, setTopPerformingProductsInfo] = useState<
    any[]
  >([]);

  const GetSellerDetails = async ({
    sellerId,
  }: {
    sellerId: string | undefined;
  }) => {
    if (sellerId === undefined) {
      return null;
    }
    const response = await sellerStatsRoute.get(`/${sellerId}`);

    setTopPerformingProductsInfo(response.data.topPerformingProducts);
    return response.data;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["sellerStats", sellerId],
    queryFn: () => GetSellerDetails({ sellerId }),
    enabled: !!sellerId,
  });

  // console.log(data?.topPerformingProducts);

  const initialActivityItems = [
    {
      icon: (
        <ShoppingBag
          size={20}
          className="text-indigo-500 group-hover:text-white transition-colors duration-300"
        />
      ),
      bgColor: "bg-indigo-100 group-hover:bg-indigo-500",
      title:
        data && data.recentOrder && data.recentOrder.product
          ? `Order :${data.recentOrder.orderId} `
          : "No Order found",
      subtitle: `${data?.recentOrder?.order?.createdAt || "advertise your product"}`,
      hoverTextColor: "group-hover:text-indigo-600",
    },
    {
      icon: (
        <Package
          size={20}
          className="text-green-500 group-hover:text-white transition-colors duration-300"
        />
      ),
      bgColor: "bg-green-100 group-hover:bg-green-500",
      title: data?.recentOrder?.product?.name || "Product detail not found",
      subtitle: `Qty: ${data?.recentOrder?.quantity || "please add a product"} `,
      hoverTextColor: "group-hover:text-green-600",
    },
    {
      icon: (
        <CreditCard
          size={20}
          className="text-yellow-500 group-hover:text-white transition-colors duration-300"
        />
      ),
      bgColor: "bg-yellow-100 group-hover:bg-yellow-500",
      title: `Payout of ₹${data?.recentOrder?.order?.total || "0"} processed`,
      subtitle: "from stripe",
      hoverTextColor: "group-hover:text-yellow-600",
    },
    {
      icon: (
        <Activity
          size={20}
          className="text-red-500 group-hover:text-white transition-colors duration-300"
        />
      ),
      bgColor: "bg-red-100 group-hover:bg-red-500",
      title: `Stock alert:  ${data?.recentOrder?.product?.stockQuantity || "no"} left stock`,
      subtitle: "now",
      hoverTextColor: "group-hover:text-red-600",
    },
    {
      icon: (
        <PlusCircle
          size={20}
          className="text-violet-500 group-hover:text-white transition-colors duration-300"
        />
      ),
      bgColor: "bg-violet-100 group-hover:bg-violet-500",
      title: "Top seller (admin only)",
      subtitle: "View your rank among all sellers",
      hoverTextColor: "group-hover:text-violet-600",
    },
  ];

  const insightWidgets = [
    {
      title: "Top Performing Products",
      placeholder: "Product performance data coming soon.",
    },
    {
      title: "Customer Demographics",
      placeholder: "Demographics chart coming soon.",
    },
  ];
  console.log(topPerformingProductsInfo);

  const chartDataForTopPerformingProducts = topPerformingProductsInfo.map(
    (product) => {
      return {
        name: product.name,
        totalSold: product.totalQuantitySold,
        revenue: product.totalQuantitySold * product.price,
      };
    }
  );

  console.log(chartDataForTopPerformingProducts);

  const chartConfig = {
    totalSold: {
      label: "Total Sold",
      color: "#4f46e5",
    },
    revenue: {
      label: "Revenue",
      color: "#60a5fa",
    },
  } satisfies ChartConfig;

  const SalesChart = () => {
    return (
      <ChartContainer config={chartConfig} className="min-h-[150px] w-full">
        <BarChart accessibilityLayer data={chartDataForTopPerformingProducts}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis dataKey="totalSold" />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend />
          <Bar dataKey="totalSold" fill="var(--color-totalSold)" radius={4} />
        </BarChart>
      </ChartContainer>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4 font-montserrat">
        <p className="text-lg text-neutral-600">Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4 font-montserrat">
        <p className="text-lg text-red-500">Error loading dashboard data.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 p-4 sm:p-6 lg:p-8 font-montserrat text-neutral-800 mt-16">
      {/* Header */}
      <header className="mb-10 mt-8 sm:mt-6">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-0">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div className="mb-4 sm:mb-0">
              <h1 className="text-3xl font-semibold text-neutral-900">
                Dashboard
              </h1>
              <p className="mt-1 text-md text-neutral-500">
                Welcome back, {user?.name || "Seller"}! Here's your business
                snapshot.
              </p>
            </div>
            <div className="flex space-x-3">
              <QuickActionButton
                label="Add Product"
                icon={<PlusCircle size={18} />}
                onClick={() => navigate("/seller/sell")}
                variant="primary"
              />
              <QuickActionButton
                label="Settings"
                icon={<Settings size={18} />}
                onClick={() => navigate("/seller/settings")}
                variant="secondary"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-screen-xl mx-auto px-4 sm:px-0">
        {/* Stats Grid */}
        <section className="mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <StatCard
              title="Total Revenue"
              value={`₹${data?.totalCost?.toLocaleString() || 0}`}
              icon={<IndianRupee size={22} />}
              trend={data?.totalCost > 0 ? "+5.2% from last month" : "0"}
              trendColor="text-green-600"
            />
            <StatCard
              title="Total Orders"
              value={data?.totalOrders || 0}
              icon={<ShoppingBag size={22} />}
              trend="+12 new orders today"
              trendColor="text-blue-600"
              onClick={() => navigate("/seller/orders")}
            />
            <StatCard
              title="Active Listings"
              value={data?.totalProducts || 0}
              icon={<Package size={22} />}
              trend="2 need attention"
              trendColor="text-yellow-600"
              // onClick={() => navigate("/seller/products")}
            />
            <StatCard
              title="Items Sold"
              value={data?.totalCountOfItemsSold || 0}
              icon={<Users size={22} />}
              trend="View sales report"
              trendColor="text-neutral-500"
            />
          </div>
        </section>

        {/* Charts and Recent Activity */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          {/* Sales Overview Chart */}
          <div className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-neutral-200/80 hover:shadow-md transition-shadow duration-300 ease-out">
            <h2 className="text-xl font-semibold text-neutral-800 mb-6">
              Sales Overview
            </h2>
            <div className="h-30 bg-neutral-50/70 rounded-xl flex items-center justify-center border border-neutral-200/60">
              <SalesChart />
            </div>
          </div>

          {/* Recent Activity Feed */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-neutral-200/80 hover:shadow-md transition-shadow duration-300 ease-out flex flex-col">
            <h1 className="text-xl font-semibold text-neutral-800 mb-6">
              Recent Activity
            </h1>
            <div className="flex-grow overflow-y-auto mb-4">
              <AnimatedList className="space-y-5 w-full">
                {initialActivityItems.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start space-x-4 group p-2 -m-2 rounded-lg hover:bg-neutral-50/80 transition-colors duration-200 w-full"
                  >
                    <div
                      className={`flex-shrink-0 w-10 h-10 ${item.bgColor} rounded-full flex items-center justify-center transition-colors duration-300`}
                    >
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <p
                        className={`text-sm font-medium text-neutral-700 ${item.hoverTextColor} transition-colors duration-300`}
                      >
                        {item.title}
                      </p>
                      <p className="text-xs text-neutral-500">
                        {item.subtitle}
                      </p>
                    </div>
                  </li>
                ))}
              </AnimatedList>
            </div>
            <button className="w-full text-sm text-indigo-600 font-medium hover:text-indigo-700 transition-colors duration-300 py-2.5 rounded-lg hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-300 mt-auto border-t border-neutral-200 pt-4">
              View all activity
            </button>
          </div>
        </section>

        {/* Additional Widgets Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-neutral-800 mb-6">
            More Insights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {insightWidgets.map((widget, index) => (
              <div
                key={index}
                className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-neutral-200/80 hover:shadow-md transition-shadow duration-300 ease-out"
              >
                <h3 className="text-lg font-medium text-neutral-700 mb-4">
                  {widget.title}
                </h3>
                <div className="h-48 bg-neutral-50/70 rounded-xl flex items-center justify-center border border-neutral-200/60">
                  <p className="text-sm text-neutral-500">
                    {widget.placeholder}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default SellerDashboardPage;
