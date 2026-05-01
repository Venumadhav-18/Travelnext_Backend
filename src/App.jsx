import "./styles.css";
import Navbar from "./components/Navbar.jsx";
import { Routes, Route } from "react-router-dom";
import { TravelProvider } from "./context/TravelContext.jsx";
import Home from "./pages/Home.jsx";
import Homestays from "./pages/Homestays.jsx";
import Guide from "./pages/Guide.jsx";
import Contact from "./pages/Contact.jsx";
import MyBookings from "./pages/MyBookings.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import GuideDashboard from "./pages/GuideDashboard.jsx";

export default function App() {
  return (
    <TravelProvider>
      <div className="app-root">
        <header>
          <h1>TravelNest</h1>
          <p>Your Gateway to Stays & Local Adventures</p>
        </header>

        <Navbar />

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/homestays" element={<Homestays />} />
            <Route path="/guide" element={<Guide />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/bookings" element={<MyBookings />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/guide-dashboard" element={<GuideDashboard />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>

        <footer>
          <p>© {new Date().getFullYear()} TravelNest — SDP Review Project</p>
        </footer>
      </div>
    </TravelProvider>
  );
}
