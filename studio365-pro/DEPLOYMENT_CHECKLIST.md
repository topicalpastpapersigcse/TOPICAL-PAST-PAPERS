# Production checklist

- Set a strong `ACCESS_PASSWORD` during Render Blueprint creation.
- Keep the generated `JWT_SECRET` private and shared between both services.
- Confirm the app and ONLYOFFICE services report healthy.
- Sign in with username `owner` and your chosen password.
- Create one DOCX, XLSX and PPTX file and confirm AutoSave by reopening each file.
- Add a custom domain only after the default HTTPS deployment works.
