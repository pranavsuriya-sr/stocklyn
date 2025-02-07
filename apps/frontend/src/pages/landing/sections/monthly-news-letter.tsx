import { Button } from "@/components/ui/button";
import exchange from "../../../assets/exchange_icon.png";
import quality from "../../../assets/quality_icon.png";
import support from "../../../assets/support_img.png";

const MonthlyNewsLetter = () => {
  return (
    <div className="min-w-full bg-white py-12 flex flex-col items-center font-montserrat my-20 overflow-hidden">
      <div className="flex flex-col md:flex-row justify-center gap-48 text-center mb-10">
        <div className="flex flex-col items-center">
          <img
            src={exchange}
            alt="Exchange Policy"
            className="w-12 h-12 mb-3"
          />
          <h3 className="text-lg font-semibold">Easy Exchange Policy</h3>
          <p className="text-gray-500">We offer hassle free exchange policy</p>
        </div>

        <div className="flex flex-col items-center">
          <img src={quality} alt="Return Policy" className="w-12 h-12 mb-3" />
          <h3 className="text-lg font-semibold">7 Days Return Policy</h3>
          <p className="text-gray-500">We provide 7 days free return policy</p>
        </div>

        <div className="flex flex-col items-center">
          <img
            src={support}
            alt="Customer Support"
            className="w-12 h-12 mb-3"
          />
          <h3 className="text-lg font-semibold">Best Customer Support</h3>
          <p className="text-gray-500">We provide 24/7 customer support</p>
        </div>
      </div>

      <div className="text-center mt-10">
        <h2 className="text-xl font-semibold">Subscribe now & get 20% off</h2>
        <p className="text-gray-500 max-w-lg mx-auto mt-2">
          Buy more to save more
        </p>

        <div className="mt-4 flex items-center border rounded-md overflow-hidden max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-2 outline-none"
          />
          <Button className=" text-white px-4 py-3" variant={"indigo"}>
            SUBSCRIBE
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MonthlyNewsLetter;
