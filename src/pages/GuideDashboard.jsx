import { useState, useEffect } from "react";
import axios from "axios";

export default function GuideDashboard() {
  const [profile, setProfile] = useState({});
  const [bookings, setBookings] = useState([]);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [pRes, bRes] = await Promise.all([
        axios.get("http://localhost:8081/api/guide/profile"),
        axios.get("http://localhost:8081/api/guide/bookings")
      ]);
      setProfile(pRes.data);
      setBookings(bRes.data);
    } catch (err) {
      console.error("Error fetching data", err);
    }
  };

  const updateProfile = async () => {
    try {
      await axios.put("http://localhost:8081/api/guide/profile", profile);
      setEditMode(false);
      fetchData();
    } catch (err) {
      console.error("Error updating profile", err);
    }
  };

  const acceptBooking = async (id) => {
    try {
      await axios.put(`http://localhost:8081/api/guide/bookings/${id}/accept`);
      fetchData();
    } catch (err) {
      console.error("Error accepting booking", err);
    }
  };

  const rejectBooking = async (id) => {
    try {
      await axios.put(`http://localhost:8081/api/guide/bookings/${id}/reject`);
      fetchData();
    } catch (err) {
      console.error("Error rejecting booking", err);
    }
  };

  return (
    <div>
      <h2>Guide Dashboard</h2>

      <section>
        <h3>My Profile</h3>
        {editMode ? (
          <div>
            <input value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})} placeholder="Name" />
            <textarea value={profile.bio} onChange={e => setProfile({...profile, bio: e.target.value})} placeholder="Bio" />
            <input value={profile.specialties} onChange={e => setProfile({...profile, specialties: e.target.value})} placeholder="Specialties" />
            <button onClick={updateProfile}>Save</button>
            <button onClick={() => setEditMode(false)}>Cancel</button>
          </div>
        ) : (
          <div>
            <p>Name: {profile.name}</p>
            <p>Bio: {profile.bio}</p>
            <p>Specialties: {profile.specialties}</p>
            <button onClick={() => setEditMode(true)}>Edit Profile</button>
          </div>
        )}
      </section>

      <section>
        <h3>My Bookings</h3>
        <ul>
          {bookings.map(b => (
            <li key={b.id}>
              {b.itemType} - {b.checkIn} to {b.checkOut} - Status: {b.status}
              {b.status === 'PENDING' && (
                <>
                  <button onClick={() => acceptBooking(b.id)}>Accept</button>
                  <button onClick={() => rejectBooking(b.id)}>Reject</button>
                </>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}