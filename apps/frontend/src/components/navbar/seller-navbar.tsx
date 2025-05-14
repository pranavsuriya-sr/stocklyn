import { useSession } from "@/context/session-context"; // Assuming you might want to use session info
import { motion } from "framer-motion";
import { LogOut, Menu, X } from "lucide-react"; // Added Menu and X icons
import { useEffect, useRef, useState } from "react"; // Added useState and useRef
import { Link, useLocation, useNavigate } from "react-router-dom";

const SellerNavbar = () => {
  const location = useLocation();
  const { user, logout } = useSession();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null); // Ref for the mobile menu div
  const menuButtonRef = useRef<HTMLButtonElement>(null); // Ref for the mobile menu button

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path);
  };

  const handleLogout = async () => {
    await logout();
    setIsMobileMenuOpen(false); // Close mobile menu on logout
    navigate("/login");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Effect to handle click outside for mobile menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMobileMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]); // Re-run when isMobileMenuOpen changes

  const navLinks = [
    { path: "/seller/dashboard", label: "Dashboard" },
    { path: "/seller/about", label: "About" },
    { path: "/seller/sell", label: "Sell" },
    { path: "/seller/policy", label: "Policies" },
    { path: "/seller/contact", label: "Contact" },
  ];

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
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`transition-colors duration-200 px-3 py-2 rounded-md ${
                  isActive(link.path)
                    ? "text-indigo-700 bg-indigo-50 font-medium"
                    : "text-gray-600 hover:text-indigo-600 hover:bg-gray-50"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {user && (
          <div className="hidden md:flex items-center space-x-4">
            <span className="text-gray-600">Welcome, {user.name}</span>
            <LogOut
              size={24}
              onClick={handleLogout}
              className="hover:cursor-pointer text-gray-600 hover:text-red-500 transition-colors"
            />
          </div>
        )}

        <div className="md:hidden flex items-center">
          <button
            ref={menuButtonRef}
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X size={28} className="text-gray-700" />
            ) : (
              <Menu size={28} className="text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <motion.div
          ref={menuRef}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="md:hidden bg-white shadow-lg absolute top-full left-0 w-full py-3 px-4"
        >
          <ul className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`block transition-colors duration-200 px-3 py-2 rounded-md text-lg ${
                    isActive(link.path)
                      ? "text-indigo-700 bg-indigo-50 font-medium"
                      : "text-gray-700 hover:text-indigo-600 hover:bg-gray-100"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            {user && (
              <>
                <li className="border-t border-gray-200 pt-3 mt-3">
                  <span className="block px-3 py-2 text-gray-600 text-lg">
                    Welcome, {user.name}
                  </span>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center text-left text-lg text-red-600 hover:bg-red-50 px-3 py-2 rounded-md transition-colors duration-200"
                  >
                    <LogOut size={20} className="mr-2" />
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default SellerNavbar;
