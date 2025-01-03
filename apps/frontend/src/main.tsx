import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import Navbar from "./components/navbar/navbar.tsx";
import { SessionProvider } from "./context/session-context.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <SessionProvider>
    <BrowserRouter>
      <Navbar />
      <App />
    </BrowserRouter>
  </SessionProvider>
);
