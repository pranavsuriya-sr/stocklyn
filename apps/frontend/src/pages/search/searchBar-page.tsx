import { productRoute } from "@/api/api";
import { Input } from "@/components/ui/input";
import { ProductsType } from "@/types/product-type";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { LoaderCircle, LucideSearch, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface SearchBarProps {
  searchValue: string;
  setSearchValue: (value: string) => void;
}

const SearchBar = ({ searchValue, setSearchValue }: SearchBarProps) => {
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

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

  return (
    <div
      className="relative flex items-center hover:cursor-pointer"
      ref={searchRef}
    >
      <Input
        className="border-black w-96"
        onChange={(e) => setSearchValue(e.target.value)}
        value={searchValue}
        onFocus={() => setShowSuggestions(true)}
      />

      <AnimatePresence>
        {showSuggestions && searchSuggestions?.length > 0 && (
          <motion.div
            className="absolute left-0 top-full mt-1 w-96 bg-white shadow-md rounded-md z-50"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            {isLoading ? (
              <div className="p-3 flex justify-center">
                <LoaderCircle className="animate-spin" />
              </div>
            ) : (
              searchSuggestions.map((suggestion: ProductsType) => (
                <div
                  key={suggestion.id}
                  className="p-2 px-3 flex items-center gap-2 hover:bg-gray-100"
                >
                  <Search className="text-gray-400" />
                  {suggestion.name.substring(0, 33)}
                </div>
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="border border-black rounded-lg p-1.5">
        <LucideSearch />
      </div>
    </div>
  );
};

export default SearchBar;
