import { useState } from "react";
import { useTravel } from "../context/TravelContext.jsx";

export default function AuthModal({ onClose }) {
  const { login } = useTravel();
  const [form, setForm] = useState({ username: "", password: "", role: "USER" });
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    const res = await login({ username: form.username.trim(), password: form.password, role: form.role });
    if (!res.ok) setError(res.message || "Login failed");
    else onClose();
  };

  const quickLogin = async (username, password, role) => {
    setForm({ username, password, role });
    setError("");
    const res = await login({ username, password, role });
    if (!res.ok) setError(res.message || "Login failed");
    else onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal small">
        <header className="modal-header">
          <h3>Login</h3>
          <button className="close" onClick={onClose}>✕</button>
        </header>
        <div className="modal-body">
          <p style={{ marginBottom: 12 }}>
            Choose one of the built-in logins and click it to sign in instantly.
          </p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
            <button type="button" className="btn" onClick={() => quickLogin("user", "user", "USER")}>Login as User</button>
            <button type="button" className="btn" onClick={() => quickLogin("guide", "guide", "GUIDE")}>Login as Local Guide</button>
            <button type="button" className="btn" onClick={() => quickLogin("admin", "admin", "ADMIN")}>Login as Admin</button>
          </div>

          <form onSubmit={submit}>
            <label>Role</label>
            <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
              <option value="USER">User</option>
              <option value="GUIDE">Local Guide</option>
              <option value="ADMIN">Admin</option>
            </select>

            <label>Username</label>
            <input
              required
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              placeholder="user, guide, or admin"
            />

            <label>Password</label>
            <input
              required
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="use the same password as username"
            />

            {error && <p style={{ color: "red" }}>{error}</p>}

            <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 10 }}>
              <button type="button" className="btn" onClick={onClose}>Cancel</button>
              <button className="btn" type="submit">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
