# Setting up Gmail App Password for Contact Form

This guide will help you set up a Gmail App Password to use with your contact form. This is a much simpler approach than using the full OAuth2 flow.

## Prerequisites

- A Google/Gmail account
- 2-Step Verification enabled on your Google account

## Step 1: Enable 2-Step Verification (if not already enabled)

1. Go to your [Google Account Security settings](https://myaccount.google.com/security)
2. Look for "2-Step Verification" under "Signing in to Google"
3. Click on it and follow the steps to enable it if not already enabled

## Step 2: Create an App Password

1. Go to your [Google Account Security settings](https://myaccount.google.com/security)
2. Look for "App passwords" under "Signing in to Google" (Note: This option only appears if 2-Step Verification is enabled)
3. Click on "App passwords"
4. You might need to sign in again
5. At the bottom, click "Select app" and choose "Other (Custom name)"
6. Enter a name like "Website Contact Form"
7. Click "Generate"
8. Google will display a 16-character app password (four groups of four characters)
9. Copy this password - you'll need it for the next step (Note: Google will only show this password once)

## Step 3: Configure Environment Variables

1. Open your `.env` file
2. Make sure the following variables are set:
   ```
   EMAIL_ADDRESS=your_gmail_address@gmail.com
   EMAIL_APP_PASSWORD=your_16_character_app_password
   ```
3. Replace `your_gmail_address@gmail.com` with your actual Gmail address
4. Replace `your_16_character_app_password` with the app password generated in Step 2
5. Do not include spaces in the app password

## Step 4: Test the Contact Form

1. Start your Next.js development server
2. Navigate to the contact page
3. Fill out and submit the form
4. Check if you receive the email at your Gmail address

## Troubleshooting

- **Email Not Sending**: Make sure the app password is correct and doesn't include spaces
- **Authentication Error**: Verify that 2-Step Verification is enabled and that you're using an app password, not your regular account password
- **Too Many Login Attempts**: If you get this error, wait a while before trying again or generate a new app password

## Security Considerations

- Keep your app password secure - it grants access to send emails from your account
- Don't share your `.env` file or commit it to public repositories
- If you suspect your app password has been compromised, go to your Google Account and revoke it immediately 