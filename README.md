🍔 Food Delivery Backend

Backend API for a Food Delivery Application built using Node.js, Express, and MongoDB.

---

🚀 Tech Stack

- Node.js
- Express.js
- MongoDB
- JWT Authentication

---

✨ Features

- User Signup & Login
- Restaurant Management
- Menu Management
- Order System
- Protected Routes

---

📁 Folder Structure

src/
  controllers/
  routes/
  models/
  middlewares/
  db/

---

🔗 API Endpoints

Auth

- POST /api/auth/signup
- POST /api/auth/login

Restaurant

- POST /api/restaurant/add
- GET /api/restaurant/all

Menu

- POST /api/menu/add/:restaurantId
- GET /api/menu/:restaurantId

Orders

- POST /api/order/place
- GET /api/order/my

---

⚙️ Run Project

npm install
npm start

---

🔮 Future Improvements

- Payment Integration
- Order Tracking
- Frontend (React)