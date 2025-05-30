import landingPage from "@/assets/landingPage1.png";
import landingPage2 from "@/assets/landingPage2.png";
import { AuroraText } from "@/components/magicui/aurora-text";
import { BoxReveal } from "@/components/magicui/box-reveal";
import { FlipText } from "@/components/magicui/flip-text";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { ShinyButton } from "@/components/magicui/shiny-button";
import { TextAnimate } from "@/components/magicui/text-animate";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <section className="relative w-full min-h-screen flex items-center justify-center bg-gray-100 mt-16">
        <img
          src={landingPage}
          alt="Maalelo platform interface"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />

        <div className="relative z-10 flex flex-col items-start p-8 md:p-12 lg:p-16 max-w-7xl w-full">
          <div className="md:w-2/3 lg:w-1/2">
            <FlipText className="text-gray-900 text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-6">
              Maalelo
            </FlipText>

            <div className="text-gray-700 text-2xl sm:text-3xl font-light mb-8">
              <TextAnimate animation="blurInUp" by="word" duration={2}>
                Your Next Favorite Find Awaits.
              </TextAnimate>
            </div>

            <p className="text-gray-600 text-lg font-light mb-10 leading-relaxed">
              Explore a world of unique products & amazing deals on Maalelo.
              Shop with confidence and discover something new today!
            </p>

            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
              <InteractiveHoverButton
                onClick={() => navigate("/shop")}
                className="border-black hover:text-white px-8 py-3 text-lg rounded-lg"
              >
                Shop now
              </InteractiveHoverButton>
              <ShinyButton
                onClick={() => navigate("/shop")}
                color="indigo"
                className="px-8 py-3 text-lg rounded-lg border-black"
              >
                Explore Features
              </ShinyButton>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-gray-50 py-16 md:py-24 px-6 md:px-12 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-gray-900">
              Shop by Category
            </h2>
            <p className="mt-4 text-lg text-gray-600 font-light max-w-2xl mx-auto">
              Find exactly what you're looking for by browsing our popular
              categories.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Fresh Arrivals",
                href: "/shop/new-arrivals",
                imageUrl:
                  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
              },
              {
                name: "Home & Decor",
                href: "/shop/home-decor",
                imageUrl:
                  "https://images.unsplash.com/photo-1540932239986-30128078f3c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aG9tZSUyMGRlY29yfGVufDB8fDB8fHww&w=1000&q=80",
              },
              {
                name: "Fashion Finds",
                href: "/shop/fashion",
                imageUrl:
                  "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
              },
            ].map((category) => (
              <div
                key={category.name}
                onClick={() => navigate("/home")}
                className="group relative block overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
              >
                <img
                  src={category.imageUrl}
                  alt={`Image for ${category.name}`}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent"></div>
                <div className="relative p-6 flex flex-col items-start justify-end h-80">
                  <h3 className="text-2xl font-semibold text-white">
                    {category.name}
                  </h3>
                  <span className="mt-1.5 inline-block rounded-full bg-indigo-600 px-4 py-1.5 text-xs font-medium text-white transition-colors group-hover:bg-indigo-700">
                    Shop Now
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24 px-6 md:px-12 lg:px-24">
        <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 items-center justify-items-center gap-x-12 gap-y-10">
          <div className="order-last md:order-first max-w-md text-center md:text-left">
            <AuroraText className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-gray-900 mb-6">
              Discover our Curated Collection
            </AuroraText>

            <TextAnimate
              animation="scaleUp"
              by="word"
              duration={1}
              className="text-lg text-gray-700 font-light mb-8"
            >
              Explore our carefully selected products for your home and
              lifestyle.
            </TextAnimate>

            <button
              onClick={() => navigate("/shop")}
              className="inline-flex h-12 items-center justify-center rounded-lg bg-indigo-600 px-8 text-lg font-medium text-white shadow-md transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Explore Collection
            </button>
          </div>
          <img
            src="https://files.stripe.com/links/MDB8YWNjdF8xT3BaeG5GSmNWbVh6bURsfGZsX3Rlc3RfaDVvWXowdU9ZbWlobUIyaHpNc1hCeDM200NBzvUjqP"
            alt="Curated collection item"
            width={500}
            height={500}
            loading="eager"
            decoding="async"
            className="rounded-lg shadow-xl object-cover w-full h-auto max-w-lg"
          />
        </div>
      </section>

      <section className="bg-gray-50 py-16 md:py-24 px-6 md:px-12 lg:px-24">
        <h2 className="text-3xl md:text-4xl lg:text-5xl text-gray-900 text-center mb-12 md:mb-16 font-semibold tracking-tight">
          <TextAnimate animation="blurInUp" by="character" duration={2}>
            Why You'll Love Shopping With Us
          </TextAnimate>
        </h2>
        <div className="mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-12 lg:gap-x-10 lg:gap-y-14">
          {[
            {
              iconChar: "⇆",
              title: "Easy Exchange",
              description: "Hassle-free exchange policy within 14 days.",
            },
            {
              iconChar: "⊕",
              title: "Quality Guarantee",
              description: "7-day free return on all products.",
            },
            {
              iconChar: "☏",
              title: "24/7 Support",
              description:
                "Dedicated customer service team, always here to help.",
            },
            {
              iconChar: "◎",
              title: "Secure Payments",
              description:
                "Your transactions are protected with top-tier security measures.",
            },
            {
              iconChar: "➤",
              title: "Fast Shipping",
              description:
                "Get your orders delivered swiftly and reliably to your doorstep.",
            },
            {
              iconChar: "✧",
              title: "Exclusive Offers",
              description:
                "Unlock special deals and early access to new arrivals as a valued customer.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <span className="text-indigo-600 text-5xl mb-5">
                {feature.iconChar}
              </span>

              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-base font-light leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mx-auto max-w-7xl mt-16 md:mt-24">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-thin tracking-tight text-center text-gray-900 mb-12 md:mb-16">
            Loved by People Worldwide
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {[
              {
                quote:
                  "Maalelo has completely transformed my online shopping experience. The quality and uniqueness of products are unmatched!",
                name: "Harsh Singh",
                title: "Verified Shopper",
              },
              {
                quote:
                  "I was looking for specific home decor items and found exactly what I needed on Maalelo. The fast shipping and great customer service were a huge plus!",
                name: "Sai Raj",
                title: "Decor Enthusiast",
              },
              {
                quote:
                  "Discovering Maalelo was a game-changer. The curated collections make it easy to find stylish pieces, and I always get compliments on my purchases.",
                name: "Rishit Bakshi",
                title: "Style Maven",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col"
              >
                <blockquote className="text-lg font-light text-gray-700 leading-relaxed flex-grow">
                  <span className="text-4xl text-indigo-600 leading-none block mb-3">
                    “
                  </span>
                  {testimonial.quote}
                </blockquote>
                <footer className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-base font-semibold text-indigo-700">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-500">{testimonial.title}</p>
                </footer>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-gray-900 py-20 md:py-32 px-6 md:px-12 lg:px-24">
        <img
          src={landingPage2}
          alt="Kids playhouse and bedroom furniture"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="relative z-10 mx-auto max-w-7xl flex items-center">
          <div className="max-w-xl lg:w-1/2 text-white">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-thin tracking-tight mb-6">
              Create Magical Spaces, Delivered Home
            </h2>

            <p className="mt-6 text-xl leading-9 font-light mb-10">
              Discover our thoughtfully crafted furniture — shipping now.
            </p>
            <div className="mt-10">
              <a
                href="/shop"
                className="rounded-lg bg-white px-8 py-3.5 text-lg font-semibold text-indigo-600 shadow-md hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors"
              >
                Explore Furniture
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24 px-6 md:px-12 lg:px-24">
        <div className="mx-auto max-w-2xl text-center">
          <BoxReveal boxColor="#5046e6">
            <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
              Become a Maalelo Insider
            </h2>
          </BoxReveal>
          <p className="mt-6 text-lg leading-8 text-gray-700 font-light">
            Get exclusive updates, early access to new collections, and special
            offers delivered right to your inbox.
          </p>
          <form className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="min-w-0 flex-auto rounded-lg border-gray-300 bg-white px-3.5 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 w-full sm:w-auto"
              placeholder="Enter your email"
            />
            <button
              type="submit"
              className="w-full sm:w-auto rounded-lg bg-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-md hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 border border-black transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default LandingPage;
