import { Facebook, Instagram, Twitter } from "lucide-react";

const SellerFooterPage = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 text-gray-700">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          {/* Logo & Tagline */}
          <div className="md:col-span-4 lg:col-span-3">
            <h3 className="text-2xl font-bold text-indigo-600 mb-2 tracking-tight">
              Trazor
            </h3>
            <p className="text-gray-500 text-sm">
              Empowering Sellers Worldwide
            </p>
          </div>

          {/* Links Sections */}
          <div className="md:col-span-8 lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold text-gray-800 mb-4 text-base tracking-wide">
                Company
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-indigo-600 transition-colors text-sm"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-indigo-600 transition-colors text-sm"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-indigo-600 transition-colors text-sm"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-indigo-600 transition-colors text-sm"
                  >
                    Partners
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-4 text-base tracking-wide">
                Support
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-indigo-600 transition-colors text-sm"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-indigo-600 transition-colors text-sm"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-indigo-600 transition-colors text-sm"
                  >
                    FAQs
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-indigo-600 transition-colors text-sm"
                  >
                    Seller Policy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-4 text-base tracking-wide">
                Legal
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-indigo-600 transition-colors text-sm"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-indigo-600 transition-colors text-sm"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-indigo-600 transition-colors text-sm"
                  >
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact & Social */}
          <div className="md:col-span-12 lg:col-span-3 lg:mt-0 mt-8">
            <h4 className="font-semibold text-gray-800 mb-4 text-base tracking-wide">
              Contact Us
            </h4>
            <p className="text-gray-500 text-sm mb-1">support@Trazor.com</p>
            <p className="text-gray-500 text-sm mb-4">+1 (555) 123-4567</p>

            <h4 className="font-semibold text-gray-800 mb-3 text-base tracking-wide mt-6">
              Follow Us
            </h4>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-indigo-600 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-indigo-600 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-indigo-600 transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 pt-8">
          {/* Bottom bar */}
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500 gap-4">
            <p>
              &copy; {new Date().getFullYear()} Trazor. All Rights Reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-indigo-600 transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-indigo-600 transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-indigo-600 transition-colors">
                Seller Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SellerFooterPage;
