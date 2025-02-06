import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import actions from "../../assets/icons/actions.svg";
import docker from "../../assets/icons/docker.svg";
import express from "../../assets/icons/express.svg";
import nginx from "../../assets/icons/nginx.svg";
import node from "../../assets/icons/nodejs.svg";
import postgres from "../../assets/icons/postgres.svg";
import prisma from "../../assets/icons/prisma.svg";
import reactquery from "../../assets/icons/react-query.svg";
import react from "../../assets/icons/react.svg";
import supabase from "../../assets/icons/supabase-icon.svg";
import tailwind from "../../assets/icons/tailwind.svg";
import zustand from "../../assets/icons/zustand.svg";
import onlineShopping from "../../assets/online-shopping.png";

const About = () => {
  const navigate = useNavigate();
  return (
    <section className="container mx-auto w-5/6 pt-20 font-montserrat ">
      <div className="flex pt-16" style={{ height: "calc(-58px + 100vh)" }}>
        <div className="flex-1 pt-16 pr-16">
          <h1 className="  text-7xl font-bold" style={{ lineHeight: 1.15 }}>
            Seamless <br></br>E-Commerce Experience
          </h1>
          <p className="my-4 text-lg text-gray-700">
            An e-commerce platform that combines the best features of top
            e-commerce sites like Amazon, Shopify, and eBay.
          </p>
          <Button
            className="px-12 py-6 mt-2 text-lg text-white rounded-md "
            variant={"indigo"}
            onClick={() => navigate("/signup")}
          >
            Start Shopping
          </Button>
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
            <img src={react} className="w-24 h-auto mb-3" alt="React" />
            <p className="text-xl font-medium text-gray-700">React</p>
            <p className="w-1/2 mt-1">
              React is a JavaScript library for building fast and interactive
              user interfaces.
            </p>
          </div>
          {/* <div className="flex flex-col items-center justify-center col-span-1 py-12 text-center bg-gray-100 rounded-md bg-opacity-40 hover:bg-opacity-70">
            <img src={nextjs} className="w-24 h-auto mb-3" alt="Next.js" />
            <p className="text-xl font-medium text-gray-700">Next.js</p>
            <p className="w-1/2 mt-1">
              Next.js is a React framework for hybrid static & server rendering,
              optimized for e-commerce sites.
            </p>
          </div> */}
          <div className="flex flex-col items-center justify-center col-span-1 py-12 text-center bg-gray-100 rounded-md bg-opacity-40 hover:bg-opacity-70">
            <img
              src={reactquery}
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
              src={tailwind}
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
              src={zustand} // Ensure you import the image
              className="w-24 h-auto mb-3"
              alt="Zustand"
            />
            <p className="text-xl font-medium text-gray-700">Zustand</p>
            <p className="w-1/2 mt-1">
              Zustand is a fast and scalable state management library for React.
            </p>
          </div>

          {/* <div className="flex flex-col items-center justify-center col-span-1 py-12 text-center bg-gray-100 rounded-md bg-opacity-40 hover:bg-opacity-70">
            <img
              src="../../assets/icons/socket-io.svg"
              className="w-24 h-auto mb-3"
              alt="Socket.io"
            />
            <p className="text-xl font-medium text-gray-700">Socket.io</p>
            <p className="w-1/2 mt-1">
              Socket.io enables real-time communication for features like live
              notifications and chats.
            </p>
          </div> */}
          <div className="flex flex-col items-center justify-center col-span-1 py-12 text-center bg-gray-100 rounded-md bg-opacity-40 hover:bg-opacity-70">
            <img src={node} className="w-24 h-auto mb-3" alt="Node.js" />
            <p className="text-xl font-medium text-gray-700">Node.js</p>
            <p className="w-1/2 mt-1">
              Node.js powers the server-side logic and handles backend processes
              efficiently.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center col-span-1 py-12 text-center bg-gray-100 rounded-md bg-opacity-40 hover:bg-opacity-70">
            <img src={express} className="w-24 h-auto mb-3" alt="Express.js" />
            <p className="w-1/2 mt-1">
              Express.js simplifies API development and backend services crucial
              for e-commerce platforms.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center col-span-1 py-12 text-center bg-gray-100 rounded-md bg-opacity-40 hover:bg-opacity-70">
            <img src={docker} className="w-24 h-auto mb-3" alt="Docker" />
            <p className="text-xl font-medium text-gray-700">Docker</p>
            <p className="w-1/2 mt-1">
              Docker helps ensure consistency and scalability for deploying
              e-commerce apps.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center col-span-1 py-12 text-center bg-gray-100 rounded-md bg-opacity-40 hover:bg-opacity-70">
            <img src={nginx} className="w-24 h-auto mb-3" alt="Nginx" />
            <p className="text-xl font-medium text-gray-700">Nginx</p>
            <p className="w-1/2 mt-1">
              Nginx is used as a reverse proxy for efficient and secure delivery
              of e-commerce content.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center col-span-1 py-12 text-center bg-gray-100 rounded-md bg-opacity-40 hover:bg-opacity-70">
            <img src={prisma} className="w-24 h-auto mb-3" alt="Prisma" />
            <p className="w-1/2 mt-1">
              Prisma is a powerful ORM for managing database operations
              efficiently in e-commerce apps.
            </p>
          </div>
          {/* <div className="flex flex-col items-center justify-center col-span-1 py-12 text-center bg-gray-100 rounded-md bg-opacity-40 hover:bg-opacity-70">
            <img
              src="../../assets/icons/redis.svg"
              className="w-24 h-auto mb-3"
              alt="Redis"
            />
            <p className="text-xl font-medium text-gray-700">Redis</p>
            <p className="w-1/2 mt-1">
              Redis provides fast, real-time caching and session management for
              e-commerce websites.
            </p>
          </div> */}
          <div className="flex flex-col items-center justify-center col-span-1 py-12 text-center bg-gray-100 rounded-md bg-opacity-40 hover:bg-opacity-70">
            <img src={postgres} className="w-24 h-auto mb-3" alt="Postgres" />
            <p className="text-xl font-medium text-gray-700">Postgres</p>
            <p className="w-1/2 mt-1">
              Postgres is a robust database solution for storing product data,
              user info, and order details.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center col-span-1 py-12 text-center bg-gray-100 rounded-md bg-opacity-40 hover:bg-opacity-70">
            <img src={supabase} className="w-24 h-auto mb-3" alt="Supabase" />
            <p className="text-xl font-medium text-gray-700">Supbase</p>
            <p className="w-1/2 mt-1">
              Supabase was used for S3 storage and Postgres Database for
              e-commerce app.
            </p>
          </div>
          {/* <div className="flex flex-col items-center justify-center col-span-1 py-12 text-center bg-gray-100 rounded-md bg-opacity-40 hover:bg-opacity-70">
            <img
              src="../../assets/icons/cloudinary.svg"
              className="w-24 h-auto mb-3"
              alt="Cloudinary"
            />
            <p className="text-xl font-medium text-gray-700">Cloudinary</p>
            <p className="w-1/2 mt-1">
              Cloudinary offers cloud-based image storage and optimization,
              essential for e-commerce platforms.
            </p>
          </div> */}
          <div className="flex flex-col items-center justify-center col-span-1 py-12 text-center bg-gray-100 rounded-md bg-opacity-40 hover:bg-opacity-70">
            <img
              src={actions}
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
