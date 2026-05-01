import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useTravel } from "../context/TravelContext.jsx";
import AuthModal from "./AuthModal.jsx";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const { user, logout } = useTravel();

  const close = () => setOpen(false);

  return (
    <>
      <nav className="navbar">
        <div className="nav-inner">
          <div className="brand">TravelNest</div>

          <button className="hamburger" onClick={() => setOpen((s) => !s)} aria-label="Toggle navigation">
            ☰
          </button>

          <div className={`nav-links ${open ? "open" : ""}`} onClick={close}>
            <NavLink to="/" end className={({isActive}) => isActive ? 'active' : ''}>Home</NavLink>
            <NavLink to="/homestays" className={({isActive}) => isActive ? 'active' : ''}>Homestays</NavLink>
            <NavLink to="/guide" className={({isActive}) => isActive ? 'active' : ''}>Local Guide</NavLink>
            <NavLink to="/contact" className={({isActive}) => isActive ? 'active' : ''}>Contact</NavLink>
            {user && <NavLink to="/bookings" className={({isActive}) => isActive ? 'active' : ''}>My Bookings</NavLink>}

            {user?.role === 'ADMIN' && (
              <>
                <NavLink to="/admin" className={({isActive}) => isActive ? 'active' : ''}>Admin Dashboard</NavLink>
              </>
            )}
            {user?.role === 'GUIDE' && (
              <>
                <NavLink to="/guide-dashboard" className={({isActive}) => isActive ? 'active' : ''}>Guide Dashboard</NavLink>
              </>
            )}

            {user ? (
              <>
                <span style={{ color: 'white', marginLeft: 10 }}>Hi, {user.username} ({user.role})</span>
                <button className="btn" onClick={logout} style={{ marginLeft: 8 }}>Logout</button>
              </>
            ) : (
              <button className="btn" onClick={() => setShowAuth(true)} style={{ marginLeft: 8 }}>Login / Register</button>
            )}
          </div>
        </div>
      </nav>

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </>
  );
}
