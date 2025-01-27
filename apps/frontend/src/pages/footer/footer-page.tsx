import { useNavigate } from "react-router-dom";

const FooterPage = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-gray-900 text-white pt-20 pb-3 ">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-around items-center text-center md:text-left gap-8">
          {/* About Us */}
          <div className="max-w-xs">
            <h2 className="text-lg font-semibold mb-4">About Us</h2>
            <p className="text-sm text-gray-400">
              We are a leading e-commerce platform dedicated to providing
              quality products and exceptional customer service.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
            <ul className="space-y-2">
              {[
                { name: "Home", path: "/home" },
                { name: "Shop", path: "/shop" },
                { name: "About", path: "/about" },
                { name: "Contact", path: "/contact" },
              ].map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => navigate(link.path)}
                    className="text-sm text-gray-400 hover:text-white transition-colors w-full py-1"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Follow Us</h2>
            <div className="flex justify-center md:justify-start space-x-4">
              {[
                {
                  icon: (
                    <path d="M22 5.72v12.56A3.72 3.72 0 0118.28 22H5.72A3.72 3.72 0 012 18.28V5.72A3.72 3.72 0 015.72 2h12.56A3.72 3.72 0 0122 5.72zM12.28 5.72h-2.5v11.5h2.5V5.72zm-.31 13.44h-.63v2.5h.63v-2.5zm7.28-8.44v7.44a1.26 1.26 0 01-1.25 1.25H8.56a1.26 1.26 0 01-1.25-1.25V10.72a1.26 1.26 0 011.25-1.25h9.44a1.26 1.26 0 011.25 1.25z" />
                  ),
                },
                {
                  icon: (
                    <path d="M22 5.72v12.56A3.72 3.72 0 0118.28 22H5.72A3.72 3.72 0 012 18.28V5.72A3.72 3.72 0 015.72 2h12.56A3.72 3.72 0 0122 5.72zM12 17a5 5 0 100-10 5 5 0 000 10z" />
                  ),
                },
                {
                  icon: (
                    <path d="M21.41 11.34c-.02.24-.05.47-.08.7-.63 5.28-5.05 8.96-10.44 8.96-4.33 0-8.09-2.39-10-5.82.59.07 1.18.11 1.79.11 3.6 0 6.94-1.2 9.53-3.21-1.69-.04-3.12-.98-3.63-2.3.46.08.92.13 1.4.13.67 0 1.33-.09 1.95-.26-1.75-.35-3.04-1.9-3.04-3.75v-.04c.51.28 1.1.46 1.72.48-1.04-.7-1.72-1.88-1.72-3.22 0-.71.19-1.37.52-1.95 1.86 2.27 4.64 3.76 7.78 3.92-.06-.28-.1-.56-.1-.86 0-2.07 1.68-3.75 3.75-3.75 1.08 0 2.05.45 2.73 1.18.85-.17 1.64-.48 2.35-.91-.28.87-.88 1.6-1.66 2.06.76-.09 1.48-.29 2.15-.59-.5.76-1.12 1.43-1.84 1.96z" />
                  ),
                },
              ].map((social, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    {social.icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        <hr className="border-t border-gray-700 mt-8 mb-4 mx-auto w-4/5" />
        <div className="text-center text-sm text-gray-500">
          © 2025 Maddie. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default FooterPage;
