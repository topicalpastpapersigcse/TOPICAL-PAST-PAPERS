# Studio365 Pro

Studio365 Pro integrates **ONLYOFFICE Docs** to edit real Word, Excel and PowerPoint-compatible files in a browser.

## Main capabilities

- Create `.docx`, `.xlsx` and `.pptx` files
- Upload Office and OpenDocument files
- Full document, spreadsheet and presentation editors supplied by ONLYOFFICE Docs
- AutoSave and force-save callbacks
- Download and delete files
- Persistent server storage
- Shared JWT security
- Owner-password protection
- Signed file-download and callback URLs

## Deploy to Render

The repository's root `render.yaml` deploys both the app and ONLYOFFICE Document Server.

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/topicalpastpapersigcse/TOPICAL-PAST-PAPERS/tree/agent/studio365-pro-deploy)

During setup, enter an `ACCESS_PASSWORD`. Use `owner` as the username when the deployed site asks you to sign in.

## Local Docker deployment

1. Install Docker and Docker Compose.
2. Copy `.env.example` to `.env`.
3. Replace `JWT_SECRET` and set `ACCESS_PASSWORD`.
4. Run:

```bash
docker compose up -d --build
```

5. Open `http://localhost:3000`.

## Hosting requirements

ONLYOFFICE Docs Community Edition requires a dual-core CPU, at least 4 GB RAM, at least 40 GB free storage and swap. A static host such as GitHub Pages cannot run it.
