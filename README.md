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
✅ COPY THIS (Don’t change anything):
<pre> ## 📁 Folder Structure ``` sportify/ ├── client/ # React frontend ├── server/ # Express backend │ ├── config/ │ ├── controllers/ │ ├── middleware/ │ ├── models/ │ ├── routes/ │ ├── .env # Not pushed (listed in .gitignore) │ └── .env.example # Safe reference ├── .gitignore └── README.md ``` </pre>

---

## 🚀 How to Run Locally


# Clone the repo
git clone https://github.com/YOUR_USERNAME/sportify.git
cd sportify

## ⚙️ Backend Setup

```bash
cd server
npm install
npm run dev


## 🎨 Frontend Setup

```bash
cd client
npm install
npm start


### 🔐 Environment Setup

Create a `.env` file inside `/server` with the following:

```env
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-secret-key
PORT=5000


## 🛡 License
This project is for academic/demo purposes only and not intended for production or commercial use.



