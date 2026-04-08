import axios from "axios";
import citiesList from "../data/cities.js";

// Simulate network latency
const delay = (ms = 700) => new Promise((r) => setTimeout(r, ms));

// 🔥 Spring Boot Backend URL
const BASE_URL = "http://localhost:8081/api/travel";

// ✅ NOW FETCHING FROM BACKEND
export async function getHomestays() {
  try {
    const res = await axios.get(`${BASE_URL}/places`);
    return res.data;
  } catch (error) {
    console.error("Error fetching from backend:", error);
    return [];
  }
}

// ⛔ Still using local mock (can upgrade later)
export async function getHomestayById(id) {
  await delay(400);
  const idx = parseInt(id, 10);
  if (Number.isNaN(idx) || idx < 0 || idx >= citiesList.length)
    throw new Error("Not found");
  return citiesList[idx];
}

export async function getTours() {
  await delay(500);
  const tours = citiesList.flatMap((c) =>
    c.sightseeing.map((s) => ({ ...s, city: c.city }))
  );
  return tours;
}

export async function postBooking(booking) {
  await delay(400);
  const key = "bookings";
  const raw = localStorage.getItem(key);
  const list = raw ? JSON.parse(raw) : [];
  const b = { ...booking, id: Date.now(), createdAt: new Date().toISOString() };
  localStorage.setItem(key, JSON.stringify([b, ...list]));
  return b;
}

export default { getHomestays, getHomestayById, getTours, postBooking };