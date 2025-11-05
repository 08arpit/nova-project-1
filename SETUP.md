# 🚀 Nova AI - Setup Guide

Quick setup guide for getting Nova AI running locally.

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Google Cloud account (for Gemini API)
- Convex account (for backend)
- Google OAuth credentials (for authentication)

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/08arpit/nova-project-1.git
cd nova-project-1
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your credentials:

```env
# Google OAuth
NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID_KEY=your_google_oauth_client_id

# Convex Backend
NEXT_PUBLIC_CONVEX_URL=your_convex_url
CONVEX_DEPLOYMENT=your_convex_deployment

# Google Gemini API
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
```

### 4. Set Up Convex

```bash
npx convex dev
```

Follow the prompts to create your Convex deployment and update the environment variables.

### 5. Run the Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the app.

## Getting API Keys

### Google Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key and add it to `.env.local`

### Google OAuth Client ID

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Go to Credentials → Create Credentials → OAuth client ID
5. Configure OAuth consent screen
6. Create OAuth client ID for Web application
7. Add authorized redirect URIs: `http://localhost:3000`
8. Copy the Client ID to `.env.local`

### Convex Setup

1. Go to [Convex Dashboard](https://dashboard.convex.dev/)
2. Create a new project
3. Follow the setup instructions
4. Copy the deployment URL to `.env.local`

## Troubleshooting

### Environment Variables Not Working

- Ensure `.env.local` is in the root directory
- Restart the development server after adding variables
- Check for typos in variable names

### Convex Errors

- Run `npx convex dev` to sync schema
- Check your Convex deployment URL
- Verify your Convex project is active

### API Errors

- Verify API keys are correct
- Check API quotas and limits
- Review browser console for detailed errors

## Next Steps

- Read the [README.md](README.md) for detailed documentation
- Check [FEATURES.md](FEATURES.md) for feature details
- See [CONTRIBUTING.md](CONTRIBUTING.md) to contribute

## Support

For issues or questions:
- Open an issue on [GitHub](https://github.com/08arpit/nova-project-1/issues)
- Check existing issues for solutions

