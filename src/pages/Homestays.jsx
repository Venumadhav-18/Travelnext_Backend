import { useTravel } from "../context/TravelContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthModal from "../components/AuthModal.jsx";
import Confetti from "../components/Confetti.jsx";
import { getHomestays } from "../api/api";
import citiesData from "../data/cities.js";

export default function Homestays() {
  const { user } = useTravel();
  const [cities, setCities] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const navigate = useNavigate();

  // LOAD DATA
  useEffect(() => {
    const fetchData = async () => {
      await getHomestays(); // backend call (for connection)
      setCities(citiesData); // using local data for UI
    };
    fetchData();
  }, []);

  const handleView = (cityName) => {
    setExpanded(expanded === cityName ? null : cityName);
  };

  const handleBookClick = (hotel, city) => {
    if (!checkIn || !checkOut) {
      alert("⚠️ Please select check-in and check-out dates");
      return;
    }

    const nights = Math.max(
      0,
      Math.round(
        (new Date(checkOut) - new Date(checkIn)) /
          (1000 * 60 * 60 * 24)
      )
    );

    const pricePerNight = hotel.rate || hotel.price || 1000;
    const finalPrice = nights * pricePerNight;

    const item = {
      ...hotel,
      city,
      checkIn,
      checkOut,
      nights,
      finalPrice,
      img: hotel.img || "/1.jpg",
    };

    if (!user) {
      setShowAuth(true);
      return;
    }

    navigate("/checkout", { state: { item } });
  };

  return (
    <div className="container">

      {/* DATE PICKER */}
      <div style={{ marginBottom: 20 }}>
        <label>Check-in:</label><br />
        <input
          type="date"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
          style={{ padding: 8, marginBottom: 10 }}
        />

        <br />

        <label>Check-out:</label><br />
        <input
          type="date"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
          style={{ padding: 8 }}
        />
      </div>

      <h2>🏡 Homestays & Hotels</h2>

      {cities.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <div className="grid">
          {cities.map((city, index) => (
            <div key={index} className="card">

              {/* IMAGE */}
              {city.hotels?.[0]?.img && (
                <img src={city.hotels[0].img} alt={city.city} />
              )}

              <div className="card-content">
                <h3>{city.city}</h3>
                <p>{city.desc}</p>

                <button
                  className="btn"
                  onClick={() => handleView(city.city)}
                >
                  {expanded === city.city
                    ? "Hide Hotels"
                    : "View Hotels"}
                </button>

                {/* HOTELS */}
                {expanded === city.city && (
                  <div style={{ marginTop: 12 }}>
                    {city.hotels.map((h, i) => (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          gap: 10,
                          alignItems: "center",
                          marginTop: 10,
                        }}
                      >
                        <img
                          src={h.img}
                          alt={h.name}
                          style={{
                            width: 80,
                            height: 60,
                            borderRadius: 6,
                          }}
                        />

                        <div style={{ flex: 1 }}>
                          <strong>{h.name}</strong>
                          <div>
                            ⭐ {h.rating} — ₹{h.rate}/night
                          </div>
                        </div>

                        <button
                          className="btn"
                          onClick={() =>
                            handleBookClick(h, city.city)
                          }
                        >
                          Book
                        </button>
                      </div>
                    ))}
                  </div>
                )}

              </div>
            </div>
          ))}
        </div>
      )}

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
      <Confetti show={false} />
    </div>
  );
}