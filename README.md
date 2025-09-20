# E2Store

Simple Vite + React + TypeScript starter for the E2Store project.

## Getting started (local development)

Prerequisites: Node.js and a package manager (npm, pnpm, or bun).

Quick start:

```sh
# Clone the repository
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm install

# Start dev server
npm run dev
```

## Editing files

Edit files locally with your preferred IDE and commit changes. Standard GitHub workflows apply.

## Technologies

- Vite
- TypeScript
- React
- Tailwind CSS

## Deployment

Deploy to any static hosting provider that supports Vite-built assets (Netlify, Vercel, GitHub Pages, etc.). Build with:

```sh
npm run build
```

Then serve the `dist/` folder with your chosen platform.

### Deploying to GitHub Pages

This project includes a GitHub Actions workflow that builds the site and deploys the `dist/` folder to GitHub Pages on pushes to `main`.

To use it:

1. Push your changes to the `main` branch.
2. In the repository settings on GitHub, enable Pages and set the source to "GitHub Actions" (the workflow will publish the site).

To add a custom domain (CNAME):

- Create a file `public/CNAME` containing your domain on a single line, for example:

```bash
echo 'example.com' > public/CNAME
git add public/CNAME
git commit -m "Add CNAME for example.com"
git push
```

- Then add the required DNS records at your domain registrar: add an A record to GitHub Pages IPs for apex domains and/or a CNAME record for `www` pointing to `OWNER.github.io`.

See GitHub Pages docs for exact DNS details.

## Notes

Removed references to external tooling and project-specific hosting links. If you want custom deployment instructions, tell me which provider you prefer and I can add them.
