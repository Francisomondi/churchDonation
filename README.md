# ⛪ Church Donation & Parish Platform

A modern **church web platform** built to help congregations stay connected, support church missions, and participate in spiritual life online.

This platform allows church members to:

* Register as parish members
* Participate in church activities
* View liturgical information
* Track upcoming Mass services
* Make secure donations via **M-Pesa**
* Stay updated with church events and sermons

The goal of this project is to create a **digital parish experience** that strengthens faith, community, and generosity.

---

# 🌟 Features

### 👥 Member Management

* Member registration
* Secure login system
* Authentication using JWT
* User dashboard

### ⛪ Church Experience

* Mass countdown timer
* Catholic liturgical calendar
* Church events and announcements
* Sermon listings

### 💳 Online Giving

* Secure church donations
* M-Pesa STK Push integration
* Donation history tracking
* Support for tithe, offerings, and projects

### 📅 Parish Activities

* Upcoming church events
* Member participation features
* Community engagement

---

# 🛠 Tech Stack

### Frontend

* React
* Tailwind CSS
* Framer Motion
* React Router
* Zustand

### Backend

* Node.js
* Express.js
* MongoDB
* JWT Authentication

### Payments

* Safaricom **M-Pesa Daraja API**

---

# 📂 Project Structure

```
church-platform
│
├── backend
│   ├── controllers
│   ├── routes
│   ├── models
│   ├── middleware
│   └── config
│
├── frontend
│   ├── components
│   ├── pages
│   ├── stores
│   ├── utils
│   └── assets
│
└── README.md
```

---

# ⚙️ Installation

### 1️⃣ Clone the repository

```bash
git clone https://github.com/yourusername/church-platform.git
```

---

### 2️⃣ Install dependencies

Frontend:

```bash
cd frontend
npm install
```

Backend:

```bash
cd backend
npm install
```

---

### 3️⃣ Setup Environment Variables

Create a `.env` file in the backend folder.

Example:

```
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key

MPESA_CONSUMER_KEY=your_key
MPESA_CONSUMER_SECRET=your_secret
MPESA_SHORTCODE=your_shortcode
MPESA_PASSKEY=your_passkey
```

---

### 4️⃣ Run the application

Backend:

```bash
npm run dev
```

Frontend:

```bash
npm run dev
```

---

# 🔐 Authentication Flow

1. User registers an account
2. Backend creates user and returns JWT token
3. Token is stored on the frontend
4. Protected routes allow access to authenticated users only

---

# 💰 Donation Flow

1. User selects donation type
2. Enters phone number
3. System triggers **M-Pesa STK Push**
4. User confirms payment on phone
5. Donation record is stored in the database

---

# 🚀 Future Improvements

* Admin dashboard
* Church event management system
* Prayer request submission
* Live Mass streaming
* Email notifications
* Member contribution tracking
* Parish analytics dashboard

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a Pull Request

---

# 📜 License

This project is open-source and available under the **MIT License**.

---

# ✝️ Inspiration

This project was created to support **church communities in the digital age**, making it easier for believers to connect, worship, and give faithfully.
