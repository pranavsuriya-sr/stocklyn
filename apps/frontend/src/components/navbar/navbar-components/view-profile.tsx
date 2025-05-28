import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSession } from "@/context/session-context";
import { LogOut, Truck, User, UserCog2, Wallet2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ViewProfile = () => {
  const Capitalize = (displayName: string | undefined) => {
    if (displayName == undefined) {
      return displayName;
    }
    let capitalizedString =
      displayName.substring(0, 1).toUpperCase() +
      displayName.substring(1, displayName.length);

    return capitalizedString;
  };
  const { logout, user } = useSession();
  const displayName = Capitalize(user?.name);
  const navigate = useNavigate();

  const HandleSignOut = async () => {
    await logout();
    navigate("/login");
  };

  const HandleProfileClick = () => {
    navigate("/userprofile");
  };

  return (
    <div className="p-1 relative">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger className="relative">
          <User
            className="border rounded-full mt-1 border-gray-300 text-gray-700 hover:border-gray-400 transition-colors"
            size={34}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="absolute z-50 bg-white border border-gray-200 rounded shadow-md p-2"
          sideOffset={100}
          side="left"
          align="end"
        >
          <DropdownMenuLabel className="px-2 py-1.5">
            <span className="text-xs font-light text-gray-500 block">
              Signed in as
            </span>
            <span className="text-base font-medium text-gray-800">
              {displayName}
            </span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-gray-200 my-1" />
          <DropdownMenuItem
            onClick={() => HandleProfileClick()}
            className="flex items-center text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:text-gray-900 rounded px-2 py-1.5 text-sm cursor-pointer"
          >
            <UserCog2 size={16} className="text-gray-500 mr-2" />
            <span>Profile</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => navigate("/cartItems")}
            className="flex items-center text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:text-gray-900 rounded px-2 py-1.5 text-sm cursor-pointer"
          >
            <Wallet2 size={16} className="text-gray-500 mr-2" />
            <span>Billing</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => navigate("/orderHistory")}
            className="flex items-center text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:text-gray-900 rounded px-2 py-1.5 text-sm cursor-pointer"
          >
            <Truck size={16} className="text-gray-500 mr-2" />
            <span>Orders</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator className="bg-gray-200 my-1" />
          <DropdownMenuItem
            onClick={HandleSignOut}
            className="flex items-center text-red-600 hover:bg-red-50 focus:bg-red-50 focus:text-red-700 rounded px-2 py-1.5 text-sm cursor-pointer"
          >
            <LogOut size={16} className="text-red-500 mr-2" />
            <span>Sign Out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ViewProfile;
