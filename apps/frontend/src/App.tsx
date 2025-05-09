import { lazy, Suspense } from "react";

import { Analytics } from "@vercel/analytics/react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import SellerProtectedPage from "./pages/protected/seller-protected-page";
import SellerDashboardPage from "./pages/seller/dashboard/dashboard-page";
const About = lazy(() => import("./pages/about/about-page"));
const PolicyPage = lazy(() => import("./pages/about/shipping-policy-page"));
const Login = lazy(() => import("./pages/auth/login-page"));
const SellerLogin = lazy(
  () => import("./pages/auth/sellerAuth/seller-login-page")
);
const SellerSignUp = lazy(
  () => import("./pages/auth/sellerAuth/seller-signup-page")
);
const SignUp = lazy(() => import("./pages/auth/signup-page"));
const Cart = lazy(() => import("./pages/cart/cart-page"));
const CheckOut = lazy(() => import("./pages/checkout/checkout-page"));
const ContactPage = lazy(() => import("./pages/contact/contact-page"));
const NotFoundPage = lazy(() => import("./pages/error/error-page"));
const Home = lazy(() => import("./pages/home/home-page"));
const LandingPage = lazy(() => import("./pages/landing/landing-page"));
const LocationAdd = lazy(() => import("./pages/location/location-add-page"));
const LocationsDisplayPage = lazy(
  () => import("./pages/location/locations-display-page")
);
const OrderHistory = lazy(() => import("./pages/order/order-history-page"));
const ProductPage = lazy(() => import("./pages/product/product-page"));
const UserProfile = lazy(() => import("./pages/profile/user-profile"));
const ProtectedPage = lazy(() => import("./pages/protected/procted-page"));
const SearchPage = lazy(() => import("./pages/search/search-page"));
const ShopPage = lazy(() => import("./pages/shop/shop-page"));
const PaymentFailurePage = lazy(
  () => import("./pages/stripe-redirect/failure-page")
);
const PaymentSuccessPage = lazy(
  () => import("./pages/stripe-redirect/success-page")
);

const pageVariants = {
  initial: {
    opacity: 0,
    y: 10,
  },
  in: {
    opacity: 1,
    transition: { duration: 0.2 },
    y: 0,
  },
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.2,
};

const App = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [location]);

  return (
    <>
      {/* {loading && <LoadingPage />} */}
      <Suspense fallback={<div>Loading...</div>}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/userProfile"
              element={
                <ProtectedPage>
                  <motion.div
                    initial="initial"
                    animate="in"
                    // exit="out"

                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <UserProfile />
                  </motion.div>
                </ProtectedPage>
              }
            />
            <Route
              path="/cartItems"
              element={
                <ProtectedPage>
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <Cart />
                  </motion.div>
                </ProtectedPage>
              }
            />
            <Route
              path="/shop"
              element={
                <ProtectedPage>
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <ShopPage />
                  </motion.div>
                </ProtectedPage>
              }
            />
            <Route
              path="/searchResults/:id"
              element={
                <ProtectedPage>
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <SearchPage />
                  </motion.div>
                </ProtectedPage>
              }
            />
            <Route
              path="/editUserAddress"
              element={
                <ProtectedPage>
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <LocationsDisplayPage />
                  </motion.div>
                </ProtectedPage>
              }
            ></Route>
            <Route
              path="/addUserAddress"
              element={
                <ProtectedPage>
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <LocationAdd />
                  </motion.div>
                </ProtectedPage>
              }
            ></Route>
            <Route
              path="/success"
              element={
                <ProtectedPage>
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <PaymentSuccessPage />
                  </motion.div>
                </ProtectedPage>
              }
            ></Route>
            <Route
              path="/failure"
              element={
                <ProtectedPage>
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <PaymentFailurePage />
                  </motion.div>
                </ProtectedPage>
              }
            ></Route>
            <Route
              path="/orderHistory"
              element={
                <ProtectedPage>
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <OrderHistory />
                  </motion.div>{" "}
                </ProtectedPage>
              }
            ></Route>
            <Route
              path="/checkout"
              element={
                <ProtectedPage>
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <CheckOut />
                  </motion.div>{" "}
                </ProtectedPage>
              }
            ></Route>
            <Route
              path="/contact"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <ContactPage />
                </motion.div>
              }
            />
            <Route
              path="/home"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <Home />
                </motion.div>
              }
            />
            <Route
              path="/about"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <About />
                </motion.div>
              }
            />
            <Route
              path="/"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <LandingPage />
                </motion.div>
              }
            />
            <Route
              path="/login"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <Login />
                </motion.div>
              }
            />
            <Route
              path="/signup"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <SignUp />
                </motion.div>
              }
            />
            <Route
              path="/product/:productId"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <ProductPage />
                </motion.div>
              }
            />
            <Route
              path="/policy"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <PolicyPage />
                </motion.div>
              }
            />
            //Seller Routes
            <Route
              path="/seller/signup"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <SellerSignUp />
                </motion.div>
              }
            />
            <Route
              path="/seller/login"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <SellerLogin />
                </motion.div>
              }
            />
            <Route
              path="/seller/dashboard"
              element={
                <SellerProtectedPage>
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <SellerDashboardPage />
                  </motion.div>{" "}
                </SellerProtectedPage>
              }
            ></Route>
            <Route
              path="*"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <NotFoundPage />
                </motion.div>
              }
            />
          </Routes>
        </AnimatePresence>
      </Suspense>
      <Analytics />
    </>
  );
};

export default App;
