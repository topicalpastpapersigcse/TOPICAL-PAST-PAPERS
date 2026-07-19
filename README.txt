TOPICAL IGCSE PAST PAPERS — FINAL WEBSITE UPDATE

WHAT CHANGED
- Removed the personal name and the old U symbol.
- Rebuilt the website in a cleaner, brighter and easier-to-read layout.
- Main heading is now TOPICAL IGCSE PAST PAPERS.
- Chemistry 0620 appears first and is completely free for everyone.
- Mathematics 0580, Physics 0625 and Accounting 0452 require premium access.
- Premium access costs US$20 and lasts for 30 days.
- The payment does not renew automatically.
- Google sign-in is connected through Supabase.
- PayPal is linked to the signed-in Supabase user using custom_id.
- The website checks premium_until in the profiles table and automatically locks access after expiry.
- Shared access codes were removed.
- Accounting sections containing zero questions were removed.
- Legacy Matrices was removed from the Maths library.

UPLOAD TO GITHUB
1. Open your current TOPICAL-PAST-PAPERS repository folder.
2. Replace these files with the files from this ZIP:
   - index.html
   - styles.css
   - app.js
   - README.txt
   - .nojekyll
3. Keep your existing assets folder. Do not delete it.
4. Commit the changes in GitHub Desktop.
5. Push origin.
6. Wait a few minutes, then hard-refresh the live site with Ctrl + F5.

LIVE WEBSITE CONFIGURATION ALREADY INCLUDED
- Site URL: https://topicalpastpapersigcse.github.io/TOPICAL-PAST-PAPERS/
- Supabase project: https://zkqfyejxkrkazhjovmwr.supabase.co
- PayPal plan: P-58263651AM188451SNJOJBBQ
- Premium duration: 30 days
- Price: US$20 one-time
- Automatic renewal: No

FINAL TEST
1. Open Chemistry while signed out. It should open for free.
2. Open Maths, Physics or Accounting while signed out. The premium window should open.
3. Sign in with Google.
4. Complete a PayPal test payment.
5. Keep the payment window open while PayPal confirms the webhook.
6. The account should change to Premium active and show the expiry date.

IMPORTANT SECURITY NOTE
The website interface locks premium subjects using Google login and the premium_until date. However, GitHub Pages publishes static files publicly. For strong file-level protection, premium PDFs should eventually be moved from the public GitHub assets folder to a private Supabase Storage bucket with signed URLs.
