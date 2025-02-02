import { Gift, Loader, ShoppingBag, Sparkles, Star } from "lucide-react";
import { useEffect, useState } from "react";

const LoadingPage = () => {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);
  const [shouldShow, setShouldShow] = useState(true);

  const MIN_DISPLAY_TIME = 800;

  const quotes = [
    "Shop the best deals today! 🛍️",
    "Find your perfect match. ❤️",
    "Unbeatable prices, just for you. 💸",
    "Discover the latest trends. 🌟",
    "Your one-stop shop for everything. 🏬",
    "Quality products at great prices. 🏷️",
    "Shop smart, live better. 🧠",
    "Exclusive offers just for you. 🎁",
  ];

  useEffect(() => {
    const timer = setTimeout(() => setShouldShow(false), MIN_DISPLAY_TIME);

    const quoteInterval = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => {
        setQuoteIndex((prev) => (prev + 1) % quotes.length);
        setFadeIn(true);
      }, 200);
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(quoteInterval);
    };
  }, []);

  if (!shouldShow) return null;

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 z-50">
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute animate-float opacity-20 
              ${i % 4 === 0 ? "text-blue-500" : ""}
              ${i % 4 === 1 ? "text-purple-500" : ""}
              ${i % 4 === 2 ? "text-pink-500" : ""}
              ${i % 4 === 3 ? "text-indigo-500" : ""}
            `}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 1}s`,
              animationDuration: `${1 + Math.random() * 2}s`,
            }}
          >
            {i % 4 === 0 && <ShoppingBag size={24} />}
            {i % 4 === 1 && <Star size={24} />}
            {i % 4 === 2 && <Gift size={24} />}
            {i % 4 === 3 && <Sparkles size={24} />}
          </div>
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center space-y-8">
        <div className="relative">
          <div className="absolute -inset-4 animate-glow rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-75 blur-xl" />
          <Loader
            className="relative animate-expand-spin text-white"
            size={48}
          />
        </div>

        <div className="relative">
          <div className="absolute -inset-4 rounded-lg bg-white/50 backdrop-blur-sm" />
          <p
            className={`relative text-xl font-medium text-gray-800 transition-opacity duration-200 animate-text-pulse ${
              fadeIn ? "opacity-100" : "opacity-0"
            }`}
          >
            {quotes[quoteIndex]}
          </p>
        </div>

        <div className="h-1 w-48 overflow-hidden rounded-full bg-gray-200">
          <div className="h-full animate-progress bg-gradient-to-r from-blue-400 to-purple-400" />
        </div>
      </div>
    </div>
  );
};

const style = document.createElement("style");
style.textContent = `
  @keyframes float {
    0%, 100% { transform: translateY(0) rotate(0); }
    50% { transform: translateY(-15px) rotate(5deg); }
  }
  @keyframes progress {
    0% { width: 0%; }
    100% { width: 100%; }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes glow {
    0%, 100% { opacity: 0.5; }
    50% { opacity: 1; }
  }
  @keyframes expand-spin {
    0% { transform: scale(1) rotate(0deg); }
    50% { transform: scale(1.2) rotate(180deg); }
    100% { transform: scale(1) rotate(360deg); }
  }
  @keyframes text-pulse {
    0%, 100% { transform: scale(1); opacity: 0.8; }
    50% { transform: scale(1.1); opacity: 1; }
  }
  .animate-float {
    animation: float 1.5s ease-in-out infinite;
  }
  .animate-progress {
    animation: progress 0.8s linear infinite;
  }
  .animate-glow {
    animation: glow 1.5s ease-in-out infinite;
  }
  .animate-expand-spin {
    animation: expand-spin 1.5s ease-in-out infinite;
  }
  .animate-text-pulse {
    animation: text-pulse 1s ease-in-out infinite;
  }
`;
document.head.appendChild(style);

export default LoadingPage;
