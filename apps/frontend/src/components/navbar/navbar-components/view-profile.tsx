import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSession } from "@/context/session-context";
import { User } from "lucide-react";
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
          sideOffset={4}
        >
          <DropdownMenuLabel className="text-lg">
            Hello! {displayName}😄
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => HandleProfileClick()}>
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem onClick={HandleSignOut}>SignOut</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ViewProfile;
