import { Route, Routes } from "react-router-dom";
import Login from "./pages/auth/login";
import SignUp from "./pages/auth/sign-up";
import Home from "./pages/home/home";
import LandingPage from "./pages/landing/landing-page";
import ProtectedPage from "./pages/protected/ProtectedPage";

const App = () => {
  return (
    <Routes>
      <Route
        path="/home"
        element={
          <ProtectedPage>
            <Home />
          </ProtectedPage>
        }
      />
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
};

export default App;
