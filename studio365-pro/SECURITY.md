# Security

Studio365 Pro uses:

- HTTP Basic authentication for the owner-facing file manager and editor pages;
- HMAC-signed document download URLs for ONLYOFFICE Docs;
- HMAC-signed callback URLs for file-save callbacks;
- a shared HS256 JWT secret for ONLYOFFICE editor configuration;
- filename sanitisation, extension allowlisting, upload-size limits and path checks.

Do not deploy with an empty `ACCESS_PASSWORD` or the example JWT secret.
