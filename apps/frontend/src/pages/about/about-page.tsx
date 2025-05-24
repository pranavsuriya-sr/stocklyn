import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import actions from "../../assets/icons/actions.svg";
import axiosIcon from "../../assets/icons/axios.svg";
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
    <section className="bg-white text-gray-800 pt-20 font-montserrat">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row py-12 md:py-16 items-center">
          <div className="flex-1 lg:pr-16 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight sm:leading-snug text-gray-900 font-thin">
              Seamless <br className="hidden sm:block" />
              E-Commerce Experience
            </h1>
            <p className="my-6 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto lg:mx-0">
              An innovative e-commerce platform that combines the best features
              of top e-commerce sites, delivering a superior shopping experience
              for both customers and vendors.
            </p>
            <Button
              className="px-8 sm:px-12 py-3 sm:py-4 mt-4 text-base sm:text-lg text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              onClick={() => navigate("/home")}
            >
              Start Shopping
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 py-16 md:py-20 border-t border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-3 text-gray-800">
            US VS. THEM
          </h2>
          <p className="text-center text-lg text-gray-600 mb-10 md:mb-12 max-w-2xl mx-auto">
            Compare top e-commerce platforms to find your perfect match.
          </p>

          <div className="mb-8 max-w-md mx-auto">
            <label
              htmlFor="featuredPlatform"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Featured Platform:
            </label>
            <select
              id="featuredPlatform"
              value={featuredPlatform}
              onChange={(e) => setFeaturedPlatform(e.target.value)}
              className="w-full bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 py-2 px-3 text-base"
            >
              {platforms.map((platform) => (
                <option key={platform} value={platform}>
                  {platform}
                </option>
              ))}
            </select>
          </div>

          <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-200 bg-white">
            <table className="w-full min-w-[640px] border-collapse">
              <thead>
                <tr>
                  <th className="p-3 sm:p-4 border-b border-gray-200 bg-gray-100 text-gray-700 font-semibold text-left text-sm">
                    FEATURE
                  </th>
                  <th className="p-3 sm:p-4 border-b border-gray-200 bg-gray-100 text-gray-700 font-semibold text-center text-sm">
                    {featuredPlatform.toUpperCase()}
                  </th>
                  {platforms
                    .filter((p) => p !== featuredPlatform)
                    .map((platform) => (
                      <th
                        key={platform}
                        className="p-3 sm:p-4 border-b border-gray-200 bg-gray-100 text-gray-700 font-semibold text-center text-sm"
                      >
                        {platform.toUpperCase()}
                      </th>
                    ))}
                </tr>
              </thead>
              <tbody>
                {features.map((feature, index) => (
                  <tr
                    key={feature}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="p-3 sm:p-4 border-b border-gray-200 text-gray-700 text-sm">
                      {feature}
                    </td>
                    <td className="p-3 sm:p-4 border-b border-gray-200 text-center">
                      {featureAvailability[featuredPlatform][feature] ? (
                        <Check className="mx-auto text-green-500" size={20} />
                      ) : (
                        <X className="mx-auto text-red-500" size={20} />
                      )}
                    </td>
                    {platforms
                      .filter((p) => p !== featuredPlatform)
                      .map((platform) => (
                        <td
                          key={platform}
                          className="p-3 sm:p-4 border-b border-gray-200 text-center"
                        >
                          {featureAvailability[platform][feature] ? (
                            <Check
                              className="mx-auto text-green-500"
                              size={20}
                            />
                          ) : (
                            <X className="mx-auto text-red-500" size={20} />
                          )}
                        </td>
                      ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 text-center text-xs text-gray-500">
            Data based on standard features available on each platform as of
            April 2025.
          </div>
        </div>
      </div>

      <section className="container mx-auto px-4 sm:px-6 py-16 md:py-20">
        <h2 className="mb-12 md:mb-16 font-bold text-center text-gray-900 text-3xl sm:text-4xl">
          Technologies We Use
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
          {[
            {
              name: "React",
              icon: react,
              description:
                "A JavaScript library for building fast and interactive user interfaces.",
            },
            {
              name: "React Query",
              icon: reactquery,
              description:
                "Helps manage and fetch data efficiently for e-commerce websites.",
            },
            {
              name: "Tailwind CSS",
              icon: tailwind,
              description:
                "Helps create responsive and visually appealing e-commerce designs.",
            },
            {
              name: "Zustand",
              icon: zustand,
              description:
                "A fast and scalable state management library for React.",
            },
            {
              name: "Node.js",
              icon: node,
              description:
                "Powers the server-side logic and handles backend processes efficiently.",
            },
            {
              name: "Express.js",
              icon: express,
              description:
                "Simplifies API development and backend services crucial for e-commerce platforms.",
            },
            {
              name: "Docker",
              icon: docker,
              description:
                "Helps ensure consistency and scalability for deploying e-commerce apps.",
            },
            {
              name: "Nginx",
              icon: nginx,
              description:
                "Used as a reverse proxy for efficient and secure delivery of e-commerce content.",
            },
            {
              name: "Prisma",
              icon: prisma,
              description:
                "A powerful ORM for managing database operations efficiently in e-commerce apps.",
            },
            {
              name: "PostgreSQL",
              icon: postgres,
              description:
                "A robust database solution for storing product data, user info, and order details.",
            },
            {
              name: "Supabase",
              icon: supabase,
              description:
                "Used for S3 storage and PostgreSQL Database for the e-commerce application.",
            },
            {
              name: "GitHub Actions",
              icon: actions,
              description:
                "Enables CI/CD pipelines, helping automate deployments and maintain e-commerce systems.",
            },
            {
              name: "PM2",
              icon: pm2,
              description:
                "A process manager for Node.js applications that keeps apps alive and ensures they restart after crashes.",
            },
            {
              name: "SSH",
              icon: ssh,
              description:
                "Secure Shell (SSH) protocol provides secure remote access to servers and deployment environments.",
            },
            {
              name: "Figma",
              icon: figma,
              description:
                "Used for collaborative UI/UX design, creating responsive layouts and visual components.",
            },
            {
              name: "Postman",
              icon: postman,
              description:
                "Enabled API testing, documentation, and collaboration throughout development.",
            },
            {
              name: "Redis",
              icon: redis,
              description:
                "Provides in-memory caching for improved performance and session management.",
            },
            {
              name: "Axios",
              icon: axiosIcon,
              description:
                "Handles HTTP requests with elegant promise-based architecture for frontend-backend communication.",
            },
            {
              name: "Azure",
              isTextIcon: true,
              textIcon: "Azure",
              description:
                "Microsoft Azure cloud services power scalable infrastructure and deployment solutions.",
            },
            {
              name: "DNS & HTTP",
              isTextIcon: true,
              textIcon: "DNS",
              description:
                "Domain Name System and HTTP protocols form the foundation of web communication.",
            },
          ].map((tech) => (
            <div
              key={tech.name}
              className="flex flex-col items-center py-8 px-4 text-center bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
            >
              {tech.isTextIcon ? (
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-indigo-600 font-semibold text-lg mb-4">
                  {tech.textIcon}
                </div>
              ) : (
                <img
                  src={tech.icon}
                  className="w-12 h-12 md:w-14 md:h-14 mb-4"
                  alt={tech.name}
                />
              )}
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                {tech.name}
              </h3>
              <p className="text-sm text-gray-600">{tech.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 py-16 md:py-20 border-t border-gray-200">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 leading-tight">
              Transform Your Shopping Experience Today
            </h2>
            <p className="text-gray-600 mb-10 text-lg">
              Join our innovative e-commerce platform where cutting-edge
              technology meets seamless user experience, providing you with the
              best online shopping journey.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Button
                className="w-full sm:w-auto px-8 py-3 text-lg bg-white text-indigo-600 border border-indigo-300 hover:bg-indigo-50 rounded-md shadow-md hover:shadow-lg transition-all duration-300 font-medium"
                onClick={() => navigate("/signup")}
              >
                Create Account
              </Button>
              <Button
                className="w-full sm:w-auto px-8 py-3 text-lg bg-indigo-600 hover:bg-indigo-700 text-white rounded-md shadow-md hover:shadow-lg transition-all duration-300 font-medium"
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
