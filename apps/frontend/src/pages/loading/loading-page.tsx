import { Loader } from "lucide-react";
const LoadingPage = () => {
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

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center  bg-white z-50">
      <p className="text font-semibold">
        <Loader className="animate-spin stroke-zinc-800" size={36} />
      </p>
      <span className="pt-10 font-mono text-xl text-white-700 italic">
        {quotes[Math.floor(Math.random() * quotes.length)]}
      </span>
    </div>
  );
};

export default LoadingPage;
