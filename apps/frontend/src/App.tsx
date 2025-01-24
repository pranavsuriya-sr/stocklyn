import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import About from "./pages/about/about";
import Login from "./pages/auth/login";
import SignUp from "./pages/auth/sign-up";
import Cart from "./pages/cart/cart";
import Home from "./pages/home/home";
import LandingPage from "./pages/landing/landing-page";
import LoadingPage from "./pages/loading/loading-page";
import ProductPage from "./pages/product/product-page";
import UserProfile from "./pages/profile/user-profile";
import ProtectedPage from "./pages/protected/ProtectedPage";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [currentLocation, setCurentLocation] = useState("");
  const location = useLocation();

  useEffect(() => {
    if (currentLocation === location.pathname) {
      return;
    }

    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    setCurentLocation(location.pathname);

    return () => clearTimeout(timer);
  }, [location]);

  return (
    <>
      {loading && <LoadingPage />}
      <Routes>
        <Route
          path="/home"
          element={
            <ProtectedPage>
              <Home />
            </ProtectedPage>
          }
        />

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
