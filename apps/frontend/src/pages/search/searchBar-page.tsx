import { productRoute } from "@/api/api";
import { Input } from "@/components/ui/input";
import { ProductsType } from "@/types/product-type";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { LoaderCircle, LucideSearch } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

interface SearchBarProps {
  searchValue: string;
  setSearchValue: (value: string) => void;
}

const SearchBar = ({ searchValue, setSearchValue }: SearchBarProps) => {
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchValue), 300);
    return () => clearTimeout(timer);
  }, [searchValue]);

  const { data: searchSuggestions, isLoading } = useQuery({
    queryKey: ["searchSuggestions", debouncedSearch],
    queryFn: async () => {
      if (!debouncedSearch) {
        return [];
      }
      const response = await productRoute.get(
        `/search?searchValue=${debouncedSearch}`
      );
      return response.data;
    },
    staleTime: 5000,
    enabled: !!searchValue,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const HandleRouteToSearchPage = (id: string) => {
    setShowSuggestions(false);
    setSearchValue("");
    navigate(`/searchResults/${id}`, { state: searchSuggestions });
  };

  return (
    <div
      className="relative flex items-center hover:cursor-pointer w-full"
      ref={searchRef}
    >
      <div className="relative w-full flex items-center">
        <Input
          className="pl-10 pr-4 py-2 w-full border-gray-200 bg-gray-50 focus:bg-white rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 transition-all duration-200"
          onChange={(e) => setSearchValue(e.target.value)}
          value={searchValue}
          onFocus={() => setShowSuggestions(true)}
          name="search"
          placeholder="Search products..."
        />
        <LucideSearch
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={18}
        />

        {searchValue && (
          <button
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            onClick={() => setSearchValue("")}
          >
            <span className="sr-only">Clear search</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        )}
      </div>
      <AnimatePresence>
        {showSuggestions && (
          <motion.div
            className="absolute left-0 right-0 top-full mt-1 bg-white shadow-lg rounded-lg overflow-hidden z-50 border border-gray-100"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            {isLoading ? (
              <div className="p-4 flex justify-center">
                <LoaderCircle className="animate-spin text-indigo-500" />
              </div>
            ) : searchSuggestions?.length > 0 ? (
              <div className="max-h-72 overflow-y-auto">
                {searchSuggestions.map((suggestion: ProductsType) => (
                  <div
                    key={suggestion.id}
                    onClick={() => HandleRouteToSearchPage(suggestion.id)}
                    className="p-3 flex items-center gap-3 hover:bg-indigo-50 transition-colors duration-150 border-b border-gray-100 last:border-0"
                  >
                    <img
                      className="text-indigo-400 flex-shrink-0 w-14 h-14 rounded-lg"
                      src={suggestion.displayImage}
                    />
                    <span className="text-gray-700 truncate">
                      {suggestion.name.substring(0, 100)}
                    </span>
                  </div>
                ))}
              </div>
            ) : searchValue ? (
              <div className="p-4 text-center text-gray-500">
                No products found matching "{searchValue}"
              </div>
            ) : (
              <></>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
