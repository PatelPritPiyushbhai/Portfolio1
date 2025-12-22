# My Personal Website

My personal site built using React

Configuration:
- Set required secrets via environment variables at build/runtime. The app expects API_KEY to be provided by the environment.
- Example (macOS/Linux): export API_KEY="your-api-key"
- Example (Windows PowerShell): setx API_KEY "your-api-key" (restart your terminal after setting)
- If using a .env file, add it to .gitignore and do not commit it. Example entry: API_KEY=your-api-key

Security notice:
- Do not hardcode secrets in source code, configuration files, or documentation.
- Rotate/revoke any previously exposed API keys at the provider immediately.
- Purge secrets from git history using git filter-repo or BFG, then force-push to all remotes.
- Ensure secret scanning is enabled in your repository and CI to catch future exposures.