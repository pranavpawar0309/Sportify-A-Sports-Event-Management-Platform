const Event = require("../models/Event");

// ✅ [GET] Fetch all events
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find().select("title description location date _id"); // ✅ Fix: include _id
    res.status(200).json(events);
  } catch (err) {
    console.error("❌ Error fetching events:", err);
    res.status(500).json({ message: "Server error while fetching events" });
  }
};

// ✅ [POST] Create a new event
exports.createEvent = async (req, res) => {
  const { title, description, location, date } = req.body;

  if (!title || !description || !location || !date) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  try {
    const newEvent = new Event({ title, description, location, date });
    await newEvent.save();
    res.status(201).json({ message: "Event created successfully", event: newEvent });
  } catch (err) {
    console.error("❌ Error creating event:", err);
    res.status(500).json({ message: "Server error while creating event" });
  }
};
