import { useSession } from "@/context/session-context";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  ShoppingBag,
  Users,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const location = useLocation();
  const { user, logout } = useSession();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path);
  };

  const handleLogout = async () => {
    await logout();
    setIsMobileMenuOpen(false);
    navigate("/admin/login");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

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
  }, [isMobileMenuOpen]);

  const navLinks = [
    {
      path: "/admin/dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard size={20} className="mr-2" />,
    },
    {
      path: "/admin/users",
      label: "Users",
      icon: <Users size={20} className="mr-2" />,
    },
    {
      path: "/admin/products",
      label: "Products",
      icon: <ShoppingBag size={20} className="mr-2" />,
    },

    {
      path: "/admin/settings",
      label: "Settings",
      icon: <Settings size={20} className="mr-2" />,
    },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 w-full z-40 bg-gradient-to-r from-slate-900 to-slate-800 shadow-lg"
    >
      <div className="max-w-full mx-auto flex items-center justify-between px-4 sm:px-6 md:px-5 py-3">
        <div className="flex items-center">
          <Link to="/admin/dashboard">
            <motion.h3
              whileHover={{ scale: 1.05 }}
              className="text-3xl sm:text-4xl font-semibold font-montserrat tracking-tight cursor-pointer text-white flex items-baseline"
            >
              <span className="text-indigo-400 font-bold">Maal</span>
              <span className="text-lime-400 font-bold">elo</span>
              <span className="text-sky-400 font-thin ml-2 text-xl">Admin</span>
            </motion.h3>
          </Link>
        </div>

        <ul className="hidden md:flex space-x-6 items-center justify-center">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`transition-colors duration-200 px-3 py-2 rounded-md flex items-center ${
                  isActive(link.path)
                    ? "text-sky-300 bg-slate-700 font-medium"
                    : "text-slate-300 hover:text-sky-300 hover:bg-slate-700"
                }`}
              >
                {link.icon}
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {user && (
          <div className="hidden md:flex items-center space-x-4">
            <span className="text-slate-300">
              Welcome, {user.name || "Admin"}
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center text-slate-300 hover:text-red-400 transition-colors duration-200 px-3 py-2 rounded-md hover:bg-slate-700"
              title="Logout"
            >
              <LogOut size={20} className="mr-1" />
              Logout
            </button>
          </div>
        )}

        <div className="md:hidden flex items-center">
          <button
            ref={menuButtonRef}
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
            className="text-slate-300 hover:text-sky-300 p-2 rounded-md"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
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
          className="md:hidden bg-slate-800 shadow-lg absolute top-full left-0 w-full py-3 px-4 border-t border-slate-700"
        >
          <ul className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`block transition-colors duration-200 px-3 py-2 rounded-md text-lg flex items-center ${
                    isActive(link.path)
                      ? "text-sky-300 bg-slate-700 font-medium"
                      : "text-slate-300 hover:text-sky-300 hover:bg-slate-700"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.icon}
                  {link.label}
                </Link>
              </li>
            ))}
            {user && (
              <>
                <li className="border-t border-slate-700 pt-3 mt-3">
                  <span className="block px-3 py-2 text-slate-300 text-lg">
                    Welcome, {user.name || "Admin"}
                  </span>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center text-left text-lg text-red-400 hover:bg-slate-700 px-3 py-2 rounded-md transition-colors duration-200"
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

export default AdminNavbar;
