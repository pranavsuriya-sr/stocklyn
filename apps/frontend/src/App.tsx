import { Analytics } from "@vercel/analytics/react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import About from "./pages/about/about-page";
import Login from "./pages/auth/login-page";
import SignUp from "./pages/auth/signup-page";
import Cart from "./pages/cart/cart-page";
import CheckOut from "./pages/checkout/checkout-page";
import ContactPage from "./pages/contact/contact-page";
import NotFoundPage from "./pages/error/error-page";
import Home from "./pages/home/home-page";
import LandingPage from "./pages/landing/landing-page";
import LocationAdd from "./pages/location/location-add-page";
import LocationsDisplayPage from "./pages/location/locations-display-page";
import OrderHistory from "./pages/order/order-history-page";
import ProductPage from "./pages/product/product-page";
import UserProfile from "./pages/profile/user-profile";
import ProtectedPage from "./pages/protected/procted-page";
import SearchPage from "./pages/search/search-page";
import ShopPage from "./pages/shop/shop-page";
import PaymentFailurePage from "./pages/stripe-redirect/failure-page";
import PaymentSuccessPage from "./pages/stripe-redirect/success-page";

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
      <Analytics />
    </>
  );
};

export default App;
