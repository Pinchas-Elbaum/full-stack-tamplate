import { NextFunction, Request, Response } from "express";
import User from "../models/userModel";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';



export const login = async (req: Request, res: Response): Promise<void> => {
    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            res.status(401).json({ error: "Invalid email or password" });
            return
        }

        const isPasswordValid = await bcrypt.compare(password, user!.password);
        if (!isPasswordValid) {
            res.status(401).json({ error: "Invalid email or password" });
            return
        }

        const token = jwt.sign({ id: user._id, admin: user.admin }, process.env.JWT_SECRET || "", { expiresIn: "5h" });

        res.cookie("auth_token", token, {
            maxAge: 1000*60*60*5,   
            httpOnly: true,
            sameSite: 'strict'
        });

        res.json({ message: "Login successful" });
        return

    } catch (error) {

        console.error("Error logging in:", error);
        res.status(500).json({ error: "Failed to login" });
    }
};



export const isAdmin = (req: Request, res: Response, next: NextFunction): void => {
    try {
        const token = req.cookies.auth_token;
        if (!token) {
            res.status(401).json({ error: "No token provided" });
            return
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || "") as { admin: boolean };

        if (decoded.admin !== true) {
            res.status(403).json({ error: "Access denied, admin only" });
            return
        }

        next(); // המשתמש הוא מנהל, אפשר להמשיך לבקשה
    } catch (error) {
        res.status(401).json({ error: "Invalid token" });
        return
    }
};

