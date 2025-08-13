import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import connectDB from "./config/db.js";
import { PORT, FRONTEND_URL } from "./config/env.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import rateLimiter from "./middleware/rateLimiter.js";

const app = express();

app.use(cors({
    origin: FRONTEND_URL,
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());
app.use(rateLimiter);

//Routes
app.use("/api/notes", notesRoutes);
app.use("/api/auth", authRoutes);

app.use(errorMiddleware);


app.listen(PORT, () => {
    try {
        connectDB();
    } catch (error) {
        console.error("Error connecting to the database: ", error);
        process.exit(1);
    }
    console.log(`Server is running on port ${PORT}`);
});
