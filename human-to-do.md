# Demo preparation and setup

This project is a website mockup used to pitch custom websites to property management companies. See the [README](README.md#project-urls) for the hosted demo, login, and dashboard links.

## Prepare a client presentation

1. Open the hosted demo and check the homepage, rental catalog, property details, and mobile layout.
2. Confirm manager access using the steps below before including the dashboard in a presentation.
3. Use sample data to rehearse a listing update and an inquiry submission. Confirm that the inquiry appears in the manager inbox. Email notifications are not implemented.
4. Present applications, payments, tenant services, and other unfinished features as possible additions to the client's project. Use the README's demonstration scope to distinguish working features from placeholders.

## Confirm manager/admin access

1. Sign in at <https://property-management-tawny-alpha.vercel.app/login> with `anonymous@aloha.com` / `opportunity`. The shared demo account is already configured on the hosted site.
2. Confirm that `/manager`, `/manager/listings`, and `/manager/inquiries` open before a client presentation.
3. For a separate deployment, identify its Supabase project from Vercel's `NEXT_PUBLIC_SUPABASE_URL` environment variable. Accounts belong to a specific Supabase project and are not created by the SQL seed.
4. In that project's **Authentication → Users**, create the demo user if absent and mark its email as confirmed. Add a matching `public.profiles` record with the Auth user's ID, email `anonymous@aloha.com`, and role `manager`.
5. Test the new deployment's login and update its URL and verification notes. This shared demo password is intentionally published at the project owner's request; keep private account passwords and backend API secrets out of the repository.

### Access notes

- **Shared demo login:** `anonymous@aloha.com` / `opportunity`.
- **Account status:** Created with a confirmed email and a matching `public.profiles` record with role `manager`. Supabase password authentication and the profile lookup both succeeded.
- **Live verification:** On September 10, 2026, an isolated Playwright browser signed in through the hosted login page and opened the dashboard, listings, and inquiries pages successfully. Listing edits and inquiry submissions were not part of this access check.
- **Backend:** `PropertyManager` (`sregubugfuogzkleftib`). The created account was verified against both this Supabase project and the hosted website.
- **Resolved connection issue:** Initial setup requests timed out during Supabase's September 10 [Unresponsive Projects incident](https://status.supabase.com/incidents/4mkcsnlf6p5x). After the project owner restarted the project, account creation and live login succeeded.
- **Other credentials:** `aloha.ckim@h2owatermark.com` is the locally configured notification address, not a verified login account. The local, Git-ignored `pws.txt` file contains a separate database credential.
- **Fresh installations:** The SQL seed does not create this shared demo account or any other login account.

## Scope a client implementation

1. Agree on the client's branding, pages, property content, staff workflows, and required integrations. Replace sample inventory and placeholder copy with approved client content.
2. Define and implement any additional services included in the proposal. Pages labeled as future features do not provide complete application, payment, or tenant workflows.
3. Verify access permissions and the agreed workflows in the client's environment before launch. The current database policies grant management access to authenticated users without checking their profile role; tenant accounts would need separate permissions.
