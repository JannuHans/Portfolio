const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Email configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER || 'jannuhans8@gmail.com',
        pass: process.env.EMAIL_PASS || 'your-app-password'
    }
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, company, projectType, budget, timeline, message, contactMethod } = req.body;

        // Validate required fields
        if (!name || !email || !message) {
            return res.status(400).json({ 
                success: false, 
                message: 'Name, email, and message are required' 
            });
        }

        // Email template
        const htmlTemplate = `
            <div style="font-family: 'Inter', sans-serif; line-height: 1.6; color: #333;">
                <div style="max-width: 600px; margin: 0 auto; padding: 20px; background: #f8fafc;">
                    <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                        <div style="text-align: center; margin-bottom: 30px;">
                            <h1 style="color: #f59e0b; margin-bottom: 10px;">New Contact Form Submission</h1>
                            <p style="color: #6b7280; font-size: 14px;">Portfolio Website Inquiry</p>
                        </div>
                        
                        <div style="margin-bottom: 25px;">
                            <h2 style="color: #1f2937; border-bottom: 2px solid #f59e0b; padding-bottom: 5px; margin-bottom: 15px;">Contact Information</h2>
                            <table style="width: 100%; border-collapse: collapse;">
                                <tr style="background: #f9fafb;">
                                    <td style="padding: 12px; font-weight: 600; border: 1px solid #e5e7eb;">Full Name</td>
                                    <td style="padding: 12px; border: 1px solid #e5e7eb;">${name}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 12px; font-weight: 600; border: 1px solid #e5e7eb;">Email Address</td>
                                    <td style="padding: 12px; border: 1px solid #e5e7eb;">${email}</td>
                                </tr>
                                ${company ? `
                                <tr style="background: #f9fafb;">
                                    <td style="padding: 12px; font-weight: 600; border: 1px solid #e5e7eb;">Company</td>
                                    <td style="padding: 12px; border: 1px solid #e5e7eb;">${company}</td>
                                </tr>
                                ` : ''}
                                ${contactMethod ? `
                                <tr>
                                    <td style="padding: 12px; font-weight: 600; border: 1px solid #e5e7eb;">Preferred Contact</td>
                                    <td style="padding: 12px; border: 1px solid #e5e7eb; text-transform: capitalize;">${contactMethod}</td>
                                </tr>
                                ` : ''}
                            </table>
                        </div>

                        ${projectType ? `
                        <div style="margin-bottom: 25px;">
                            <h2 style="color: #1f2937; border-bottom: 2px solid #3b82f6; padding-bottom: 5px; margin-bottom: 15px;">Project Details</h2>
                            <table style="width: 100%; border-collapse: collapse;">
                                <tr style="background: #f9fafb;">
                                    <td style="padding: 12px; font-weight: 600; border: 1px solid #e5e7eb;">Project Type</td>
                                    <td style="padding: 12px; border: 1px solid #e5e7eb; text-transform: capitalize;">${projectType.replace('-', ' ')}</td>
                                </tr>
                                ${budget ? `
                                <tr>
                                    <td style="padding: 12px; font-weight: 600; border: 1px solid #e5e7eb;">Budget Range</td>
                                    <td style="padding: 12px; border: 1px solid #e5e7eb; text-transform: capitalize;">${budget.replace('-', ' ')}</td>
                                </tr>
                                ` : ''}
                                ${timeline ? `
                                <tr style="background: #f9fafb;">
                                    <td style="padding: 12px; font-weight: 600; border: 1px solid #e5e7eb;">Timeline</td>
                                    <td style="padding: 12px; border: 1px solid #e5e7eb; text-transform: capitalize;">${timeline.replace('-', ' ')}</td>
                                </tr>
                                ` : ''}
                            </table>
                        </div>
                        ` : ''}

                        <div style="margin-bottom: 25px;">
                            <h2 style="color: #1f2937; border-bottom: 2px solid #10b981; padding-bottom: 5px; margin-bottom: 15px;">Message</h2>
                            <div style="background: #f9fafb; padding: 20px; border-radius: 8px; border-left: 4px solid #10b981;">
                                <p style="margin: 0; white-space: pre-wrap;">${message}</p>
                            </div>
                        </div>

                        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                            <p style="color: #6b7280; font-size: 12px; margin-bottom: 10px;">
                                This email was sent from your portfolio website contact form.
                            </p>
                            <p style="color: #6b7280; font-size: 12px;">
                                Received on: ${new Date().toLocaleString('en-US', { 
                                    weekday: 'long', 
                                    year: 'numeric', 
                                    month: 'long', 
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Email options
        const mailOptions = {
            from: `"Portfolio Contact" <${process.env.EMAIL_USER || 'jannuhans8@gmail.com'}>`,
            to: 'jannuhans8@gmail.com',
            subject: `New Contact Form Submission - ${name}`,
            html: htmlTemplate,
            replyTo: email
        };

        // Send email
        await transporter.sendMail(mailOptions);

        res.json({ 
            success: true, 
            message: 'Email sent successfully! I will get back to you within 24 hours.' 
        });

    } catch (error) {
        console.error('Email sending error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to send email. Please try again later or contact directly.' 
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Email service ready for portfolio contact form`);
});

module.exports = app;