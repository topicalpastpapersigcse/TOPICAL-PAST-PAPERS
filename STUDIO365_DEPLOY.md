# Deploy Studio365 Pro

This repository contains a Render Blueprint for two services:

1. **Studio365 app** — file manager, uploads, downloads, callbacks and persistent storage.
2. **ONLYOFFICE Docs** — real document, spreadsheet and presentation editing.

## One-click deployment

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/topicalpastpapersigcse/TOPICAL-PAST-PAPERS/tree/agent/studio365-pro-deploy)

During setup, Render asks for `ACCESS_PASSWORD`. Choose a strong password. The username is `owner`.

The deployment uses:

- a Starter app service with a 5 GB persistent disk;
- a Pro document-server service because ONLYOFFICE officially requires at least 4 GB RAM;
- automatically generated HTTPS addresses;
- an automatically generated shared JWT secret;
- password protection and signed internal file/callback URLs.

The existing GitHub Pages study website is not replaced.
