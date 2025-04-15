import { useNavigate } from "react-router-dom";

const FooterPage = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-white text-gray-600 pt-12 pb-6 px-4 border-t border-gray-200">
      <div className="container mx-auto">
        {/* Newsletter Section - Clean professional style */}

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10 mb-12">
          {/* About Us */}
          <div className="md:col-span-2">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              About Maalelo
            </h2>
            <p className="text-gray-600 mb-4 max-w-lg">
              We are a leading e-commerce platform dedicated to offering premium
              products and delivering exceptional customer experiences,
              seamlessly connecting customers with the quality they deserve.
            </p>

            <div className="flex space-x-4 mt-6">
              {[
                {
                  name: "Facebook",
                  icon: (
                    <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z" />
                  ),
                },
                {
                  name: "Instagram",
                  icon: (
                    <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.05.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.05.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.05-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.05-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.15.63c-.79.3-1.46.71-2.13 1.38S.92 3.36.63 4.15c-.3.76-.5 1.64-.57 2.9C.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.26.26 2.14.57 2.9.3.79.71 1.46 1.38 2.13.67.67 1.34 1.08 2.13 1.38.76.3 1.64.5 2.9.57C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.26-.06 2.14-.26 2.9-.57.79-.3 1.46-.71 2.13-1.38.67-.67 1.08-1.34 1.38-2.13.3-.76.5-1.64.57-2.9.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.26-.26-2.14-.57-2.9-.3-.79-.71-1.46-1.38-2.13-.67-.67-1.34-1.08-2.13-1.38-.76-.3-1.64-.5-2.9-.57C15.67.01 15.26 0 12 0zm0 5.84c-3.4 0-6.16 2.76-6.16 6.16 0 3.4 2.76 6.16 6.16 6.16 3.4 0 6.16-2.76 6.16-6.16 0-3.4-2.76-6.16-6.16-6.16zm0 10.16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm6.4-11.8c-.8 0-1.44.64-1.44 1.44s.64 1.44 1.44 1.44c.8 0 1.44-.64 1.44-1.44s-.64-1.44-1.44-1.44z" />
                  ),
                },
                {
                  name: "Twitter",
                  icon: (
                    <path d="M23.95 4.57a10 10 0 01-2.82.77 4.96 4.96 0 002.16-2.72 9.9 9.9 0 01-3.15 1.2 4.92 4.92 0 00-8.38 4.48A13.94 13.94 0 011.64 3.16a4.92 4.92 0 001.52 6.57 4.9 4.9 0 01-2.23-.61v.06c0 2.38 1.7 4.37 3.95 4.82a4.94 4.94 0 01-2.22.08 4.93 4.93 0 004.6 3.42 9.87 9.87 0 01-6.1 2.1c-.39 0-.78-.02-1.17-.07a13.9 13.9 0 007.52 2.21c9.05 0 14-7.5 14-13.98 0-.21 0-.42-.01-.63A10 10 0 0024 4.59l-.05-.02z" />
                  ),
                },
                {
                  name: "LinkedIn",
                  icon: (
                    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.04c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.44v6.3zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zm1.78 13.02H3.56V9h3.56v11.45zM22.22 0H1.78C.8 0 0 .78 0 1.73v20.54C0 23.22.8 24 1.78 24h20.44c.98 0 1.78-.78 1.78-1.73V1.73C24 .78 23.2 0 22.22 0z" />
                  ),
                },
              ].map((social, index) => (
                <a
                  key={index}
                  href="#"
                  className="bg-gray-100 p-3 rounded-full hover:bg-gray-200 transition-colors"
                  aria-label={social.name}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-gray-700"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    {social.icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Quick Links
            </h2>
            <ul className="space-y-3">
              {[
                { name: "Home", path: "/home" },
                { name: "Shop", path: "/shop" },
                { name: "About", path: "/about" },
                { name: "Contact", path: "/contact" },
                { name: "Blog", path: "/blog" },
                { name: "FAQ", path: "/faq" },
              ].map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => navigate(link.path)}
                    className="text-gray-600 hover:text-gray-900 transition-colors flex items-center"
                  >
                    <svg
                      className="w-3 h-3 mr-2 text-gray-400"
                      viewBox="0 0 12 12"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path d="M4 1l5 5-5 5" strokeWidth="2" />
                    </svg>
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Customer Service
            </h2>
            <ul className="space-y-3">
              {[
                { name: "Shipping Policy", path: "/shipping" },
                { name: "Return Policy", path: "/returns" },
                { name: "Privacy Policy", path: "/privacy" },
                { name: "Terms & Conditions", path: "/terms" },
                { name: "Track Order", path: "/track" },
              ].map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => navigate(link.path)}
                    className="text-gray-600 hover:text-gray-900 transition-colors flex items-center"
                  >
                    <svg
                      className="w-3 h-3 mr-2 text-gray-400"
                      viewBox="0 0 12 12"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path d="M4 1l5 5-5 5" strokeWidth="2" />
                    </svg>
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr className="border-t border-gray-200 mb-6" />

        <div className="flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          <div className="mb-4 md:mb-0">
            © 2025 Maalelo. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-gray-700 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-gray-700 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-gray-700 transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterPage;
