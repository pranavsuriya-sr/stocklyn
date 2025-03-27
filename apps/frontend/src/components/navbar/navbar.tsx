import { useSession } from "@/context/session-context";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/utils/store/cart-store";
import { motion } from "framer-motion";
import { Menu, ShoppingCart, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../../pages/search/searchBar-page";
import { Badge } from "../ui/badge";
import ViewProfile from "./navbar-components/view-profile";

export default function Navbar() {
  const navigate = useNavigate();
  const { session, isLoading } = useSession();
  const [itemsCount, setItemsCount] = useState(0);
  const { GetCount } = useCartStore();
  const [selected, setSelected] = useState<string>("login");
  const [searchValue, setSearchValue] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  

  const currentPath = window.location.pathname;
  
  const isActive = (path : any) => {
    if (path === '/home' && currentPath === '/') return true;
    return currentPath === path || currentPath.startsWith(path);
  };

  useEffect(() => {
    setItemsCount(() => GetCount());
  }, [GetCount()]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 w-full z-40 bg-gradient-to-r from-white to-gray-50 shadow-md backdrop-blur-sm"
    >
      <div className="max-w-[100%] mx-auto flex items-center justify-between px-4 sm:px-6 md:px-5 py-3">
        <div className="flex items-center">
          <Link to={"/"}>
            <motion.h3
              whileHover={{ scale: 1.05 }}
              className="text-3xl sm:text-4xl font-semibold font-montserrat tracking-tight cursor-pointer text-gray-800"
            >
              <span className="text-indigo-600 font-bold">Maal</span>
              <span className="text-lime-500 font-bold">elo</span>
            </motion.h3>
          </Link>
        </div>

        {session && (
          <div className="hidden md:block flex-1 max-w-xl mx-4">
            <SearchBar
              searchValue={searchValue}
              setSearchValue={setSearchValue}
            />
          </div>
        )}

        <ul className="hidden md:flex space-x-6 items-center justify-center">
          <li>
            <Link 
              to="/home" 
              className={`transition-colors duration-200 px-3 py-2 rounded-md ${
                isActive('/home') 
                  ? "text-indigo-700 bg-indigo-50 font-medium" 
                  : "text-gray-600 hover:text-indigo-600 hover:bg-gray-50"
              }`}
            >
              Home
            </Link>
          </li>
          {session && (
            <li>
              <Link 
                to="/shop" 
                className={`transition-colors duration-200 px-3 py-2 rounded-md ${
                  isActive('/shop') 
                    ? "text-indigo-700 bg-indigo-50 font-medium" 
                    : "text-gray-600 hover:text-indigo-600 hover:bg-gray-50"
                }`}
              >
                Shop
              </Link>
            </li>
          )}
          <li>
            <Link
              to="/searchResults/you-won-the-search-lottery-congratulations-DM-me!-something-is-waiting-for-you"
              className={`transition-colors duration-200 px-3 py-2 rounded-md ${
                currentPath.includes('/searchResults') 
                  ? "text-indigo-700 bg-indigo-50 font-medium" 
                  : "text-gray-600 hover:text-indigo-600 hover:bg-gray-50"
              }`}
            >
              Search
            </Link>
          </li>
          <li>
            <Link 
              to="/about" 
              className={`transition-colors duration-200 px-3 py-2 rounded-md ${
                isActive('/about') 
                  ? "text-indigo-700 bg-indigo-50 font-medium" 
                  : "text-gray-600 hover:text-indigo-600 hover:bg-gray-50"
              }`}
            >
              About
            </Link>
          </li>
          <li>
            <Link 
              to="/contact" 
              className={`transition-colors duration-200 px-3 py-2 rounded-md ${
                isActive('/contact') 
                  ? "text-indigo-700 bg-indigo-50 font-medium" 
                  : "text-gray-600 hover:text-indigo-600 hover:bg-gray-50"
              }`}
            >
              Contact
            </Link>
          </li>
        </ul>

        {!isLoading ? (
          session ? (
            <div className="flex space-x-4 items-center">
              <div className="relative hover:cursor-pointer hover:bg-gray-100 rounded-full p-2">
                {itemsCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center">
                    {itemsCount}
                  </Badge>
                )}
                <ShoppingCart
                  size={30}
                  onClick={() => navigate("/cartitems")}
                />
              </div>
              <ViewProfile />
              <button 
                className="md:hidden rounded-md p-2 text-gray-600 hover:bg-gray-100 focus:outline-none"
                onClick={toggleMobileMenu}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          ) : (
            <div className="flex items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="hidden sm:flex space-x-4"
              >
                <button
                  className={cn(
                    "px-4 py-2 text-md font-medium rounded-lg shadow transition-all hover:scale-105",
                    selected === "login"
                      ? "bg-indigo-600 text-white"
                      : "border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white"
                  )}
                  onClick={() => {
                    setSelected("login");
                    navigate("/login");
                  }}
                >
                  Sign In
                </button>

                <button
                  className={cn(
                    "px-4 py-2 text-md font-medium rounded-lg transition-all hover:scale-105",
                    selected === "signup"
                      ? "bg-indigo-600 text-white"
                      : "border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white"
                  )}
                  onClick={() => {
                    setSelected("signup");
                    navigate("/signup");
                  }}
                >
                  Sign Up
                </button>
              </motion.div>
              <button 
                className="md:hidden rounded-md p-2 text-gray-600 hover:bg-gray-100 focus:outline-none"
                onClick={toggleMobileMenu}
              >
                <Menu size={24} />
              </button>
            </div>
          )
        ) : (
          <p className="text-gray-600">Loading...</p>
        )}
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white border-t shadow-md px-4 py-3"
        >
          {session && (
            <div className="mb-4">
              <SearchBar
                searchValue={searchValue}
                setSearchValue={setSearchValue}
              />
            </div>
          )}
          <ul className="flex flex-col space-y-3">
            <li>
              <Link 
                to="/home" 
                className={`block py-2 px-3 rounded-md ${
                  isActive('/home') 
                    ? "text-indigo-700 bg-indigo-50 font-medium" 
                    : "text-gray-600 hover:text-indigo-600"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            {session && (
              <li>
                <Link 
                  to="/shop" 
                  className={`block py-2 px-3 rounded-md ${
                    isActive('/shop') 
                      ? "text-indigo-700 bg-indigo-50 font-medium" 
                      : "text-gray-600 hover:text-indigo-600"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Shop
                </Link>
              </li>
            )}
            <li>
              <Link
                to="/searchResults/you-won-the-search-lottery-congratulations-DM-me!-something-is-waiting-for-you"
                className={`block py-2 px-3 rounded-md ${
                  currentPath.includes('/searchResults') 
                    ? "text-indigo-700 bg-indigo-50 font-medium" 
                    : "text-gray-600 hover:text-indigo-600"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Search
              </Link>
            </li>
            <li>
              <Link 
                to="/about" 
                className={`block py-2 px-3 rounded-md ${
                  isActive('/about') 
                    ? "text-indigo-700 bg-indigo-50 font-medium" 
                    : "text-gray-600 hover:text-indigo-600"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
            </li>
            <li>
              <Link 
                to="/contact" 
                className={`block py-2 px-3 rounded-md ${
                  isActive('/contact') 
                    ? "text-indigo-700 bg-indigo-50 font-medium" 
                    : "text-gray-600 hover:text-indigo-600"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </li>
            {!session && (
              <div className="flex flex-col sm:hidden space-y-2 pt-2 border-t">
                <button
                  className={cn(
                    "px-4 py-2 text-md font-medium rounded-lg shadow transition-all",
                    "bg-indigo-600 text-white"
                  )}
                  onClick={() => {
                    setSelected("login");
                    navigate("/login");
                    setMobileMenuOpen(false);
                  }}
                >
                  Sign In
                </button>
                <button
                  className={cn(
                    "px-4 py-2 text-md font-medium rounded-lg transition-all",
                    "border border-indigo-600 text-indigo-600"
                  )}
                  onClick={() => {
                    setSelected("signup");
                    navigate("/signup");
                    setMobileMenuOpen(false);
                  }}
                >
                  Sign Up
                </button>
              </div>
            )}
          </ul>
        </motion.div>
      )}
    </motion.nav>
  );
}
