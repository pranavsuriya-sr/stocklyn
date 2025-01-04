import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSession } from "@/context/session-context";
import { supabaseClient } from "@/utils/supabase-client";
import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ViewProfile = () => {
  const context = useSession();
  const displayName = context?.session?.user.user_metadata.display_name;
  const navigate = useNavigate();

  const HandleSignOut = async () => {
    const { error } = await supabaseClient.auth.signOut();
    if (error) {
      console.error("Error signing out: ", error.message);
      return;
    }

    navigate("/login");
  };

  return (
    <div className="p-1 relative">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger className="relative">
          <User className="border rounded-full mt-1" size={34} />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="absolute z-50 bg-white border rounded shadow-md p-2"
          sideOffset={4}
        >
          <DropdownMenuLabel className="text-lg">
            {displayName} Hello!😄
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem onClick={HandleSignOut}>SignOut</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ViewProfile;
