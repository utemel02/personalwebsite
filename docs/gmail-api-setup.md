# Setting up Gmail API for Contact Form

This guide will help you set up Gmail API credentials for the contact form.

## Prerequisites

- A Google Account (the same email address you want to use for sending emails)
- Access to Google Cloud Console

## Step 1: Create a Google Cloud Project

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Click on "New Project" in the top-right corner
3. Give your project a name (e.g., "My Website Contact Form")
4. Click "Create"

## Step 2: Enable the Gmail API

1. Select your new project from the project dropdown
2. Go to "APIs & Services" > "Library"
3. Search for "Gmail API"
4. Click on "Gmail API" and then click "Enable"

## Step 3: Create OAuth Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" and select "OAuth client ID"
3. Configure the OAuth consent screen:
   - Choose "External" if you don't have a Google Workspace account
   - Fill in the required fields (App name, user support email, developer contact information)
   - Add the email scope: `https://mail.google.com/`
   - Add test users (your own email)
4. Create OAuth client ID:
   - Application type: "Web application"
   - Name: "Website Contact Form"
   - Authorized redirect URIs: Add `https://developers.google.com/oauthplayground`
5. Click "Create"
6. Note down the Client ID and Client Secret

## Step 4: Get Refresh Token

1. Go to [OAuth 2.0 Playground](https://developers.google.com/oauthplayground/)
2. Click the gear icon in the top right corner
3. Check "Use your own OAuth credentials"
4. Enter your Client ID and Client Secret from the previous step
5. Close the settings
6. In the left panel, find "Gmail API v1" and select `https://mail.google.com/`
7. Click "Authorize APIs"
8. Sign in with your Google account and authorize the application
9. Click "Exchange authorization code for tokens"
10. Note down the Refresh Token

## Step 5: Configure Environment Variables

1. Create a `.env.local` file in the root of your project (or use an existing one)
2. Add the following variables:
   ```
   GMAIL_CLIENT_ID=your_client_id_here
   GMAIL_CLIENT_SECRET=your_client_secret_here
   GMAIL_REFRESH_TOKEN=your_refresh_token_here
   ```
3. Replace the placeholders with your actual values from steps 3 and 4

## Step 6: Test the Contact Form

1. Restart your Next.js development server if it's running
2. Go to the contact page and submit a test message
3. Check if you receive the email at your configured Gmail address

## Troubleshooting

- **Error: Invalid Credentials**: Double-check that your Client ID, Client Secret, and Refresh Token are correctly copied
- **Error: Scope or Permission Issues**: Make sure you've authorized the correct scope (`https://mail.google.com/`)
- **Error: Token Expired**: Refresh tokens can expire if unused for a long time. Generate a new one if needed

## Security Considerations

- Never expose your Client Secret or Refresh Token in client-side code
- Store these credentials securely in environment variables
- Consider using services like Vercel to manage environment variables in production 