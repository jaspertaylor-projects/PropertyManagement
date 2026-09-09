# Confirm manager/admin access

The website is already live. See the [README](README.md#project-urls) for the website, login, and dashboard links.

1. Open the existing project in your Vercel dashboard and identify the Supabase project from its production `NEXT_PUBLIC_SUPABASE_URL` environment variable. The local configuration may point to a different project.
2. Open that Supabase project and go to **Authentication → Users**. Find the intended manager account and confirm its email. The locally configured contact address, `aloha.ckim@h2owatermark.com`, has not been verified as a login account.
3. Retrieve the website account password from your password manager, or reset it through Supabase account administration if needed. The database password is a separate credential. If no manager account exists, create the intended manager user through Supabase Authentication.
4. Sign in at <https://property-management-tawny-alpha.vercel.app/login> and confirm that the `/manager` dashboard opens. If the account lookup still reports `Database error finding users`, resolve that Supabase error before treating the account as verified.
5. Update the README with the confirmed login email and verification date. Store the password in your password manager; do not add it or API secrets to the repository.
