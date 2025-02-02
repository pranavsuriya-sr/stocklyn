import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import Navbar from "./components/navbar/navbar.tsx";
import { Toaster } from "./components/ui/toaster.tsx";
import { SessionProvider } from "./context/session-context.tsx";
import "./index.css";
import CartLoader from "./pages/cart/cart-loader.tsx";
import FooterPage from "./pages/footer/footer-page.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <SessionProvider>
      <CartLoader />
      <BrowserRouter>
        <Navbar />
        <App />
        <Toaster />
        <FooterPage />
      </BrowserRouter>
    </SessionProvider>
  </QueryClientProvider>
);
