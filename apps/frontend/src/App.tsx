import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import About from "./pages/about/about-page";
import Login from "./pages/auth/login-page";
import SignUp from "./pages/auth/signup-page";
import Cart from "./pages/cart/cart-page";
import Home from "./pages/home/home-page";
import LandingPage from "./pages/landing/landing-page";
import LoadingPage from "./pages/loading/loading-page";
import ProductPage from "./pages/product/product-page";
import UserProfile from "./pages/profile/user-profile";
import ProtectedPage from "./pages/protected/procted-page";
import ShopPage from "./pages/shop/shop-page";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [currentLocation, setCurentLocation] = useState("");
  const location = useLocation();

  useEffect(() => {
    if (currentLocation === location.pathname) {
      return;
    }

    window.scrollTo(0, 0);

    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    setCurentLocation(location.pathname);

    return () => clearTimeout(timer);
  }, [location]);

  return (
    <>
      {loading && <LoadingPage />}
      <Routes>
        <Route
          path="/userProfile"
          element={
            <ProtectedPage>
              <UserProfile />
            </ProtectedPage>
          }
        />

        <Route
          path="/cartItems"
          element={
            <ProtectedPage>
              <Cart />
            </ProtectedPage>
          }
        />
        <Route
          path="/shop"
          element={
            <ProtectedPage>
              <ShopPage />
            </ProtectedPage>
          }
        />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/product/:productId" element={<ProductPage />} />
      </Routes>
    </>
  );
};

export default App;
