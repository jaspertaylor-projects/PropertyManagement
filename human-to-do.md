# Demo preparation and setup

This project is a website mockup used to pitch custom websites to property management companies. See the [README](README.md#project-urls) for the hosted demo, login, and dashboard links.

## Prepare a client presentation

1. Open the hosted demo and check the homepage, rental catalog, property details, and mobile layout.
2. Confirm manager access using the steps below before including the dashboard in a presentation.
3. Use sample data to rehearse a listing update and an inquiry submission. Confirm that the inquiry appears in the manager inbox. Email notifications are not implemented.
4. Present applications, payments, tenant services, and other unfinished features as possible additions to the client's project. Use the README's demonstration scope to distinguish working features from placeholders.

## Confirm manager/admin access

1. Open the existing project in your Vercel dashboard and identify the Supabase project from its production `NEXT_PUBLIC_SUPABASE_URL` environment variable. The local configuration may point to a different project.
2. Open that Supabase project and go to **Authentication → Users**. Find the intended manager account and confirm its email. The locally configured contact address, `aloha.ckim@h2owatermark.com`, has not been verified as a login account.
3. Retrieve the website account password from your password manager, or reset it through Supabase account administration if needed. The database password is a separate credential. If no manager account exists, create the intended manager user through Supabase Authentication.
4. Sign in at <https://property-management-tawny-alpha.vercel.app/login> and confirm that the `/manager` dashboard opens. If the account lookup still reports `Database error finding users`, resolve that Supabase error before treating the account as verified.
5. Update the access notes below with the confirmed login email and verification date. Store the password in your password manager; do not add it or API secrets to the repository.

### Access notes

- **Login email:** Unconfirmed. `aloha.ckim@h2owatermark.com` is the locally configured manager notification address, not a verified login account.
- **Website password:** Not found in the project. The local, Git-ignored `pws.txt` file is labeled as a Supabase database password, not a website login password.
- **Last account lookup:** On September 8, 2026, a read-only lookup against the locally configured Supabase project returned `Database error finding users`. The deployed manager workflow has not been verified.
- **Default accounts:** The SQL seed does not create an admin or manager account.

## Scope a client implementation

1. Agree on the client's branding, pages, property content, staff workflows, and required integrations. Replace sample inventory and placeholder copy with approved client content.
2. Define and implement any additional services included in the proposal. Pages labeled as future features do not provide complete application, payment, or tenant workflows.
3. Verify access permissions and the agreed workflows in the client's environment before launch. The current database policies grant management access to authenticated users without checking their profile role; tenant accounts would need separate permissions.
