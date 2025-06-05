import { adminRoute } from "@/api/api";
import { useSession } from "@/context/session-context";
import { useQuery } from "@tanstack/react-query";
import {
  ShoppingCart,
  TrendingUp,
  UserCheck,
  UserPlus,
  Users,
} from "lucide-react";

interface StatData {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: string;
  activeToggle?: "24h" | "7d";
}

const UserAnalyticsPage = () => {
  const { user } = useSession();

  const getUsers = async () => {
    const response = await adminRoute.get(`/users/analytics/${user?.id}`);
    return response.data;
  };

  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(),
  });

  const stats: StatData[] = [
    {
      title: "Total Users",
      value: users?.userCount,
      icon: <Users size={20} className="text-neutral-400" />,
      trend: "+15%",
    },
    {
      title: "Active Users (24h)",
      value: users?.activeUsers24h,
      icon: <UserCheck size={20} className="text-neutral-400" />,
      trend: "+5%",
      activeToggle: "24h",
    },
    {
      title: "Sellers",
      value: users?.sellerCount,
      icon: <ShoppingCart size={20} className="text-neutral-400" />,
      trend: "+2%",
    },
    {
      title: "Buyers",
      value: users?.buyerCount,
      icon: <Users size={20} className="text-neutral-400" />,
      trend: "+12%",
    },
    {
      title: "New Signups (Week)",
      value: users?.newSignups,
      icon: <UserPlus size={20} className="text-neutral-400" />,
      trend: "+20%",
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-4 sm:p-6 lg:p-8 mt-16">
      <header className="mb-10">
        <h1 className="text-3xl font-semibold text-white">
          User Analytics & Management
        </h1>
        <p className="text-sm text-neutral-400 mt-1.5">
          Overview of user activity and platform engagement.
        </p>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mb-10">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            trend={stat.trend}
            activeToggle={stat.activeToggle}
          />
        ))}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-neutral-900 border border-neutral-800 p-6 rounded-lg transition-all duration-300 hover:shadow-[0_0_15px_1px_rgba(14,165,233,0.2)]">
          <h2 className="text-xl font-semibold mb-4 text-white">
            User Activity Feed (Placeholder)
          </h2>
          <p className="text-neutral-400">
            Recent user actions will appear here...
          </p>
        </div>
        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-lg transition-all duration-300 hover:shadow-[0_0_15px_1px_rgba(14,165,233,0.2)]">
          <h2 className="text-xl font-semibold mb-4 text-white">
            User Demographics (Placeholder)
          </h2>
          <p className="text-neutral-400">
            Charts and graphs will display here...
          </p>
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: string;
  activeToggle?: "24h" | "7d";
  onMoreInfo?: () => void;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  trend,
  activeToggle,
  onMoreInfo,
}) => {
  const trendColor = trend?.startsWith("+")
    ? "text-emerald-500"
    : "text-red-500";

  return (
    <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-lg transition-all duration-300 hover:shadow-[0_0_15px_1px_rgba(14,165,233,0.2)] group">
      <div className="flex items-start justify-between mb-3">
        <div className="p-2 bg-neutral-800 border border-neutral-700 rounded-md group-hover:border-sky-500/50 transition-colors duration-300">
          {icon}
        </div>
        {trend && (
          <span
            className={`text-xs font-medium ${trendColor} bg-opacity-10 px-2 py-0.5 rounded-full`}
          >
            {trend}
          </span>
        )}
      </div>
      <div>
        <p className="text-sm text-neutral-400 mb-0.5">{title}</p>
        <h3 className="text-2xl font-semibold text-white">{value}</h3>
      </div>

      {title.includes("Active Users") && (
        <div className="mt-3.5 text-xs flex items-center space-x-1">
          <button
            className={`px-2 py-1 rounded-md transition-colors duration-200 ${activeToggle === "24h" ? "bg-sky-500 text-white" : "bg-neutral-700 hover:bg-neutral-600 text-neutral-300"}`}
          >
            24h
          </button>
          <button
            className={`px-2 py-1 rounded-md transition-colors duration-200 ${activeToggle === "7d" ? "bg-sky-500 text-white" : "bg-neutral-700 hover:bg-neutral-600 text-neutral-300"}`}
          >
            7d
          </button>
        </div>
      )}

      {onMoreInfo && (
        <button
          onClick={onMoreInfo}
          className="mt-4 text-xs text-sky-500 hover:text-sky-400 transition-colors duration-200 flex items-center group"
        >
          More Info{" "}
          <TrendingUp
            className="ml-1.5 group-hover:translate-x-0.5 transition-transform duration-200"
            size={14}
          />
        </button>
      )}
    </div>
  );
};

export default UserAnalyticsPage;
