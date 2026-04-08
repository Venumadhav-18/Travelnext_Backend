import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <main>
      <section className={`hero ${loaded ? "enter" : ""}`}>
        <div className="hero-overlay">
          <h1 className="hero-title">TravelNest</h1>
          <p className="hero-sub">
            Discover comfortable stays and curated local experiences with trusted hosts and guides.
          </p>
          <div style={{ marginTop: 16 }}>
            <Link className="btn" to="/homestays">
              Explore Homestays
            </Link>
            <Link className="btn" to="/guide" style={{ marginLeft: 8 }}>
              Find a Local Guide
            </Link>
          </div>
        </div>
      </section>

      <section className="container" style={{ marginTop: 26 }}>
        <h2>Why choose TravelNest?</h2>
        <p>
          We connect you with trusted homestays and experienced local guides across India's top cities.
          Simple booking flow, secure payments, and local support.
        </p>
      </section>
    </main>
  );
}