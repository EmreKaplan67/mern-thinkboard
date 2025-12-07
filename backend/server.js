import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import connectDB from "./config/db.js";
import { PORT, FRONTEND_URL, NODE_ENV } from "./config/env.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import rateLimiter from "./middleware/rateLimiter.js";
import path from "path";

const app = express();
const __dirname = path.resolve();

// CONNECT TO DATABASE BEFORE SERVER STARTS
try {
    await connectDB();
    console.log("MongoDB connected");
} catch (error) {
    console.error("DB connection error:", error);
    process.exit(1);
}

// Enable CORS for both development and production
app.use(cors({
    origin: [FRONTEND_URL, "https://cute-muffin-912fcf.netlify.app"],
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());
app.use(rateLimiter);

//Routes
app.use("/api/notes", notesRoutes);
app.use("/api/auth", authRoutes);

app.use(errorMiddleware);

// For our Backend to serve our Frontend (Only for production)
if (NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
    });
}


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} in ${NODE_ENV} mode`);
});
