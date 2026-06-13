import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const hasMailConfig =
    process.env.GOOGLE_USER_EMAIL &&
    process.env.GOOGLE_CLIENT_ID &&
    process.env.GOOGLE_CLIENT_SECRET &&
    process.env.GOOGLE_REFRESH_TOKEN;

const transporter = hasMailConfig ? nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.GOOGLE_USER_EMAIL,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
    },
}) : null;

export default async function sendEmail({ to, subject, html, text }) {
    if (!transporter) {
        console.warn("Email not sent: mail service is not configured");
        return;
    }

    const mailOptions = {
        from: process.env.GOOGLE_USER_EMAIL,
        to,
        subject,
        html,
        text,
    };
    const details = await transporter.sendMail(mailOptions);
    // console.log('Email sent:', details);
}
