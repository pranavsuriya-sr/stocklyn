import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { supabaseClient } from "@/utils/supabase-client";
import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ViewProfile = () => {
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
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <User />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
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
