# 🛒 Shopping Cart – MERN Stack

A full-stack **Shopping Cart application** built using the **MERN Stack** with secure authentication, JWT cookies, and deployment on Render.

---
## 🌐 Live URLs

- **Frontend URL:**
  https://shopping-cart-gourav.vercel.app

- **Backend URL:**  
  https://shopping-cart-utes.onrender.com

---
## 🚀 Tech Stack

### Frontend
- React (Vite)
- Axios
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- bcrypt

---

## FOLDER STRUCTURE
===================

### Backend:
```
├── config/
│   └── db.js (MongoDB connection)
├── controllers/
│   ├── authController.js (register, login, getUser, logout, updateProfile) 
│   └── cartController.js (add, remove, increment, decrement, checkout)
├── middlewares/
│   ├── verifyToken.js (JWT authentication)
│   └── upload.js (Multer configuration) 
├── models/
│   └── user.js (User schema with image field) 
├── routes/
│   ├── authRoutes.js (includes /update-profile) 
│   └── cartRoutes.js
├── uploads/ (user profile images) 
├── index.js (main server)
└── .env
```

### Frontend:
```
├── src/
│   ├── components/
│   │   ├── Navbar.jsx (shows cart count)
│   │   ├── Footer.jsx
│   │   └── ProductCard.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Products.jsx
│   │   ├── ProductDetails.jsx
│   │   ├── Cart.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx (with image upload) 
│   │   ├── Profile.jsx (view and edit profile) 
│   │   ├── Success.jsx
│   │   └── Cancel.jsx
│   ├── app/
│   │   ├── store.js
│   │   └── slices/
│   │       ├── authSlice.js
│   │       └── cartSlice.js
│   ├── helpers/
│   │   └── getUserFromServer.js
│   └── main.jsx
