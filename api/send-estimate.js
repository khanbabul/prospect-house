import nodemailer from 'nodemailer';
import { generateEmailHTML } from '../submitter/email-template.js';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const formData = req.body;

    // Configure your Gmail SMTP
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER, // Your Gmail
            pass: process.env.EMAIL_PASS  // Your Gmail App Password
        }
    });

    try {
        await transporter.sendMail({
            from: `"Estimate Builder" <${process.env.EMAIL_USER}>`,
            to: "pitpphase2@gmail.com", // Destination email
            to: "silkfoodpk@gmail.com", // Carbon Copy email
            subject: `New Estimate Request - ${formData.eventDate}`,
            html: generateEmailHTML(formData),
        });

        return res.status(200).json({ success: true, message: 'Estimate sent successfully!' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Failed to send email.' });
    }

}
