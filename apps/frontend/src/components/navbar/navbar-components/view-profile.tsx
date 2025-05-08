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
    <div className="p-1 relative border-black ">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger className="relative">
          <User
            className="border-2 rounded-full mt-1 border-black "
            size={34}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="absolute z-50 bg-white border rounded shadow-md p-2"
          sideOffset={100}
          side="left"
          align="end"
        >
          <DropdownMenuLabel className="text-lg">
            <span className="text-sm font-extralight">
              Signed in as <br></br>
            </span>
            <span className="text-lg font-normal ">{displayName}</span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => HandleProfileClick()}>
            <UserCog2></UserCog2>Profile
          </DropdownMenuItem>
          {user !== undefined && user?.role != "seller" && (
            <DropdownMenuItem onClick={() => navigate("/cartItems")}>
              <Wallet2></Wallet2>Billing
            </DropdownMenuItem>
          )}

          <DropdownMenuItem onClick={() => navigate("/orderHistory")}>
            <Truck></Truck>Orders
          </DropdownMenuItem>

          <DropdownMenuItem onClick={HandleSignOut}>
            <LogOut></LogOut>SignOut
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ViewProfile;
