# 🏅 Sportify – Sports Event Management Platform

Sportify is a full-stack web application that allows users to host, discover, and join nearby sports events like football matches, basketball games, and more. It connects local players through real-time geolocation filtering, booking logic, and a clean, responsive UI.

> 🚀 Built using the MERN stack (MongoDB, Express.js, React, Node.js), with secure authentication, real-time event discovery, and booking management features.

---

## 🎯 Features

- Host and manage sports events
- Discover nearby events (within 10km) using HTML5 Geolocation API
- Join or cancel event bookings with live player count updates
- JWT-based user authentication (Sign up / Log in)
- Personalized dashboard to view hosted & joined events
- Responsive UI built with Tailwind CSS
- Toast notifications for actions (React Toastify)

---

## 🛠 Tech Stack

- **Frontend:** React.js, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB + Mongoose
- **Authentication:** JWT (Token-based)
- **Utilities:** React Toastify, Geolocation API

---

## 📁 Folder Structure
sportify/
├── client/ # React frontend
├── server/ # Express backend
├── .env # Environment file (not pushed)
├── .env.example # Safe reference env file
├── .gitignore
└── README.md

---

## 🚀 How to Run Locally


# Clone the repo
git clone https://github.com/YOUR_USERNAME/sportify.git
cd sportify

# Backend setup
cd server
npm install
npm run dev

# Frontend setup
cd ../client
npm install
npm start

## 🔐 Environment Setup
Create a .env file inside /server with the following:


MONGO_URI=your-mongodb-uri
JWT_SECRET=your-secret-key
PORT=5000
You can also refer to the included .env.example.

## 🛡 License
This project is for academic/demo purposes only and not intended for production or commercial use.



