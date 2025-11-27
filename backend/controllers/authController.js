import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import { NODE_ENV } from "../config/env.js";
import { JWT_SECRET, JWT_EXPIRE } from "../config/env.js";
import User from "../models/User.js";

export const registerUser = async (req, res, next) => {
    // Atomic operation.
    const dbSession = await mongoose.startSession();
    dbSession.startTransaction();
    try {
        const { name, email, password } = req.body;
        
        if(!validator.isEmail(email)){
            return res.status(400).json({ message: "Invalid email" });
        }
        if(!validator.isStrongPassword(password)){
            return res.status(400).json({ message: "Password not strong enough" });
        }
        const existingUser = await User.findOne({ email }).session(dbSession);
        if(existingUser){
            return res.status(409).json({ message: "User already exists" });
        }

        // Hash user's password first
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUsers = await User.create([{
            name,
            email,
            password: hashedPassword
        }], { session: dbSession });

        const user = newUsers[0];

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRE });
        res.cookie("token", token, { httpOnly: true, secure: NODE_ENV==="production", sameSite: "none", maxAge: 24 * 60 * 60 * 1000 });

        await dbSession.commitTransaction();
        dbSession.endSession();

        // Send only the user data to the client, don't send hashed password
        const userData = {
            _id: user._id,
            name: user.name,
            email: user.email
        };

        res.status(201).json({success: true, message: "User registered successfully", user: userData });
    } catch (error) {
        await dbSession.abortTransaction();
        dbSession.endSession();
        next(error);
    }
}

export const loginUser = async (req, res, next) => {
    const dbSession = await mongoose.startSession();
    dbSession.startTransaction();
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email}).session(dbSession);
        if(!user){
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRE });
        res.cookie("token", token, { httpOnly: true, secure: NODE_ENV==="production", sameSite: "none", maxAge: 24 * 60 * 60 * 1000 });
        res.status(200).json({success: true, message: "User logged in successfully", user: {
            _id: user._id,
            name: user.name,
            email: user.email
        }});
    
    } catch (error) {
        await dbSession.abortTransaction();
        dbSession.endSession();
        next(error);
    }
}

export const logoutUser = async (req, res, next) => {
    try {
        res.clearCookie("token", { httpOnly: true, secure: NODE_ENV==="production", sameSite: "none" });
        res.status(200).json({success: true, message: "User logged out successfully", user: null});
    } catch (error) {
        next(error);
    }
};