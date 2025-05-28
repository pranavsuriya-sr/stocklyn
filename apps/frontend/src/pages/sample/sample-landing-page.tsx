import landingPage from "@/assets/landingPage1.png";
import { AuroraText } from "@/components/magicui/aurora-text";
import { FlipText } from "@/components/magicui/flip-text";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { ShinyButton } from "@/components/magicui/shiny-button";
import { useNavigate } from "react-router-dom";

const SampleLandingPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <section className="relative w-full min-h-screen flex items-center justify-center bg-gray-100 mt-16">
        <img
          src={landingPage}
          alt="Maalelo platform interface"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />

        <div className="relative z-10 flex flex-col items-start p-8 md:p-16 lg:p-24 max-w-7xl w-full">
          <div className="md:w-1/2 lg:w-2/5 xl:w-1/3">
            <div>
              <FlipText className="text-gray-800 text-5xl sm:text-6xl md:text-7xl font-thin tracking-tight mb-4">
                Maalelo
              </FlipText>

              <p className="text-gray-700 text-2xl sm:text-3xl font-light mb-6">
                Your Next Favorite Find Awaits.
              </p>

              <p className="text-gray-600 text-lg font-light mb-10 leading-relaxed">
                Explore a world of unique products and amazing deals on Maalelo.
                Shop with confidence and discover something new today!
              </p>

              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <InteractiveHoverButton
                  onClick={() => navigate("/shop")}
                  className="border-black"
                >
                  Shop now
                </InteractiveHoverButton>
                <ShinyButton
                  onClick={() => navigate("/shop")}
                  color="gray"
                  className="border-black "
                >
                  Explore Features
                </ShinyButton>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="rounded bg-neutral-100 py-8 sm:py-12 ">
        <div className="mx-auto grid grid-cols-1 md:grid-cols-2 items-center justify-items-center gap-8 px-8 sm:px-16">
          <div className="max-w-md space-y-4">
            <h2 className="text-balance text-3xl md:text-4xl font-bold tracking-tight">
              <AuroraText className="text-4xl md:text-5xl lg:text-6xl">
                Discover our Curated Collection
              </AuroraText>
            </h2>

            <p className="text-pretty text-neutral-600">
              Explore our carefully selected products for your home and
              lifestyle.
            </p>
            <a
              href="/shop"
              className="inline-flex h-10 items-center justify-center rounded-full bg-indigo-500 px-6 font-medium text-neutral-50 transition-colors hover:bg-neutral-900/90 focus:outline-none focus:ring-2 focus:ring-neutral-950"
            >
              Explore
            </a>
          </div>

          <img
            src="https://files.stripe.com/links/MDB8YWNjdF8xT3BaeG5GSmNWbVh6bURsfGZsX3Rlc3RfaDVvWXowdU9ZbWlobUIyaHpNc1hCeDM200NBzvUjqP"
            alt="Cup of Coffee"
            width={450}
            height={450}
            loading="eager"
            decoding="async"
            className="rounded object-cover w-full h-auto max-w-[450px]"
          />
        </div>
      </section>
      <section className="py-16 md:py-24 px-6 md:px-12 lg:px-24 bg-white">
        <h2 className="text-3xl md:text-4xl text-neutral-900 text-center mb-12 md:mb-16 font-thin">
          Why You'll Love Shopping With Us
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-12 lg:gap-x-12 lg:gap-y-16">
          {[
            {
              iconChar: "⇆",
              title: "Easy Exchange",
              description: "Hassle-free exchange policy within 14 days",
            },
            {
              iconChar: "⊕",
              title: "Quality Guarantee",
              description: "7-day free return on all products",
            },
            {
              iconChar: "☏",
              title: "24/7 Support",
              description: "Dedicated customer service team",
            },
            {
              iconChar: "◎",
              title: "Secure Payments",
              description:
                "Your transactions are protected with top-tier security.",
            },
            {
              iconChar: "➤",
              title: "Fast Shipping",
              description: "Get your orders delivered swiftly and reliably.",
            },
            {
              iconChar: "✧",
              title: "Exclusive Offers",
              description:
                "Unlock special deals and early access to new arrivals.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-start text-left p-4"
            >
              <span className="text-neutral-900 text-5xl mb-4">
                {feature.iconChar}
              </span>

              <h3 className="text-lg font-semibold text-neutral-800 mb-1">
                {feature.title}
              </h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default SampleLandingPage;
