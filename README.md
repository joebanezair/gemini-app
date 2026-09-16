# JobSwipe AI

Mobile-first web app for reviewing fresh remote job leads with a swipe-style workflow.

## Features

- Fetches fresh remote roles from Remotive
- Shows salary when the source provides one
- Extracts a public application email only when one is present in the job description
- Remembers right/left swipe choices in browser localStorage
- Tailors application emails with OpenAI when `OPENAI_API_KEY` is configured
- Falls back to a safe template when no OpenAI API key is present
- Can send through Gmail when Gmail credentials are configured
- Opens the original job source when no public application email is available

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Production configuration

Configure these environment variables in your hosting provider when needed:

- `OPENAI_API_KEY` — optional, separately billed OpenAI API key for model-generated tailoring
- `GMAIL_USER` — Gmail account used for prototype sending
- `GMAIL_APP_PASSWORD` — prototype Gmail app password
- `CV_URL` — optional URL to a PDF CV attached by the server

For a production multi-user product, replace Gmail App Password authentication with Google OAuth 2.0 / Gmail API and store CVs in authenticated storage.

## Safety / outreach behavior

JobSwipe AI sends only after an explicit right-swipe action. It does not guess private email addresses or automatically bulk-send to scraped contacts.

## Deployment

This branch is configured as a standard Next.js application and can be deployed on Vercel.
