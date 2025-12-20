# My Personal Website

My personal site built using [React](https://reactjs.org/)

Environment configuration

- Never commit API keys or other secrets to the repository.
- Do not embed secrets in client-side code; route secret-requiring requests through a backend service.
- In React apps, any environment variable prefixed with REACT_APP_ is bundled into the client and visible to users. Only non-sensitive, public configuration should be placed in these variables.

Use environment variables for configuration:

- Create a .env file in the project root (ensure .env is gitignored) and set only non-sensitive, public values needed by the client:
REACT_APP_PUBLIC_API_BASE_URL=https://api.example.com
REACT_APP_PUBLIC_API_KEY=<public-only-key-if-explicitly-allowed-by-provider>

- Provide a .env.example file (commit this file) to document required variables:
REACT_APP_PUBLIC_API_BASE_URL=
REACT_APP_PUBLIC_API_KEY=

Server-side secrets

- Any sensitive credentials (for example: API_KEY, DATABASE_URL, JWT_SECRET, third-party API tokens) must be stored only on the backend as standard environment variables without the REACT_APP_ prefix.
- The frontend should call your backend endpoints for operations that require these secrets. The backend will read its environment variables and perform the privileged requests.

Migration note

- If existing code references REACT_APP_API_KEY, update those references to REACT_APP_PUBLIC_API_KEY only if the key is truly public and intended to be exposed. For any private key usage, remove it from the client and proxy the request through a backend service.