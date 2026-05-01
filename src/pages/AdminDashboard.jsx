import { useState, useEffect } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [homestays, setHomestays] = useState([]);
  const [guides, setGuides] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [newHomestay, setNewHomestay] = useState({ name: "", description: "", location: "", pricePerNight: 0 });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [hRes, gRes, bRes] = await Promise.all([
        axios.get("http://localhost:8081/api/admin/homestays"),
        axios.get("http://localhost:8081/api/admin/guides"),
        axios.get("http://localhost:8081/api/admin/bookings")
      ]);
      setHomestays(hRes.data);
      setGuides(gRes.data);
      setBookings(bRes.data);
    } catch (err) {
      console.error("Error fetching data", err);
    }
  };

  const addHomestay = async () => {
    try {
      await axios.post("http://localhost:8081/api/admin/homestays", newHomestay);
      setNewHomestay({ name: "", description: "", location: "", pricePerNight: 0 });
      fetchData();
    } catch (err) {
      console.error("Error adding homestay", err);
    }
  };

  const deleteHomestay = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/api/admin/homestays/${id}`);
      fetchData();
    } catch (err) {
      console.error("Error deleting homestay", err);
    }
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>

      <section>
        <h3>Manage Homestays</h3>
        <div>
          <input placeholder="Name" value={newHomestay.name} onChange={e => setNewHomestay({...newHomestay, name: e.target.value})} />
          <input placeholder="Description" value={newHomestay.description} onChange={e => setNewHomestay({...newHomestay, description: e.target.value})} />
          <input placeholder="Location" value={newHomestay.location} onChange={e => setNewHomestay({...newHomestay, location: e.target.value})} />
          <input type="number" placeholder="Price" value={newHomestay.pricePerNight} onChange={e => setNewHomestay({...newHomestay, pricePerNight: parseFloat(e.target.value)})} />
          <button onClick={addHomestay}>Add Homestay</button>
        </div>
        <ul>
          {homestays.map(h => (
            <li key={h.id}>{h.name} - {h.location} <button onClick={() => deleteHomestay(h.id)}>Delete</button></li>
          ))}
        </ul>
      </section>

      <section>
        <h3>Guides</h3>
        <ul>
          {guides.map(g => (
            <li key={g.id}>{g.name} - {g.specialties}</li>
          ))}
        </ul>
      </section>

      <section>
        <h3>All Bookings</h3>
        <ul>
          {bookings.map(b => (
            <li key={b.id}>{b.itemType} - {b.status} - User: {b.user?.username}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}