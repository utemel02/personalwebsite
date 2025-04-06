import nodemailer from 'nodemailer';

// This uses a Gmail App Password instead of OAuth2
const EMAIL_ADDRESS = process.env.EMAIL_ADDRESS || 'umuttemel2004@gmail.com';
const EMAIL_APP_PASSWORD = process.env.EMAIL_APP_PASSWORD;

/**
 * Sends an email using Gmail with App Password authentication
 */
export async function sendContactEmail({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) {
  try {
    // Create transporter with App Password
    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL_ADDRESS,
        pass: EMAIL_APP_PASSWORD,
      },
    });

    // Create email content
    const mailOptions = {
      from: `"Website Contact Form" <${EMAIL_ADDRESS}>`,
      to: EMAIL_ADDRESS,
      subject: `New Contact Form Submission from ${name}`,
      text: `
Name: ${name}
Email: ${email}

Message:
${message}
      `,
      html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #996515;">New Contact Form Submission</h2>
  <p><strong>Name:</strong> ${name}</p>
  <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
  <div style="margin-top: 20px; border-top: 1px solid #eee; padding-top: 20px;">
    <h3 style="color: #996515;">Message:</h3>
    <p style="white-space: pre-line;">${message}</p>
  </div>
</div>
      `,
    };

    // Send email
    const result = await transport.sendMail(mailOptions);
    
    return {
      success: true,
      messageId: result.messageId,
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
} 