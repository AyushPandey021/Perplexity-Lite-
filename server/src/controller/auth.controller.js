import usermodel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendEmail from "../services/mail.service.js";
const JWT_SECRET = process.env.JWT_SECRET || "default_jwt_secret";

export const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existingUser = await usermodel.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "Username already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new usermodel({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        if (email) {
            try {
                await sendEmail({
                    to: email,
                    subject: "Welcome to Our App",
                    html: `<h1>Welcome!</h1><p>Thank you for registering, ${username}!</p>`,
                    text: `Welcome! Thank you for registering, ${username}.`,
                });
            } catch (mailError) {
                console.error("Welcome email error:", mailError);
            }
        }

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Register error:", error);
        res.status(500).json({ message: "Server error" });
    }
};
export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await usermodel.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
            expiresIn: "1h",
        });

        res.status(200).json({ token });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

