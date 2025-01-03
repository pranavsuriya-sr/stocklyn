import { useSession } from "@/context/session-context";
import { cn } from "@/lib/utils";
import { supabaseClient } from "@/utils/supabase-client";
import { ShoppingCart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const { session } = useSession();

  const HandleSignOut = async () => {
    const { error } = await supabaseClient.auth.signOut();

    if (error) {
      console.error("Error signing out: ", error.message);
      return;
    }
    navigate("/login");
  };

  return (
    <nav
      className={cn(
        " fixed top-5 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 border  mx-auto w-[75%] rounded-lg",
        "bg-white/70 backdrop-blur-md shadow-lg text-gray-800 h-25 sticky"
      )}
    >
      {/* Logo */}
      <Link to={"/"}>
        <h3
          className="scroll-m-20 text-3xl font-semibold tracking-tight cursor-pointer"
          onClick={() => navigate("/")}
        >
          Stocklyn
        </h3>
      </Link>

      {/* Navigation Links */}
      <ul className="flex space-x-8">
        <li>
          {session !== null && (
            <Link
              to="/home"
              className="text-md font-medium hover:text-blue-600 transition-colors"
            >
              Home
            </Link>
          )}
        </li>
        <li>
          <Link
            to="/about"
            className="text-md font-medium hover:text-blue-600 transition-colors"
          >
            About
          </Link>
        </li>
        <li>
          <Link
            to="/"
            className="text-md font-medium hover:text-blue-600 transition-colors"
          >
            Services
          </Link>
        </li>
        <li>
          <Link
            to="/"
            className="text-md font-medium hover:text-blue-600 transition-colors"
          >
            Contact
          </Link>
        </li>
      </ul>

      {session !== null && (
        <div className="flex space-x-4">
          <Link to="/">
            <button
              className={cn(
                "px-4 py-2 text-md font-medium ",
                "rounded-lg shadow hover:bg-blue-700 transition-colors"
              )}
            >
              <ShoppingCart />
            </button>
          </Link>
          <button
            className={cn(
              "px-4 py-2 text-md font-medium border border-blue-600 text-blue-600",
              "rounded-lg hover:bg-blue-600 hover:text-white transition-colors"
            )}
            onClick={() => HandleSignOut()}
          >
            SignOut
          </button>
        </div>
      )}

      {/* Action Buttons */}

      {session === null && (
        <div className="flex space-x-4">
          <button
            className={cn(
              "px-4 py-2 text-md font-medium bg-blue-600 text-white",
              "rounded-lg shadow hover:bg-blue-700 transition-colors"
            )}
            onClick={() => navigate("/login")}
          >
            Login
          </button>
          <button
            className={cn(
              "px-4 py-2 text-md font-medium border border-blue-600 text-blue-600",
              "rounded-lg hover:bg-blue-600 hover:text-white transition-colors"
            )}
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </button>
        </div>
      )}
    </nav>
  );
}
