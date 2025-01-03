import { useSession } from "@/context/session-context";
import { cn } from "@/lib/utils";
import { supabaseClient } from "@/utils/supabase-client";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const { session } = useSession();

  const handleSignOut = async () => {
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
        "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4",
        "bg-white/70 backdrop-blur-lg shadow-lg text-gray-800 h-30"
      )}
    >
      {/* Logo */}
      <h3
        className="scroll-m-20 text-3xl font-semibold tracking-tight cursor-pointer"
        onClick={() => navigate("/")}
      >
        Stocklyn
      </h3>

      {/* Navigation Links */}
      <ul className="flex space-x-8">
        <li>
          <Link
            to="/home"
            className="text-md font-medium hover:text-blue-600 transition-colors"
          >
            Home
          </Link>
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
        <button onClick={() => handleSignOut()}>SignOut</button>
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
