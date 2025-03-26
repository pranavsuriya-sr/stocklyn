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

const About = () => {
  const navigate = useNavigate();
  return (
    <section className="container mx-auto px-4 sm:px-6 lg:w-5/6 pt-10 md:pt-20 font-montserrat">
      <div
        className="flex flex-col lg:flex-row pt-8 lg:pt-16"
        style={{ minHeight: "calc(-58px + 100vh)" }}
      >
        <div className="flex-1 pt-8 lg:pt-16 lg:pr-16 order-2 lg:order-1">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight sm:leading-snug">
            Seamless <br className="hidden sm:block" />
            E-Commerce Experience
          </h1>
          <p className="my-4 text-base sm:text-lg text-gray-700">
            An e-commerce platform that combines the best features of top
            e-commerce sites like Amazon, Shopify, and eBay.
          </p>
          <Button
            className="px-8 sm:px-12 py-4 sm:py-6 mt-2 text-base sm:text-lg text-white rounded-md"
            variant={"indigo"}
            onClick={() => navigate("/signup")}
          >
            Start Shopping
          </Button>
        </div>
        {/* <div className="flex-1 pt-8 order-1 lg:order-2">
          <img
            src={onlineShopping}
            className="block w-full max-w-md mx-auto lg:max-w-none"
            alt="Image showcasing people browsing products on a website"
          />
        </div> */}
      </div>

      <section className="py-8">
        <h1 className="mb-12 md:mb-24 font-bold text-center text-gray-800 text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
          Tech Stack Used
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
          <div className="flex flex-col items-center justify-center py-8 sm:py-12 text-center bg-gray-100 rounded-md bg-opacity-40 hover:bg-opacity-70">
            <img
              src={react}
              className="w-16 sm:w-20 md:w-24 h-auto mb-3"
              alt="React"
            />
            <p className="text-lg sm:text-xl font-medium text-gray-700">
              React
            </p>
            <p className="w-4/5 sm:w-3/4 md:w-1/2 mt-1 text-sm sm:text-base">
              React is a JavaScript library for building fast and interactive
              user interfaces.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center py-8 sm:py-12 text-center bg-gray-100 rounded-md bg-opacity-40 hover:bg-opacity-70">
            <img
              src={reactquery}
              className="w-16 sm:w-20 md:w-24 h-auto mb-3"
              alt="React Query"
            />
            <p className="text-lg sm:text-xl font-medium text-gray-700">
              React Query
            </p>
            <p className="w-4/5 sm:w-3/4 md:w-1/2 mt-1 text-sm sm:text-base">
              React Query helps manage and fetch data efficiently for e-commerce
              websites.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center py-8 sm:py-12 text-center bg-gray-100 rounded-md bg-opacity-40 hover:bg-opacity-70">
            <img
              src={tailwind}
              className="w-16 sm:w-20 md:w-24 h-auto mb-3"
              alt="Tailwind CSS"
            />
            <p className="text-lg sm:text-xl font-medium text-gray-700">
              Tailwind CSS
            </p>
            <p className="w-4/5 sm:w-3/4 md:w-1/2 mt-1 text-sm sm:text-base">
              Tailwind CSS helps create responsive and visually appealing
              e-commerce designs.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center py-8 sm:py-12 text-center bg-gray-100 rounded-md bg-opacity-40 hover:bg-opacity-70">
            <img
              src={zustand}
              className="w-16 sm:w-20 md:w-24 h-auto mb-3"
              alt="Zustand"
            />
            <p className="text-lg sm:text-xl font-medium text-gray-700">
              Zustand
            </p>
            <p className="w-4/5 sm:w-3/4 md:w-1/2 mt-1 text-sm sm:text-base">
              Zustand is a fast and scalable state management library for React.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center py-8 sm:py-12 text-center bg-gray-100 rounded-md bg-opacity-40 hover:bg-opacity-70">
            <img
              src={node}
              className="w-16 sm:w-20 md:w-24 h-auto mb-3"
              alt="Node.js"
            />
            <p className="text-lg sm:text-xl font-medium text-gray-700">
              Node.js
            </p>
            <p className="w-4/5 sm:w-3/4 md:w-1/2 mt-1 text-sm sm:text-base">
              Node.js powers the server-side logic and handles backend processes
              efficiently.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center py-8 sm:py-12 text-center bg-gray-100 rounded-md bg-opacity-40 hover:bg-opacity-70">
            <img
              src={express}
              className="w-16 sm:w-20 md:w-24 h-auto mb-3"
              alt="Express.js"
            />
            <p className="text-lg sm:text-xl font-medium text-gray-700">
              Express.js
            </p>
            <p className="w-4/5 sm:w-3/4 md:w-1/2 mt-1 text-sm sm:text-base">
              Express.js simplifies API development and backend services crucial
              for e-commerce platforms.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center py-8 sm:py-12 text-center bg-gray-100 rounded-md bg-opacity-40 hover:bg-opacity-70">
            <img
              src={docker}
              className="w-16 sm:w-20 md:w-24 h-auto mb-3"
              alt="Docker"
            />
            <p className="text-lg sm:text-xl font-medium text-gray-700">
              Docker
            </p>
            <p className="w-4/5 sm:w-3/4 md:w-1/2 mt-1 text-sm sm:text-base">
              Docker helps ensure consistency and scalability for deploying
              e-commerce apps.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center py-8 sm:py-12 text-center bg-gray-100 rounded-md bg-opacity-40 hover:bg-opacity-70">
            <img
              src={nginx}
              className="w-16 sm:w-20 md:w-24 h-auto mb-3"
              alt="Nginx"
            />
            <p className="text-lg sm:text-xl font-medium text-gray-700">
              Nginx
            </p>
            <p className="w-4/5 sm:w-3/4 md:w-1/2 mt-1 text-sm sm:text-base">
              Nginx is used as a reverse proxy for efficient and secure delivery
              of e-commerce content.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center py-8 sm:py-12 text-center bg-gray-100 rounded-md bg-opacity-40 hover:bg-opacity-70">
            <img
              src={prisma}
              className="w-16 sm:w-20 md:w-24 h-auto mb-3"
              alt="Prisma"
            />
            <p className="text-lg sm:text-xl font-medium text-gray-700">
              Prisma
            </p>
            <p className="w-4/5 sm:w-3/4 md:w-1/2 mt-1 text-sm sm:text-base">
              Prisma is a powerful ORM for managing database operations
              efficiently in e-commerce apps.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center py-8 sm:py-12 text-center bg-gray-100 rounded-md bg-opacity-40 hover:bg-opacity-70">
            <img
              src={postgres}
              className="w-16 sm:w-20 md:w-24 h-auto mb-3"
              alt="Postgres"
            />
            <p className="text-lg sm:text-xl font-medium text-gray-700">
              Postgres
            </p>
            <p className="w-4/5 sm:w-3/4 md:w-1/2 mt-1 text-sm sm:text-base">
              Postgres is a robust database solution for storing product data,
              user info, and order details.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center py-8 sm:py-12 text-center bg-gray-100 rounded-md bg-opacity-40 hover:bg-opacity-70">
            <img
              src={supabase}
              className="w-16 sm:w-20 md:w-24 h-auto mb-3"
              alt="Supabase"
            />
            <p className="text-lg sm:text-xl font-medium text-gray-700">
              Supbase
            </p>
            <p className="w-4/5 sm:w-3/4 md:w-1/2 mt-1 text-sm sm:text-base">
              Supabase was used for S3 storage and Postgres Database for
              e-commerce app.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center py-8 sm:py-12 text-center bg-gray-100 rounded-md bg-opacity-40 hover:bg-opacity-70">
            <img
              src={actions}
              className="w-16 sm:w-20 md:w-24 h-auto mb-3"
              alt="GitHub Actions"
            />
            <p className="text-lg sm:text-xl font-medium text-gray-700">
              GitHub Actions
            </p>
            <p className="w-4/5 sm:w-3/4 md:w-1/2 mt-1 text-sm sm:text-base">
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
