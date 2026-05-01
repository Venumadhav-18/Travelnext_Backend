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

  // Auth state with JWT and role
  const [user, setUser] = useState(null);

  // Add new booking (internal)
  const addBooking = async (newBooking) => {
    setBookings((prev) => [...prev, newBooking]);

    // Send the booking to the MySQL Database via Spring Boot
    const item = newBooking.item || {};
    const payment = newBooking.payment || {};
    const u = newBooking.user || {};
    const price = item.finalPrice || item.price || item.rate || 0;

    const backendPayload = {
        itemType: item.type || "homestay",
        checkIn: item.checkIn || "",
        checkOut: item.checkOut || "",
        nights: item.nights || 1,
        totalPrice: price,
        paymentMethod: payment.method || "",
        paymentSummary: payment.summary ? JSON.stringify(payment.summary) : "",
        createdAt: newBooking.createdAt
    };

    try {
        const response = await axios.post("http://localhost:8081/api/travel/bookings", backendPayload);
        console.log("Booking saved to database", response.data);
    } catch (err) {
        console.error("Warning: Could not save booking to database", err);
    }
  };

  const clearBookings = () => {
    setBookings([]);
  };

  // Auth helpers with dummy auth
  const validAccounts = [
    { username: "admin", password: "admin", role: "ADMIN" },
    { username: "user", password: "user", role: "USER" },
    { username: "guide", password: "guide", role: "GUIDE" },
  ];

  const login = async ({ username, password, role }) => {
    const normalizedUsername = username?.trim().toLowerCase();
    const account = validAccounts.find((acc) =>
      acc.username === normalizedUsername &&
      acc.password === password &&
      (role ? acc.role === role : true)
    );

    if (!account) {
      return {
        ok: false,
        message: "Invalid login. Try user/user, guide/guide, or admin/admin.",
      };
    }

    const u = { username: account.username, role: account.role };
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
      user: user ? { name: user.username, email: user.username } : null,
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
      logout,
      confirmBooking,
    }}>
      {children}
    </TravelContext.Provider>
  );
};
