import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
    maxPlayers: 1,
  });
  const [userLocation, setUserLocation] = useState({ lat: null, lng: null });
  const [currentUser, setCurrentUser] = useState(null);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // ✅ Check session & safely parse user
  useEffect(() => {
    try {
      const rawUser = localStorage.getItem("user");
      if (!token || !rawUser) throw new Error("Missing session");
      const parsedUser = JSON.parse(rawUser);
      if (!parsedUser._id) throw new Error("Invalid user object");
      setCurrentUser(parsedUser);
    } catch (err) {
      toast.error("🚫 Invalid session. Please login again.");
      localStorage.clear();
      navigate("/login");
    }
  }, []);

  // ✅ Fetch events & location
  useEffect(() => {
    if (!token) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => console.warn("Location access denied")
    );

    const fetchEvents = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/events");
        setEvents(res.data.reverse());
      } catch (err) {
        toast.error("Failed to fetch events");
      }
    };

    fetchEvents();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/events",
        {
          ...formData,
          lat: userLocation.lat,
          lng: userLocation.lng,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("✅ Event created!");
      window.location.reload();
    } catch (err) {
      toast.error("❌ Error creating event");
    }
  };

  const handleDelete = async (eventId) => {
    try {
      await axios.delete(`http://localhost:5000/api/events/${eventId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("🗑️ Event deleted");
      setEvents(events.filter((event) => event._id !== eventId));
    } catch (err) {
      toast.error(err.response?.data?.message || "❌ Failed to delete event");
    }
  };

  const handleBooking = (event) => {
    navigate("/book", { state: { event } });
  };

  const handleCancelBooking = async (eventId) => {
    try {
      await axios.delete(`http://localhost:5000/api/events/cancel/${eventId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("❌ Booking cancelled");
      window.location.reload();
    } catch (err) {
      toast.error("⚠️ Failed to cancel booking");
    }
  };

  const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c).toFixed(2);
  };

  if (!currentUser) return null; // Prevent rendering before session loads

  return (
    <div className="min-h-screen px-6 py-8 bg-[#fdf8f3] dark:bg-black dark:text-white transition">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      <div className="w-full bg-gradient-to-r from-blue-800 via-blue-700 to-blue-600 text-white rounded-xl p-6 mb-10 shadow-md">
        <h1 className="text-3xl font-bold mb-1">Your Sports Arena</h1>
        <p className="text-sm text-blue-100">Create, manage, and book your events easily.</p>
      </div>

      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Welcome back, Player!</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">Let's explore awesome events</p>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Create Event Form */}
        <div className="bg-white dark:bg-[#121212] p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4">Create New Event</h2>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <input type="text" placeholder="Title" required value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="p-3 border rounded-md dark:bg-black dark:border-gray-600" />
            <textarea placeholder="Description" rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="p-3 border rounded-md dark:bg-black dark:border-gray-600" />
            <input type="text" placeholder="Location" required
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="p-3 border rounded-md dark:bg-black dark:border-gray-600" />
            <input type="date" required
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="p-3 border rounded-md dark:bg-black dark:border-gray-600" />
            <input type="number" min={1} placeholder="Max Players"
              value={formData.maxPlayers}
              onChange={(e) => setFormData({ ...formData, maxPlayers: e.target.value })}
              className="p-3 border rounded-md dark:bg-black dark:border-gray-600" />
            <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
              Create Event
            </button>
          </form>
        </div>

        {/* Events List */}
        <div>
          <h2 className="text-xl font-semibold mb-4">All Events</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {events.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400">No events available.</p>
            ) : (
              events.map((event) => {
                const bookedBy = Array.isArray(event.bookings) ? event.bookings : [];
                const isBookedByMe = bookedBy.some(user => user?._id === currentUser?._id);
                const isHostedByMe = event.hostedBy === currentUser?._id;
                const isFull = bookedBy.length >= event.maxPlayers;

                return (
                  <div key={event._id} className="bg-white dark:bg-[#121212] p-4 rounded-lg shadow flex flex-col justify-between border dark:border-gray-700">
                    <div>
                      <h3 className="text-lg font-bold text-blue-700">{event.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{event.description}</p>
                      <p className="text-sm mt-2"><strong>Location:</strong> {event.location}</p>
                      <p className="text-sm"><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>

                      {event.lat && event.lng && userLocation.lat && userLocation.lng && (
                        <p className="text-xs mt-1 text-blue-600">
                          📍 {getDistanceFromLatLonInKm(userLocation.lat, userLocation.lng, event.lat, event.lng)} km away
                        </p>
                      )}

                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">👥 {bookedBy.length}/{event.maxPlayers} players booked</p>

                      {isBookedByMe && (
                        <p className="text-green-600 mt-1 font-medium text-sm">✅ Booked</p>
                      )}

                      {isHostedByMe && bookedBy.length > 0 && (
                        <div className="mt-2 text-sm text-blue-800 dark:text-blue-400">
                          <p className="font-semibold">👤 Booked by:</p>
                          {bookedBy.map(user => (
                            <p key={user._id}>• {user.name} ({user.email})</p>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2 mt-4">
                      {isBookedByMe ? (
                        <button onClick={() => handleCancelBooking(event._id)}
                          className="flex-1 bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600">
                          Cancel Booking
                        </button>
                      ) : (
                        <button onClick={() => handleBooking(event)}
                          disabled={isHostedByMe || isFull}
                          className={`flex-1 ${isHostedByMe || isFull ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"} text-white py-2 rounded`}>
                          {isFull ? "Full" : "Book Now"}
                        </button>
                      )}

                      <button onClick={() => handleDelete(event._id)}
                        className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700">
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
