import mongoose from "mongoose";
import { DB_URI } from "./env.js";

if(!DB_URI){
    throw new Error('Please define the MongoDB URI environment variable inside .env file')
}

const connectDB = async () => {
    try {
        await mongoose.connect(DB_URI);
        console.log("MongoDB connected");
    } catch (error) {
        console.error('Error connecting to the database: ', error)
        process.exit(1);
    }
}

export default connectDB;
