import { useSession } from "@/context/session-context"; // Assuming you might want to use session info
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

const SellerNavbar = () => {
  const location = useLocation();
  const { user } = useSession();

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path);
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 w-full z-40 bg-gradient-to-r from-white to-gray-50 shadow-md backdrop-blur-sm"
    >
      <div className="max-w-full mx-auto flex items-center justify-between px-4 sm:px-6 md:px-5 py-3">
        <div className="flex items-center">
          <Link to="/seller/dashboard">
            <motion.h3
              whileHover={{ scale: 1.05 }}
              className="text-3xl sm:text-4xl font-semibold font-montserrat tracking-tight cursor-pointer text-gray-800 flex items-baseline"
            >
              <span className="text-indigo-600 font-bold ">Maal</span>
              <span className="text-lime-500 font-bold">elo</span>
              <span className="text-red-500 font-thin ml-2">Seller</span>
            </motion.h3>
          </Link>
        </div>

        <ul className="hidden md:flex space-x-6 items-center justify-center">
          <li>
            <Link
              to="/seller/dashboard"
              className={`transition-colors duration-200 px-3 py-2 rounded-md ${
                isActive("/seller/dashboard")
                  ? "text-indigo-700 bg-indigo-50 font-medium"
                  : "text-gray-600 hover:text-indigo-600 hover:bg-gray-50"
              }`}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/seller/about"
              className={`transition-colors duration-200 px-3 py-2 rounded-md ${
                isActive("/seller/about")
                  ? "text-indigo-700 bg-indigo-50 font-medium"
                  : "text-gray-600 hover:text-indigo-600 hover:bg-gray-50"
              }`}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/seller/sell"
              className={`transition-colors duration-200 px-3 py-2 rounded-md ${
                isActive("/seller/sell")
                  ? "text-indigo-700 bg-indigo-50 font-medium"
                  : "text-gray-600 hover:text-indigo-600 hover:bg-gray-50"
              }`}
            >
              Sell
            </Link>
          </li>
          <li>
            <Link
              to="/seller/policy"
              className={`transition-colors duration-200 px-3 py-2 rounded-md ${
                isActive("/seller/policy")
                  ? "text-indigo-700 bg-indigo-50 font-medium"
                  : "text-gray-600 hover:text-indigo-600 hover:bg-gray-50"
              }`}
            >
              Policies
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className={`transition-colors duration-200 px-3 py-2 rounded-md ${
                isActive("/contact")
                  ? "text-indigo-700 bg-indigo-50 font-medium"
                  : "text-gray-600 hover:text-indigo-600 hover:bg-gray-50"
              }`}
            >
              Contact
            </Link>
          </li>
        </ul>

        {user && (
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Welcome, {user.name}</span>
          </div>
        )}
      </div>
    </motion.nav>
  );
};

export default SellerNavbar;
