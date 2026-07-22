# My AI Studio V2

A publishable AI website with:

- AI chat
- Optional live web search
- PDF, document, spreadsheet, presentation and image analysis
- Multiple file uploads in chat
- AI image generation
- AI image editing with an optional mask
- Local image resize, rotate, flip, crop, grayscale, brightness, saturation and compression
- PDF merge
- PDF page-range extraction
- PDF rotation
- PDF watermarking
- Images-to-PDF conversion
- Server-side API key protection
- Rate limiting and configurable upload limits

## Important limitations

There is no real "unlimited" mode. Your hosting service, server memory, OpenAI
API account, model rate limits and billing limits always apply. The defaults are
large enough for a starter public website and can be changed in `.env`.

Arbitrary replacement of existing words inside every PDF is not guaranteed.
PDF files can store text as paths, embedded fonts, scanned page images or
positioned fragments. This project includes reliable PDF operations and AI
analysis instead of pretending every PDF can be edited like a Word document.

The project intentionally keeps safety controls. Do not remove authentication,
rate limits or moderation when publishing publicly.

## Install

Use Node.js 20 or newer.

```bash
npm install
```

Copy `.env.example` to `.env`, then add your secret API key:

```env
OPENAI_API_KEY=your_real_secret_key
OPENAI_MODEL=gpt-5-mini
OPENAI_IMAGE_MODEL=gpt-image-1
APP_NAME=Your AI Name
APP_TAGLINE=Your own tagline
```

Run:

```bash
npm start
```

Open:

```text
http://localhost:3000
```

## Publish

This is a Node.js application, not a static GitHub Pages-only website. It needs
a server because the secret API key must stay on the backend and because PDF
and image processing happens on the server.

Typical host settings:

```text
Build command: npm install
Start command: npm start
```

Add all values from `.env.example` through your host's private environment
variable settings. Never upload `.env` to GitHub.

A `render.yaml` blueprint is included.

## Configure practical limits

```env
MAX_FILE_MB=25
MAX_FILES=8
CHAT_REQUESTS_PER_MINUTE=20
MEDIA_REQUESTS_PER_MINUTE=8
MAX_OUTPUT_TOKENS=1800
```

Increasing these values requires enough server RAM and a hosting plan that
allows larger request bodies and longer processing times.

## Security checklist before public launch

- Add user accounts or a login system.
- Add daily per-user quotas.
- Set an OpenAI project spending limit.
- Keep the API key only in server environment variables.
- Use a paid server with enough memory for image and PDF processing.
- Add a privacy policy and terms page.
- Log errors without logging uploaded private file contents.
