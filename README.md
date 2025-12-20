# My Personal Website

My personal site built using [React](https://reactjs.org/)

Environment configuration

- Never commit API keys or other secrets to the repository.
- Do not embed secrets in client-side code; route secret-requiring requests through a backend service.

Use environment variables for configuration:

- Create a .env file in the project root (ensure .env is gitignored) and set:
REACT_APP_API_KEY=<your-api-key>

- Provide a .env.example file (commit this file) to document required variables:
REACT_APP_API_KEY=