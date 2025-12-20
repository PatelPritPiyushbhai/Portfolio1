# My Personal Website

My personal site built using React.

Security and configuration

- Never commit API keys or other secrets to the repository.
- Do not embed secrets in client-side code or client environment variables. Anything in REACT_APP_* is bundled and publicly visible.
- Route any requests that require secrets through a backend service you control.
- Use environment variables for configuration:
  - Client: Only non-sensitive values belong in REACT_APP_*.
  - Server: Store real secrets (API keys, tokens) in server-side environment variables.

Client environment variables (non-sensitive)

- Create a .env file in the project root and ensure .env is listed in .gitignore.
- Example .env (client-safe):
  REACT_APP_API_BASE_URL=https://api.example.com
  REACT_APP_FEATURE_FLAG=false

- Provide and commit a .env.example file to document required variables (do not include secrets):
  REACT_APP_API_BASE_URL=
  REACT_APP_FEATURE_FLAG=

Server-side secrets (if applicable)

- Do not store secrets in the React app. If an external service requires a key or token, place it in your backend’s environment:
  API_BASE_URL=
  API_KEY=
- The React app should call your backend, which uses the server-side secret to interact with third-party services.

Secret rotation and history cleanup

If any real secrets were ever committed to this repository:
- Immediately revoke/rotate exposed credentials with the provider.
- Invalidate tokens/keys and regenerate as needed (API keys, OAuth credentials, webhooks, SSH keys).
- Remove secrets from git history using git filter-repo or BFG Repo-Cleaner; force-push and have collaborators re-clone.
- Audit access logs for potential misuse.
- Enable secret scanning (e.g., GitHub secret scanning) and consider pre-commit hooks to prevent future leaks.

Local development

- Copy .env.example to .env and fill in non-sensitive values.
- Start the app using your standard scripts (e.g., npm start). REACT_APP_* variables are read at build time.
- Note: Changing .env values requires restarting the dev server/build.

Notes

- Treat anything starting with REACT_APP_ as public.
- Do not expose secrets in code, commit history, issue trackers, or logs.