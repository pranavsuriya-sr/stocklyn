import onlineShopping from "../../assets/online-shopping.png";

const About = () => {
  return (
    <section className="container mx-auto w-5/6 pt-20">
      <div className="flex pt-16" style={{ height: "calc(-58px + 100vh)" }}>
        <div className="flex-1 pt-16 pr-16">
          <h1 className=" text-blue-600 text-7xl" style={{ lineHeight: 1.15 }}>
            Seamless <br></br>E-Commerce Experience
          </h1>
          <p className="my-4 text-lg text-gray-700">
            An e-commerce platform that combines the best features of top
            e-commerce sites like Amazon, Shopify, and eBay.
          </p>
          <button
            className="px-12 py-3 mt-2 text-lg text-white rounded-md bg-gradient-to-tl from-blue-400 to-red-400"
            onClick={() => (window.location.href = "/signup")}
          >
            Start Shopping
          </button>
        </div>
        <div className="flex-1 pt-8">
          <img
            src={onlineShopping}
            className="block"
            alt="Image showcasing people browsing products on a website"
          />
        </div>
      </div>

      <section className="py-8">
        <h1 className="mb-24 font-bold text-center text-gray-800 text-7xl">
          Tech Stack Used
        </h1>
        <div className="grid grid-cols-2 gap-12">
          <div className="flex flex-col items-center justify-center col-span-1 py-12 text-center bg-gray-100 rounded-md bg-opacity-40 hover:bg-opacity-70">
            <img
              src="/icons/react.svg"
              className="w-24 h-auto mb-3"
              alt="React"
            />
            <p className="text-xl font-medium text-gray-700">React</p>
            <p className="w-1/2 mt-1">
              React is a JavaScript library for building fast and interactive
              user interfaces.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center col-span-1 py-12 text-center bg-gray-100 rounded-md bg-opacity-40 hover:bg-opacity-70">
            <img
              src="/icons/nextjs.svg"
              className="w-24 h-auto mb-3"
              alt="Next.js"
            />
            <p className="text-xl font-medium text-gray-700">Next.js</p>
            <p className="w-1/2 mt-1">
              Next.js is a React framework for hybrid static & server rendering,
              optimized for e-commerce sites.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center col-span-1 py-12 text-center bg-gray-100 rounded-md bg-opacity-40 hover:bg-opacity-70">
            <img
              src="/icons/react-query.svg"
              className="w-24 h-auto mb-3"
              alt="React Query"
            />
            <p className="text-xl font-medium text-gray-700">React Query</p>
            <p className="w-1/2 mt-1">
              React Query helps manage and fetch data efficiently for e-commerce
              websites.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center col-span-1 py-12 text-center bg-gray-100 rounded-md bg-opacity-40 hover:bg-opacity-70">
            <img
              src="/icons/tailwind.svg"
              className="w-24 h-auto mb-3"
              alt="Tailwind CSS"
            />
            <p className="text-xl font-medium text-gray-700">Tailwind CSS</p>
            <p className="w-1/2 mt-1">
              Tailwind CSS helps create responsive and visually appealing
              e-commerce designs.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center col-span-1 py-12 text-center bg-gray-100 rounded-md bg-opacity-40 hover:bg-opacity-70">
            <img
              src="/icons/socket-io.svg"
              className="w-24 h-auto mb-3"
              alt="Socket.io"
            />
            <p className="text-xl font-medium text-gray-700">Socket.io</p>
            <p className="w-1/2 mt-1">
              Socket.io enables real-time communication for features like live
              notifications and chats.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center col-span-1 py-12 text-center bg-gray-100 rounded-md bg-opacity-40 hover:bg-opacity-70">
            <img
              src="/icons/nodejs.svg"
              className="w-24 h-auto mb-3"
              alt="Node.js"
            />
            <p className="text-xl font-medium text-gray-700">Node.js</p>
            <p className="w-1/2 mt-1">
              Node.js powers the server-side logic and handles backend processes
              efficiently.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center col-span-1 py-12 text-center bg-gray-100 rounded-md bg-opacity-40 hover:bg-opacity-70">
            <img
              src="/icons/express.svg"
              className="w-24 h-auto mb-3"
              alt="Express.js"
            />
            <p className="w-1/2 mt-1">
              Express.js simplifies API development and backend services crucial
              for e-commerce platforms.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center col-span-1 py-12 text-center bg-gray-100 rounded-md bg-opacity-40 hover:bg-opacity-70">
            <img
              src="/icons/docker.svg"
              className="w-24 h-auto mb-3"
              alt="Docker"
            />
            <p className="text-xl font-medium text-gray-700">Docker</p>
            <p className="w-1/2 mt-1">
              Docker helps ensure consistency and scalability for deploying
              e-commerce apps.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center col-span-1 py-12 text-center bg-gray-100 rounded-md bg-opacity-40 hover:bg-opacity-70">
            <img
              src="/icons/nginx.svg"
              className="w-24 h-auto mb-3"
              alt="Nginx"
            />
            <p className="text-xl font-medium text-gray-700">Nginx</p>
            <p className="w-1/2 mt-1">
              Nginx is used as a reverse proxy for efficient and secure delivery
              of e-commerce content.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center col-span-1 py-12 text-center bg-gray-100 rounded-md bg-opacity-40 hover:bg-opacity-70">
            <img
              src="/icons/prisma.svg"
              className="w-24 h-auto mb-3"
              alt="Prisma"
            />
            <p className="w-1/2 mt-1">
              Prisma is a powerful ORM for managing database operations
              efficiently in e-commerce apps.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center col-span-1 py-12 text-center bg-gray-100 rounded-md bg-opacity-40 hover:bg-opacity-70">
            <img
              src="/icons/redis.svg"
              className="w-24 h-auto mb-3"
              alt="Redis"
            />
            <p className="text-xl font-medium text-gray-700">Redis</p>
            <p className="w-1/2 mt-1">
              Redis provides fast, real-time caching and session management for
              e-commerce websites.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center col-span-1 py-12 text-center bg-gray-100 rounded-md bg-opacity-40 hover:bg-opacity-70">
            <img
              src="/icons/postgres.svg"
              className="w-24 h-auto mb-3"
              alt="Postgres"
            />
            <p className="text-xl font-medium text-gray-700">Postgres</p>
            <p className="w-1/2 mt-1">
              Postgres is a robust database solution for storing product data,
              user info, and order details.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center col-span-1 py-12 text-center bg-gray-100 rounded-md bg-opacity-40 hover:bg-opacity-70">
            <img
              src="/icons/firebase.svg"
              className="w-24 h-auto mb-3"
              alt="Firebase"
            />
            <p className="text-xl font-medium text-gray-700">Firebase</p>
            <p className="w-1/2 mt-1">
              Firebase provides backend services, analytics, and user
              authentication for e-commerce apps.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center col-span-1 py-12 text-center bg-gray-100 rounded-md bg-opacity-40 hover:bg-opacity-70">
            <img
              src="/icons/cloudinary.svg"
              className="w-24 h-auto mb-3"
              alt="Cloudinary"
            />
            <p className="text-xl font-medium text-gray-700">Cloudinary</p>
            <p className="w-1/2 mt-1">
              Cloudinary offers cloud-based image storage and optimization,
              essential for e-commerce platforms.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center col-span-1 py-12 text-center bg-gray-100 rounded-md bg-opacity-40 hover:bg-opacity-70">
            <img
              src="/icons/actions.svg"
              className="w-24 h-auto mb-3"
              alt="GitHub Actions"
            />
            <p className="text-xl font-medium text-gray-700">GitHub Actions</p>
            <p className="w-1/2 mt-1">
              GitHub Actions enables CI/CD pipelines, helping automate
              deployments and maintain e-commerce systems.
            </p>
          </div>
        </div>
      </section>
    </section>
  );
};

export default About;
