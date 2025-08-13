# Thinkboard - MERN Stack Note-Taking Application

Thinkboard is a full-stack note-taking application built with the MERN stack (MongoDB, Express.js, React, Node.js). It features user authentication, real-time note creation, editing, and deletion, with a clean and responsive user interface.

## 🚀 Features

- **User Authentication**
  - Secure registration and login
  - JWT-based authentication
  - Protected routes

- **Notes Management**
  - Create, view, edit, and delete notes
  - Rich text formatting support
  - Real-time updates

- **User Experience**
  - Clean, modern UI with responsive design
  - Loading states and error handling
  - Rate limiting for API protection

## 🛠️ Technologies Used

### Frontend
- **React 18** - Frontend library for building user interfaces
- **TypeScript** - Static typing for JavaScript
- **Vite** - Next Generation Frontend Tooling
- **Tailwind CSS** - Utility-first CSS framework
- **DaisyUI** - Component library for Tailwind CSS
- **React Router** - Client-side routing
- **React Hot Toast** - Toast notifications
- **Axios** - HTTP client
- **Lucide React** - Beautiful & consistent icons

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **Bcrypt** - Password hashing
- **CORS** - Cross-Origin Resource Sharing
- **Dotenv** - Environment variable management
- **Upstash Redis** - Rate limiting

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or later)
- npm or yarn
- MongoDB Atlas account or local MongoDB instance
- Upstash Redis (for rate limiting)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/thinkboard.git
   cd thinkboard
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Update .env with your configuration
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   cp .env.example .env
   # Update .env with your API URL
   npm run dev
   ```

4. **Environment Variables**

   Create a `.env` file in both `backend` and `frontend` directories with the following variables:

   **Backend (.env)**
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRE=30d
   FRONTEND_URL=http://localhost:5173
   UPSTASH_REDIS_REST_URL=your_upstash_redis_rest_url
   UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_rest_token
   ```

   **Frontend (.env)**
   ```
   VITE_API_URL=http://localhost:5000
   ```

## 🏗️ Project Structure

```
thinkboard/
├── backend/               # Backend server
│   ├── config/           # Configuration files
│   ├── controllers/      # Route controllers
│   ├── middleware/       # Custom middleware
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   └── server.js         # Entry point
│
└── frontend/             # Frontend React app
    ├── public/           # Static files
    ├── src/
    │   ├── api/         # API client
    │   ├── components/  # Reusable components
    │   ├── context/    # React context
    │   ├── pages/      # Page components
    │   └── App.tsx     # Main component
    └── vite.config.ts  # Vite configuration
```

## 📝 Development

- **Backend Development**
  ```bash
  cd backend
  npm run dev  # Development server with nodemon
  ```

- **Frontend Development**
  ```bash
  cd frontend
  npm run dev  # Start Vite dev server
  ```

- **Building for Production**
  ```bash
  # In frontend directory
  npm run build
  ```

## 🔒 Security

- Rate limiting to prevent abuse
- Secure password hashing with bcrypt
- JWT authentication with HTTP-only cookies
- Input validation and sanitization
- CORS protection
- Environment variables for sensitive data

## 📱 Browser Support

Thinkboard is built to work in all modern browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 Project Status

Thinkboard is currently in active development. New features and improvements are being added regularly.
