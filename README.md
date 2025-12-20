# My Personal Website

My personal site built using [React](https://reactjs.org/)

Environment configuration:
- Provide the API key via an environment variable at runtime. Do not hardcode secrets.
- For local development, create a .env file (do not commit it) with:
  API_KEY='<your-api-key>'
- Or export it in your shell before starting the app:
  export API_KEY='<your-api-key>'

Security notes:
- Immediately rotate/revoke any previously committed API key with the provider.
- Purge the secret from git history using git filter-repo or BFG, then force-push.
- Add .env to .gitignore and enable secret scanning/pre-commit secret checks to prevent reintroduction.