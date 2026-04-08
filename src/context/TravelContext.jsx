import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

// Create the context
const TravelContext = createContext();

// Export a hook for easy usage in components
export const useTravel = () => useContext(TravelContext);

export const TravelProvider = ({ children }) => {
  // Global booking state
  const [bookings, setBookings] = useState(() => {
    // Load from localStorage (data persistence)
    const saved = localStorage.getItem("bookings");
    return saved ? JSON.parse(saved) : [];
  });

  // Persist bookings
  useEffect(() => {
    localStorage.setItem("bookings", JSON.stringify(bookings));
  }, [bookings]);

  // Basic user (auth) state persisted to localStorage for demo purposes
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("travel_user");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) localStorage.setItem("travel_user", JSON.stringify(user));
    else localStorage.removeItem("travel_user");
  }, [user]);

  // Add new booking (internal)
  const addBooking = async (newBooking) => {
    setBookings((prev) => [...prev, newBooking]);

    // Send the booking to the MySQL Database via Spring Boot
    const item = newBooking.item || {};
    const payment = newBooking.payment || {};
    const u = newBooking.user || {};
    const price = item.finalPrice || item.price || item.rate || 0;

    const backendPayload = {
        itemName: item.name || item.title || "Booking item",
        city: item.city || "",
        itemType: item.type || "homestay",
        checkIn: item.checkIn || "",
        checkOut: item.checkOut || "",
        nights: item.nights || 1,
        totalPrice: price,
        paymentMethod: payment.method || "",
        paymentSummary: payment.summary ? JSON.stringify(payment.summary) : "",
        userName: u.name || "",
        userEmail: u.email || "",
        createdAt: newBooking.createdAt
    };

    try {
        await axios.post("http://localhost:8081/api/travel/bookings", backendPayload);
    } catch (err) {
        console.error("Warning: Could not save booking to database", err);
    }
  };

  const clearBookings = () => {
    setBookings([]);
  };

  // Auth helpers (very lightweight, client-only for demo)
  const login = ({ email, password }) => {
    // In a real app you'd authenticate; here we just set user if values present
    if (!email || !password) return { ok: false, message: "Provide email and password" };
    const u = { name: email.split("@")[0], email };
    setUser(u);
    return { ok: true, user: u };
  };

  const register = ({ name, email, password }) => {
    if (!email || !password || !name) return { ok: false, message: "Provide name, email and password" };
    const u = { name, email };
    setUser(u);
    return { ok: true, user: u };
  };

  const logout = () => setUser(null);

  // Confirm booking after payment — attach purchaser and payment summary
  const confirmBooking = ({ item, payment }) => {
    const booking = {
      id: Date.now(),
      item,
      payment: { method: payment.method, summary: payment.summary || null },
      user: user ? { name: user.name, email: user.email } : null,
      createdAt: new Date().toISOString(),
    };
    addBooking(booking);
    return booking;
  };

  return (
    <TravelContext.Provider value={{
      bookings,
      addBooking,
      clearBookings,
      user,
      login,
      register,
      logout,
      confirmBooking,
    }}>
      {children}
    </TravelContext.Provider>
  );
};
