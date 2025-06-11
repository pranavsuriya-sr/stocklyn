import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const managementCards = [
  {
    title: "Category Approvals",
    description: "Review and manage new category requests.",
    count: 3,
    link: "/admin/categoryApproval",
    accentColor: "sky",
  },
  {
    title: "Product Verification",
    description: "Verify new products submitted by sellers.",
    count: 12,
    link: "/admin/approvals/products",
    accentColor: "emerald",
  },
  {
    title: "User Reports",
    description: "Address reports and complaints from users.",
    count: 5,
    link: "/admin/reports/users",
    accentColor: "violet",
  },
  {
    title: "Seller Applications",
    description: "Approve or deny new seller registrations.",
    count: 2,
    link: "/admin/applications/sellers",
    accentColor: "sky",
  },
  {
    title: "Approved Sellers",
    description: "Approve or deny new seller registrations.",
    count: 2,
    link: "/admin/approveSellers",
    accentColor: "sky",
  },
];

const AdminDashboardPage = () => {
  return (
    <div className="min-h-screen bg-black text-white font-sans mt-16">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-neutral-400 mt-1">
            Overview and management of your platform.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {managementCards.map((card) => (
              <Link to={card.link} key={card.title}>
                <Card className="bg-neutral-950 border-neutral-800 text-white h-full transition-all duration-300 hover:border-sky-500/50 hover:shadow-[0_0_20px_rgba(14,165,233,0.2)]">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-lg">{card.title}</CardTitle>
                    <Badge
                      className={`bg-${card.accentColor}-500/10 text-${card.accentColor}-400 border-${card.accentColor}-500/20`}
                    >
                      {card.count} Pending
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-neutral-400 text-sm mb-4">
                      {card.description}
                    </p>
                    <div className="flex items-center text-sm text-sky-400 font-medium">
                      <span>Go to page</span>
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="lg:col-span-1">
            <Card className="bg-neutral-950 border-neutral-800 text-white h-full shadow-[0_0_20px_rgba(148,163,184,0.1)]">
              <CardHeader>
                <CardTitle>Upcoming Features</CardTitle>
                <CardDescription className="text-neutral-400 pt-2">
                  More dashboard widgets are coming soon.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-4 text-neutral-300">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-sky-500 animate-pulse"></div>
                    <span>User Management</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span>Content Moderation</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-500 animate-pulse"></div>
                    <span>Platform Analytics</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
