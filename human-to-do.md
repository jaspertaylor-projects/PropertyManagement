# Demo preparation and setup

This project is a website mockup used to pitch custom websites to property management companies. See the [README](README.md#project-urls) for the hosted demo, login, and dashboard links.

## Prepare a client presentation

1. Open the hosted demo and check the homepage, rental catalog, property details, and mobile layout.
2. Confirm manager access using the steps below before including the dashboard in a presentation.
3. Use sample data to rehearse a listing update and an inquiry submission. Confirm that the inquiry appears in the manager inbox. Email notifications are not implemented.
4. Present applications, payments, tenant services, and other unfinished features as possible additions to the client's project. Use the README's demonstration scope to distinguish working features from placeholders.

## Confirm manager/admin access

1. Open the existing project in your Vercel dashboard and identify the Supabase project from its production `NEXT_PUBLIC_SUPABASE_URL` environment variable. The local configuration may point to a different project.
2. Check that Supabase Authentication and the database respond. The latest setup attempt encountered timeouts even though the project status was `ACTIVE_HEALTHY`.
3. In **Authentication → Users**, look for `anonymous@aloha.com` before creating another account: a timed-out creation request does not establish whether a user was saved. If it is absent, create this demo user with password `opportunity` and mark its email as confirmed. If it exists, ensure it has the requested password and is confirmed.
4. If maintaining a corresponding `public.profiles` record, use the Auth user's ID, email `anonymous@aloha.com`, and role `manager`.
5. Sign in at <https://property-management-tawny-alpha.vercel.app/login> with `anonymous@aloha.com` / `opportunity`. Confirm that `/manager`, `/manager/listings`, and `/manager/inquiries` open.
6. After successful verification, replace the README's **Setup pending** note with login instructions and update the verification date below. This shared demo password is intentionally published at the project owner's request; keep private account passwords and backend API secrets out of the repository.

### Access notes

- **Requested shared login:** `anonymous@aloha.com` / `opportunity`.
- **Account status:** Creation and sign-in are unconfirmed. On September 10, 2026, Supabase account lookup and creation requests timed out. An isolated Playwright check of the hosted login remained on **Signing in...** instead of reaching the dashboard.
- **Backend status:** The locally configured Supabase project is `PropertyManager` (`sregubugfuogzkleftib`). The CLI reported `ACTIVE_HEALTHY`, but authenticated API requests timed out and a database lookup through the IPv4 pooler returned HTTP 544 with `Connection terminated due to connection timeout`.
- **Earlier issue:** The September 8, 2026 account lookup returned `Database error finding users`.
- **Other credentials:** `aloha.ckim@h2owatermark.com` is the locally configured notification address, not a verified login account. The local, Git-ignored `pws.txt` file contains a separate database credential.
- **Fresh installations:** The SQL seed does not create this shared demo account or any other login account.

## Scope a client implementation

1. Agree on the client's branding, pages, property content, staff workflows, and required integrations. Replace sample inventory and placeholder copy with approved client content.
2. Define and implement any additional services included in the proposal. Pages labeled as future features do not provide complete application, payment, or tenant workflows.
3. Verify access permissions and the agreed workflows in the client's environment before launch. The current database policies grant management access to authenticated users without checking their profile role; tenant accounts would need separate permissions.
