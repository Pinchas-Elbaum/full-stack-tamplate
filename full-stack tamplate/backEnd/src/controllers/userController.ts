import { Request, Response } from "express";
import User from "../models/userModel";
import bcrypt from 'bcrypt';
import mongoose from "mongoose";

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await User.find();

        const userResponse = users.map(user => ({
            id: user._id,
            name: user.username,
            email: user.email
        }));

        res.json(userResponse);
        return

    } catch (error) {

        res.status(500).json({ error: "Failed to fetch users" });
        return
    }
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {

    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            res.status(400).json({ error: "Invalid user ID format" });
            return
        }

        const user = await User.findById(req.params.id);

        if (!user) {
            res.status(404).json({ error: "User not found" });
            return
        }

        const userResponse = {
            id: user._id,
            name: user.username,
            email: user.email,
        };

        res.json(userResponse);
        return

    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ error: "Failed to fetch user" });
        return

    }
}


export const postUser = async (req: Request, res: Response): Promise<void> => {

    try {
        const { username, email, password } = req.body;
        // if (!name || !email || !password) {
        //     res.status(400).json({ error: "Name, email, and password are required" });
        //     return;
        // }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(409).json({ error: "Email already in use" });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            username,
            email,
            password: hashedPassword,
        });

        await user.save();

        const { password: _, ...userWithoutPassword } = user.toObject();
        res.status(201).json(userWithoutPassword);
        return

    } catch (error) {
        res.status(500).json({ error: "Failed to save user" });
        return

    }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {

    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            res.status(404).json({ error: "User not found" });
            return
        }

        await User.findByIdAndDelete(req.params.id);

        res.json({ message: "User deleted successfully" });
        return

    } catch (error) {
        res.status(500).json({ error: "Failed to delete user" });
        return
    }
};

export const putUser = async (req: Request, res: Response): Promise<void> => {

    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            res.status(404).json({ error: "User not found" });
            return
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });

        res.json(updatedUser);
        return

    } catch (error) {
        res.status(500).json({ error: "Failed to update user" });
    }
};
