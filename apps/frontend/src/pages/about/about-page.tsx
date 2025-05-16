import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import actions from "../../assets/icons/actions.svg";
import axios from "../../assets/icons/axios.svg";
import docker from "../../assets/icons/docker.svg";
import express from "../../assets/icons/express.svg";
import figma from "../../assets/icons/figma.svg";
import nginx from "../../assets/icons/nginx.svg";
import node from "../../assets/icons/nodejs.svg";
import pm2 from "../../assets/icons/pm2.svg";
import postgres from "../../assets/icons/postgres.svg";
import postman from "../../assets/icons/postman.svg";
import prisma from "../../assets/icons/prisma.svg";
import reactquery from "../../assets/icons/react-query.svg";
import react from "../../assets/icons/react.svg";
import redis from "../../assets/icons/redis.svg";
import ssh from "../../assets/icons/ssh.svg";
import supabase from "../../assets/icons/supabase-icon.svg";
import tailwind from "../../assets/icons/tailwind.svg";
import zustand from "../../assets/icons/zustand.svg";
const About = () => {
  const platforms = ["maalelo", "WooCommerce", "BigCommerce", "Magento"];
  const features = [
    "Easy store setup",
    "Built-in payment processing",
    "Mobile-friendly themes",
    "App marketplace integration",
    "Unlimited product listings",
  ];
  const featureAvailability: any = {
    maalelo: {
      "Easy store setup": true,
      "Built-in payment processing": true,
      "Mobile-friendly themes": true,
      "App marketplace integration": true,
      "Unlimited product listings": true,
    },
    WooCommerce: {
      "Easy store setup": false,
      "Built-in payment processing": false,
      "Mobile-friendly themes": true,
      "App marketplace integration": false,
      "Unlimited product listings": true,
    },
    BigCommerce: {
      "Easy store setup": false,
      "Built-in payment processing": false,
      "Mobile-friendly themes": false,
      "App marketplace integration": true,
      "Unlimited product listings": false,
    },
    Magento: {
      "Easy store setup": false,
      "Built-in payment processing": false,
      "Mobile-friendly themes": false,
      "App marketplace integration": false,
      "Unlimited product listings": false,
    },
  };

  const navigate = useNavigate();

  const [featuredPlatform, setFeaturedPlatform] = useState("maalelo");
  return (
    <section className="container mx-auto px-4 sm:px-6 lg:w-5/6 pt-10 md:pt-20 font-montserrat">
      <div
        className="flex flex-col lg:flex-row pt-8 lg:pt-16"
        style={{ minHeight: "calc(-58px + 83vh)" }}
      >
        <div className="flex-1 pt-8 lg:pt-16 lg:pr-16 order-2 lg:order-1">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight sm:leading-snug bg-gradient-to-r from-red-600 to-blue-300 text-transparent bg-clip-text">
            Seamless <br className="hidden sm:block" />
            E-Commerce Experience
          </h1>
          <p className="my-6 text-base sm:text-lg text-gray-700 max-w-2xl">
            An innovative e-commerce platform that combines the best features of
            top e-commerce sites like Amazon, Shopify, and eBay, delivering a
            superior shopping experience for both customers and vendors.
          </p>
          <Button
            className="px-8 sm:px-12 py-4 sm:py-6 mt-4 text-base sm:text-lg text-white rounded-md shadow-lg hover:shadow-xl transition-all duration-300"
            variant={"indigo"}
            onClick={() => navigate("/home")}
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
      <div className="max-w-5xl mx-auto px-6 mb-10 font-montserrat">
        <h1 className="text-4xl font-bold text-center mb-2 text-indigo-600">
          US VS. THEM
        </h1>
        <p className="text-center text-lg text-gray-700 mb-10">
          Compare top e-commerce platforms to find your perfect match.
        </p>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Featured Platform:
          </label>
          <select
            value={featuredPlatform}
            onChange={(e) => setFeaturedPlatform(e.target.value)}
            className="border border-indigo-500 rounded-lg p-2 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {platforms.map((platform) => (
              <option key={platform} value={platform}>
                {platform}
              </option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto rounded-lg shadow-sm">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="p-4 border bg-indigo-500 text-white text-left">
                  FEATURE
                </th>
                <th className="p-4 border bg-indigo-500 text-white text-center">
                  {featuredPlatform}
                </th>
                {platforms
                  .filter((p) => p !== featuredPlatform)
                  .map((platform) => (
                    <th
                      key={platform}
                      className="p-4 border bg-indigo-500 text-white text-center"
                    >
                      {platform}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {features.map((feature) => (
                <tr key={feature} className="odd:bg-gray-50">
                  <td className="p-4 border text-gray-800">{feature}</td>
                  <td className="p-4 border text-center">
                    {featureAvailability[featuredPlatform][feature] ? (
                      <Check className="mx-auto text-indigo-500" size={24} />
                    ) : (
                      <X className="mx-auto text-red-500" size={24} />
                    )}
                  </td>
                  {platforms
                    .filter((p) => p !== featuredPlatform)
                    .map((platform) => (
                      <td key={platform} className="p-4 border text-center">
                        {featureAvailability[platform][feature] ? (
                          <Check
                            className="mx-auto text-indigo-500"
                            size={24}
                          />
                        ) : (
                          <X className="mx-auto text-red-500" size={24} />
                        )}
                      </td>
                    ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          Data based on standard features available on each platform as of April
          2025.
        </div>
      </div>

      <section className="py-16">
        <h1 className="mb-12 md:mb-20 font-bold text-center text-gray-800 text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
          <span className="bg-gradient-to-r from-indigo-600 to-blue-500 text-transparent bg-clip-text">
            Technologies
          </span>{" "}
          Used
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
          <div className="flex flex-col items-center justify-center py-8 sm:py-10 px-4 text-center bg-gray-100 rounded-xl bg-opacity-40 hover:bg-opacity-70 hover:shadow-md transition-all duration-200 border border-gray-200">
            <img
              src={react}
              className="w-16 sm:w-20 md:w-20 h-auto mb-3"
              alt="React"
            />
            <p className="text-lg sm:text-xl font-medium text-gray-700">
              React
            </p>
            <p className="w-full mt-2 text-sm sm:text-base text-gray-600">
              React is a JavaScript library for building fast and interactive
              user interfaces.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center py-8 sm:py-10 px-4 text-center bg-gray-100 rounded-xl bg-opacity-40 hover:bg-opacity-70 hover:shadow-md transition-all duration-200 border border-gray-200">
            <img
              src={reactquery}
              className="w-16 sm:w-20 md:w-20 h-auto mb-3"
              alt="React Query"
            />
            <p className="text-lg sm:text-xl font-medium text-gray-700">
              React Query
            </p>
            <p className="w-full mt-2 text-sm sm:text-base text-gray-600">
              React Query helps manage and fetch data efficiently for e-commerce
              websites.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center py-8 sm:py-10 px-4 text-center bg-gray-100 rounded-xl bg-opacity-40 hover:bg-opacity-70 hover:shadow-md transition-all duration-200 border border-gray-200">
            <img
              src={tailwind}
              className="w-16 sm:w-20 md:w-20 h-auto mb-3"
              alt="Tailwind CSS"
            />
            <p className="text-lg sm:text-xl font-medium text-gray-700">
              Tailwind CSS
            </p>
            <p className="w-full mt-2 text-sm sm:text-base text-gray-600">
              Tailwind CSS helps create responsive and visually appealing
              e-commerce designs.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center py-8 sm:py-10 px-4 text-center bg-gray-100 rounded-xl bg-opacity-40 hover:bg-opacity-70 hover:shadow-md transition-all duration-200 border border-gray-200">
            <img
              src={zustand}
              className="w-16 sm:w-20 md:w-20 h-auto mb-3"
              alt="Zustand"
            />
            <p className="text-lg sm:text-xl font-medium text-gray-700">
              Zustand
            </p>
            <p className="w-full mt-2 text-sm sm:text-base text-gray-600">
              Zustand is a fast and scalable state management library for React.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center py-8 sm:py-10 px-4 text-center bg-gray-100 rounded-xl bg-opacity-40 hover:bg-opacity-70 hover:shadow-md transition-all duration-200 border border-gray-200">
            <img
              src={node}
              className="w-16 sm:w-20 md:w-20 h-auto mb-3"
              alt="Node.js"
            />
            <p className="text-lg sm:text-xl font-medium text-gray-700">
              Node.js
            </p>
            <p className="w-full mt-2 text-sm sm:text-base text-gray-600">
              Node.js powers the server-side logic and handles backend processes
              efficiently.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center py-8 sm:py-10 px-4 text-center bg-gray-100 rounded-xl bg-opacity-40 hover:bg-opacity-70 hover:shadow-md transition-all duration-200 border border-gray-200">
            <img
              src={express}
              className="w-16 sm:w-20 md:w-20 h-auto mb-3"
              alt="Express.js"
            />
            <p className="text-lg sm:text-xl font-medium text-gray-700">
              Express.js
            </p>
            <p className="w-full mt-2 text-sm sm:text-base text-gray-600">
              Express.js simplifies API development and backend services crucial
              for e-commerce platforms.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center py-8 sm:py-10 px-4 text-center bg-gray-100 rounded-xl bg-opacity-40 hover:bg-opacity-70 hover:shadow-md transition-all duration-200 border border-gray-200">
            <img
              src={docker}
              className="w-16 sm:w-20 md:w-20 h-auto mb-3"
              alt="Docker"
            />
            <p className="text-lg sm:text-xl font-medium text-gray-700">
              Docker
            </p>
            <p className="w-full mt-2 text-sm sm:text-base text-gray-600">
              Docker helps ensure consistency and scalability for deploying
              e-commerce apps.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center py-8 sm:py-10 px-4 text-center bg-gray-100 rounded-xl bg-opacity-40 hover:bg-opacity-70 hover:shadow-md transition-all duration-200 border border-gray-200">
            <img
              src={nginx}
              className="w-16 sm:w-20 md:w-20 h-auto mb-3"
              alt="Nginx"
            />
            <p className="text-lg sm:text-xl font-medium text-gray-700">
              Nginx
            </p>
            <p className="w-full mt-2 text-sm sm:text-base text-gray-600">
              Nginx is used as a reverse proxy for efficient and secure delivery
              of e-commerce content.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center py-8 sm:py-10 px-4 text-center bg-gray-100 rounded-xl bg-opacity-40 hover:bg-opacity-70 hover:shadow-md transition-all duration-200 border border-gray-200">
            <img
              src={prisma}
              className="w-16 sm:w-20 md:w-20 h-auto mb-3"
              alt="Prisma"
            />
            <p className="text-lg sm:text-xl font-medium text-gray-700">
              Prisma
            </p>
            <p className="w-full mt-2 text-sm sm:text-base text-gray-600">
              Prisma is a powerful ORM for managing database operations
              efficiently in e-commerce apps.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center py-8 sm:py-10 px-4 text-center bg-gray-100 rounded-xl bg-opacity-40 hover:bg-opacity-70 hover:shadow-md transition-all duration-200 border border-gray-200">
            <img
              src={postgres}
              className="w-16 sm:w-20 md:w-20 h-auto mb-3"
              alt="Postgres"
            />
            <p className="text-lg sm:text-xl font-medium text-gray-700">
              Postgres
            </p>
            <p className="w-full mt-2 text-sm sm:text-base text-gray-600">
              Postgres is a robust database solution for storing product data,
              user info, and order details.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center py-8 sm:py-10 px-4 text-center bg-gray-100 rounded-xl bg-opacity-40 hover:bg-opacity-70 hover:shadow-md transition-all duration-200 border border-gray-200">
            <img
              src={supabase}
              className="w-16 sm:w-20 md:w-20 h-auto mb-3"
              alt="Supabase"
            />
            <p className="text-lg sm:text-xl font-medium text-gray-700">
              Supabase
            </p>
            <p className="w-full mt-2 text-sm sm:text-base text-gray-600">
              Supabase was used for S3 storage and Postgres Database for the
              e-commerce application.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center py-8 sm:py-10 px-4 text-center bg-gray-100 rounded-xl bg-opacity-40 hover:bg-opacity-70 hover:shadow-md transition-all duration-200 border border-gray-200">
            <img
              src={actions}
              className="w-16 sm:w-20 md:w-20 h-auto mb-3"
              alt="GitHub Actions"
            />
            <p className="text-lg sm:text-xl font-medium text-gray-700">
              GitHub Actions
            </p>
            <p className="w-full mt-2 text-sm sm:text-base text-gray-600">
              GitHub Actions enables CI/CD pipelines, helping automate
              deployments and maintain e-commerce systems.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center py-8 sm:py-10 px-4 text-center bg-gray-100 rounded-xl bg-opacity-40 hover:bg-opacity-70 hover:shadow-md transition-all duration-200 border border-gray-200">
            <img
              src={pm2}
              className="w-16 sm:w-20 md:w-20 h-auto mb-3"
              alt="GitHub Actions"
            />
            <p className="text-lg sm:text-xl font-medium text-gray-700">PM2</p>
            <p className="w-full mt-2 text-sm sm:text-base text-gray-600">
              PM2 is a process manager for Node.js applications that keeps apps
              alive and ensures they restart after crashes.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center py-8 sm:py-10 px-4 text-center bg-gray-100 rounded-xl bg-opacity-40 hover:bg-opacity-70 hover:shadow-md transition-all duration-200 border border-gray-200">
            <img
              src={ssh}
              className="w-16 sm:w-20 md:w-20 h-auto mb-3"
              alt="ssh"
            />
            <p className="text-lg sm:text-xl font-medium text-gray-700">SSH</p>
            <p className="w-full mt-2 text-sm sm:text-base text-gray-600">
              Secure Shell (SSH) protocol provides secure remote access to
              servers and deployment environments.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center py-8 sm:py-10 px-4 text-center bg-gray-100 rounded-xl bg-opacity-40 hover:bg-opacity-70 hover:shadow-md transition-all duration-200 border border-gray-200">
            <img
              src={figma}
              className="w-16 sm:w-20 md:w-20 h-auto mb-3"
              alt="Figma"
            />
            <p className="text-lg sm:text-xl font-medium text-gray-700">
              Figma
            </p>
            <p className="w-full mt-2 text-sm sm:text-base text-gray-600">
              Figma was used for collaborative UI/UX design, creating responsive
              layouts and visual components.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center py-8 sm:py-10 px-4 text-center bg-gray-100 rounded-xl bg-opacity-40 hover:bg-opacity-70 hover:shadow-md transition-all duration-200 border border-gray-200">
            <img
              src={postman}
              className="w-16 sm:w-20 md:w-20 h-auto mb-3"
              alt="postman"
            />
            <p className="text-lg sm:text-xl font-medium text-gray-700">
              Postman
            </p>
            <p className="w-full mt-2 text-sm sm:text-base text-gray-600">
              Postman enabled API testing, documentation, and collaboration
              throughout development.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center py-8 sm:py-10 px-4 text-center bg-gray-100 rounded-xl bg-opacity-40 hover:bg-opacity-70 hover:shadow-md transition-all duration-200 border border-gray-200">
            <img
              src={redis}
              className="w-16 sm:w-20 md:w-20 h-auto mb-3"
              alt="postman"
            />
            <p className="text-lg sm:text-xl font-medium text-gray-700">
              Redis
            </p>
            <p className="w-full mt-2 text-sm sm:text-base text-gray-600">
              Redis provides in-memory caching for improved performance and
              session management.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center py-8 sm:py-10 px-4 text-center bg-gray-100 rounded-xl bg-opacity-40 hover:bg-opacity-70 hover:shadow-md transition-all duration-200 border border-gray-200">
            <div className="w-16 sm:w-20 md:w-20 h-16 sm:h-20 md:h-20 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 font-bold text-xl mb-3">
              Azure
            </div>
            <p className="text-lg sm:text-xl font-medium text-gray-700">
              Azure
            </p>
            <p className="w-full mt-2 text-sm sm:text-base text-gray-600">
              Microsoft Azure cloud services power scalable infrastructure and
              deployment solutions.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center py-8 sm:py-10 px-4 text-center bg-gray-100 rounded-xl bg-opacity-40 hover:bg-opacity-70 hover:shadow-md transition-all duration-200 border border-gray-200">
            <div className="w-16 sm:w-20 md:w-20 h-16 sm:h-20 md:h-20 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 font-bold text-xl mb-3">
              DNS
            </div>
            <p className="text-lg sm:text-xl font-medium text-gray-700">
              DNS & HTTP
            </p>
            <p className="w-full mt-2 text-sm sm:text-base text-gray-600">
              Domain Name System and HTTP protocols form the foundation of web
              communication for the application.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center py-8 sm:py-10 px-4 text-center bg-gray-100 rounded-xl bg-opacity-40 hover:bg-opacity-70 hover:shadow-md transition-all duration-200 border border-gray-200">
            <img
              src={axios}
              className="w-16 sm:w-20 md:w-20 h-auto mb-3"
              alt="postman"
            />
            <p className="text-lg sm:text-xl font-medium text-gray-700">
              Axios
            </p>
            <p className="w-full mt-2 text-sm sm:text-base text-gray-600">
              Axios handles HTTP requests with elegant promise-based
              architecture for frontend-backend communication.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 mb-12">
        <div className="bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-2xl p-10 md:p-16 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-lime-400 opacity-10 rounded-full -translate-y-1/2 translate-x-1/4"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-300 opacity-20 rounded-full translate-y-1/3 -translate-x-1/4"></div>

          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 text-center leading-tight">
              Transform Your Shopping Experience Today
            </h2>
            <p className="text-center text-indigo-100 max-w-3xl mx-auto mb-10 text-lg">
              Join our innovative e-commerce platform where cutting-edge
              technology meets seamless user experience, providing you with the
              best online shopping journey.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Button
                className="px-8 py-4 text-lg bg-white text-indigo-700 hover:bg-gray-100 rounded-md shadow-lg hover:shadow-xl transition-all duration-300 font-medium min-w-[180px]"
                variant={"outline"}
                onClick={() => navigate("/signup")}
              >
                Create Account
              </Button>
              <Button
                className="px-8 py-4 text-lg bg-lime-500 hover:bg-lime-600 text-white rounded-md shadow-lg hover:shadow-xl transition-all duration-300 font-medium min-w-[180px]"
                variant={"indigo"}
                onClick={() => navigate("/shop")}
              >
                Browse Products
              </Button>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default About;
