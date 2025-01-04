import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./pages/auth/login";
import SignUp from "./pages/auth/sign-up";
import Home from "./pages/home/home";
import LandingPage from "./pages/landing/landing-page";
import ProtectedPage from "./pages/protected/ProtectedPage";

const App = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const quotes = [
    "Shop the best deals today! 🛍️",
    "Find your perfect match. ❤️",
    "Unbeatable prices, just for you. 💸",
    "Discover the latest trends. 🌟",
    "Your one-stop shop for everything. 🏬",
    "Quality products at great prices. 🏷️",
    "Shop smart, live better. 🧠",
    "Exclusive offers just for you. 🎁",
    "The best products, just a click away. 🖱️",
    "Your satisfaction, our priority. 👍",
    "Experience the difference. ✨",
    "Shop with confidence. 🛒",
    "Deals you can't resist. 🔥",
    "Your favorite brands, all in one place. 🏷️",
    "Savings that make you smile. 😊",
    "Shop now, thank us later. 🙌",
    "The future of shopping is here. 🚀",
    "Get more for less. 💰",
    "Your dream products await. 🌈",
    "Shop till you drop. 🛍️",
  ];

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [location]);
  //commit check

  return (
    <>
      {loading && (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">
          <p className="text font-semibold">
            <Loader className="animate-spin stroke-zinc-800" size={36} />
          </p>
          <span className="pt-10 font-mono text-xl text-gray-700 italic">
            {quotes[Math.floor(Math.random() * quotes.length)]}
          </span>
        </div>
      )}
      <Routes>
        <Route
          path="/home"
          element={
            <ProtectedPage>
              <Home />
            </ProtectedPage>
          }
        />
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
};

export default App;
