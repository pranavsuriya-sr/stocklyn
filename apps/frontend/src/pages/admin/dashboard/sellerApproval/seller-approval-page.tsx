import { adminRoute } from "@/api/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Check, X } from "lucide-react";

const statusColorMap = {
  pending: "bg-[#8b5cf6] hover:bg-[#7c3aed]",
  approved: "bg-[#10b981] hover:bg-[#059669]",
  rejected: "bg-red-500 hover:bg-red-600",
};

interface Seller {
  id: string;
  name: string;
  email: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

const SellerApprovalPage = () => {
  const queryClient = useQueryClient();

  const fetchUnapprovedSellers = async () => {
    const response = await adminRoute.get("/approval/unapprovedSellers");
    return response.data;
  };

  const { data, isLoading } = useQuery<Seller[]>({
    queryKey: ["unapprovedSellers"],
    queryFn: fetchUnapprovedSellers,
  });

  const updateSellerStatusMutation = useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: string;
      status: "approved" | "rejected";
    }) => {
      return adminRoute.patch(`/approval/seller/${id}`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["unapprovedSellers"],
      });
    },
  });

  const handleApprove = (id: string) => {
    updateSellerStatusMutation.mutate({ id, status: "approved" });
  };

  const handleReject = (id: string) => {
    updateSellerStatusMutation.mutate({ id, status: "rejected" });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white p-8 font-sans">
        <Card className="bg-[#0a0a0a] border border-neutral-800 text-white">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              Seller Approval Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center p-4 rounded-lg bg-[#1f1f1f] border-b border-neutral-800">
                <div className="w-1/4">
                  <Skeleton className="h-4 w-20" />
                </div>
                <div className="w-1/4">
                  <Skeleton className="h-4 w-24" />
                </div>
                <div className="w-1/6">
                  <Skeleton className="h-4 w-16" />
                </div>
                <div className="w-1/6">
                  <Skeleton className="h-4 w-20" />
                </div>
                <div className="w-1/4 text-center">
                  <Skeleton className="h-4 w-16 mx-auto" />
                </div>
              </div>
              <div className="space-y-2">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center p-4 rounded-lg bg-[#0a0a0a] border border-neutral-800"
                  >
                    <div className="w-1/4 space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-4 w-48" />
                    </div>
                    <div className="w-1/4">
                      <Skeleton className="h-4 w-40" />
                    </div>
                    <div className="w-1/6">
                      <Skeleton className="h-8 w-24" />
                    </div>
                    <div className="w-1/6">
                      <Skeleton className="h-4 w-24" />
                    </div>
                    <div className="w-1/4 flex justify-center space-x-2">
                      <Skeleton className="h-8 w-8" />
                      <Skeleton className="h-8 w-8" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-8 font-sans mt-16">
      <Card className="bg-[#0a0a0a] border border-neutral-800 text-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Approve Seller Requests
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center p-4 rounded-lg bg-[#1f1f1f] border-b border-neutral-800">
              <div className="w-1/3 font-semibold text-[#a1a1aa]">Seller</div>
              <div className="w-1/3 font-semibold text-[#a1a1aa]">Status</div>
              <div className="w-1/6 font-semibold text-[#a1a1aa]">Date</div>
              <div className="w-1/4 font-semibold text-[#a1a1aa] text-center">
                Actions
              </div>
            </div>

            <div className="space-y-2">
              {data?.map((seller: Seller) => (
                <div
                  key={seller.id}
                  className="flex items-center p-4 rounded-lg bg-[#0a0a0a] border border-neutral-800 hover:bg-[#1f1f1f] transition-colors duration-200"
                >
                  <div className="w-1/3 flex items-center">
                    <div>
                      <div className="font-medium">{seller.name}</div>
                      <div className="text-sm text-[#a1a1aa]">
                        {seller.email}
                      </div>
                    </div>
                  </div>
                  <div className="w-1/3">
                    <Badge
                      className={`${
                        statusColorMap[
                          seller.status as keyof typeof statusColorMap
                        ]
                      } text-white`}
                    >
                      {seller.status}
                    </Badge>
                  </div>
                  <div className="w-1/6 text-sm text-[#a1a1aa]">
                    {new Date(seller.createdAt).toLocaleDateString()}
                  </div>
                  <div className="w-1/4 flex justify-center space-x-2">
                    {seller.status === "pending" && (
                      <>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-green-400 hover:bg-green-400"
                          onClick={() => handleApprove(seller.id)}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-400 hover:bg-red-400"
                          onClick={() => handleReject(seller.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SellerApprovalPage;
