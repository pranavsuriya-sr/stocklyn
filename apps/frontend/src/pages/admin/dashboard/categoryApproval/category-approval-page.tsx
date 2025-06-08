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
interface CategoryApproval {
  id: string;
  reason: string;
  categoryName: string;
  estimatedProducts: number;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  user: {
    name: string;
    email: string;
  };
}

const CategoryApprovalPage = () => {
  const queryClient = useQueryClient();

  const fetchCategoryApprovals = async () => {
    const response = await adminRoute.get("/approval/category");
    return response.data;
  };

  const { data, isLoading } = useQuery<CategoryApproval[]>({
    queryKey: ["category-approval-requests"],
    queryFn: fetchCategoryApprovals,
  });

  const updateRequestStatusMutation = useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: string;
      status: "approved" | "rejected";
    }) => {
      return adminRoute.patch(`/approval/category/${id}`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["category-approval-requests"],
      });
    },
  });

  const handleApprove = (id: string) => {
    updateRequestStatusMutation.mutate({ id, status: "approved" });
  };

  const handleReject = (id: string) => {
    updateRequestStatusMutation.mutate({ id, status: "rejected" });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white p-8 font-sans">
        <Card className="bg-[#0a0a0a] border border-neutral-800 text-white">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              Approval Requests
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
            Approve Category Requests
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center p-4 rounded-lg bg-[#1f1f1f] border-b border-neutral-800">
              <div className="w-1/4 font-semibold text-[#a1a1aa]">User</div>
              <div className="w-1/4 font-semibold text-[#a1a1aa]">
                Category Name
              </div>
              <div className="w-1/4 font-semibold text-[#a1a1aa]">Reason</div>
              <div className="w-1/6 font-semibold text-[#a1a1aa]">Status</div>
              <div className="w-1/6 font-semibold text-[#a1a1aa]">Date</div>
              <div className="w-1/4 font-semibold text-[#a1a1aa] text-center">
                Actions
              </div>
            </div>

            <div className="space-y-2">
              {data?.map((request: CategoryApproval) => (
                <div
                  key={request.id}
                  className="flex items-center p-4 rounded-lg bg-[#0a0a0a] border border-neutral-800 hover:bg-[#1f1f1f] transition-colors duration-200"
                >
                  <div className="w-1/4 flex items-center">
                    <div>
                      <div className="font-medium">{request.user.name}</div>
                      <div className="text-sm text-[#a1a1aa]">
                        {request.user.email}
                      </div>
                    </div>
                  </div>
                  <div className="w-1/4 text-sm">{request.categoryName}</div>
                  <div className="w-1/4 text-sm">
                    {request.reason.substring(0, 20)}...
                  </div>
                  <div className="w-1/6">
                    <Badge
                      className={`${
                        statusColorMap[
                          request.status as keyof typeof statusColorMap
                        ]
                      } text-white`}
                    >
                      {request.status}
                    </Badge>
                  </div>
                  <div className="w-1/6 text-sm text-[#a1a1aa]">
                    {new Date(request.createdAt).toLocaleDateString()}
                  </div>
                  <div className="w-1/4 flex justify-center space-x-2">
                    {request.status === "pending" && (
                      <>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-green-400 hover:bg-green-400"
                          onClick={() => handleApprove(request.id)}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-400 hover:bg-red-400"
                          onClick={() => handleReject(request.id)}
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

export default CategoryApprovalPage;
