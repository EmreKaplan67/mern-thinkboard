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

if (NODE_ENV === "development") {
    // We need this for development mode cause in development mode we are running our frontend and backend on different ports
    app.use(cors({
        origin: FRONTEND_URL,
        credentials: true
    }));
}

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
    try {
        connectDB();
    } catch (error) {
        console.error("Error connecting to the database: ", error);
        process.exit(1);
    }
    console.log(`Server is running on port ${PORT} in ${NODE_ENV} mode`);
});
