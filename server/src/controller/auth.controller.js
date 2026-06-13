import jwt from "jsonwebtoken";
import usermodel from "../models/user.model.js";
import sendEmail from "../services/mail.service.js";

const JWT_SECRET = process.env.JWT_SECRET || "default_jwt_secret";
const SERVER_URL = process.env.SERVER_URL || `http://localhost:${process.env.PORT || 5000}`;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

export const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existingUser = await usermodel.findOne({
            $or: [
                { username },
                ...(email ? [{ email: email.toLowerCase() }] : []),
            ],
        });

        if (existingUser) {
            const field = existingUser.username === username ? "Username" : "Email";
            return res.status(400).json({ message: `${field} already exists` });
        }

        const newUser = new usermodel({
            username,
            email,
            password,
            verified: !email,
        });

        await newUser.save();

        if (email) {
            const emailVerificationToken = jwt.sign(
                { userId: newUser._id, email: newUser.email },
                JWT_SECRET,
                { expiresIn: "1h" }
            );
            const verifyUrl = `${SERVER_URL}/api/auth/verify-email?token=${emailVerificationToken}`;

            try {
                await sendEmail({
                    to: newUser.email,
                    subject: "Welcome to Perplexity Lite - Verify Your Email",
                    html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h1>Welcome to Perplexity Lite</h1>

      <p>Hello <strong>${newUser.username}</strong>,</p>

      <p>
        Thank you for registering with Perplexity Lite. To complete your
        registration and activate your account, please verify your email
        address by clicking the button below.
      </p>

      <p>
        <a
          href="${verifyUrl}"
          style="
            display: inline-block;
            padding: 12px 24px;
            background-color: #2563eb;
            color: #ffffff;
            text-decoration: none;
            border-radius: 6px;
            font-weight: bold;
          "
        >
          Verify Email
        </a>
      </p>

      <p>
        If the button does not work, copy and paste the following URL into
        your browser:
      </p>

      <p>${verifyUrl}</p>

      <p>If you did not create this account, you can safely ignore this email.</p>

      <p>
        Best regards,<br />
        <strong>Perplexity Lite Team</strong>
      </p>
    </div>
  `,
                });
            } catch (mailError) {
                console.error("Verification email error:", mailError);
            }
        }

        return res.status(201).json({
            message: email
                ? "User registered successfully. Please verify your email."
                : "User registered successfully",
        });
    } catch (error) {
        console.error("Register error:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

export const verifyEmail = async (req, res) => {
    try {
        const { token } = req.query;

        if (!token) {
            return res.status(400).json({ message: "Verification token is required" });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await usermodel.findOne({
            _id: decoded.userId,
            email: decoded.email,
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid verification token" });
        }

        if (!user.verified) {
            user.verified = true;
            await user.save();
        }

        return res.status(200).send(`
  <div style="
    font-family: Arial, sans-serif;
    text-align: center;
    margin-top: 100px;
  ">
    <h1 style="color: #22c55e;">Email Verified</h1>
    <p>Your email has been verified successfully.</p>
    <a
      href="${CLIENT_URL}/login"
      style="
        display: inline-block;
        margin-top: 12px;
        padding: 10px 20px;
        background: #2563eb;
        color: white;
        text-decoration: none;
        border-radius: 6px;
      "
    >
      Go to Login
    </a>
  </div>
`);
    } catch (error) {
        const message = error.name === "TokenExpiredError"
            ? "Verification token has expired"
            : "Invalid verification token";

        return res.status(400).json({ message });
    }
};

export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await usermodel.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        if (user.email && !user.verified) {
            return res.status(403).json({ message: "Please verify your email before logging in" });
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
            expiresIn: "1h",
        });

        return res.status(200).json({ token });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Server error" });
    }
};
