import { adminRoute } from "@/api/api";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

type User = {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Buyer" | "Seller";
  createdAt: string;
  isPremium: boolean;
};

const TotalUsersDisplay = () => {
  const getUsers = async ({ pageParam }: { pageParam: number }) => {
    const response = await adminRoute.get(
      `/users/allUsersInfo?page=${pageParam}`
    );
    return response.data;
  };

  const {
    data: users,
    status,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["getUsersInfo"],
    queryFn: getUsers,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 10) {
        return undefined;
      }
      return allPages.length;
    },
  });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  //Fix the last page issue, idk what to do. It's not working.
  return (
    <div className="min-h-screen bg-black text-white mt-16 px-10">
      <div>
        <div className="py-8">
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-neutral-400 mt-2 text-sm">
            A dense, minimal interface for managing system users.
          </p>
        </div>

        <div className="border border-neutral-800 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-[#0a0a0a]">
              <thead className="border-b border-neutral-800">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-semibold text-neutral-400 uppercase tracking-wider"
                  >
                    ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-semibold text-neutral-400 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-semibold text-neutral-400 uppercase tracking-wider"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-semibold text-neutral-400 uppercase tracking-wider"
                  >
                    Role
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-semibold text-neutral-400 uppercase tracking-wider"
                  >
                    Created At
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-semibold text-neutral-400 uppercase tracking-wider"
                  >
                    Premium User
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-semibold text-neutral-400 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                {status === "success" &&
                  users?.pages.map((page) =>
                    page.map((user: User) => (
                      <tr
                        key={user.id}
                        className="hover:bg-[#111] transition-colors duration-200 group"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500 font-mono border-l-2 border-transparent group-hover:border-indigo-500 transition-colors duration-200">
                          {user.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                          {user.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-400">
                          {user.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-400">
                          {user.role}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-400">
                          {new Date(user.createdAt).toLocaleDateString(
                            undefined,
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-400 text-center">
                          {user.isPremium ? "Yes" : "No"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium space-x-2">
                          <button className="px-4 py-1.5 text-xs font-medium border rounded-md text-neutral-300 border-neutral-700 hover:border-indigo-500/80 hover:text-white transition-all duration-300 hover:shadow-[0_0_15px_-3px_rgba(130,100,246,0.3)]">
                            View
                          </button>
                          <button className="px-4 py-1.5 text-xs font-medium border rounded-md text-neutral-300 border-neutral-700 hover:border-indigo-500/80 hover:text-white transition-all duration-300 hover:shadow-[0_0_15px_-3px_rgba(130,100,246,0.3)]">
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
              </tbody>
            </table>
          </div>
        </div>
        <div ref={ref} className="h-10" />
      </div>
    </div>
  );
};

export default TotalUsersDisplay;
